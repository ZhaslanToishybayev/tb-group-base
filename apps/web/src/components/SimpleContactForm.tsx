'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send, Loader2 } from 'lucide-react';

import { submitContact, type ContactRequestPayload } from '../lib/api';
import { CaptchaGate } from './CaptchaGate';

type SimpleFormData = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  website?: string; // honeypot
};

type SimpleContactFormProps = {
  defaultServiceInterest?: string;
  variant?: 'default' | 'compact' | 'inline';
  onSuccess?: () => void;
};

export function SimpleContactForm({
  defaultServiceInterest,
  variant = 'default',
  onSuccess,
}: SimpleContactFormProps) {
  const [formData, setFormData] = useState<SimpleFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    // Honeypot field validation
    if (formData.website && formData.website.trim() !== '') {
      setStatus('error');
      setError('Обнаружена подозрительная активность');
      return;
    }

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      setStatus('error');
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setError('Пожалуйста, введите корректный email');
      return;
    }

    // Phone validation
    const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus('error');
      setError('Пожалуйста, введите корректный номер телефона');
      return;
    }

    const payload: ContactRequestPayload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company?.trim() || undefined,
      serviceInterest: defaultServiceInterest,
    };

    try {
      await submitContact(payload);
      setStatus('success');
      if (onSuccess) onSuccess();

      // Auto reset after 3 seconds
      setTimeout(() => {
        setFormData({ fullName: '', email: '', phone: '', company: '' });
        setStatus('idle');
        setError(null);
        setRecaptchaToken(null);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить заявку. Попробуйте еще раз.');
      setStatus('error');
    }
  };

  const isCompact = variant === 'compact';
  const isInline = variant === 'inline';

  return (
    <CaptchaGate onToken={setRecaptchaToken}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          ${isInline ? 'w-full' : 'w-full max-w-2xl mx-auto'}
          ${isCompact ? 'p-4' : 'p-6'}
          rounded-xl
          ${isCompact ? 'bg-slate-900/40' : 'bg-slate-900/60'}
          border border-white/10
          backdrop-blur-sm
        `}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Title */}
          {!isCompact && !isInline && (
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Быстрая заявка
              </h3>
              <p className="text-slate-300 text-sm">
                Оставьте контакты, и мы свяжемся с вами в течение 15 минут
              </p>
            </div>
          )}

          {/* Success Message */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-green-500/30 bg-green-500/10 p-4"
            >
              <div className="flex items-start gap-3">
                <Check size={24} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-400 font-medium mb-1">
                    Заявка отправлена!
                  </p>
                  <p className="text-sm text-green-300/80">
                    Спасибо за обращение. Наш менеджер свяжется с вами в ближайшее время.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-4"
            >
              <p className="text-sm text-red-400">
                ❌ {error}
              </p>
            </motion.div>
          )}

          {/* Form Fields */}
          <div className={isInline ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {/* Name */}
            <div className={isInline ? '' : 'space-y-2'}>
              <label className="text-sm font-medium text-slate-200">
                Имя и фамилия <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className={`
                  w-full
                  ${isCompact ? 'px-3 py-2' : 'px-4 py-3'}
                  rounded-lg
                  bg-slate-800/60
                  border border-white/10
                  text-white
                  placeholder-slate-400
                  focus:border-blue-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  transition-all
                `}
                placeholder="Иван Иванов"
                disabled={status === 'loading'}
              />
            </div>

            {/* Phone */}
            <div className={isInline ? '' : 'space-y-2'}>
              <label className="text-sm font-medium text-slate-200">
                Телефон <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className={`
                  w-full
                  ${isCompact ? 'px-3 py-2' : 'px-4 py-3'}
                  rounded-lg
                  bg-slate-800/60
                  border border-white/10
                  text-white
                  placeholder-slate-400
                  focus:border-blue-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  transition-all
                `}
                placeholder="+7 (700) 123-45-67"
                disabled={status === 'loading'}
              />
            </div>

            {/* Email */}
            <div className={isInline ? '' : 'space-y-2'}>
              <label className="text-sm font-medium text-slate-200">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className={`
                  w-full
                  ${isCompact ? 'px-3 py-2' : 'px-4 py-3'}
                  rounded-lg
                  bg-slate-800/60
                  border border-white/10
                  text-white
                  placeholder-slate-400
                  focus:border-blue-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  transition-all
                `}
                placeholder="ivan@example.com"
                disabled={status === 'loading'}
              />
            </div>

            {/* Company (optional) */}
            <div className={isInline ? '' : 'space-y-2'}>
              <label className="text-sm font-medium text-slate-200">
                Компания <span className="text-slate-400">(необязательно)</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`
                  w-full
                  ${isCompact ? 'px-3 py-2' : 'px-4 py-3'}
                  rounded-lg
                  bg-slate-800/60
                  border border-white/10
                  text-white
                  placeholder-slate-400
                  focus:border-blue-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  transition-all
                `}
                placeholder="ТОО «Ваша компания»"
                disabled={status === 'loading'}
              />
            </div>
          </div>

          {/* Honeypot */}
          <div className="hidden">
            <input
              type="text"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`
              w-full
              ${isCompact ? 'px-4 py-2' : 'px-6 py-3'}
              rounded-lg
              bg-gradient-to-r from-blue-500 to-blue-400
              hover:from-blue-400 hover:to-blue-300
              disabled:from-slate-600 disabled:to-slate-700
              text-white
              font-semibold
              ${isCompact ? 'text-sm' : 'text-base'}
              shadow-lg
              shadow-blue-500/30
              hover:shadow-blue-500/40
              disabled:cursor-not-allowed
              transition-all
              flex
              items-center
              justify-center
              gap-2
            `}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Отправка...</span>
              </>
            ) : status === 'success' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Отправлено!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Получить консультацию</span>
              </>
            )}
          </button>

          {/* Privacy Note */}
          {!isCompact && (
            <p className="text-xs text-slate-400 text-center">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <a href="#" className="text-blue-400 hover:underline">
                политикой конфиденциальности
              </a>
            </p>
          )}
        </form>
      </motion.div>
    </CaptchaGate>
  );
}
