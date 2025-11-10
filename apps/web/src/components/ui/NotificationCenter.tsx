'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationCenterProps {
  notification?: Notification;
  onClose?: () => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: 'bg-green-500/90 border-green-400',
  error: 'bg-red-500/90 border-red-400',
  info: 'bg-blue-500/90 border-blue-400',
};

export function NotificationCenter({ notification, onClose }: NotificationCenterProps) {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notification) {
      setCurrentNotification(notification);
      
      const duration = notification.duration ?? 5000;
      if (duration > 0) {
        const timer = setTimeout(() => {
          setCurrentNotification(null);
          onClose?.();
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [notification, onClose]);

  if (!currentNotification) return null;

  const Icon = icons[currentNotification.type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-4 right-4 z-50 max-w-md"
      >
        <div className={`${styles[currentNotification.type]} backdrop-blur-sm border rounded-lg shadow-lg p-4`}>
          <div className="flex items-start gap-3">
            <Icon className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-sm">
                {currentNotification.title}
              </h4>
              {currentNotification.message && (
                <p className="text-white/90 text-sm mt-1">
                  {currentNotification.message}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setCurrentNotification(null);
                onClose?.();
              }}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook for using notifications
export function useNotifications() {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setNotification({ ...notification, id });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    showNotification,
    hideNotification,
  };
}
