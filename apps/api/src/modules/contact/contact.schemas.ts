import { ServiceCategory } from '@prisma/client';
import { z } from 'zod';

// Phone number validation helper
const phoneRegex = /^\+?[0-9\s\-\(\)]{10,20}$/;

export const contactCreateSchema = z.object({
  fullName: z.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(100, 'Имя не должно превышать 100 символов')
    .trim()
    .refine((val) => /^[a-zA-Zа-яА-Я\s\-]+$/.test(val), {
      message: 'Имя может содержать только буквы, пробелы и дефисы'
    }),
  email: z.string()
    .email('Некорректный email адрес')
    .toLowerCase()
    .trim(),
  phone: z.string()
    .optional()
    .refine((val) => !val || phoneRegex.test(val), {
      message: 'Некорректный формат телефона'
    }),
  company: z.string()
    .max(100, 'Название компании не должно превышать 100 символов')
    .trim()
    .optional(),
  message: z.string()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(1000, 'Сообщение не должно превышать 1000 символов')
    .trim(),
  serviceInterest: z.nativeEnum(ServiceCategory).optional(),
  recaptchaToken: z.string()
    .min(1, 'Требуется подтверждение CAPTCHA'),
});

export const contactResponseSchema = z.object({
  status: z.enum(['queued', 'completed', 'error']),
  contactRequestId: z.string(),
  leadId: z.string().nullable(),
});

export type ContactCreateInput = z.infer<typeof contactCreateSchema>;
