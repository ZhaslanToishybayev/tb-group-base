import type { Meta, StoryObj } from '@storybook/nextjs'
import { Input, GlassInput, GradientInput, NeonInput } from './Input'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'gradient', 'neon'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'your@email.com',
    type: 'email',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password is required',
    placeholder: 'Enter password',
  },
}

export const SuccessState: Story = {
  args: {
    label: 'Username',
    success: 'Username is available',
    placeholder: 'john_doe',
  },
}

export const WarningState: Story = {
  args: {
    label: 'Email',
    warning: 'Email format looks unusual',
    placeholder: 'your@email.com',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Full Name',
    helperText: 'Please enter your first and last name',
    placeholder: 'John Doe',
  },
}

export const Required: Story = {
  args: {
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'your@email.com',
  },
}

export const GlassVariant: Story = {
  render: () => (
    <div className="w-[400px] p-8 bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl">
      <GlassInput
        label="Glass Input"
        placeholder="Glass effect input"
        leftIcon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
      />
    </div>
  ),
}

export const GradientVariant: Story = {
  render: () => (
    <div className="w-[400px] p-8 bg-slate-900 rounded-xl">
      <GradientInput
        label="Gradient Input"
        placeholder="Gradient effect input"
        leftIcon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
      />
    </div>
  ),
}

export const NeonVariant: Story = {
  render: () => (
    <div className="w-[400px] p-8 bg-slate-900 rounded-xl">
      <NeonInput
        label="Neon Input"
        placeholder="Neon effect input"
        leftIcon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
      />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-[500px]">
      <Input label="Default" placeholder="Default input" />
      <Input label="Error" placeholder="Error state" error="Invalid input" />
      <Input label="Success" placeholder="Success state" success="Valid input" />
      <Input label="Warning" placeholder="Warning state" warning="Check input" />
    </div>
  ),
}
