import type { Meta, StoryObj } from '@storybook/nextjs'
import { HoverLift, HoverGlow, HoverTilt, HoverRipple, HoverUnderline, HoverShine, HoverBorderGlow, HoverEffect } from '../HoverEffects'

const meta = {
  title: 'Animation/Hover Effects',
  component: HoverEffect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverEffect>

export default meta
type Story = StoryObj<typeof meta>

export const LiftExample: Story = {
  render: () => (
    <div className="p-20 bg-slate-800">
      <HoverLift>
        <div className="w-64 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
          Hover to Lift
        </div>
      </HoverLift>
    </div>
  ),
}

export const GlowExample: Story = {
  render: () => (
    <div className="p-20 bg-slate-800">
      <HoverGlow>
        <div className="w-64 h-32 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-semibold">
          Hover to Glow
        </div>
      </HoverGlow>
    </div>
  ),
}

export const TiltExample: Story = {
  render: () => (
    <div className="p-20 bg-slate-800">
      <HoverTilt>
        <div className="w-64 h-32 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold">
          Hover to Tilt
        </div>
      </HoverTilt>
    </div>
  ),
}

export const RippleExample: Story = {
  render: () => (
    <div className="p-20 bg-slate-800">
      <HoverRipple>
        <div className="w-64 h-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-semibold">
          Click for Ripple
        </div>
      </HoverRipple>
    </div>
  ),
}

export const UnderlineExample: Story = {
  render: () => (
    <div className="p-20 bg-slate-800">
      <HoverUnderline>
        <div className="w-64 h-32 bg-slate-700 rounded-xl flex items-center justify-center text-white font-semibold">
          <a className="text-blue-400 text-xl">Hover Underline Link</a>
        </div>
      </HoverUnderline>
    </div>
  ),
}

export const ShineExample: Story = {
  render: () => (
    <div className="p-20 bg-slate-800">
      <HoverShine>
        <div className="w-64 h-32 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold">
          Hover to Shine
        </div>
      </HoverShine>
    </div>
  ),
}

export const BorderGlowExample: Story = {
  render: () => (
    <div className="p-20 bg-slate-800">
      <HoverBorderGlow>
        <div className="w-64 h-32 bg-slate-700 rounded-xl flex items-center justify-center text-white font-semibold">
          Border Glow
        </div>
      </HoverBorderGlow>
    </div>
  ),
}

export const AllEffects: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-20 bg-slate-800">
      <HoverLift>
        <div className="w-64 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
          Lift
        </div>
      </HoverLift>

      <HoverGlow>
        <div className="w-64 h-32 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-semibold">
          Glow
        </div>
      </HoverGlow>

      <HoverTilt>
        <div className="w-64 h-32 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold">
          Tilt
        </div>
      </HoverTilt>

      <HoverShine>
        <div className="w-64 h-32 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold">
          Shine
        </div>
      </HoverShine>

      <HoverRipple>
        <div className="w-64 h-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-semibold">
          Ripple
        </div>
      </HoverRipple>

      <HoverBorderGlow>
        <div className="w-64 h-32 bg-slate-700 rounded-xl flex items-center justify-center text-white font-semibold">
          Border
        </div>
      </HoverBorderGlow>
    </div>
  ),
}
