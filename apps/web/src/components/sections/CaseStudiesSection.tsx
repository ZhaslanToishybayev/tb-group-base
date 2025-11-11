'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { CaseStudyCard } from './CaseStudyCard';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  summary: string;
  image: string;
  beforeMetrics: {
    efficiency: string;
    time: string;
    cost: string;
  };
  afterMetrics: {
    efficiency: string;
    time: string;
    cost: string;
  };
  tags: string[];
  slug: string;
  gallery?: string[];
}

interface CaseStudiesSectionProps {
  caseStudies?: CaseStudy[];
}

// Sample data - replace with real API data
const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Внедрение Мой Склад в ритейле',
    company: 'Торговая сеть "Пятёрочка+"',
    summary: 'Оптимизация складских процессов и автоматизация учёта',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    beforeMetrics: {
      efficiency: '45%',
      time: '6 часов/день',
      cost: '250,000 ₽/мес',
    },
    afterMetrics: {
      efficiency: '92%',
      time: '2 часа/день',
      cost: '180,000 ₽/мес',
    },
    tags: ['Мой Склад', 'ERP', 'Автоматизация'],
    slug: 'moy-sklad-retail-case',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    ],
  },
  {
    id: '2',
    title: 'Настройка Битрикс24 для B2B',
    company: 'ТехноСфера ООО',
    summary: 'Цифровизация продаж и автоматизация CRM-процессов',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    beforeMetrics: {
      efficiency: '38%',
      time: '8 часов/день',
      cost: '320,000 ₽/мес',
    },
    afterMetrics: {
      efficiency: '89%',
      time: '3 часа/день',
      cost: '220,000 ₽/мес',
    },
    tags: ['Битрикс24', 'CRM', 'B2B'],
    slug: 'bitrix24-b2b-case',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop',
    ],
  },
  {
    id: '3',
    title: 'Корпоративная телефония',
    company: 'СтройМастер',
    summary: 'Внедрение IP-телефонии и интеграция с CRM',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
    beforeMetrics: {
      efficiency: '42%',
      time: '7 часов/день',
      cost: '280,000 ₽/мес',
    },
    afterMetrics: {
      efficiency: '85%',
      time: '3 часа/день',
      cost: '190,000 ₽/мес',
    },
    tags: ['Телефония', 'IP', 'Интеграция'],
    slug: 'telephony-integration-case',
    gallery: [
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
    ],
  },
];

export function CaseStudiesSection({ caseStudies = mockCaseStudies }: CaseStudiesSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const allImages = caseStudies.flatMap(cs => cs.gallery || []);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (allImages.length === 0) return;

    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
    } else {
      setCurrentImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
    }
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    const index = allImages.indexOf(image);
    setCurrentImageIndex(index >= 0 ? index : 0);
  };

  // Sync selectedImage with currentImageIndex
  useEffect(() => {
    if (allImages.length > 0 && selectedImage) {
      setSelectedImage(allImages[currentImageIndex]);
    }
  }, [currentImageIndex, allImages, selectedImage]);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950" id="case-studies">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Кейсы
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Результаты наших клиентов
          </motion.h2>
          <motion.p
            className="text-lg text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Реальные истории успеха и измеримые результаты внедрения наших решений
          </motion.p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard
              key={caseStudy.id}
              caseStudy={caseStudy}
              index={index}
              onImageClick={handleImageSelect}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="/cases"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'cta_click', {
                  button_text: 'Все кейсы',
                  section: 'case_studies',
                });
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Все кейсы
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox Gallery Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-60 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Case study image"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </motion.div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              aria-label="Предыдущее изображение"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              aria-label="Следующее изображение"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CaseStudiesSection;
