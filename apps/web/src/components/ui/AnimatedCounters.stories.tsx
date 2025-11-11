import type { Meta, StoryObj } from '@storybook/nextjs'
import { AnimatedCounters } from '../sections/AnimatedCounters'

const meta = {
  title: 'Animation/Animated Counters',
  component: AnimatedCounters,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnimatedCounters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { value: 100, label: 'Projects', suffix: '+' },
      { value: 50, label: 'Clients', suffix: '+' },
      { value: 10, label: 'Years', suffix: '+' },
      { value: 5, label: 'Awards', suffix: '' },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        value: 100,
        label: 'Projects',
        suffix: '+',
        icon: (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        value: 50,
        label: 'Clients',
        suffix: '+',
        icon: (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
      },
      {
        value: 10,
        label: 'Years',
        suffix: '+',
        icon: (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        value: 5,
        label: 'Awards',
        suffix: '',
        icon: (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        ),
      },
    ],
  },
}

export const LargeNumbers: Story = {
  args: {
    items: [
      { value: 10000, label: 'Lines of Code', suffix: '' },
      { value: 500, label: 'Coffee Cups', suffix: '' },
      { value: 100000, label: 'Pixels Perfect', suffix: '' },
      { value: 250, label: 'Bugs Squashed', suffix: '' },
    ],
  },
}

export const DecimalValues: Story = {
  args: {
    items: [
      { value: 99.9, label: 'Uptime', suffix: '%', decimals: 1 },
      { value: 4.8, label: 'Client Rating', suffix: '/5', decimals: 1 },
      { value: 3.14, label: 'PI', suffix: '', decimals: 2 },
      { value: 99.99, label: 'Satisfaction', suffix: '%', decimals: 2 },
    ],
  },
}

export const DifferentDirections: Story = {
  args: {
    items: [
      { value: 100, label: 'Up Animation', suffix: '+', direction: 'up' },
      { value: 100, label: 'Down Animation', suffix: '+', direction: 'down' },
      { value: 100, label: 'Left Animation', suffix: '+', direction: 'left' },
      { value: 100, label: 'Right Animation', suffix: '+', direction: 'right' },
      { value: 100, label: 'Fade Animation', suffix: '+', direction: 'fade' },
      { value: 100, label: 'Zoom Animation', suffix: '+', direction: 'zoom' },
    ],
  },
}

export const CustomStyling: Story = {
  args: {
    items: [
      { value: 100, label: 'Primary', suffix: '+', className: 'text-blue-500' },
      { value: 200, label: 'Secondary', suffix: '+', className: 'text-purple-500' },
      { value: 300, label: 'Accent', suffix: '+', className: 'text-pink-500' },
      { value: 400, label: 'Success', suffix: '+', className: 'text-green-500' },
    ],
  },
}

export const WithGlow: Story = {
  args: {
    items: [
      { value: 100, label: 'With Glow', suffix: '+', glow: true },
      { value: 200, label: 'With Glow', suffix: '+', glow: true },
      { value: 300, label: 'With Glow', suffix: '+', glow: true },
      { value: 400, label: 'With Glow', suffix: '+', glow: true },
    ],
  },
}
