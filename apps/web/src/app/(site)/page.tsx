import type { Metadata } from 'next';
import Link from 'next/link';

import {
  AdvantagesSection,
  ClientLogosMarquee,
  CTASection,
  type Advantage,
  type ClientLogo,
} from '../../components/home';
import { Hero } from '../../components/sections/Hero';
import { CompanyInfoSection } from '../../components/sections/CompanyInfoSection';
import { ServicesOverviewSection } from '../../components/sections/ServicesOverviewSection';
import { CasesSection } from '../../components/sections/CasesSection';
import {
  ServicesSection,
  TestimonialsSection,
} from '../../components/sections';
import { BlogPreview } from '../../components/blog/BlogPreview';
import { NewsletterSubscription } from '../../components/ui/NewsletterSubscription';
import { StatsGrid } from '../../components/ui/StatsGrid';
import {
  getServices,
  getReviews,
  getSettings,
} from '../../lib/api';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TB Group — Облачные решения для бизнеса',
  description: 'Внедрение Мой Склад, Битрикс24 и корпоративной телефонии под ключ.',
};

const defaultAdvantages: Advantage[] = [
  {
    title: 'Официальный партнер Мой Склад и Битрикс24',
    description: 'Сертифицированные специалисты с опытом внедрения более 5 лет. Все необходимые сертификаты и официальная поддержка от разработчиков.',
  },
  {
    title: 'Комплексное внедрение «под ключ»',
    description: 'От анализа бизнес-процессов до обучения сотрудников. Настраиваем интеграции между системами и автоматизируем рутину.',
  },
  {
    title: 'Гарантируем результат',
    description: 'Фиксируем KPI в договоре. Обычно клиенты видят эффект уже в первые 2-3 недели после внедрения.',
  },
  {
    title: 'Поддержка 24/7',
    description: 'Техническая поддержка и сопровождение после внедрения. Отвечаем на вопросы и помогаем оптимизировать процессы.',
  },
  {
    title: 'Работаем по всей территории Казахстана',
    description: 'Офисы в Нур-Султане и Алматы. Выезжаем в любой город. Удаленная поддержка и сопровождение для регионов.',
  },
];

const defaultClientLogos: ClientLogo[] = [
  { name: 'Торговая сеть «Пятёрочка KZ»', logoUrl: '' },
  { name: 'Металлург Казахстан', logoUrl: '' },
  { name: 'Kaspi.kz', logoUrl: '' },
  { name: 'Метрополис', logoUrl: '' },
  { name: 'Technodom', logoUrl: '' },
  { name: 'Семейный Торговый Центр', logoUrl: '' },
  { name: 'Национальный Банк РК', logoUrl: '' },
  { name: 'Air Astana', logoUrl: '' },
];

// Stats for the StatsGrid component
const stats = [
  { id: '1', value: 500, label: 'Довольных клиентов', suffix: '+', color: 'primary' as const },
  { id: '2', value: 1000, label: 'Успешных внедрений', suffix: '+', color: 'secondary' as const },
  { id: '3', value: 99, label: 'Успешность проектов', suffix: '%', color: 'success' as const },
  { id: '4', value: 24, label: 'Часа поддержки', suffix: '/7', color: 'neon' as const },
];

// Mock blog posts for demo
const blogPosts = [
  {
    id: '1',
    title: 'Внедрение Мой Склад: Полное руководство',
    excerpt: 'Как правильно внедрить систему Мой Склад в ваш бизнес и получить максимальную эффективность.',
    coverImage: '',
    author: { name: 'Иван Петров', avatar: '' },
    publishedAt: '2024-11-08',
    readTime: 8,
    category: 'Мой Склад',
    slug: 'moy-sklad-guide',
  },
  {
    id: '2',
    title: 'Битрикс24 для малого бизнеса',
    excerpt: 'Пошаговая инструкция по настройке Битрикс24 для эффективной работы команды.',
    coverImage: '',
    author: { name: 'Мария Сидорова', avatar: '' },
    publishedAt: '2024-11-05',
    readTime: 12,
    category: 'Битрикс24',
    slug: 'bitrix24-small-business',
  },
  {
    id: '3',
    title: 'Корпоративная телефония: выбор и внедрение',
    excerpt: 'Современные решения для корпоративной связи и как выбрать подходящую систему.',
    coverImage: '',
    author: { name: 'Алексей Козлов', avatar: '' },
    publishedAt: '2024-11-02',
    readTime: 10,
    category: 'Телефония',
    slug: 'corporate-telephony',
  },
];

const parseSettingArray = <T,>(value: unknown, fallback: T[]): T[] => {
  if (!value) {
    return fallback;
  }
  if (Array.isArray(value)) {
    return value as T[];
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as T[];
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
};

export default async function HomePage() {
  const [services, reviews, settings] = await Promise.all([
    getServices().catch(() => []),
    getReviews({ isFeatured: true }).catch(() => []),
    getSettings().catch(() => []),
  ]);

  // Ensure all data is properly typed as arrays
  const safeServices = Array.isArray(services) ? services : [];
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const settingsArray = Array.isArray(settings) ? settings : [];

  const advantagesSetting = settingsArray.find((setting) => setting.key === 'HOMEPAGE_ADVANTAGES')?.value;
  const logosSetting = settingsArray.find((setting) => setting.key === 'HOMEPAGE_CLIENT_LOGOS')?.value;

  const advantages = parseSettingArray<Advantage>(advantagesSetting, defaultAdvantages);
  const logos = parseSettingArray<ClientLogo>(logosSetting, defaultClientLogos);

  return (
    <>
      <div id="main-content">
        <Hero />
        <CompanyInfoSection />
        <ServicesOverviewSection />
        <CasesSection />

        <ClientLogosMarquee logos={logos} />

        <ServicesSection services={safeServices} />

        {/* Stats Grid Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <StatsGrid stats={stats} />
          </div>
        </section>

        <AdvantagesSection advantages={advantages} />

        <ClientLogosMarquee logos={logos} />

        {/* Blog Preview Section */}
        <BlogPreview posts={blogPosts} className="py-20" />

        <TestimonialsSection />

        {/* Newsletter Subscription Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <NewsletterSubscription variant="default" />
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}
