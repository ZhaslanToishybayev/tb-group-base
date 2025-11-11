import type { Meta, StoryObj } from '@storybook/nextjs'
import { RevealOnScroll } from '../RevealOnScroll'

const meta = {
  title: 'Animation/Reveal On Scroll',
  component: RevealOnScroll,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right', 'fade', 'zoom'],
    },
  },
} satisfies Meta<typeof RevealOnScroll>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] overflow-y-auto bg-slate-800 p-8">
      <RevealOnScroll>
        <div className="text-white text-4xl font-bold mb-4">Scroll to Reveal</div>
        <p className="text-slate-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </RevealOnScroll>
    </div>
  ),
}

export const DirectionUp: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] overflow-y-auto bg-slate-800 p-8">
      <RevealOnScroll direction="up">
        <div className="text-white text-2xl font-bold mb-4">Reveal from Bottom</div>
        <p className="text-slate-300 mb-4">
          This content will slide up when it comes into view.
        </p>
      </RevealOnScroll>
    </div>
  ),
}

export const DirectionDown: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] overflow-y-auto bg-slate-800 p-8">
      <RevealOnScroll direction="down">
        <div className="text-white text-2xl font-bold mb-4">Reveal from Top</div>
        <p className="text-slate-300 mb-4">
          This content will slide down when it comes into view.
        </p>
      </RevealOnScroll>
    </div>
  ),
}

export const DirectionLeft: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] overflow-y-auto bg-slate-800 p-8">
      <RevealOnScroll direction="left">
        <div className="text-white text-2xl font-bold mb-4">Reveal from Right</div>
        <p className="text-slate-300 mb-4">
          This content will slide in from the right.
        </p>
      </RevealOnScroll>
    </div>
  ),
}

export const DirectionRight: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] overflow-y-auto bg-slate-800 p-8">
      <RevealOnScroll direction="right">
        <div className="text-white text-2xl font-bold mb-4">Reveal from Left</div>
        <p className="text-slate-300 mb-4">
          This content will slide in from the left.
        </p>
      </RevealOnScroll>
    </div>
  ),
}

export const DirectionFade: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] overflow-y-auto bg-slate-800 p-8">
      <RevealOnScroll direction="fade">
        <div className="text-white text-2xl font-bold mb-4">Fade In</div>
        <p className="text-slate-300 mb-4">
          This content will fade in when it comes into view.
        </p>
      </RevealOnScroll>
    </div>
  ),
}

export const DirectionZoom: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] overflow-y-auto bg-slate-800 p-8">
      <RevealOnScroll direction="zoom">
        <div className="text-white text-2xl font-bold mb-4">Zoom In</div>
        <p className="text-slate-300 mb-4">
          This content will zoom in when it comes into view.
        </p>
      </RevealOnScroll>
    </div>
  ),
}

export const CustomDelay: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] overflow-y-auto bg-slate-800 p-8">
      <RevealOnScroll delay={0.5}>
        <div className="text-white text-2xl font-bold mb-4">Custom Delay</div>
        <p className="text-slate-300 mb-4">
          This content has a 0.5 second delay before animating.
        </p>
      </RevealOnScroll>
    </div>
  ),
}

export const CustomDuration: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] overflow-y-auto bg-slate-800 p-8">
      <RevealOnScroll duration={2}>
        <div className="text-white text-2xl font-bold mb-4">Custom Duration</div>
        <p className="text-slate-300 mb-4">
          This content animates over 2 seconds.
        </p>
      </RevealOnScroll>
    </div>
  ),
}

export const MultipleChildren: Story = {
  render: () => (
    <div className="w-[600px] h-[400px] overflow-y-auto bg-slate-800 p-8 space-y-4">
      <RevealOnScroll>
        <div className="text-white text-xl font-bold">First Item</div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="text-white text-xl font-bold">Second Item</div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="text-white text-xl font-bold">Third Item</div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="text-white text-xl font-bold">Fourth Item</div>
      </RevealOnScroll>
    </div>
  ),
}

export const AllDirections: Story = {
  render: () => (
    <div className="w-[800px] h-[600px] overflow-y-auto bg-slate-800 p-8 space-y-8">
      <RevealOnScroll direction="up">
        <div className="text-white text-2xl font-bold">Direction: Up</div>
      </RevealOnScroll>

      <RevealOnScroll direction="down">
        <div className="text-white text-2xl font-bold">Direction: Down</div>
      </RevealOnScroll>

      <RevealOnScroll direction="left">
        <div className="text-white text-2xl font-bold">Direction: Left</div>
      </RevealOnScroll>

      <RevealOnScroll direction="right">
        <div className="text-white text-2xl font-bold">Direction: Right</div>
      </RevealOnScroll>

      <RevealOnScroll direction="fade">
        <div className="text-white text-2xl font-bold">Direction: Fade</div>
      </RevealOnScroll>

      <RevealOnScroll direction="zoom">
        <div className="text-white text-2xl font-bold">Direction: Zoom</div>
      </RevealOnScroll>
    </div>
  ),
}
