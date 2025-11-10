import type { Metadata } from 'next';
import Script from 'next/script';
import { AnimatePresence } from 'framer-motion';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { LiveChatWidget } from '../components/LiveChatWidget';
import { LenisProvider } from '../contexts/LenisContext';
import { GoogleAnalytics } from '../components/analytics/GoogleAnalytics';
import { OrganizationSchema, ServicesSchema } from '../components/ui/StructuredData';
import { SkipLink } from '../components/ui/SkipLink';

export const metadata: Metadata = {
  title: 'TB Group — Облачные решения для бизнеса в Казахстане',
  description: 'Официальный партнер Мой Склад и Битрикс24. Внедрение облачных решений для автоматизации бизнеса под ключ в Казахстане.',
  keywords: [
    'Мой Склад',
    'Битрикс24',
    'корпоративная телефония',
    'автоматизация бизнеса',
    'облачные решения',
    'CRM',
    'ERP',
    'Казахстан',
    'Алматы',
    'Нур-Султан',
  ],
  authors: [{ name: 'TB Group' }],
  creator: 'TB Group',
  publisher: 'TB Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tb-group.kz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://tb-group.kz',
    title: 'TB Group — Облачные решения для бизнеса в Казахстане',
    description: 'Официальный партнер Мой Склад и Битрикс24. Внедрение облачных решений для автоматизации бизнеса под ключ.',
    siteName: 'TB Group',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TB Group — Облачные решения для бизнеса',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TB Group — Облачные решения для бизнеса в Казахстане',
    description: 'Официальный партнер Мой Склад и Битрикс24. Внедрение облачных решений для автоматизации бизнеса под ключ.',
    images: ['/og-image.jpg'],
    creator: '@tbgroup_kz',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="bg-slate-950 text-slate-100">
        {/* Skip Link for Accessibility */}
        <SkipLink />

        {/* Structured Data */}
        <OrganizationSchema />
        <ServicesSchema />

        <GoogleAnalytics />
        <LenisProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1" role="main">
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </main>
            <Footer />
            <LiveChatWidget />
          </div>
        </LenisProvider>
        {RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
