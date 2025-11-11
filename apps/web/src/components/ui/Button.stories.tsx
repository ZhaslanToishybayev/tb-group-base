import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Phone, 
  Settings, 
  Zap,
  Loader2,
  Check
} from 'lucide-react';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Универсальный компонент кнопки с множественными вариантами, размерами и состояниями.

## Особенности
- 9 вариантов: default, outline, ghost, gradient, neon, glass, danger, success, warning
- 3 размера: sm, md, lg
- Поддержка иконок (leftIcon, rightIcon)
- Анимации hover и tap
- Состояния loading и disabled
- Поддержка glow эффектов

## Использование
\`\`\`tsx
<Button variant="default" size="md">
  Кнопка
</Button>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'outline', 
        'ghost',
        'gradient',
        'neon',
        'glass',
        'danger',
        'success',
        'warning'
      ],
      description: 'Визуальный стиль кнопки',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер кнопки',
    },
    glow: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Свечение вокруг кнопки',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
    leftIcon: {
      control: 'boolean',
      description: 'Показывать левую иконку',
    },
    rightIcon: {
      control: 'boolean',
      description: 'Показывать правую иконку',
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Основные варианты
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Gradient Button',
  },
};

export const Neon: Story = {
  args: {
    variant: 'neon',
    children: 'Neon Button',
    glow: 'medium',
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: 'Glass Button',
  },
};

// Размеры
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// Состояния
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// С иконками
export const WithLeftIcon: Story = {
  args: {
    leftIcon: true,
    children: 'Download',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: true,
    children: 'Get Started',
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: true,
    rightIcon: true,
    children: 'Contact Us',
  },
};

// Glow эффекты
export const SmallGlow: Story = {
  args: {
    variant: 'gradient',
    glow: 'small',
    children: 'Small Glow',
  },
};

export const MediumGlow: Story = {
  args: {
    variant: 'neon',
    glow: 'medium',
    children: 'Medium Glow',
  },
};

export const LargeGlow: Story = {
  args: {
    variant: 'gradient',
    glow: 'large',
    children: 'Large Glow',
  },
};

// Реальные примеры
export const PrimaryCTA: Story = {
  args: {
    variant: 'gradient',
    size: 'lg',
    rightIcon: true,
    glow: 'large',
    children: 'Получить консультацию',
  },
};

export const SecondaryAction: Story = {
  args: {
    variant: 'outline',
    children: 'Узнать больше',
  },
};

export const DownloadButton: Story = {
  args: {
    variant: 'default',
    leftIcon: true,
    children: 'Скачать презентацию',
  },
};

export const ContactButton: Story = {
  args: {
    variant: 'neon',
    size: 'lg',
    rightIcon: true,
    glow: 'medium',
    children: 'Связаться с нами',
  },
};

// Состояния форм
export const FormSubmit: Story = {
  args: {
    variant: 'gradient',
    size: 'lg',
    children: 'Отправить',
  },
};

export const FormSubmitLoading: Story = {
  args: {
    variant: 'gradient',
    size: 'lg',
    loading: true,
    children: 'Отправка...',
  },
};

export const FormSubmitSuccess: Story = {
  args: {
    variant: 'success',
    size: 'lg',
    children: 'Отправлено ✓',
  },
};

// Все варианты
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="gradient">Gradient</Button>
      <Button variant="neon">Neon</Button>
      <Button variant="glass">Glass</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные варианты кнопок в одном примере',
      },
    },
  },
};

// Все размеры
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-8">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные размеры кнопок',
      },
    },
  },
};
