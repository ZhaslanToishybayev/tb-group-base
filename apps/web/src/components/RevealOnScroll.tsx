'use client';

import React, { useRef, ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

/**
 * Props for the RevealOnScroll component
 */
interface RevealOnScrollProps {
  /**
   * The content to reveal
   * Can be any valid React node
   * @example <div>Content</div>
   */
  children: ReactNode;

  /**
   * Additional CSS classes to apply
   * @default ""
   */
  className?: string;

  /**
   * Direction of the reveal animation
   * @default "up"
   * @example "left"
   */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';

  /**
   * Delay before starting the animation in seconds
   * @default 0
   * @example 0.5
   */
  delay?: number;

  /**
   * Duration of the animation in seconds
   * @default 0.6
   * @example 1
   */
  duration?: number;

  /**
   * Distance to travel during animation in pixels
   * @default 50
   * @example 100
   */
  distance?: number;

  /**
   * Intersection observer threshold (0-1)
   * Higher values require more of the element to be visible
   * @default 0.2
   * @example 0.5
   */
  threshold?: number;

  /**
   * Whether to animate only once
   * If false, animates every time element comes into view
   * @default true
   */
  once?: boolean;
}

export function RevealOnScroll({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  threshold = 0.2,
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Define animation variants based on direction
  const getVariants = (): Variants => {
    const base = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };

      case 'down':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };

      case 'left':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };

      case 'right':
        return {
          hidden: { opacity: 0, x: distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };

      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: 'easeOut',
            },
          },
        };

      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };

      default:
        return base;
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

// Wrapper for staggered animations (multiple children)
interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredReveal({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {React.Children.toArray(children).map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
