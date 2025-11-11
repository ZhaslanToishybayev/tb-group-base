/**
 * Bitrix24Service Unit Tests
 *
 * Tests for the Bitrix24Service class which handles lead creation
 * from contact form submissions with error handling and email notifications.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Bitrix24Service, ContactFormData } from '../../../src/services/bitrix24Service';

// Mock the integrations/bitrix24 module
vi.mock('../../../src/integrations/bitrix24', () => {
  return {
    sendLeadToBitrix: vi.fn(),
    testBitrix24Connection: vi.fn(),
  };
});

// Mock the EmailService
vi.mock('../../../src/modules/email/email.service', () => {
  return {
    EmailService: {
      sendEmail: vi.fn(),
    },
  };
});

// Mock prisma
vi.mock('../../../src/lib/prisma', () => {
  return {
    default: {
      leadLog: {
        create: vi.fn(),
        update: vi.fn(),
        findFirst: vi.fn(),
      },
    },
  };
});

// Mock the logger
vi.mock('../../../src/middleware/logger', () => {
  return {
    logger: {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
    },
  };
});

// Mock environment variables
vi.mock('../../../src/config/env', () => {
  return {
    env: {
      ADMIN_BOOTSTRAP_EMAIL: 'admin@tbgroup.kz',
      BITRIX24_WEBHOOK_URL: 'https://test.bitrix24.kz/rest/1/test/',
    },
  };
});

describe('Bitrix24Service', () => {
  let mockSendLeadToBitrix: ReturnType<typeof vi.fn>;
  let mockSendEmail: ReturnType<typeof vi.fn>;
  let mockPrisma: ReturnType<typeof vi.mocked>;
  let mockLogger: ReturnType<typeof vi.mocked>;

  const mockContactFormData: ContactFormData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    company: 'Test Company',
    message: 'Test message',
    serviceInterest: 'Web Development',
    lastName: 'Doe',
    source: 'website',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Get mocked functions
    const bitrix24Module = require('../../../src/integrations/bitrix24');
    mockSendLeadToBitrix = bitrix24Module.sendLeadToBitrix;

    const emailModule = require('../../../src/modules/email/email.service');
    mockSendEmail = emailModule.EmailService.sendEmail;

    mockPrisma = require('../../../src/lib/prisma').default;
    mockLogger = require('../../../src/middleware/logger').logger;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('createLead', () => {
    it('should successfully create a lead in Bitrix24', async () => {
      // Arrange
      const mockLeadId = '12345';
      mockSendLeadToBitrix.mockResolvedValue({
        success: true,
        leadId: mockLeadId,
      });

      // Act
      const result = await Bitrix24Service.createLead(mockContactFormData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.leadId).toBe(mockLeadId);
      expect(result.error).toBeUndefined();
      expect(result.contactRequestId).toBeDefined();

      // Verify Bitrix24 was called with correct data
      expect(mockSendLeadToBitrix).toHaveBeenCalledTimes(1);
      expect(mockSendLeadToBitrix).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          title: 'New Lead from Website - John Doe',
          name: 'John Doe',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          company: 'Test Company',
          message: 'Test message',
          serviceInterest: 'Web Development',
          source: 'website',
        }),
      );

      // Verify logging
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.objectContaining({
          contactRequestId: expect.any(String),
          email: 'john.doe@example.com',
          name: 'John Doe',
        }),
        'Starting Bitrix24 lead creation',
      );

      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.objectContaining({
          leadId: mockLeadId,
          success: true,
        }),
        'Bitrix24 lead creation completed',
      );

      // Email should NOT be sent on success
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it('should handle Bitrix24 API failure and send admin notification', async () => {
      // Arrange
      const mockError = 'Invalid webhook URL';
      mockSendLeadToBitrix.mockRejectedValue(new Error(mockError));
      mockSendEmail.mockResolvedValue({ success: true, jobId: 'email_123' });

      // Act
      const result = await Bitrix24Service.createLead(mockContactFormData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Bitrix24 lead creation failed');
      expect(result.error).toContain(mockError);
      expect(result.contactRequestId).toBeDefined();

      // Verify error logging
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining(mockError),
          contactRequestId: expect.any(String),
        }),
        'Failed to create Bitrix24 lead',
      );

      // Verify admin notification email was sent
      expect(mockSendEmail).toHaveBeenCalledTimes(1);
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'admin@tbgroup.kz',
          subject: expect.stringContaining('Bitrix24 Lead Creation Failed'),
          html: expect.stringContaining('John Doe'),
          text: expect.stringContaining('john.doe@example.com'),
        }),
      );
    });

    it('should handle email notification failure gracefully', async () => {
      // Arrange
      const mockError = 'API Error';
      mockSendLeadToBitrix.mockRejectedValue(new Error(mockError));
      mockSendEmail.mockRejectedValue(new Error('Email service unavailable'));

      // Act
      const result = await Bitrix24Service.createLead(mockContactFormData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Bitrix24 lead creation failed');

      // Verify that the original error is returned
      expect(result.error).toContain(mockError);

      // Email sending should fail silently (no re-throw)
      // The service should handle email failures gracefully
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining('Email service unavailable'),
        }),
        'Failed to send admin notification email',
      );
    });

    it('should throw error when required fields are missing', async () => {
      // Arrange
      const incompleteData = {
        name: 'John Doe',
        // email is missing
      } as ContactFormData;

      // Act & Assert
      await expect(Bitrix24Service.createLead(incompleteData)).rejects.toThrow(
        'Name and email are required fields',
      );

      // sendLeadToBitrix should not be called
      expect(mockSendLeadToBitrix).not.toHaveBeenCalled();
    });

    it('should handle all contact form fields correctly', async () => {
      // Arrange
      const completeData: ContactFormData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+9876543210',
        company: 'Acme Corp',
        message: 'Looking for a quote',
        serviceInterest: 'Mobile App',
        lastName: 'Smith',
        source: 'google_ads',
        customFields: { utm_source: 'google', utm_campaign: 'spring2024' },
      };

      mockSendLeadToBitrix.mockResolvedValue({
        success: true,
        leadId: '67890',
      });

      // Act
      await Bitrix24Service.createLead(completeData);

      // Assert
      expect(mockSendLeadToBitrix).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          title: 'New Lead from Website - Jane Smith',
          name: 'Jane Smith',
          lastName: 'Smith',
          email: 'jane@example.com',
          phone: '+9876543210',
          company: 'Acme Corp',
          message: 'Looking for a quote',
          serviceInterest: 'Mobile App',
          source: 'google_ads',
          customFields: { utm_source: 'google', utm_campaign: 'spring2024' },
        }),
      );
    });

    it('should handle minimal contact form data', async () => {
      // Arrange
      const minimalData: ContactFormData = {
        name: 'Bob',
        email: 'bob@example.com',
      };

      mockSendLeadToBitrix.mockResolvedValue({
        success: true,
        leadId: '11111',
      });

      // Act
      const result = await Bitrix24Service.createLead(minimalData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.leadId).toBe('11111');

      expect(mockSendLeadToBitrix).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          title: 'New Lead from Website - Bob',
          name: 'Bob',
          email: 'bob@example.com',
          source: 'WEB',
        }),
      );
    });
  });

  describe('getLeadStatus', () => {
    it('should return lead log entry by contact request ID', async () => {
      // Arrange
      const mockLeadLog = {
        id: '1',
        contactRequestId: 'contact_123',
        status: 'SENT',
        leadId: '12345',
      };
      mockPrisma.leadLog.findFirst.mockResolvedValue(mockLeadLog);

      // Act
      const result = await Bitrix24Service.getLeadStatus('contact_123');

      // Assert
      expect(result).toEqual(mockLeadLog);
      expect(mockPrisma.leadLog.findFirst).toHaveBeenCalledWith({
        where: { contactRequestId: 'contact_123' },
      });
    });

    it('should handle database errors', async () => {
      // Arrange
      const mockError = new Error('Database connection failed');
      mockPrisma.leadLog.findFirst.mockRejectedValue(mockError);

      // Act & Assert
      await expect(Bitrix24Service.getLeadStatus('contact_123')).rejects.toThrow(
        'Database connection failed',
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.objectContaining({
          contactRequestId: 'contact_123',
          error: 'Database connection failed',
        }),
        'Failed to get lead status',
      );
    });
  });

  describe('testConnection', () => {
    it('should return success when connection test passes', async () => {
      // Arrange
      const bitrix24Module = require('../../../src/integrations/bitrix24');
      bitrix24Module.testBitrix24Connection.mockResolvedValue({
        success: true,
        domain: 'test.bitrix24.kz',
      });

      // Act
      const result = await Bitrix24Service.testConnection();

      // Assert
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return error when connection test fails', async () => {
      // Arrange
      const mockError = 'Invalid credentials';
      const bitrix24Module = require('../../../src/integrations/bitrix24');
      bitrix24Module.testBitrix24Connection.mockResolvedValue({
        success: false,
        error: mockError,
      });

      // Act
      const result = await Bitrix24Service.testConnection();

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe(mockError);
    });

    it('should handle connection test exceptions', async () => {
      // Arrange
      const mockError = new Error('Network timeout');
      const bitrix24Module = require('../../../src/integrations/bitrix24');
      bitrix24Module.testBitrix24Connection.mockRejectedValue(mockError);

      // Act
      const result = await Bitrix24Service.testConnection();

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Network timeout');
    });
  });
});
