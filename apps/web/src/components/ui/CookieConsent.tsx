'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { trackEvent, YANDEX_EVENTS, GA_EVENTS } from '../analytics/GoogleAnalytics';

const COOKIE_CONSENT_KEY = 'tb-group-cookie-consent';
const COOKIE_EXPIRY_DAYS = 365;

type CookieConsentStatus = 'pending' | 'accepted' | 'rejected';

interface CookieConsentData {
  status: CookieConsentStatus;
  timestamp: number;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [consent, setConsent] = useState<CookieConsentData | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Load consent from localStorage
    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (savedConsent) {
        const parsed = JSON.parse(savedConsent) as CookieConsentData;
        setConsent(parsed);
        setPreferences({
          analytics: parsed.analytics,
          marketing: parsed.marketing,
        });

        // If accepted, initialize analytics
        if (parsed.status === 'accepted') {
          initializeAnalytics(parsed.analytics, parsed.marketing);
        }
      } else {
        // No consent found, show banner
        setShowBanner(true);
      }
    } catch (error) {
      console.error('Error reading cookie consent:', error);
      setShowBanner(true);
    }
  }, []);

  const initializeAnalytics = (analytics: boolean, marketing: boolean) => {
    if (analytics) {
      // Track consent acceptance
      trackEvent(GA_EVENTS.FORM_SUCCESS, {
        event_category: 'Cookie Consent',
        event_label: 'Analytics Enabled',
      });

      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(
          process.env.NEXT_PUBLIC_YANDEX_ID,
          'reachGoal',
          YANDEX_EVENTS.FORM_SUCCESS,
          { category: 'Cookie Consent', label: 'Analytics Enabled' }
        );
      }
    }
  };

  const acceptAll = () => {
    const newConsent: CookieConsentData = {
      status: 'accepted',
      timestamp: Date.now(),
      analytics: true,
      marketing: true,
    };

    setConsent(newConsent);
    setPreferences({ analytics: true, marketing: true });
    saveConsent(newConsent);
    initializeAnalytics(true, true);
    setShowBanner(false);

    // Track in Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
  };

  const acceptSelected = () => {
    const newConsent: CookieConsentData = {
      status: 'accepted',
      timestamp: Date.now(),
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    };

    setConsent(newConsent);
    saveConsent(newConsent);
    initializeAnalytics(preferences.analytics, preferences.marketing);
    setShowBanner(false);
    setShowSettings(false);

    // Track consent choice
    trackEvent('cookie_consent_accepted', {
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    });
  };

  const rejectAll = () => {
    const newConsent: CookieConsentData = {
      status: 'rejected',
      timestamp: Date.now(),
      analytics: false,
      marketing: false,
    };

    setConsent(newConsent);
    setPreferences({ analytics: false, marketing: false });
    saveConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);

    // Track consent rejection
    trackEvent('cookie_consent_rejected', {});
  };

  const saveConsent = (consentData: CookieConsentData) => {
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);

      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
      localStorage.setItem(
        `${COOKIE_CONSENT_KEY}_expiry`,
        expiryDate.toISOString()
      );
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  const handlePreferenceChange = (key: 'analytics' | 'marketing') => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Don't show if consent already given and not showing settings
  if (consent && !showSettings) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-900/98 backdrop-blur-md shadow-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">
                    Использование файлов cookie
                  </h3>
                  <p className="text-xs text-slate-300 max-w-3xl">
                    Мы используем файлы cookie для улучшения работы сайта, анализа трафика и персонализации контента.
                    Нажимая «Принять», вы соглашаетесь с использованием cookie.{' '}
                    <button
                      onClick={() => setShowSettings(true)}
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Настроить
                    </button>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={rejectAll}
                    className="text-slate-300 hover:text-white"
                  >
                    Отклонить
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                  >
                    Настроить
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={acceptAll}
                  >
                    Принять всё
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 p-6 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Настройки cookie
              </h3>

              <p className="text-sm text-slate-300 mb-6">
                Выберите, какие типы cookie вы хотите разрешить. Вы можете изменить эти настройки в любое время.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-white/10">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Необходимые cookie
                    </h4>
                    <p className="text-xs text-slate-400">
                      Обеспечивают базовую функциональность сайта и не могут быть отключены.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">
                      Всегда включены
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-white/10">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Аналитические cookie
                    </h4>
                    <p className="text-xs text-slate-400">
                      Помогают нам понять, как посетители взаимодействуют с сайтом, собирая анонимную информацию.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handlePreferenceChange('analytics')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-white/10">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Маркетинговые cookie
                    </h4>
                    <p className="text-xs text-slate-400">
                      Используются для показа релевантной рекламы и отслеживания эффективности кампаний.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => handlePreferenceChange('marketing')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={rejectAll}
                  className="text-slate-300 hover:text-white"
                >
                  Отклонить всё
                </Button>
                <div className="flex-1" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                >
                  Отмена
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={acceptSelected}
                >
                  Сохранить
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CookieConsent;
