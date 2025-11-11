'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLenis } from '../../contexts/LenisContext';

export function ScrollProgress() {
  const { lenis } = useLenis();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!lenis) return;

    const updateProgress = () => {
      const progress = lenis.progress;
      setScrollProgress(progress);
    };

    lenis.on('scroll', updateProgress);

    return () => {
      lenis.off('scroll', updateProgress);
    };
  }, [lenis]);

  if (!lenis) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-gradient-to-r from-primary-500 via-secondary-500 to-neon-cyan"
      style={{ scaleX: scrollProgress }}
      initial={{ scaleX: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
    />
  );
}
