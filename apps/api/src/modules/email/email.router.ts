import { Router } from 'express';
import { EmailService } from './email.service';
import { logger } from '../../middleware/logger';

const router = Router();

/**
 * POST /api/email/send
 * Send an email via the email service
 */
router.post('/send', async (req, res) => {
  try {
    const { to, subject, html, text, from, attachments } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, html',
      });
    }

    const result = await EmailService.sendEmail({
      to,
      subject,
      html,
      text,
      from,
      attachments,
    });

    return res.status(200).json({
      success: result.success,
      jobId: result.jobId,
      message: result.success
        ? 'Email added to queue successfully'
        : 'Failed to send email',
    });
  } catch (error) {
    logger.error('Error in email send route', {
      error: error instanceof Error ? error.message : String(error),
    });

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * GET /api/email/queue-status
 * Get the current status of the email queue
 */
router.get('/queue-status', (req, res) => {
  const status = EmailService.getQueueStatus();
  return res.status(200).json({
    success: true,
    data: status,
  });
});

/**
 * GET /api/email/job/:jobId
 * Get the status of a specific email job
 */
router.get('/job/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = EmailService.getJobStatus(jobId);

  if (!job) {
    return res.status(404).json({
      success: false,
      error: 'Job not found',
    });
  }

  return res.status(200).json({
    success: true,
    data: job,
  });
});

/**
 * DELETE /api/email/queue
 * Clear the email queue (admin only - in production, add auth)
 */
router.delete('/queue', (req, res) => {
  const queueSize = EmailService.clearQueue();
  return res.status(200).json({
    success: true,
    message: `Cleared ${queueSize} jobs from queue`,
  });
});

export default router;
