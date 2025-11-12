/**
 * Form validation utilities
 * Centralized validation logic to avoid duplication
 */

export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string>;
};

/**
 * Email validation with comprehensive regex
 */
export function validateEmail(email: string): string | null {
  if (!email || !email.trim()) {
    return 'Пожалуйста, введите email';
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return 'Пожалуйста, введите корректный email адрес';
  }

  // Check for common typos
  const commonDomains = ['gmail.com', 'mail.ru', 'yandex.ru', 'yandex.kz'];
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && !commonDomains.includes(domain)) {
    // Optional: could add warning for uncommon domains
  }

  return null;
}

/**
 * Phone validation for Kazakhstan numbers
 * Supports formats: +7 XXX XXX XX XX, 8 XXX XXX XX XX, etc.
 */
export function validatePhone(phone: string): string | null {
  if (!phone || !phone.trim()) {
    return 'Пожалуйста, введите номер телефона';
  }

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');

  // Kazakhstan phone numbers: +7 or 8, followed by 10 digits
  const kazPhoneRegex = /^(\+7|8|7)?\d{10}$/;
  
  if (!kazPhoneRegex.test(cleaned)) {
    return 'Пожалуйста, введите корректный номер телефона (например: +7 XXX XXX XX XX)';
  }

  // Check if it starts with valid prefix
  if (cleaned.startsWith('+7') || cleaned.startsWith('7') || cleaned.startsWith('8')) {
    return null;
  }

  return 'Номер телефона должен начинаться с +7, 7 или 8';
}

/**
 * Name validation
 */
export function validateName(name: string): string | null {
  if (!name || !name.trim()) {
    return 'Пожалуйста, введите ваше имя и фамилию';
  }

  if (name.trim().length < 2) {
    return 'Имя должно содержать минимум 2 символа';
  }

  if (name.trim().length > 100) {
    return 'Имя не может быть длиннее 100 символов';
  }

  // Check for at least one space (name and surname)
  if (!name.trim().includes(' ')) {
    return 'Пожалуйста, введите имя и фамилию';
  }

  // Check for valid characters (letters, spaces, hyphens)
  const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s\-']+$/;
  if (!nameRegex.test(name)) {
    return 'Имя может содержать только буквы, пробелы и дефисы';
  }

  return null;
}

/**
 * Message validation
 */
export function validateMessage(message: string, minLength: number = 10): string | null {
  if (!message || !message.trim()) {
    return null; // Message is optional
  }

  if (message.trim().length < minLength) {
    return `Сообщение должно содержать минимум ${minLength} символов`;
  }

  if (message.trim().length > 5000) {
    return 'Сообщение не может быть длиннее 5000 символов';
  }

  return null;
}

/**
 * Company name validation
 */
export function validateCompany(company: string): string | null {
  if (!company || !company.trim()) {
    return null; // Company is optional
  }

  if (company.trim().length < 2) {
    return 'Название компании должно содержать минимум 2 символа';
  }

  if (company.trim().length > 200) {
    return 'Название компании не может быть длиннее 200 символов';
  }

  return null;
}

/**
 * Validate full contact form
 */
export function validateContactForm(data: {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  serviceInterest?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  // Required fields
  const nameError = validateName(data.fullName);
  if (nameError) errors.fullName = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  // Optional fields
  if (data.company) {
    const companyError = validateCompany(data.company);
    if (companyError) errors.company = companyError;
  }

  if (data.message) {
    const messageError = validateMessage(data.message);
    if (messageError) errors.message = messageError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  if (cleaned.startsWith('+7') && cleaned.length === 12) {
    return `+7 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
  }
  
  if ((cleaned.startsWith('8') || cleaned.startsWith('7')) && cleaned.length === 11) {
    const digits = cleaned.slice(1);
    return `+7 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
  }
  
  return phone;
}
