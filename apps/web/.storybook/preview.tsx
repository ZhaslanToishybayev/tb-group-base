import type { Preview } from '@storybook/nextjs'
import '../src/app/globals.css'
import React from 'react'

// Decorator to provide Framer Motion support
const withMotion = (Story: React.ComponentType) => (
  <div className="min-h-screen bg-slate-900 p-8">
    <Story />
  </div>
)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0f172a',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'slate',
          value: '#1e293b',
        },
      ],
    },
  },
  decorators: [withMotion],
};

export default preview;