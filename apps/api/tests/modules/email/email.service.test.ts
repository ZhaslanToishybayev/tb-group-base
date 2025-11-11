import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import nodemailer from 'nodemailer';
import { EmailService } from '../../../src/modules/email/email.service';

// Mock nodemailer
vi.mock('nodemailer', () => {
  return {
    default: {
      createTransport: vi.fn().mockReturnValue({
        sendMail: vi.fn(),
      }),
    },
  };
});

describe('EmailService', () => {
  let mockSendMail: ReturnType<typeof vi.fn>;
  let mockCreateTransport: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSendMail = vi.fn();
    mockCreateTransport = vi.mocked(nodemailer.createTransport);
    mockCreateTransport.mockReturnValue({
      sendMail: mockSendMail,
    } as any);

    // Reset singleton instance
    (EmailService as any).instance = null;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('sendEmail', () => {
    it('should add email to queue when queue is enabled', async () => {
      const emailData = {
        to: 'test@example.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
      };

      const result = await EmailService.sendEmail(emailData);

      expect(result.success).toBe(true);
      expect(result.jobId).toBeDefined();
      expect(result.jobId).toMatch(/^email_/);
    });

    it('should send email immediately when queue is disabled', async () => {
      // Mock environment to disable queue
      vi.stubGlobal('process', {
        ...process,
        env: {
          ...process.env,
          EMAIL_QUEUE_ENABLED: 'false',
        },
      });

      const emailData = {
        to: 'test@example.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
      };

      mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

      const result = await EmailService.sendEmail(emailData);

      expect(result.success).toBe(true);
      expect(mockSendMail).toHaveBeenCalledTimes(1);
      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
          subject: 'Test Email',
          html: '<p>Test content</p>',
          from: expect.any(String),
        })
      );
    });

    it('should handle email sending failure', async () => {
      mockSendMail.mockRejectedValue(new Error('SMTP error'));

      const emailData = {
        to: 'test@example.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
      };

      const result = await EmailService.sendEmail(emailData);

      // Should still return success because it's queued
      expect(result.success).toBe(true);
      expect(result.jobId).toBeDefined();
    });

    it('should include custom from address if provided', async () => {
      vi.stubGlobal('process', {
        ...process,
        env: {
          ...process.env,
          EMAIL_QUEUE_ENABLED: 'false',
        },
      });

      const emailData = {
        to: 'test@example.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
        from: 'Custom Sender <custom@example.com>',
      };

      mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

      await EmailService.sendEmail(emailData);

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'Custom Sender <custom@example.com>',
        })
      );
    });
  });

  describe('getQueueStatus', () => {
    it('should return current queue status', () => {
      const status = EmailService.getQueueStatus();

      expect(status).toHaveProperty('queueSize');
      expect(status).toHaveProperty('isProcessing');
      expect(status).toHaveProperty('queueEnabled');
      expect(typeof status.queueSize).toBe('number');
      expect(typeof status.isProcessing).toBe('boolean');
      expect(typeof status.queueEnabled).toBe('boolean');
    });
  });

  describe('getJobStatus', () => {
    it('should return null for non-existent job', () => {
      const job = EmailService.getJobStatus('non-existent-id');
      expect(job).toBeNull();
    });
  });

  describe('clearQueue', () => {
    it('should clear the email queue', () => {
      const clearedCount = EmailService.clearQueue();
      expect(typeof clearedCount).toBe('number');
    });
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance on multiple calls', () => {
      const instance1 = EmailService.getInstance();
      const instance2 = EmailService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });
});
