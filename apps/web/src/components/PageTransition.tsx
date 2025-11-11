'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [pathname]);

  // Variants for different transition types
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.3 },
        y: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1],
        opacity: { duration: 0.2 },
        y: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="relative w-full">
      {/* Route change indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-neon-cyan z-50"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        key={pathname}
      />

      {/* Page transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="w-full"
        >
          <motion.div variants={contentVariants}>
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
