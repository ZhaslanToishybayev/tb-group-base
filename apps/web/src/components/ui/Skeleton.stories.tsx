import type { Meta, StoryObj } from '@storybook/nextjs'
import { Skeleton, TextSkeleton, AvatarSkeleton, CardSkeleton, ListSkeleton, TableSkeleton, FormSkeleton, StatsSkeleton } from './Skeleton'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rounded: {
      control: 'boolean',
    },
    shimmer: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 300,
    height: 200,
  },
}

export const Rounded: Story = {
  args: {
    width: 300,
    height: 200,
    rounded: true,
  },
}

export const Circle: Story = {
  args: {
    width: 100,
    height: 100,
    circle: true,
  },
}

export const Shimmer: Story = {
  args: {
    width: 400,
    height: 200,
    shimmer: true,
  },
}

export const ShimmerNoRounded: Story = {
  args: {
    width: 400,
    height: 200,
    shimmer: true,
    rounded: false,
  },
}

export const TextDefault: Story = {
  args: {
    lines: 3,
  },
}

export const TextShimmer: Story = {
  args: {
    lines: 4,
    shimmer: true,
  },
}

export const TextNoShimmer: Story = {
  args: {
    lines: 3,
    shimmer: false,
  },
}

export const Avatar: Story = {
  args: {
    size: 60,
  },
}

export const Card: Story = {
  render: () => (
    <div className="w-[400px]">
      <CardSkeleton />
    </div>
  ),
}

export const CardWithImage: Story = {
  render: () => (
    <div className="w-[400px]">
      <CardSkeleton showImage={true} showTitle={true} showText={true} showButton={true} />
    </div>
  ),
}

export const List: Story = {
  render: () => (
    <div className="w-[500px]">
      <ListSkeleton items={3} />
    </div>
  ),
}

export const Table: Story = {
  render: () => (
    <div className="w-[600px]">
      <TableSkeleton rows={5} columns={4} />
    </div>
  ),
}

export const Form: Story = {
  render: () => (
    <div className="w-[500px]">
      <FormSkeleton fields={4} showButton={true} />
    </div>
  ),
}

export const Stats: Story = {
  render: () => (
    <div className="w-[800px]">
      <StatsSkeleton items={4} />
    </div>
  ),
}

export const AllSkeletonTypes: Story = {
  render: () => (
    <div className="space-y-8 w-[600px]">
      <div>
        <h3 className="text-white mb-4">Basic Skeletons</h3>
        <div className="flex gap-4">
          <Skeleton width={100} height={100} circle />
          <Skeleton width={100} height={100} rounded />
          <Skeleton width={100} height={100} shimmer rounded />
        </div>
      </div>

      <div>
        <h3 className="text-white mb-4">Text Skeletons</h3>
        <TextSkeleton lines={3} shimmer={true} />
      </div>

      <div>
        <h3 className="text-white mb-4">Avatar</h3>
        <AvatarSkeleton size={80} />
      </div>

      <div>
        <h3 className="text-white mb-4">Card</h3>
        <CardSkeleton />
      </div>
    </div>
  ),
}
