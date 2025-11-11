import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z
    .string()
    .transform((value) => Number(value))
    .or(z.number())
    .optional()
    .pipe(z.number().int().positive().max(65535).default(4000)),
  ALLOWED_ORIGINS: z
    .string()
    .transform((value) => value.split(',').map((origin) => origin.trim()))
    .or(z.array(z.string()))
    .default(['http://localhost:3000', 'http://localhost:5173']),
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_REFRESH_EXP_DAYS: z
    .string()
    .transform((value) => Number.parseInt(value, 10))
    .or(z.number())
    .pipe(z.number().int().positive().default(30)),
  ADMIN_BOOTSTRAP_EMAIL: z.string().email(),
  ADMIN_BOOTSTRAP_PASSWORD: z.string().min(8),
  BITRIX24_WEBHOOK_URL: z.string()
    .url()
    .default('https://tbgroup.bitrix24.kz/rest/18/kjdwaeorinhxto5q/'),
  BITRIX24_USE_STUB: z
    .string()
    .transform((value) => value === 'true')
    .or(z.boolean())
    .default(false),
  BITRIX24_DOMAIN: z.string().optional(),
  BITRIX24_ASSIGNED_ID: z.string().optional(),
  BITRIX24_CATEGORY_ID: z.string().optional(),
  BITRIX24_STATUS_ID: z.string().default('NEW'),
  BITRIX24_SOURCE_ID: z.string().default('WEB'),
  BITRIX24_CURRENCY_ID: z.string().default('KZT'),
  BITRIX24_CUSTOM_FIELDS: z.string().optional(),
  BITRIX24_ENABLE_LOGGING: z
    .string()
    .transform((value) => value === 'true')
    .or(z.boolean())
    .default(true),
  BITRIX24_RETRY_ATTEMPTS: z
    .string()
    .transform((value) => Number.parseInt(value, 10))
    .or(z.number())
    .default(3),
  BITRIX24_RETRY_DELAY: z
    .string()
    .transform((value) => Number.parseInt(value, 10))
    .or(z.number())
    .default(1000),
  RECAPTCHA_SECRET: z.string().optional(),
  UPLOADS_DIR: z.string().optional(),
  ASSET_BASE_URL: z.string().url().optional(),
  // SMTP Configuration
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z
    .string()
    .transform((value) => Number(value))
    .or(z.number())
    .pipe(z.number().int().positive().max(65535).default(587)),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().default('TB Group <noreply@tbgroup.kz>'),
  SMTP_SECURE: z
    .string()
    .transform((value) => value === 'true')
    .or(z.boolean())
    .default(false),
  // Fallback SMTP Configuration
  SMTP_FALLBACK_HOST: z.string().optional(),
  SMTP_FALLBACK_PORT: z
    .string()
    .transform((value) => Number(value))
    .or(z.number())
    .optional()
    .pipe(z.number().int().positive().max(65535).default(587)),
  SMTP_FALLBACK_USER: z.string().email().optional(),
  SMTP_FALLBACK_PASS: z.string().optional(),
  SMTP_FALLBACK_SECURE: z
    .string()
    .transform((value) => value === 'true')
    .or(z.boolean())
    .default(false),
  // Email Service Configuration
  EMAIL_QUEUE_ENABLED: z
    .string()
    .transform((value) => value === 'true')
    .or(z.boolean())
    .default(true),
  EMAIL_RETRY_ATTEMPTS: z
    .string()
    .transform((value) => Number.parseInt(value, 10))
    .or(z.number())
    .pipe(z.number().int().positive().default(3)),
  EMAIL_RETRY_DELAY: z
    .string()
    .transform((value) => Number.parseInt(value, 10))
    .or(z.number())
    .default(1000),
  // Redis Configuration
  REDIS_URL: z.string().url().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  PORT: parsed.data.PORT ?? 4000,
  ALLOWED_ORIGINS: Array.isArray(parsed.data.ALLOWED_ORIGINS)
    ? parsed.data.ALLOWED_ORIGINS
    : [parsed.data.ALLOWED_ORIGINS],
  JWT_REFRESH_EXP_DAYS: parsed.data.JWT_REFRESH_EXP_DAYS,
};

export default env;
