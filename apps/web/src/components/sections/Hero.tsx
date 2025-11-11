'use client';

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';
import { Button } from '../ui/Button';
import { AnimatedCounters } from './AnimatedCounters';

// Dynamic import for 3D background - loads only when component is visible
const HeroBackground = lazy(() => import('../three/HeroBackground'));

export function Hero() {
  const headline = 'Внедряем Мой Склад, Битрикс24 и телефонию для вашего бизнеса';
  const { displayText, isComplete } = useTypewriter(headline, 80);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Stats data for animated counters
  const stats = [
    { value: 500, label: 'Довольных клиентов', suffix: '+' },
    { value: 1000, label: 'Успешных внедрений', suffix: '+' },
    { value: 99, label: 'Успешность проектов', suffix: '%' },
  ];

  // OPTIMIZED: Disabled heavy useScroll/useTransform that cause lag
  // TODO: Consider implementing with Intersection Observer instead
  // const { scrollY } = useScroll();
  // const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  // const contentY = useTransform(scrollY, [0, 1000], [0, -150]);
  // const titleY = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* OPTIMIZED: Static background without parallax */}
      <div className="absolute inset-0 w-full h-full">
        {/* 3D Background - loaded dynamically */}
        <Suspense fallback={
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 to-slate-950" />
        }>
          <HeroBackground />
        </Suspense>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center space-y-8">
          {/* Main Headline - OPTIMIZED: Simplified animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            <span className="block">
              {displayText}
              {!isComplete && (
                <span className="inline-block w-1 h-[1em] bg-primary-500 ml-2 animate-pulse" />
              )}
            </span>
          </h1>

          {/* Gradient underline - OPTIMIZED: Static instead of animated */}
          <div className="h-1 w-32 bg-gradient-to-r from-primary-500 via-secondary-500 to-neon-cyan mx-auto rounded-full" />

          {/* Subheadline - OPTIMIZED: Static instead of animated */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Официальный партнер Мой Склад и Битрикс24 в Казахстане.
            Автоматизируем складской и торговый учет, внедряем CRM и телефонию под ключ.
          </p>

          {/* CTA Buttons - OPTIMIZED: Static instead of animated */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button
              variant="gradient"
              size="lg"
              glow="large"
              onClick={() => scrollToSection('#contact')}
              className="min-w-[220px]"
            >
              Получить консультацию
            </Button>
            <Button
              variant="neon"
              size="lg"
              onClick={() => scrollToSection('#services')}
              className="min-w-[220px]"
            >
              Наши решения
            </Button>
          </div>

          {/* Animated Stats Counters - OPTIMIZED: Static */}
          <div className="pt-16">
            <AnimatedCounters data={stats} className="" />
          </div>
        </div>
      </div>

      {/* Scroll indicator - OPTIMIZED: Static instead of animated */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-500 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
