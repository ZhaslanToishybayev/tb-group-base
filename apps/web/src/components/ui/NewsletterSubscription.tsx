'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface NewsletterSubscriptionProps {
  className?: string;
  variant?: 'default' | 'inline';
}

export function NewsletterSubscription({ className, variant = 'default' }: NewsletterSubscriptionProps) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  // Email validation
  const validateEmail = (value: string): string => {
    if (!value.trim()) return 'Email обязателен для заполнения';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Введите корректный email адрес';
    return '';
  };

  // Handle email change
  const handleEmailChange = (value: string) => {
    setEmail(value);
    // Clear error if user is typing
    if (emailError) {
      setEmailError('');
    }
  };

  // Handle email blur validation
  const handleEmailBlur = (value: string) => {
    const error = validateEmail(value);
    setEmailError(error);
  };

  // Get validation status
  const getEmailStatus = () => {
    if (emailError) return 'error';
    if (email && !emailError) return 'success';
    return 'idle';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source: 'newsletter_subscription',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Спасибо за подписку! Мы отправим вам лучшие новости.');
        setEmail('');
        // Auto reset after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        const data = await response.json();
        setStatus('error');
        setError(data.error || 'Не удалось подписаться. Попробуйте еще раз.');
      }
    } catch (error) {
      setStatus('error');
      setError('Ошибка подключения. Попробуйте позже.');
      console.error('Newsletter subscription error:', error);
    }
  };

  if (variant === 'inline') {
    return (
      <div className={className}>
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-success-500"
          >
            <CheckCircle className="h-5 w-5" />
            <span>{message}</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={(e) => handleEmailBlur(e.target.value)}
                className={`
                  flex-1
                  ${
                    getEmailStatus() === 'error'
                      ? 'border-red-500 focus:border-red-500'
                      : getEmailStatus() === 'success'
                      ? 'border-green-500 focus:border-green-500'
                      : ''
                  }
                `}
                required
              />
              {getEmailStatus() === 'error' && (
                <X className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
              )}
              {getEmailStatus() === 'success' && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
              )}
            </div>
            <Button type="submit" loading={status === 'loading'} disabled={!!emailError}>
              Подписаться
            </Button>
          </form>
        )}
        {emailError && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-400 mt-1"
          >
            {emailError}
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-white/10 p-8 ${className}`}>
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary-500/20">
            <Mail className="h-6 w-6 text-primary-400" />
          </div>
          <h3 className="text-2xl font-bold">Подпишитесь на новости</h3>
        </div>

        <p className="text-slate-300 mb-6">
          Получайте последние новости о технологиях, кейсы и эксклюзивные предложения
        </p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-success-500/10 border border-success-500/20"
          >
            <CheckCircle className="h-6 w-6 text-success-500 flex-shrink-0" />
            <p className="text-success-400">{message}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'error' && error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Введите ваш email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={(e) => handleEmailBlur(e.target.value)}
                  className={`
                    flex-1
                    pr-10
                    ${
                      getEmailStatus() === 'error'
                        ? 'border-red-500 focus:border-red-500'
                        : getEmailStatus() === 'success'
                        ? 'border-green-500 focus:border-green-500'
                        : ''
                    }
                  `}
                  required
                />
                {getEmailStatus() === 'error' && (
                  <X className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                )}
                {getEmailStatus() === 'success' && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                )}
              </div>
              <Button
                type="submit"
                loading={status === 'loading'}
                disabled={!!emailError}
                className="sm:w-auto w-full"
                rightIcon={ArrowRight}
              >
                Подписаться
              </Button>
            </div>
            {emailError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400"
              >
                {emailError}
              </motion.p>
            )}
            <p className="text-xs text-slate-400">
              Мы ценим вашу конфиденциальность. Вы можете отписаться в любое время.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
