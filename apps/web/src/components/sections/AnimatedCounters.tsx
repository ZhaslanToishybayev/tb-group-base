'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { useRef } from 'react';

/**
 * Data structure for a single counter item
 */
interface CounterData {
  /**
   * The final value to count up to
   * @example 100
   */
  value: number;

  /**
   * Text label displayed below the number
   * @example "Projects"
   */
  label: string;

  /**
   * Text to append after the number
   * @example "+" (for "100+")
   */
  suffix?: string;

  /**
   * Text to prepend before the number
   * @example "$" (for "$100")
   */
  prefix?: string;

  /**
   * Number of decimal places to show
   * @default 0
   * @example 1 (for "99.9%")
   */
  decimals?: number;

  /**
   * Animation duration in seconds
   * @default 2.5
   * @example 3
   */
  duration?: number;

  /**
   * Icon to display above the number
   * Must be a valid React node
   * @example <StarIcon />
   */
  icon?: React.ReactNode;

  /**
   * Additional description text
   * Displayed below the label
   * @example "Completed projects this year"
   */
  description?: string;
}

/**
 * Props for the AnimatedCounters component
 */
interface AnimatedCountersProps {
  /**
   * Array of counter data items
   * Each item defines a single animated counter
   * @example [{ value: 100, label: "Projects" }]
   */
  data: CounterData[];

  /**
   * Additional CSS classes to apply
   * @default ""
   */
  className?: string;
}

export function AnimatedCounters({ data, className = '' }: AnimatedCountersProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${className}`}>
      {data.map((item, index) => (
        <CounterItem key={item.label} item={item} index={index} totalItems={data.length} />
      ))}
    </div>
  );
}

function CounterItem({ item, index, totalItems }: { item: CounterData; index: number; totalItems: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);

  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const controls = animate(motionValue, item.value, {
        duration: item.duration || 2.5,
        ease: [0.16, 1, 0.3, 1], // Custom easing - smooth deceleration
      });

      const unsubscribe = motionValue.on('change', (latest) => {
        const decimals = item.decimals ?? 0;
        const factor = Math.pow(10, decimals);
        setDisplayValue(Math.round(latest * factor) / factor);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, motionValue, item.value, item.decimals, item.duration, hasAnimated]);

  // Format number with commas and optional decimals
  const formatNumber = (num: number) => {
    const decimals = item.decimals ?? 0;
    return num.toLocaleString('ru-RU', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Add subtle separator line for grid items (desktop only)
  const showSeparator = index < totalItems - 1;

  return (
    <motion.div
      ref={ref}
      className="relative text-center group"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {/* Icon (if provided) */}
      {item.icon && (
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/20 to-neon-cyan/20 flex items-center justify-center text-primary-400">
            {item.icon}
          </div>
        </motion.div>
      )}

      {/* Main counter value */}
      <motion.div
        className="relative inline-block"
        initial={{ filter: 'blur(10px)', opacity: 0 }}
        animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.2 }}
      >
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-500 via-secondary-500 to-neon-cyan bg-clip-text text-transparent mb-2 relative">
          {item.prefix}
          <motion.span
            key={displayValue} // Re-animate when value changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {formatNumber(displayValue)}
          </motion.span>
          {item.suffix}

          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-neon-cyan/20 blur-xl -z-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: index * 0.15 + 0.5 }}
          />
        </div>
      </motion.div>

      {/* Label */}
      <motion.p
        className="text-slate-400 text-lg font-medium mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
      >
        {item.label}
      </motion.p>

      {/* Description (optional) */}
      {item.description && (
        <motion.p
          className="text-slate-500 text-sm max-w-xs mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
        >
          {item.description}
        </motion.p>
      )}

      {/* Vertical separator line (desktop only) */}
      {showSeparator && (
        <motion.div
          className="hidden md:block absolute top-1/2 right-0 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-y-1/2 translate-x-1/2"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.6 }}
        />
      )}

      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/5 to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        animate={{
          opacity: isInView ? 0 : 0,
          scale: 1
        }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
}
