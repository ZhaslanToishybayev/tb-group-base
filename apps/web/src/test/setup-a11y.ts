import '@testing-library/jest-dom';
import axe from 'axe-core';
import React from 'react';

// Helper function to run accessibility tests
export const runAxeTest = async (container: HTMLElement) => {
  const results = await axe.run(container, {
    rules: {
      // Configure rules as needed
    },
  });

  if (results.violations.length > 0) {
    console.error('Accessibility violations:', results.violations);
  }

  return results;
};
