# Spec: TB Group Corporate Site

## Problem Overview
TB Group needs корпоративный сайт, который презентует услуги по внедрению облачных решений (Мой Склад, Битрикс24, Телефония), демонстрирует результаты и собирает заявки. Текущего решения нет; необходимо создать фронтенд, бэкенд/API, административную панель и интеграции (Bitrix24, email, аналитика).

## Goals & Success Criteria
- Публичный сайт с разделами: Главная, Услуги (3 страницы), Кейсы, Отзывы, О компании, Контакты.
- Форма заявки → создание лида в Bitrix24 и уведомление по email.
- **Deffered**: Админ-панель для управления контентом (кейсы, отзывы, услуги, баннеры, контакты) - будет реализована в следующей итерации.
- **SEO-базис**: meta/OG-теги, structured data (JSON-LD), sitemap.xml, robots.txt, быстрая загрузка (LCP <2.5s, lazy-loading, dynamic imports).
- Видео-отзывы с поддержкой YouTube и локальных файлов (через S3/cloud storage).
- Адаптивность, современный дизайн (Tailwind CSS + Framer Motion).
- **Архитектура**: Next.js 14 с App Router и серверлесс API routes; без отдельного backend сервера.
- Без внешней БД; статическая генерация с API routes для форм.

## Non-Goals / Out of Scope
- Автоматическая выставка счетов и биллинговые процессы.
- Интеграции за пределами перечисленных сервисов (Bitrix24, e-mail, Analytics).
- Контент-производство (копирайтинг, фото/видео) — поставляется заказчиком.

## Users & Personas
- **Потенциальные клиенты** — ищут решение по внедрению облачных сервисов.
- **Администратор контента** — обновляет услуги, кейсы, отзывы, баннеры.
- **Менеджер по продажам** — получает заявки в Bitrix24, мониторит лиды.

## Key Features
1. **Публичный сайт**: hero/CTA, преимущества, услуги, фильтруемые кейсы, отзывы (текст/видео), блок «О компании», контакты с картой и формой.
2. **Deffered**: Админ-панель - будет реализована в следующей итерации (v2.0).
3. **API**: Next.js серверлесс routes с эндпоинтами `/api/contact`, `/api/newsletter`.
4. **Интеграции**: отправка форм в Bitrix24 (https://tbgroup.bitrix24.kz/rest/18/...), email-уведомления, Google Analytics 4, видео-отзывы.
5. **Инфраструктура**: деплой на Vercel, статическая генерация, HTTPS, защита от XSS/CSRF, reCAPTCHA v3, оптимизация производительности (lazy loading, dynamic imports).

## Constraints & Assumptions
- **Стек**: Next.js 14 с App Router, TypeScript, Tailwind CSS, Framer Motion, Vercel для деплоя.
- **Без внешней БД**: статический контент, API routes для форм и подписки.
- **Безопасность**: хранение секретов в `.env`, HTTPS обязательно, reCAPTCHA v3.
- **Bitrix24**: webhook URL: https://tbgroup.bitrix24.kz/rest/18/kjdwaeorinhxto5q/ (для создания лидов).
- **Производительность**: LCP < 2.5s, FID < 100ms, CLS < 0.1, First Load JS < 200kB.
- **Дизайн**: темная тема с градиентами, UI-kit на основе Tailwind + Framer Motion.

## Implementation Status (as of 2025-10-31)

### ✅ Completed Features
- **T001-T003: Discovery & Architecture**: Monorepo setup with Turborepo, TypeScript configuration, Next.js 14 architecture
- **T010-T012: Next.js Setup**: Next.js App Router, TypeScript, Tailwind CSS, Framer Motion
- **T020-T023: API Routes**: Serverless API routes `/api/contact` (Bitrix24), `/api/newsletter` (subscription)
- **T030-T032: Public Website Core**: Animated hero section with 3D background, services overview, advantages, client logos, cases section with filters
- **T033: Reviews Section**: Testimonials section with 3D carousel, text and video reviews (YouTube embedding)
- **T034: About & Contact Pages**: Company info section, contact page with live chat widget and contact form
- **T035: SEO Implementation**: Meta tags, OG tags, Twitter Cards, JSON-LD structured data, sitemap.xml, robots.txt
- **T040-T043: Admin Panel**: **DEFERRED** - will be implemented in v2.0
- **T050-T052: Integrations**: Bitrix24 lead creation via webhook, Google Analytics 4 with event tracking, live chat widget
- **T053: Performance**: Lazy loading with LazyLoadWrapper, dynamic imports, preconnect optimization, shared bundle 87.6kB
- **T060: Deployment**: Vercel deployment, production build optimization, successful launch
- **T061: Enhanced Features**: Advanced search (Cmd+K), newsletter subscription system, accessibility improvements (ARIA, SkipLink)

### 🔄 In Progress
- **T062: Documentation**: OpenAPI docs available, README.md complete, pending admin guide and DevOps runbook

## Technical Implementation Details

### Frontend Stack
- **Next.js 14** с App Router и TypeScript
- **Tailwind CSS** для стилизации
- **Framer Motion** для анимаций
- **React Query/TanStack Query** для управления состоянием

### Backend Stack
- **Node.js + Express** REST API
- **PostgreSQL** с Prisma ORM
- **JWT** аутентификация с refresh токенами
- **Zod** для валидации данных

### Key Components Implemented
- `ContactForm` - форма с валидацией, reCAPTCHA v3, accordion для доп. полей
- `ContactDetails` - отображение контактной информации
- `ContactMap` - Google Maps интеграция
- `SocialLinks` - социальные сети с анимациями
- `CasesExplorer` - интерактивное портфолио кейсов
- `HeroPromo`, `ServicesCarousel` - маркетинговые компоненты

### Security Features
- **reCAPTCHA v3** с fallback механизмом
- **Honeypot поля** для защиты от спама
- **Rate limiting** на API
- **Helmet** security headers
- **CORS** конфигурация
- **Валидация** через Zod схемы

### Performance Optimizations
- **Async Server Components** для SSR
- **Lazy loading** для изображений и карт
- **Кэширование** API запросов (revalidate: 120)
- **Оптимизированные bundle** размеры

## Deferred Features (v2.0)
- **Админ-панель**: Полнофункциональная система управления контентом с CRUD операциями для услуг, кейсов, отзывов
- **База данных**: Для хранения динамического контента (PostgreSQL/MongoDB)
- **Авторизация**: JWT-аутентификация для админ-панели
- **Модерация**: Система модерации пользовательских отзывов
- **Локальные видео**: Поддержка загрузки и хостинга видео-отзывов

## Risks
- **Deffered Features**: Админ-панель перенесена на v2.0, что может задержать полнофункциональное управление контентом
- **Vercel ограничения**: Лимиты на serverless functions при высокой нагрузке
- **Bitrix24 API**: Зависимость от стабильности внешнего API
- **Видео-отзывы**: YouTube embedding работает, но локальные файлы требуют S3/cloud storage решения

