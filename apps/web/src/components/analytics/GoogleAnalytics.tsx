'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const YANDEX_ID = process.env.NEXT_PUBLIC_YANDEX_ID;

export function GoogleAnalytics() {
  const hasGA = Boolean(GA_MEASUREMENT_ID);
  const hasYandex = Boolean(YANDEX_ID);

  if (!hasGA && !hasYandex) {
    return null;
  }

  return (
    <>
      {/* Yandex.Metrica */}
      {hasYandex && (
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],
              k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YANDEX_ID}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              ecommerce:"dataLayer"
            });
          `}
        </Script>
      )}

      {/* Google Analytics 4 */}
      {hasGA && (
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
      )}

      {/* Noscript fallback for Yandex.Metrica */}
      {hasYandex && (
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/${YANDEX_ID}"
              style={{ position: 'absolute', left: -9999 }}
              alt=""
            />
          </div>
        </noscript>
      )}
    </>
  );
}

// Функция для отслеживания событий в GA4 и Yandex.Metrica
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }

  // Yandex.Metrica
  if (typeof window !== 'undefined' && (window as any).ym) {
    (window as any).ym(YANDEX_ID, 'reachGoal', eventName, parameters);
  }
};

// Функция для отслеживания просмотра страниц
export const trackPageView = (page: string, title?: string) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: page,
      page_title: title || document.title,
    });
  }

  // Yandex.Metrica
  if (typeof window !== 'undefined' && (window as any).ym) {
    (window as any).ym(YANDEX_ID, 'hit', page, {
      title: title || document.title,
    });
  }
};

// Предопределенные события для GA4
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

// Предопределенные события для Yandex.Metrica
export const YANDEX_EVENTS = {
  // События формы
  FORM_SUBMIT: 'FORM_SUBMIT',
  FORM_START: 'FORM_START',
  FORM_SUCCESS: 'FORM_SUCCESS',
  FORM_ERROR: 'FORM_ERROR',

  // События кликов
  CTA_CLICK: 'CTA_CLICK',
  NAV_CLICK: 'NAV_CLICK',
  EXTERNAL_LINK: 'EXTERNAL_LINK',

  // События просмотра страниц
  PAGE_VIEW: 'PAGE_VIEW',
  SECTION_VIEW: 'SECTION_VIEW',
} as const;
