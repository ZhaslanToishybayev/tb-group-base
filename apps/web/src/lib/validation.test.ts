import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateCompany,
  validateContactForm,
  sanitizeInput,
  formatPhone,
} from './validation';

describe('validation utilities', () => {
  describe('validateEmail', () => {
    it('should accept valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBeNull();
      expect(validateEmail('user.name@example.com')).toBeNull();
      expect(validateEmail('user+tag@example.com')).toBeNull();
      expect(validateEmail('user@subdomain.example.com')).toBeNull();
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('')).toBe('Пожалуйста, введите email');
      expect(validateEmail('   ')).toBe('Пожалуйста, введите email');
      expect(validateEmail('invalid')).toBe('Пожалуйста, введите корректный email адрес');
      expect(validateEmail('@example.com')).toBe('Пожалуйста, введите корректный email адрес');
      expect(validateEmail('user@')).toBe('Пожалуйста, введите корректный email адрес');
      expect(validateEmail('user @example.com')).toBe('Пожалуйста, введите корректный email адрес');
    });
  });

  describe('validatePhone', () => {
    it('should accept valid Kazakhstan phone numbers', () => {
      expect(validatePhone('+77001234567')).toBeNull();
      expect(validatePhone('87001234567')).toBeNull();
      expect(validatePhone('77001234567')).toBeNull();
      expect(validatePhone('+7 700 123 45 67')).toBeNull();
      expect(validatePhone('8 (700) 123-45-67')).toBeNull();
    });

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('')).toBe('Пожалуйста, введите номер телефона');
      expect(validatePhone('   ')).toBe('Пожалуйста, введите номер телефона');
      expect(validatePhone('123')).toBe('Пожалуйста, введите корректный номер телефона (например: +7 XXX XXX XX XX)');
      expect(validatePhone('1234567890')).toBe('Номер телефона должен начинаться с +7, 7 или 8');
      expect(validatePhone('+1234567890')).toBe('Пожалуйста, введите корректный номер телефона (например: +7 XXX XXX XX XX)');
    });
  });

  describe('validateName', () => {
    it('should accept valid names', () => {
      expect(validateName('Иван Иванов')).toBeNull();
      expect(validateName('John Doe')).toBeNull();
      expect(validateName('Мария Петрова-Сидорова')).toBeNull();
      expect(validateName("O'Brien Smith")).toBeNull();
    });

    it('should reject invalid names', () => {
      expect(validateName('')).toBe('Пожалуйста, введите ваше имя и фамилию');
      expect(validateName('A')).toBe('Имя должно содержать минимум 2 символа');
      expect(validateName('Иван')).toBe('Пожалуйста, введите имя и фамилию');
      expect(validateName('123 456')).toBe('Имя может содержать только буквы, пробелы и дефисы');
      expect(validateName('A'.repeat(101))).toBe('Имя не может быть длиннее 100 символов');
    });
  });

  describe('validateMessage', () => {
    it('should accept valid messages', () => {
      expect(validateMessage('This is a valid message')).toBeNull();
      expect(validateMessage('Short', 5)).toBeNull();
      expect(validateMessage('')).toBeNull(); // Optional field
    });

    it('should reject too short messages', () => {
      expect(validateMessage('Short')).toBe('Сообщение должно содержать минимум 10 символов');
      expect(validateMessage('Hi', 5)).toBe('Сообщение должно содержать минимум 5 символов');
    });

    it('should reject too long messages', () => {
      const longMessage = 'A'.repeat(5001);
      expect(validateMessage(longMessage)).toBe('Сообщение не может быть длиннее 5000 символов');
    });
  });

  describe('validateCompany', () => {
    it('should accept valid company names', () => {
      expect(validateCompany('ТОО "Компания"')).toBeNull();
      expect(validateCompany('Example Corp')).toBeNull();
      expect(validateCompany('')).toBeNull(); // Optional field
    });

    it('should reject invalid company names', () => {
      expect(validateCompany('A')).toBe('Название компании должно содержать минимум 2 символа');
      expect(validateCompany('A'.repeat(201))).toBe('Название компании не может быть длиннее 200 символов');
    });
  });

  describe('validateContactForm', () => {
    it('should validate complete form data', () => {
      const validData = {
        fullName: 'Иван Иванов',
        email: 'ivan@example.com',
        phone: '+77001234567',
        company: 'Example Corp',
        message: 'This is a test message',
      };

      const result = validateContactForm(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should return errors for invalid form data', () => {
      const invalidData = {
        fullName: 'A',
        email: 'invalid',
        phone: '123',
        company: '',
        message: '',
      };

      const result = validateContactForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.fullName).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.phone).toBeDefined();
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize HTML special characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>'))
        .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
      
      expect(sanitizeInput('Test "quotes" and \'apostrophes\''))
        .toBe('Test &quot;quotes&quot; and &#x27;apostrophes&#x27;');
      
      expect(sanitizeInput('Normal text')).toBe('Normal text');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  test  ')).toBe('test');
    });

    it('should handle empty input', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput('   ')).toBe('');
    });
  });

  describe('formatPhone', () => {
    it('should format valid Kazakhstan phone numbers', () => {
      expect(formatPhone('+77001234567')).toBe('+7 700 123 45 67');
      expect(formatPhone('87001234567')).toBe('+7 700 123 45 67');
      expect(formatPhone('77001234567')).toBe('+7 700 123 45 67');
    });

    it('should return original input for invalid numbers', () => {
      expect(formatPhone('123')).toBe('123');
      expect(formatPhone('invalid')).toBe('invalid');
      expect(formatPhone('+1234567890')).toBe('+1234567890');
    });

    it('should handle already formatted numbers', () => {
      expect(formatPhone('+7 700 123 45 67')).toBe('+7 700 123 45 67');
    });
  });
});
