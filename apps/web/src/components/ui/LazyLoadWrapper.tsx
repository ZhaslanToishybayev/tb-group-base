'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { CardSkeleton, ListSkeleton, StatsSkeleton, TextSkeleton } from './Skeleton';

type SkeletonType = 'default' | 'card' | 'list' | 'stats' | 'text' | 'custom';

interface LazyLoadWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  skeletonType?: SkeletonType;
  skeletonProps?: Record<string, any>;
}

/**
 * LazyLoadWrapper - компонент для отложенной загрузки контента
 * Рендерит children только когда элемент входит в viewport
 */
export function LazyLoadWrapper({
  children,
  fallback,
  rootMargin = '50px',
  threshold = 0.1,
  className = '',
  skeletonType = 'default',
  skeletonProps = {},
}: LazyLoadWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Generate skeleton based on type
  const getSkeleton = () => {
    if (fallback) return fallback;

    switch (skeletonType) {
      case 'card':
        return (
          <div className="p-6">
            <CardSkeleton {...skeletonProps} />
          </div>
        );

      case 'list':
        return (
          <div className="p-6">
            <ListSkeleton {...skeletonProps} />
          </div>
        );

      case 'stats':
        return (
          <div className="p-6">
            <StatsSkeleton {...skeletonProps} />
          </div>
        );

      case 'text':
        return (
          <div className="p-6">
            <TextSkeleton {...skeletonProps} />
          </div>
        );

      case 'default':
      default:
        return (
          <div className="min-h-[400px] bg-slate-900/50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="h-8 bg-slate-800/60 rounded-lg animate-pulse" />
              <div className="h-4 bg-slate-800/60 rounded-lg animate-pulse w-3/4" />
              <div className="h-4 bg-slate-800/60 rounded-lg animate-pulse w-1/2" />
              <div className="h-64 bg-slate-800/60 rounded-lg animate-pulse mt-6" />
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Если уже загружен, не нужно наблюдать
    if (hasLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasLoaded, rootMargin, threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : getSkeleton()}
    </div>
  );
}
