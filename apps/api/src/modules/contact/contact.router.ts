import { Router } from 'express';

import prisma from '../../lib/prisma';
import asyncHandler from '../../utils/async-handler';
import { validateBody } from '../../utils/validate';
import { ApiError } from '../../middleware/error-handler';
import { logger } from '../../middleware/logger';
import { sendLeadToBitrix } from '../../integrations/bitrix24';
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

    try {
      const leadResult = await sendLeadToBitrix(contact.id, {
        title: `Website lead: ${payload.fullName}`,
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        company: payload.company,
        message: payload.message,
        serviceInterest: payload.serviceInterest ?? null,
        source: 'website',
      });

      if (leadResult.success) {
        leadId = leadResult.leadId ? String(leadResult.leadId) : null;
        await prisma.contactRequest.update({
          where: { id: contact.id },
          data: { 
            status: 'IN_PROGRESS',
            metadata: {
              ...contact.metadata,
              bitrix24LeadId: leadId,
            },
          },
        });
      } else {
        logger.warn({ 
          error: leadResult.error,
          contactId: contact.id 
        }, 'Bitrix24 lead creation failed');
      }
    } catch (error) {
      logger.warn({ err: error }, 'Bitrix24 lead creation failed');
    }


    res.status(202).json({
      data: {
        status: 'queued',
        contactRequestId: contact.id,
        leadId,
      },
    });
  }),
);

export default router;
