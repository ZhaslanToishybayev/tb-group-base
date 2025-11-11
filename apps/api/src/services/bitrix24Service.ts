/**
 * Bitrix24 Integration Service
 *
 * This service handles the creation of leads in Bitrix24 CRM from contact form submissions.
 * It integrates with the contact form to automatically create leads when users submit inquiries.
 *
 * Features:
 * - Automatic lead creation from contact form data
 * - Data mapping and transformation
 * - Error handling with admin email notifications
 * - Integration with existing Bitrix24 API client
 * - Logging and monitoring
 */

import { sendLeadToBitrix, Bitrix24FieldMapping } from '../integrations/bitrix24';
import { EmailService } from '../modules/email/email.service';
import { env } from '../config/env';
import { logger } from '../middleware/logger';
import prisma from '../lib/prisma';

/**
 * Contact form data structure
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  serviceInterest?: string;
  lastName?: string;
  source?: string;
  customFields?: Record<string, any>;
}

/**
 * Bitrix24 service result
 */
export interface Bitrix24ServiceResult {
  success: boolean;
  leadId?: string | number;
  error?: string;
  contactRequestId?: string;
}

/**
 * Bitrix24 Integration Service
 *
 * Provides methods to create leads in Bitrix24 from contact form submissions.
 * Handles data transformation, error handling, and admin notifications.
 */
export class Bitrix24Service {
  /**
   * Create a new lead in Bitrix24 from contact form data
   *
   * @param formData - The contact form submission data
   * @returns Promise<Bitrix24ServiceResult> - Result of the lead creation
   */
  static async createLead(formData: ContactFormData): Promise<Bitrix24ServiceResult> {
    const startTime = Date.now();
    let contactRequestId: string;

    try {
      // Generate a unique contact request ID for tracking
      contactRequestId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      logger.info({
        contactRequestId,
        email: formData.email,
        name: formData.name
      }, 'Starting Bitrix24 lead creation');

      // Validate required fields
      if (!formData.name || !formData.email) {
        throw new Error('Name and email are required fields');
      }

      // Transform contact form data to Bitrix24 format
      const bitrixPayload: Bitrix24FieldMapping = {
        title: `New Lead from Website - ${formData.name}`,
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        serviceInterest: formData.serviceInterest,
        source: formData.source || 'WEB',
        customFields: formData.customFields,
      };

      // Create the lead in Bitrix24 using the existing integration
      const result = await sendLeadToBitrix(contactRequestId, bitrixPayload);

      // Log success
      const duration = Date.now() - startTime;
      logger.info({
        contactRequestId,
        leadId: result.leadId,
        success: result.success,
        duration
      }, 'Bitrix24 lead creation completed');

      // Return success result
      return {
        success: result.success,
        leadId: result.leadId,
        contactRequestId,
      };

    } catch (error) {
      // Calculate duration
      const duration = Date.now() - startTime;

      // Extract error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      // Log the error
      logger.error({
        contactRequestId,
        error: errorMessage,
        formData: {
          name: formData.name,
          email: formData.email,
          // Don't log sensitive data like phone or message
        },
        duration
      }, 'Failed to create Bitrix24 lead');

      // Send admin notification email
      await this.sendAdminNotification(formData, errorMessage, contactRequestId);

      // Return error result
      return {
        success: false,
        error: `Bitrix24 lead creation failed: ${errorMessage}`,
        contactRequestId,
      };
    }
  }

  /**
   * Send admin notification email when Bitrix24 lead creation fails
   *
   * @param formData - The original contact form data
   * @param error - The error message
   * @param contactRequestId - The contact request ID for tracking
   */
  private static async sendAdminNotification(
    formData: ContactFormData,
    error: string,
    contactRequestId: string
  ): Promise<void> {
    try {
      // Create email content
      const emailHtml = `
        <h2>Bitrix24 Lead Creation Failed</h2>
        <p><strong>Request ID:</strong> ${contactRequestId}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>

        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.name} ${formData.lastName || ''}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone || 'N/A'}</li>
          <li><strong>Company:</strong> ${formData.company || 'N/A'}</li>
          <li><strong>Service Interest:</strong> ${formData.serviceInterest || 'N/A'}</li>
        </ul>

        <h3>Message:</h3>
        <p>${formData.message || 'No message provided'}</p>

        <h3>Error Details:</h3>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; color: #d32f2f;">
          ${error}
        </pre>

        <p><em>This is an automated notification from the TB Group website.</em></p>
      `;

      // Send email via EmailService
      await EmailService.sendEmail({
        to: env.ADMIN_BOOTSTRAP_EMAIL,
        subject: `[TB Group] Bitrix24 Lead Creation Failed - ${contactRequestId}`,
        html: emailHtml,
        text: `Bitrix24 lead creation failed. Contact: ${formData.name} (${formData.email}). Error: ${error}`,
      });

      logger.info({
        contactRequestId,
        adminEmail: env.ADMIN_BOOTSTRAP_EMAIL
      }, 'Admin notification email sent successfully');

    } catch (emailError) {
      // Log email sending failure but don't throw
      const emailErrorMessage = emailError instanceof Error ? emailError.message : 'Unknown email error';

      logger.error({
        contactRequestId,
        error: emailErrorMessage
      }, 'Failed to send admin notification email');

      // Note: We don't re-throw here because the original error is more important
      // and the admin notification is a secondary concern
    }
  }

  /**
   * Get the status of a lead creation request from the database
   *
   * @param contactRequestId - The contact request ID
   * @returns Promise<any> - The lead log entry
   */
  static async getLeadStatus(contactRequestId: string): Promise<any> {
    try {
      const leadLog = await prisma.leadLog.findFirst({
        where: { contactRequestId },
      });

      return leadLog;
    } catch (error) {
      logger.error({
        contactRequestId,
        error: error instanceof Error ? error.message : String(error)
      }, 'Failed to get lead status');

      throw error;
    }
  }

  /**
   * Test the Bitrix24 integration
   *
   * @returns Promise<{ success: boolean; error?: string }> - Test result
   */
  static async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      // This will be handled by the integration's test function
      const { testBitrix24Connection } = await import('../integrations/bitrix24');
      const result = await testBitrix24Connection();

      return {
        success: result.success,
        error: result.error,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}

export default Bitrix24Service;
