'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, FileText, Package, MessageCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  type: 'service' | 'case' | 'page';
  url: string;
  icon?: React.ComponentType<any>;
};

const searchData: SearchResult[] = [
  // Services
  {
    id: '1',
    title: 'Мой Склад',
    description: 'Автоматизация складского и торгового учета. Учет товаров, остатков, интеграция с 1С.',
    type: 'service',
    url: '/services/moy-sklad',
    icon: Package,
  },
  {
    id: '2',
    title: 'Битрикс24',
    description: 'CRM система для управления продажами. Воронка продаж, задачи, автоматизация.',
    type: 'service',
    url: '/services/bitrix24',
    icon: MessageCircle,
  },
  {
    id: '3',
    title: 'Корпоративная телефония',
    description: 'Виртуальная АТС, интеграция с CRM, запись разговоров, аналитика.',
    type: 'service',
    url: '/services/telephony',
    icon: MessageCircle,
  },
  // Cases
  {
    id: '4',
    title: 'Кейс: Внедрение Мой Склад в ритейле',
    description: 'Автоматизация складского учета для торговой сети из 15 магазинов.',
    type: 'case',
    url: '/cases/retail-case',
    icon: FileText,
  },
  {
    id: '5',
    title: 'Кейс: Битрикс24 для отдела продаж',
    description: 'Настройка воронки продаж и автоматизация процессов в ТОО «МеталлТех».',
    type: 'case',
    url: '/cases/metalltech-case',
    icon: FileText,
  },
  {
    id: '6',
    title: 'Кейс: Корпоративная телефония',
    description: 'Внедрение виртуальной АТС с записью разговоров для Kazakhstan Travel.',
    type: 'case',
    url: '/cases/travel-case',
    icon: FileText,
  },
  // Pages
  {
    id: '7',
    title: 'О компании',
    description: 'TB Group - лидер внедрения облачных решений в Казахстане.',
    type: 'page',
    url: '/about',
    icon: FileText,
  },
  {
    id: '8',
    title: 'Услуги',
    description: 'Все наши услуги по внедрению Мой Склад, Битрикс24 и телефонии.',
    type: 'page',
    url: '/services',
    icon: Package,
  },
  {
    id: '9',
    title: 'Кейсы',
    description: 'Успешные проекты наших клиентов по автоматизации бизнеса.',
    type: 'page',
    url: '/cases',
    icon: FileText,
  },
  {
    id: '10',
    title: 'Контакты',
    description: 'Свяжитесь с нами для консультации по внедрению облачных решений.',
    type: 'page',
    url: '/contact',
    icon: MessageCircle,
  },
];

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Search functionality
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = searchData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered.slice(0, 5)); // Limit to 5 results
    setSelectedIndex(0);
  }, [query]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }

      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    setQuery('');
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'service':
        return 'bg-blue-500/20 text-blue-400';
      case 'case':
        return 'bg-green-500/20 text-green-400';
      case 'page':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'service':
        return 'Услуга';
      case 'case':
        return 'Кейс';
      case 'page':
        return 'Страница';
      default:
        return 'Результат';
    }
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:border-blue-500/50 hover:text-white transition-all"
        aria-label="Поиск по сайту. Нажмите Cmd+K или Ctrl+K для быстрого доступа"
      >
        <SearchIcon size={16} aria-hidden="true" />
        <span>Поиск</span>
        <kbd className="ml-auto rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-xs" aria-hidden="true">
          {typeof window !== 'undefined' && (window.navigator.platform.includes('Mac') ? '⌘' : 'Ctrl')}K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
            />

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-2xl mx-4"
            >
              <div className="rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-blue-500/10 overflow-hidden">
                {/* Input */}
                <div className="flex items-center gap-3 border-b border-white/10 p-4">
                  <SearchIcon className="text-slate-400" size={20} aria-hidden="true" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Поиск по сайту..."
                    className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none"
                    autoFocus
                    role="combobox"
                    aria-expanded={results.length > 0}
                    aria-activedescendant={results[selectedIndex] ? `search-option-${results[selectedIndex].id}` : undefined}
                    aria-label="Поле поиска"
                    aria-describedby="search-instructions"
                  />
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="rounded-lg bg-white/10 p-1.5 text-slate-400 hover:bg-white/20 hover:text-white transition-colors"
                    aria-label="Закрыть поиск"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto" role="listbox" aria-label="Результаты поиска">
                  {query.trim() === '' ? (
                    <div className="p-8 text-center text-slate-400">
                      <SearchIcon size={48} className="mx-auto mb-4 opacity-50" aria-hidden="true" />
                      <p>Начните вводить для поиска</p>
                      <p className="mt-2 text-sm">
                        Найдите услуги, кейсы или страницы сайта
                      </p>
                    </div>
                  ) : results.length === 0 ? (
                    <div className="p-8 text-center text-slate-400" role="status" aria-live="polite">
                      <p>Ничего не найдено</p>
                      <p className="mt-2 text-sm">Попробуйте изменить запрос</p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {results.map((result, index) => {
                        const Icon = result.icon || FileText;
                        const isSelected = index === selectedIndex;

                        return (
                          <button
                            key={result.id}
                            onClick={() => handleResultClick(result)}
                            className={`w-full flex items-start gap-3 rounded-xl p-3 text-left transition-all ${
                              isSelected
                                ? 'bg-blue-500/20 border border-blue-500/30'
                                : 'hover:bg-white/5 border border-transparent'
                            }`}
                            role="option"
                            id={`search-option-${result.id}`}
                            aria-selected={isSelected}
                            aria-label={`${result.title} - ${getTypeLabel(result.type)}`}
                          >
                            <div className="mt-0.5 flex-shrink-0" aria-hidden="true">
                              <Icon size={20} className="text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-white">{result.title}</h4>
                                <span
                                  className={`rounded px-2 py-0.5 text-xs font-medium ${getTypeColor(
                                    result.type
                                  )}`}
                                  aria-label={`Тип: ${getTypeLabel(result.type)}`}
                                >
                                  {getTypeLabel(result.type)}
                                </span>
                              </div>
                              <p className="text-sm text-slate-400 line-clamp-2">
                                {result.description}
                              </p>
                            </div>
                            <ArrowRight
                              size={16}
                              className={`mt-0.5 transition-colors ${
                                isSelected ? 'text-blue-400' : 'text-slate-500'
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 bg-slate-900/50 p-3">
                  <div className="flex items-center justify-between text-xs text-slate-400" id="search-instructions">
                    <div className="flex items-center gap-2">
                      <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5" aria-hidden="true">↑↓</kbd>
                      <span>навигация</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5" aria-hidden="true">↵</kbd>
                      <span>выбрать</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5" aria-hidden="true">esc</kbd>
                      <span>закрыть</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
