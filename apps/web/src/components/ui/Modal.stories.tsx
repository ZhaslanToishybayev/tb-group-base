import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useState } from 'react';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Модальное окно с автоматическим управлением фокусом и доступностью.

## Особенности
- Автоматический focus trap
- Закрытие по Escape
- Возврат фокуса на триггер
- Поддержка ARIA атрибутов
- Анимации открытия/закрытия
- Блокировка скролла body

## Использование
\`\`\`tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>Заголовок</ModalHeader>
  <ModalBody>Содержимое модального окна</ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
  </ModalFooter>
</Modal>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Состояние открытия модального окна',
    },
    onClose: {
      action: 'closed',
      description: 'Обработчик закрытия',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Размер модального окна',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Демо-компонент
const ModalDemo = ({ open, onClose, children }: any) => (
  <Modal open={open} onClose={onClose}>
    {children}
  </Modal>
);

// Basic Modal
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Открыть модальное окно</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>Базовая модаль</ModalHeader>
          <ModalBody>
            <p className="text-slate-300">
              Это базовое модальное окно с заголовком и содержимым.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => setOpen(false)}>
              Понятно
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Размеры
export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Маленькая модаль</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="sm">
          <ModalHeader>Маленькое модальное окно</ModalHeader>
          <ModalBody>
            <p className="text-slate-300">Это маленькое модальное окно.</p>
          </ModalBody>
        </Modal>
      </div>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Большая модаль</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="lg">
          <ModalHeader>Большое модальное окно</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p className="text-slate-300">
                Это большое модальное окно для отображения дополнительного контента.
              </p>
              <p className="text-slate-300">
                Здесь можно разместить сложные формы, таблицы или другой объемный контент.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Закрыть
            </Button>
            <Button onClick={() => setOpen(false)}>
              Сохранить
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Fullscreen
export const Fullscreen: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Полноэкранная модаль</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="full">
          <ModalHeader>Полноэкранное модальное окно</ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Полноэкранная модаль</h3>
              <p className="text-slate-300">
                Это полноэкранное модальное окно занимает весь viewport.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Секция 1</h4>
                  <p className="text-slate-400">Какой-то контент</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Секция 2</h4>
                  <p className="text-slate-400">Еще контент</p>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Закрыть
            </Button>
            <Button onClick={() => setOpen(false)}>
              Применить
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Без футера
export const WithoutFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Модаль без футера</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>Информация</ModalHeader>
          <ModalBody>
            <p className="text-slate-300">
              Это модальное окно без футера. Закрыть можно по кнопке X или Escape.
            </p>
          </ModalBody>
        </Modal>
      </div>
    );
  },
};

// Только с кнопкой закрытия
export const WithCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Модаль с кнопкой</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>
            <div className="flex items-center justify-between">
              <span>Уведомление</span>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>
          </ModalHeader>
          <ModalBody>
            <p className="text-slate-300">
              Здесь только кнопка закрытия в шапке.
            </p>
          </ModalBody>
        </Modal>
      </div>
    );
  },
};

// С формой
export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setOpen(false);
    };
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Модаль с формой</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>Заполните форму</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSubmit}>
              Отправить
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Алерты
export const SuccessAlert: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Успех</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success-500/20 rounded-full flex items-center justify-center">
                ✓
              </div>
              <span>Успешно!</span>
            </div>
          </ModalHeader>
          <ModalBody>
            <p className="text-slate-300">
              Операция выполнена успешно.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>
              Понятно
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const ErrorAlert: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Ошибка
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-error-500/20 rounded-full flex items-center justify-center">
                ✕
              </div>
              <span>Произошла ошибка</span>
            </div>
          </ModalHeader>
          <ModalBody>
            <p className="text-slate-300">
              Не удалось выполнить операцию. Попробуйте еще раз.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => setOpen(false)}>
              Повторить
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Конфирмация
export const Confirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Удалить
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning-500/20 rounded-full flex items-center justify-center">
                ?
              </div>
              <span>Подтвердите действие</span>
            </div>
          </ModalHeader>
          <ModalBody>
            <p className="text-slate-300">
              Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Удалить
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};
