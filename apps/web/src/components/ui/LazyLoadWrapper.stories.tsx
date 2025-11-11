import type { Meta, StoryObj } from '@storybook/react';
import { LazyLoadWrapper } from './LazyLoadWrapper';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

const meta = {
  title: 'UI/LazyLoadWrapper',
  component: LazyLoadWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Компонент для отложенной загрузки контента с автоматическим показом скелетонов.

## Особенности
- Использует Intersection Observer API
- Автоматический выбор скелетона по типу
- Поддержка кастомных фоллбэков
- Настраиваемые отступы и пороги
- Производительная реализация

## Использование
\`\`\`tsx
<LazyLoadWrapper skeletonType="card">
  <Card>Контент</Card>
</LazyLoadWrapper>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    skeletonType: {
      control: 'select',
      options: ['default', 'card', 'list', 'stats', 'text'],
      description: 'Тип скелетона для отображения',
    },
    rootMargin: {
      control: 'text',
      description: 'Отступ от границ viewport',
    },
    threshold: {
      control: 'number',
      min: 0,
      max: 1,
      step: 0.1,
      description: 'Порог видимости',
    },
  },
} satisfies Meta<typeof LazyLoadWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Примеры контента
const SampleCard = ({ delay = 0 }: { delay?: number }) => (
  <Card className="w-96">
    <CardHeader>
      <CardTitle>Lazy Loaded Card</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-slate-400">
        Этот контент загружается только когда становится видимым в viewport
      </p>
    </CardContent>
  </Card>
);

// Default skeleton
export const Default: Story = {
  args: {
    skeletonType: 'default',
    children: <SampleCard />,
  },
};

// Card skeleton
export const CardSkeleton: Story = {
  args: {
    skeletonType: 'card',
    children: <SampleCard />,
  },
};

// List skeleton
export const ListSkeleton: Story = {
  args: {
    skeletonType: 'list',
    children: (
      <div className="space-y-4 w-96">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-slate-800 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-800 rounded w-32" />
              <div className="h-3 bg-slate-800 rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    ),
  },
};

// Text skeleton
export const TextSkeleton: Story = {
  args: {
    skeletonType: 'text',
    skeletonProps: { lines: 5 },
    children: (
      <div className="space-y-4 w-96 p-6">
        <h2 className="text-2xl font-bold text-white">Статья</h2>
        <p className="text-slate-300">
          Этот контент загружается при прокрутке...
        </p>
      </div>
    ),
  },
};

// Stats skeleton
export const StatsSkeleton: Story = {
  args: {
    skeletonType: 'stats',
    skeletonProps: { items: 4 },
    children: (
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">1000+</div>
          <div className="text-slate-400 text-sm">Клиентов</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white">500+</div>
          <div className="text-slate-400 text-sm">Проектов</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white">50+</div>
          <div className="text-slate-400 text-sm">Лет опыта</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white">24/7</div>
          <div className="text-slate-400 text-sm">Поддержка</div>
        </div>
      </div>
    ),
  },
};

// Custom skeleton
export const CustomSkeleton: Story = {
  args: {
    fallback: (
      <div className="w-96 h-64 bg-slate-900/50 rounded-lg p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-500/20 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-slate-800 rounded w-48 mx-auto mb-2" />
          <div className="h-3 bg-slate-800 rounded w-32 mx-auto" />
        </div>
      </div>
    ),
    children: (
      <div className="w-96 h-64 bg-slate-800/50 rounded-lg p-8 flex items-center justify-center border border-primary-500/50">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Загружено!</h3>
          <p className="text-slate-400">Контент успешно загружен</p>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Кастомный фоллбэк вместо стандартного скелетона',
      },
    },
  },
};

// Анимация загрузки
export const LoadingDemo: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(false);
    
    return (
      <div className="space-y-4 w-96">
        <button
          onClick={() => setVisible(!visible)}
          className="w-full px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition"
        >
          {visible ? 'Скрыть' : 'Показать'} контент
        </button>
        <LazyLoadWrapper
          skeletonType="default"
          fallback={
            <div className="h-64 bg-slate-900/50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="h-6 bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-800 rounded" />
                <div className="h-4 bg-slate-800 rounded w-5/6" />
                <div className="h-4 bg-slate-800 rounded w-4/6" />
                <div className="h-32 bg-slate-800 rounded mt-4" />
              </div>
            </div>
          }
        >
          {visible && (
            <div className="h-64 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-primary-500/50">
              <h3 className="text-2xl font-bold text-white mb-4">
                🎉 Контент загружен!
              </h3>
              <p className="text-slate-300 mb-4">
                Этот контент был загружен только после нажатия кнопки
                благодаря LazyLoadWrapper компоненту.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                  Intersection Observer
                </span>
                <span className="px-3 py-1 bg-secondary-500/20 text-secondary-400 rounded-full text-sm">
                  Performance
                </span>
              </div>
            </div>
          )}
        </LazyLoadWrapper>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивная демонстрация lazy loading',
      },
    },
  },
};
