import { Router } from 'express';

import prisma from '../../lib/prisma';
import asyncHandler from '../../utils/async-handler';
import { validateBody } from '../../utils/validate';
import { ApiError } from '../../middleware/error-handler';
import { logger } from '../../middleware/logger';
import { Bitrix24Service } from '../../services/bitrix24Service';
import verifyRecaptcha from '../../integrations/recaptcha';
import { contactCreateSchema } from './contact.schemas';

const router = Router();

router.post(
  '/',
  validateBody(contactCreateSchema),
  asyncHandler(async (req, res) => {
    const payload = contactCreateSchema.parse(req.body);

    const captchaOk = await verifyRecaptcha(payload.recaptchaToken);
    if (!captchaOk) {
      throw new ApiError('captcha_failed', 422, 'CAPTCHA_FAILED');
    }

    const contact = await prisma.contactRequest.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        company: payload.company,
        message: payload.message,
        serviceInterest: payload.serviceInterest,
        metadata: {
          userAgent: req.get('user-agent'),
          referer: req.get('referer'),
        },
      },
    });

    let leadId: string | null = null;
    let bitrix24Error: string | null = null;

    try {
      // Use Bitrix24Service to create lead with enhanced error handling
      const leadResult = await Bitrix24Service.createLead({
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        company: payload.company,
        message: payload.message,
        serviceInterest: payload.serviceInterest ?? undefined,
        source: 'website',
      });

      if (leadResult.success && leadResult.leadId) {
        leadId = String(leadResult.leadId);
        await prisma.contactRequest.update({
          where: { id: contact.id },
          data: {
            status: 'IN_PROGRESS',
            metadata: {
              ...contact.metadata,
              bitrix24LeadId: leadId,
              bitrix24ContactRequestId: leadResult.contactRequestId,
            },
          },
        });
        logger.info({
          contactId: contact.id,
          leadId,
          bitrix24ContactRequestId: leadResult.contactRequestId
        }, 'Bitrix24 lead created successfully');
      } else {
        bitrix24Error = leadResult.error || 'Unknown error';
        logger.warn({
          contactId: contact.id,
          error: bitrix24Error,
          bitrix24ContactRequestId: leadResult.contactRequestId
        }, 'Bitrix24 lead creation failed');
      }
    } catch (error) {
      bitrix24Error = error instanceof Error ? error.message : 'Unknown error';
      logger.error({
        contactId: contact.id,
        error: bitrix24Error
      }, 'Bitrix24 lead creation error');
    }

    res.status(202).json({
      data: {
        status: 'queued',
        contactRequestId: contact.id,
        leadId,
        bitrix24: {
          success: !bitrix24Error,
          error: bitrix24Error,
        },
      },
    });
  }),
);

export default router;
