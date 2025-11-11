'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Props for the Skeleton component
 */
interface SkeletonProps {
  /**
   * Additional CSS classes to apply
   * @default ""
   */
  className?: string;

  /**
   * Width of the skeleton
   * Accepts string (e.g., "100%", "300px") or number (e.g., 300)
   * @default undefined
   */
  width?: string | number;

  /**
   * Height of the skeleton
   * Accepts string (e.g., "100%", "200px") or number (e.g., 200)
   * @default undefined
   */
  height?: string | number;

  /**
   * Whether to apply rounded corners
   * @default true
   */
  rounded?: boolean;

  /**
   * Whether to create a circular skeleton
   * Sets border-radius to 50%
   * @default false
   */
  circle?: boolean;

  /**
   * Whether to enable shimmer animation
   * Creates a gradient sweep effect
   * @default false
   */
  shimmer?: boolean;

  /**
   * Duration of the shimmer animation in seconds
   * Only applies when shimmer is true
   * @default 2
   */
  duration?: number;
}

/**
 * Base Skeleton component for loading states
 */
export function Skeleton({
  className = '',
  width,
  height,
  rounded = true,
  circle = false,
  shimmer = false,
  duration = 2,
}: SkeletonProps) {
  if (shimmer) {
    return (
      <motion.div
        className={`
          relative overflow-hidden
          ${rounded ? 'rounded-lg' : ''}
          ${circle ? 'rounded-full' : ''}
          ${className}
        `}
        style={{
          width: width || undefined,
          height: height || undefined,
          minHeight: '1rem',
          background: 'linear-gradient(90deg, rgba(30,41,59,0.6) 0%, rgba(255,255,255,0.2) 50%, rgba(30,41,59,0.6) 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['-200% 0', '200% 0'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );
  }

  return (
    <div
      className={`
        bg-slate-800/60
        ${rounded ? 'rounded-lg' : ''}
        ${circle ? 'rounded-full' : ''}
        ${className}
      `}
      style={{
        width: width || undefined,
        height: height || undefined,
        minHeight: '1rem',
      }}
    />
  );
}

/**
 * Text skeleton for paragraphs, labels, etc.
 */
export function TextSkeleton({
  lines = 1,
  className = '',
  shimmer = true,
  duration = 2,
  ...props
}: SkeletonProps & { lines?: number; shimmer?: boolean; duration?: number }) {
  if (shimmer) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg"
            style={{ height: '1rem' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-slate-800/60 via-slate-700/60 to-slate-800/60"
              style={{
                background: 'linear-gradient(90deg, rgba(30,41,59,0.6) 0%, rgba(255,255,255,0.2) 50%, rgba(30,41,59,0.6) 100%)',
                backgroundSize: '200% 100%',
                backgroundPosition: '-200% 0',
              }}
              animate={{
                backgroundPosition: ['-200% 0', '200% 0'],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.1,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
          className="bg-slate-800/60 rounded-lg"
          style={{ height: '1rem' }}
        />
      ))}
    </div>
  );
}

/**
 * Avatar skeleton
 */
export function AvatarSkeleton({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`bg-slate-800/60 rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/**
 * Card skeleton for content cards
 */
export function CardSkeleton({
  className = '',
  showImage = true,
  showTitle = true,
  showText = true,
  showButton = true,
}: {
  className?: string;
  showImage?: boolean;
  showTitle?: boolean;
  showText?: boolean;
  showButton?: boolean;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {showImage && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="bg-slate-800/60 rounded-lg"
          style={{ height: '200px' }}
        />
      )}

      {showTitle && (
        <TextSkeleton lines={2} />
      )}

      {showText && (
        <TextSkeleton lines={3} />
      )}

      {showButton && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
          className="bg-slate-800/60 rounded-lg"
          style={{ height: '2.5rem', width: '40%' }}
        />
      )}
    </div>
  );
}

/**
 * List skeleton for lists of items
 */
export function ListSkeleton({
  items = 3,
  className = '',
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
          className="flex items-center space-x-3"
        >
          <AvatarSkeleton size={40} />
          <div className="flex-1 space-y-2">
            <div className="bg-slate-800/60 rounded-lg" style={{ height: '1rem', width: '60%' }} />
            <div className="bg-slate-800/60 rounded-lg" style={{ height: '0.75rem', width: '40%' }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Table skeleton
 */
export function TableSkeleton({
  rows = 5,
  columns = 4,
  className = '',
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <motion.div
            key={`header-${i}`}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="bg-slate-800/60 rounded-lg"
            style={{ height: '2rem' }}
          />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (rowIndex * columns + colIndex) * 0.05,
              }}
              className="bg-slate-800/60 rounded-lg"
              style={{ height: '1.5rem' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Form skeleton
 */
export function FormSkeleton({
  fields = 3,
  showButton = true,
  className = '',
}: {
  fields?: number;
  showButton?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
            className="bg-slate-800/60 rounded-lg"
            style={{ height: '1rem', width: '30%' }}
          />
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1 + 0.05,
            }}
            className="bg-slate-800/60 rounded-lg"
            style={{ height: '2.5rem', width: '100%' }}
          />
        </div>
      ))}

      {showButton && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4,
          }}
          className="bg-slate-800/60 rounded-lg"
          style={{ height: '2.5rem', width: '40%' }}
        />
      )}
    </div>
  );
}

/**
 * Stats skeleton for metrics/analytics
 */
export function StatsSkeleton({
  items = 4,
  className = '',
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: `repeat(${items}, 1fr)` }}>
      {Array.from({ length: items }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
          className="bg-slate-800/60 rounded-lg p-4 space-y-2"
        >
          <div className="bg-slate-700/60 rounded" style={{ height: '1.5rem', width: '60%' }} />
          <div className="bg-slate-700/60 rounded" style={{ height: '2rem', width: '80%' }} />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Waveform skeleton for data visualization
 */
export function WaveformSkeleton({
  className = '',
  bars = 20,
}: {
  className?: string;
  bars?: number;
}) {
  return (
    <div className={`flex items-end space-x-1 ${className}`} style={{ height: '60px' }}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0.3 }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.05,
          }}
          className="bg-primary-500/40 w-2 rounded-t"
          style={{ height: '100%', transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  );
}
