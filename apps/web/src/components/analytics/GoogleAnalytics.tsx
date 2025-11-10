'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Функция для отслеживания событий
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
};

// Предопределенные события
export const GA_EVENTS = {
  // События формы
  FORM_SUBMIT: 'form_submit',
  FORM_START: 'form_start',
  FORM_SUCCESS: 'form_success',
  FORM_ERROR: 'form_error',

  // События кликов
  CTA_CLICK: 'cta_click',
  NAV_CLICK: 'nav_click',
  EXTERNAL_LINK: 'external_link',

  // События просмотра страниц
  PAGE_VIEW: 'page_view',
  SECTION_VIEW: 'section_view',
} as const;
