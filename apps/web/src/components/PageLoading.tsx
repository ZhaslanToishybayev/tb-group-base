'use client';

import { motion } from 'framer-motion';

interface PageLoadingProps {
  className?: string;
}

export function PageLoading({ className = '' }: PageLoadingProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Spinning loader */}
        <motion.div
          className="w-12 h-12 border-4 border-slate-700 border-t-primary-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Loading text */}
        <motion.p
          className="text-slate-400 text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Загрузка...
        </motion.p>
      </motion.div>
    </div>
  );
}
