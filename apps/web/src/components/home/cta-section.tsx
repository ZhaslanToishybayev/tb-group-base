import Link from 'next/link';
import React from 'react';
import { SimpleContactForm } from '../SimpleContactForm';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-950" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-500/20 bg-slate-900/60 p-10 shadow-xl">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-300">Свяжитесь с нами</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Готовы запустить новый проект?
            </h2>
            <p className="mt-4 text-sm text-slate-200 sm:text-base max-w-2xl mx-auto">
              Оставьте заявку — подготовим план внедрения, покажем быстрые результаты и поможем команде перейти на облачные инструменты.
            </p>
          </div>

          <SimpleContactForm variant="compact" />

          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-slate-400 text-sm">
              Или звоните напрямую:
            </p>
            <Link
              href="tel:+77271234567"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-400/60 hover:text-white"
            >
              +7 (727) 123-45-67
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
