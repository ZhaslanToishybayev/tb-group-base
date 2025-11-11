'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom hook for auto-saving form data to localStorage
 * Prevents data loss from accidental page refreshes or navigation
 */
export function useAutoSave<T extends Record<string, any>>(
  formData: T,
  formName: string,
  delay: number = 1000
) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousDataRef = useRef<string>();

  useEffect(() => {
    // Skip auto-save if data hasn't changed
    const currentDataString = JSON.stringify(formData);
    if (currentDataString === previousDataRef.current) {
      return;
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      try {
        // Store in localStorage with timestamp
        const savedData = {
          data: formData,
          timestamp: Date.now(),
          formName,
        };

        localStorage.setItem(`autosave_${formName}`, JSON.stringify(savedData));
        previousDataRef.current = currentDataString;

        // Dispatch custom event for analytics/debugging
        window.dispatchEvent(
          new CustomEvent('autosave', {
            detail: { formName, timestamp: Date.now() },
          })
        );
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, delay);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [formData, formName, delay]);

  // Function to load saved data
  const loadSavedData = (): T | null => {
    try {
      const saved = localStorage.getItem(`autosave_${formName}`);
      if (!saved) return null;

      const { data } = JSON.parse(saved);
      return data;
    } catch (error) {
      console.error('Failed to load saved data:', error);
      return null;
    }
  };

  // Function to clear saved data
  const clearSavedData = (): void => {
    try {
      localStorage.removeItem(`autosave_${formName}`);
      previousDataRef.current = undefined;

      // Dispatch custom event
      window.dispatchEvent(
        new CustomEvent('autosave_clear', {
          detail: { formName, timestamp: Date.now() },
        })
      );
    } catch (error) {
      console.error('Failed to clear saved data:', error);
    }
  };

  // Function to check if saved data exists and is not too old
  const hasSavedData = (maxAge: number = 7 * 24 * 60 * 60 * 1000): boolean => {
    try {
      const saved = localStorage.getItem(`autosave_${formName}`);
      if (!saved) return false;

      const { timestamp } = JSON.parse(saved);
      const age = Date.now() - timestamp;

      return age < maxAge;
    } catch (error) {
      console.error('Failed to check saved data:', error);
      return false;
    }
  };

  return {
    loadSavedData,
    clearSavedData,
    hasSavedData,
  };
}
