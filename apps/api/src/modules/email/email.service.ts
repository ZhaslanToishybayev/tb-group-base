import nodemailer, { Transporter } from 'nodemailer';
import { logger } from '../../middleware/logger';
import { env } from '../../config/env';

/**
 * Email data structure for sending emails
 */
export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  attachments?: Array<{
    filename: string;
    content?: string;
    path?: string;
  }>;
}

/**
 * Email queue job structure
 */
export interface EmailJob {
  id: string;
  email: EmailData;
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
  error?: string;
}

/**
 * Email transport configuration
 */
interface TransportConfig {
  host: string;
  port: number;
  secure: boolean;
  auth?: {
    user: string;
    pass: string;
  };
}

/**
 * Email Service for sending transactional emails
 * Features:
 * - Asynchronous queue-based processing
 * - Primary and fallback SMTP provider support
 * - Retry mechanism with configurable attempts
 * - Comprehensive error handling and logging
 * - Queue status tracking
 */
export class EmailService {
  private static instance: EmailService | null = null;
  private primaryTransport: Transporter;
  private fallbackTransport: Transporter | null = null;
  private emailQueue: EmailJob[] = [];
  private isProcessing = false;
  private processingInterval: NodeJS.Timeout | null = null;

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    this.primaryTransport = this.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: env.SMTP_USER && env.SMTP_PASS ? {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      } : undefined,
    });

    // Initialize fallback transport if configured
    if (env.SMTP_FALLBACK_HOST) {
      this.fallbackTransport = this.createTransport({
        host: env.SMTP_FALLBACK_HOST,
        port: env.SMTP_FALLBACK_PORT || 587,
        secure: env.SMTP_FALLBACK_SECURE,
        auth: env.SMTP_FALLBACK_USER && env.SMTP_FALLBACK_PASS ? {
          user: env.SMTP_FALLBACK_USER,
          pass: env.SMTP_FALLBACK_PASS,
        } : undefined,
      });

      logger.info('EmailService fallback transport initialized', {
        host: env.SMTP_FALLBACK_HOST,
        port: env.SMTP_FALLBACK_PORT,
      });
    }

    // Start queue processor if enabled
    if (env.EMAIL_QUEUE_ENABLED) {
      this.startQueueProcessor();
      logger.info('EmailService queue processor started', {
        queueEnabled: env.EMAIL_QUEUE_ENABLED,
        retryAttempts: env.EMAIL_RETRY_ATTEMPTS,
        retryDelay: env.EMAIL_RETRY_DELAY,
      });
    }
  }

  /**
   * Get singleton instance of EmailService
   */
  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Create nodemailer transport from configuration
   */
  private createTransport(config: TransportConfig): Transporter {
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
      // Connection timeout settings
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });
  }

  /**
   * Add email to queue for async processing
   */
  static async sendEmail(emailData: EmailData): Promise<{ success: boolean; jobId: string }> {
    const service = EmailService.getInstance();

    const job: EmailJob = {
      id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: {
        ...emailData,
        from: emailData.from || env.SMTP_FROM,
      },
      attempts: 0,
      maxAttempts: env.EMAIL_RETRY_ATTEMPTS,
      createdAt: new Date(),
    };

    if (env.EMAIL_QUEUE_ENABLED) {
      // Add to queue for async processing
      service.emailQueue.push(job);
      logger.info('Email job added to queue', {
        jobId: job.id,
        to: job.email.to,
        subject: job.email.subject,
        queueSize: service.emailQueue.length,
      });

      return { success: true, jobId: job.id };
    } else {
      // Send immediately (synchronous)
      try {
        await service.processEmailJob(job, true);
        return { success: true, jobId: job.id };
      } catch (error) {
        logger.error('Failed to send email immediately', {
          jobId: job.id,
          error: error instanceof Error ? error.message : String(error),
        });
        return { success: false, jobId: job.id };
      }
    }
  }

  /**
   * Start the queue processor
   */
  private startQueueProcessor(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }

    // Process queue every 1 second
    this.processingInterval = setInterval(() => {
      this.processQueue();
    }, 1000);
  }

  /**
   * Process emails in the queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.emailQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      // Process up to 10 emails per batch
      const batchSize = Math.min(10, this.emailQueue.length);
      const batch = this.emailQueue.splice(0, batchSize);

      const promises = batch.map((job) => this.processEmailJob(job, false));
      await Promise.allSettled(promises);
    } catch (error) {
      logger.error('Error processing email queue', {
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Process a single email job
   */
  private async processEmailJob(job: EmailJob, isImmediate: boolean): Promise<void> {
    const isLastAttempt = job.attempts >= job.maxAttempts;

    try {
      job.attempts++;
      logger.info('Attempting to send email', {
        jobId: job.id,
        attempt: job.attempts,
        maxAttempts: job.maxAttempts,
        to: job.email.to,
        subject: job.email.subject,
      });

      // Try primary transport first
      let sent = false;
      let lastError: Error | null = null;

      try {
        await this.primaryTransport.sendMail(job.email);
        sent = true;
        logger.info('Email sent successfully via primary transport', {
          jobId: job.id,
          transport: 'primary',
        });
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        logger.warn('Primary transport failed', {
          jobId: job.id,
          error: lastError.message,
        });

        // Try fallback transport if available and not the last attempt
        if (this.fallbackTransport && !isLastAttempt) {
          try {
            await this.fallbackTransport.sendMail(job.email);
            sent = true;
            logger.info('Email sent successfully via fallback transport', {
              jobId: job.id,
              transport: 'fallback',
              primaryError: lastError.message,
            });
          } catch (fallbackError) {
            const fallbackErrorMsg = fallbackError instanceof Error
              ? fallbackError.message
              : String(fallbackError);
            logger.warn('Fallback transport also failed', {
              jobId: job.id,
              fallbackError: fallbackErrorMsg,
            });
            lastError = new Error(`Primary: ${lastError.message}; Fallback: ${fallbackErrorMsg}`);
          }
        }
      }

      if (!sent) {
        throw lastError || new Error('Unknown email sending error');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      job.error = errorMessage;

      if (isLastAttempt) {
        logger.error('Email job failed after all retry attempts', {
          jobId: job.id,
          attempts: job.attempts,
          error: errorMessage,
        });

        // Could implement dead letter queue here
        // For now, we just log and discard
      } else {
        // Re-queue with delay
        const delay = env.EMAIL_RETRY_DELAY * job.attempts;
        setTimeout(() => {
          this.emailQueue.push(job);
          logger.info('Email job re-queued for retry', {
            jobId: job.id,
            attempt: job.attempts,
            delay,
          });
        }, delay);
      }
    }
  }

  /**
   * Get queue status
   */
  static getQueueStatus(): {
    queueSize: number;
    isProcessing: boolean;
    queueEnabled: boolean;
  } {
    const service = EmailService.getInstance();
    return {
      queueSize: service.emailQueue.length,
      isProcessing: service.isProcessing,
      queueEnabled: env.EMAIL_QUEUE_ENABLED,
    };
  }

  /**
   * Get email job status
   */
  static getJobStatus(jobId: string): EmailJob | null {
    const service = EmailService.getInstance();
    return service.emailQueue.find((job) => job.id === jobId) || null;
  }

  /**
   * Clear the email queue (use with caution)
   */
  static clearQueue(): number {
    const service = EmailService.getInstance();
    const queueSize = service.emailQueue.length;
    service.emailQueue = [];
    logger.warn('Email queue cleared', { previousQueueSize: queueSize });
    return queueSize;
  }

  /**
   * Shutdown the email service and clean up resources
   */
  static async shutdown(): Promise<void> {
    const service = EmailService.getInstance();

    if (service.processingInterval) {
      clearInterval(service.processingInterval);
      service.processingInterval = null;
    }

    // Wait for queue to finish processing
    while (service.isProcessing && service.emailQueue.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    logger.info('EmailService shutdown complete');
  }
}

// Initialize the service when module is loaded
EmailService.getInstance();

export default EmailService;
