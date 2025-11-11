'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { TestimonialCard } from './TestimonialCard';

// Sample testimonials data
const testimonials = [
  {
    id: '1',
    name: 'Александр Петров',
    position: 'Директор',
    company: 'ТоргСервис',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    quote: 'Внедрение Мой Склад полностью трансформировало наши складские процессы. Теперь мы экономим 4 часа в день на рутинных операциях.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Мария Иванова',
    position: 'Руководитель отдела продаж',
    company: 'ТехноТрейд',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    quote: 'Благодаря настройке Битрикс24 наша конверсия выросла на 40%. CRM-процессы стали максимально прозрачными.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Дмитрий Козлов',
    position: 'IT-директор',
    company: 'СтройМастер',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    quote: 'Корпоративная телефония позволила нам сократить расходы на связь на 30% и значительно улучшить качество коммуникации.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Елена Смирнова',
    position: 'Операционный директор',
    company: 'ЛогистПлюс',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    quote: 'Интеграция всех систем через Битрикс24 дала нам полную картину бизнеса. Управление стало намного эффективнее.',
    rating: 5,
  },
];

const clientLogos = [
  { name: 'ТоргСервис', logo: 'https://via.placeholder.com/150x80/3b82f6/ffffff?text=ТоргСервис' },
  { name: 'ТехноТрейд', logo: 'https://via.placeholder.com/150x80/a855f7/ffffff?text=ТехноТрейд' },
  { name: 'СтройМастер', logo: 'https://via.placeholder.com/150x80/06b6d4/ffffff?text=СтройМастер' },
  { name: 'ЛогистПлюс', logo: 'https://via.placeholder.com/150x80/10b981/ffffff?text=ЛогистПлюс' },
  { name: 'РитейлГруп', logo: 'https://via.placeholder.com/150x80/f59e0b/ffffff?text=РитейлГруп' },
  { name: 'ПромСервис', logo: 'https://via.placeholder.com/150x80/ef4444/ffffff?text=ПромСервис' },
  { name: 'ИнноТех', logo: 'https://via.placeholder.com/150x80/8b5cf6/ffffff?text=ИнноТех' },
  { name: 'ДиджиталСолюшн', logo: 'https://via.placeholder.com/150x80/06b6d4/ffffff?text=ДиджиталСолюшн' },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Motion values for carousel
  const rotateY = useMotionValue(0);
  const rotateYTransform = useTransform(rotateY, (value) => `rotateY(${value}deg)`);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Update rotation based on current index
  useEffect(() => {
    const angle = (currentIndex / testimonials.length) * 360;
    rotateY.set(-angle);
  }, [currentIndex, rotateY]);

  const handlePrevious = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleIndicatorClick = (index: number) => {
    setIsAutoRotating(false);
    setCurrentIndex(index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900" id="testimonials">
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
            Отзывы
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Что говорят наши клиенты
          </motion.h2>
          <motion.p
            className="text-lg text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Реальные отзывы от руководителей и специалистов, которые уже внедрили наши решения
          </motion.p>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative mb-16">
          <div className="relative h-[500px] w-full perspective-1000 overflow-hidden">
            <motion.div
              className="relative h-full w-full"
              style={{
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              transition={{
                type: 'spring',
                stiffness: 50,
                damping: 30,
                mass: 1,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                  total={testimonials.length}
                />
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-sm transition hover:bg-white/20 z-10"
            aria-label="Previous testimonial"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-sm transition hover:bg-white/20 z-10"
            aria-label="Next testimonial"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Pause/Resume Button */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="absolute bottom-4 right-4 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20 z-10"
            aria-label={isAutoRotating ? 'Pause rotation' : 'Resume rotation'}
          >
            {isAutoRotating ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mb-20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Client Logos Marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 py-6"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-16 w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
