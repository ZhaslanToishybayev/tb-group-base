# UI Components Library

Компоненты пользовательского интерфейса для TB Group Website

---

## 📚 Содержание

- [Getting Started](#-getting-started)
- [Компоненты](#-компоненты)
- [Дизайн-токены](#-дизайн-токены)
- [Гайдлайны](#-гайдлайны)

---

## 🚀 Getting Started

### Установка

Все компоненты находятся в `src/components/ui/` и готовы к использованию.

```tsx
import { Button } from '@/components/ui/Button';
```

### Импорт

```tsx
// Индивидуальный импорт
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

// Импорт всех компонентов
import * as UI from '@/components/ui';
```

### Storybook

Запустите Storybook для интерактивной документации:

```bash
npm run storybook
```

Откроется в `http://localhost:6006`

---

## 🎨 Компоненты

### Button

Универсальная кнопка с множественными вариантами.

```tsx
import { Button } from '@/components/ui/Button';
```

**Варианты:**
- `primary` - Основная кнопка (по умолчанию)
- `secondary` - Вторичная
- `outline` - Контурная
- `ghost` - Прозрачная
- `gradient` - Градиентная
- `neon` - Неоновая (с эффектом свечения)
- `glass` - Стеклянный эффект
- `success` - Успех
- `warning` - Предупреждение
- `error` - Ошибка

**Размеры:**
- `sm` - Маленький (36px)
- `md` - Средний (44px)
- `lg` - Большой (52px)
- `xl` - Очень большой (60px)
- `icon` - Квадратная иконка (40px)

**Примеры:**

```tsx
// Основная кнопка
<Button>Отправить</Button>

// С вариантом
<Button variant="outline">Отмена</Button>

// С размером
<Button size="lg">Большая кнопка</Button>

// С иконками
<Button leftIcon={ArrowLeft}>Назад</Button>
<Button rightIcon={ArrowRight}>Далее</Button>

// Состояние загрузки
<Button loading>Загрузка...</Button>

// С эффектом свечения
<Button variant="neon" glow="large">Яркая кнопка</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `primary` | Стиль кнопки |
| `size` | `string` | `md` | Размер кнопки |
| `glow` | `string` | `none` | Эффект свечения |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `disabled` | `boolean` | `false` | Неактивное состояние |
| `leftIcon` | `LucideIcon` | - | Левая иконка |
| `rightIcon` | `LucideIcon` | - | Правая иконка |

---

### Input

Поле ввода с валидацией и анимациями.

```tsx
import { Input } from '@/components/ui/Input';
```

**Примеры:**

```tsx
// Базовое поле
<Input placeholder="Введите текст" />

// С лейблом
<Input label="Имя" placeholder="Ваше имя" />

// С ошибкой
<Input label="Email" error="Некорректный email" />

// Обязательное поле
<Input label="Телефон" required />

// Загрузка файлов
<Input type="file" />

// С иконкой
<div className="relative">
  <Input placeholder="Поиск..." className="pl-10" />
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
</div>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Лейбл поля |
| `error` | `string` | - | Текст ошибки |
| `required` | `boolean` | `false` | Обязательное поле |
| `type` | `string` | `text` | Тип input |

---

### Modal

Модальное окно с управлением фокусом.

```tsx
import { Modal } from '@/components/ui/Modal';
```

**Пример:**

```tsx
import { useState } from 'react';

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Открыть</Button>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>Заголовок</ModalHeader>
        <ModalBody>
          <p>Содержимое модального окна</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Отмена
          </Button>
          <Button onClick={() => setOpen(false)}>
            Сохранить
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Состояние открытия |
| `onClose` | `function` | - | Обработчик закрытия |
| `size` | `string` | `md` | Размер модали |

**Размеры:**
- `sm` - Маленькая (400px)
- `md` - Средняя (600px)
- `lg` - Большая (800px)
- `xl` - Очень большая (1000px)
- `full` - На весь экран

---

### Skeleton

Компоненты для состояния загрузки.

```tsx
import { Skeleton, TextSkeleton, CardSkeleton } from '@/components/ui/Skeleton';
```

**Примеры:**

```tsx
// Базовый skeleton
<Skeleton width={200} height={40} />

// Текстовый skeleton
<TextSkeleton lines={3} />

// Карточка
<CardSkeleton showImage showTitle showText />

// Список
<ListSkeleton items={5} />

// Таблица
<TableSkeleton rows={5} columns={4} />

// Форма
<FormSkeleton fields={4} showButton />
```

**Типы:**
- `Skeleton` - Базовый skeleton
- `TextSkeleton` - Текстовые блоки
- `CardSkeleton` - Карточки
- `AvatarSkeleton` - Аватары
- `ListSkeleton` - Списки
- `TableSkeleton` - Таблицы
- `FormSkeleton` - Формы
- `StatsSkeleton` - Статистика
- `WaveformSkeleton` - Визуализация

---

### LazyLoadWrapper

Отложенная загрузка контента.

```tsx
import { LazyLoadWrapper } from '@/components/ui/LazyLoadWrapper';
```

**Пример:**

```tsx
<LazyLoadWrapper skeletonType="card">
  <Card>Контент</Card>
</LazyLoadWrapper>
```

**Типы skeleton:**
- `default` - Общий skeleton
- `card` - Карточка
- `list` - Список
- `stats` - Статистика
- `text` - Текст

---

### AnimatedCounters

Анимированные счетчики.

```tsx
import { AnimatedCounters } from '@/components/ui/AnimatedCounters';
```

**Пример:**

```tsx
<AnimatedCounters
  items={[
    { value: 1000, label: 'Клиентов', prefix: '', suffix: '+' },
    { value: 500, label: 'Проектов', prefix: '', suffix: '+' },
    { value: 50, label: 'Лет опыта', prefix: '', suffix: '+' },
  ]}
/>
```

---

### ThemeToggle

Переключатель темы (светлая/темная).

```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle';
```

**Пример:**

```tsx
<ThemeToggle />
```

---

### ScrollProgress

Индикатор прокрутки страницы.

```tsx
import { ScrollProgress } from '@/components/ui/ScrollProgress';
```

**Пример:**

```tsx
<ScrollProgress />
```

---

### NewsletterSubscription

Форма подписки на рассылку.

```tsx
import { NewsletterSubscription } from '@/components/ui/NewsletterSubscription';
```

**Пример:**

```tsx
<NewsletterSubscription />
```

---

### ErrorBoundary

Граница ошибок для React компонентов.

```tsx
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
```

**Пример:**

```tsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

---

### Card

Карточка для контента.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
```

**Пример:**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Заголовок</CardTitle>
  </CardHeader>
  <CardContent>
    Содержимое карточки
  </CardContent>
</Card>
```

---

### Toast

Уведомления.

```tsx
import { Toast } from '@/components/ui/Toast';
```

**Пример:**

```tsx
<Toast variant="success" title="Успех" message="Данные сохранены" />
```

**Варианты:**
- `success` - Успех
- `error` - Ошибка
- `warning` - Предупреждение
- `info` - Информация

---

### Tooltip

Подсказки при наведении.

```tsx
import { Tooltip } from '@/components/ui/Tooltip';
```

**Пример:**

```tsx
<Tooltip content="Дополнительная информация">
  <Button>Наведите на меня</Button>
</Tooltip>
```

---

### Progress

Индикатор прогресса.

```tsx
import { Progress } from '@/components/ui/Progress';
```

**Пример:**

```tsx
<Progress value={75} />
```

---

### Search

Компонент поиска.

```tsx
import { Search } from '@/components/ui/Search';
```

**Пример:**

```tsx
<Search placeholder="Поиск..." />
```

---

### LoadingSpinner

Спиннер загрузки.

```tsx
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
```

**Пример:**

```tsx
<LoadingSpinner size="lg" />
```

---

### HoverEffects

Эффекты при наведении.

```tsx
import { hoverLift, hoverGlow, hoverScale } from '@/components/ui/HoverEffects';
```

**Пример:**

```tsx
<div className={hoverLift}>Элемент с эффектом</div>
```

**Эффекты:**
- `hoverLift` - Подъем
- `hoverGlow` - Свечение
- `hoverScale` - Увеличение

---

## 🎨 Дизайн-токены

### Цвета

```css
/* Основные цвета */
--primary-500: #3b82f6;
--secondary-500: #8b5cf6;
--neon-cyan: #00f5ff;

/* Семантические цвета */
--success-500: #10b981;
--warning-500: #f59e0b;
--error-500: #ef4444;

/* Нейтральные цвета */
--white: #ffffff;
--black: #000000;
--slate-900: #0f172a;
--slate-800: #1e293b;
--slate-700: #334155;
```

### Типографика

```css
/* Размеры шрифтов */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Вес шрифтов */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Отступы

```css
/* Система отступов (8px grid) */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
```

### Радиусы

```css
/* Скругления */
--radius-sm: 0.25rem;   /* 4px */
--radius: 0.5rem;       /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;  /* Полное скругление */
```

### Тени

```css
/* Тени */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-glow: 0 0 20px rgb(59 130 246 / 0.5);
```

---

## 📐 Гайдлайны

### Использование компонентов

1. **Выбор правильного варианта**
   - Используйте `primary` для основных действий
   - `outline` для вторичных действий
   - `ghost` для менее важных действий
   - `success`, `warning`, `error` для соответствующих состояний

2. **Размеры кнопок**
   - `sm` - для компактных интерфейсов
   - `md` - стандартный размер (используйте по умолчанию)
   - `lg` - для важных CTA кнопок
   - `xl` - для hero секций

3. **Состояния**
   - Всегда указывайте `loading` для асинхронных операций
   - Используйте `disabled` для недоступных элементов
   - Добавляйте `glow` для привлечения внимания к важным элементам

### Accessibility

1. **Фокус**
   - Все интерактивные элементы должны быть фокусируемы
   - Сохраняйте видимые индикаторы фокуса
   - Логический порядок табуляции

2. **Контрастность**
   - Минимум 4.5:1 для текста
   - Минимум 3:1 для UI элементов

3. **ARIA**
   - Используйте правильные ARIA роли
   - Указывайте состояния (`aria-expanded`, `aria-disabled`)
   - Связывайте метки с полями (`aria-labelledby`)

### Производительность

1. **Lazy Loading**
   - Используйте `LazyLoadWrapper` для тяжелого контента
   - Динамически импортируйте большие компоненты

2. **Skeleton Loading**
   - Показывайте skeleton сразу после загрузки
   - Используйте соответствующий тип skeleton для контента

3. **Анимации**
   - Используйте `transform` и `opacity` для анимаций
   - Избегайте анимаций свойств layout (top, left, width, height)
   - Уважайте `prefers-reduced-motion`

---

## 📝 Линтинг и Форматирование

Проект использует ESLint и Prettier для соблюдения стандартов кода.

```bash
# Проверка линтинга
npm run lint

# Автоматическое исправление
npm run lint:fix

# Форматирование кода
npm run format
```

---

## 🧪 Тестирование

Все компоненты должны иметь тесты и Storybook stories.

```bash
# Запуск тестов
npm test

# Тесты с покрытием
npm run test:coverage

# Запуск Storybook
npm run storybook
```

---

## 📦 Билд и Деплой

Компоненты автоматически билдятся при сборке проекта.

```bash
# Билд проекта
npm run build

# Проверка бандла
npm run build:analyze
```

---

## 🤝 Вклад в разработку

1. Создайте ветку от `main`
2. Добавьте компонент в `src/components/ui/`
3. Создайте Storybook story
4. Напишите тесты
5. Обновите README
6. Создайте Pull Request

### Структура компонента

```
src/components/ui/ComponentName/
├── ComponentName.tsx       # Основной компонент
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx # Тесты
└── README.md              # Документация (если нужно)
```

---

## 📞 Поддержка

По вопросам использования компонентов обращайтесь к команде разработки.

---

**Последнее обновление:** Ноябрь 2025
