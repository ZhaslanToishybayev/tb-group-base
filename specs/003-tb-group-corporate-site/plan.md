# Implementation Plan: TB Group Corporate Site

## Phase 0 — Discovery & Architecture
- ✅ Уточнить бизнес-цели, каналы лидов, содержание для каждой страницы.
- ✅ **Решено**: Next.js 14 с App Router, Tailwind CSS, Framer Motion, Vercel для деплоя.
- ✅ **Архитектура**: Статический публичный сайт + серверлесс API routes (без отдельного админа в v1.0).
- ✅ **Инфраструктура**: Vercel, GitHub Actions, статическая генерация.

## Phase 1 — Boilerplate & Core Setup
1. ✅ Создать monorepo (Turborepo) для публичного фронтенда.
2. ✅ Настроить TypeScript/ESLint/Prettier, конфигурацию Next.js 14.
3. ✅ Настроить серверлесс API routes (`/api/contact`, `/api/newsletter`).
4. ✅ Настроить интеграцию с Bitrix24 и Google Analytics 4.

## Phase 2 — Static Content & API Routes
1. ✅ Статический контент в Next.js: Services, Cases, Reviews, ContactRequests (hardcoded).
2. ✅ Серверлесс API routes для форм: `/api/contact` (Bitrix24), `/api/newsletter`.
3. ✅ Валидация форм на клиенте и сервере, обработка ошибок.
4. ✅ Документация в README.md и коммитах.

## Phase 3 — Public Website (COMPLETED)
1. ✅ Next.js 14 App Router с маршрутизацией: Home, Services, Cases, Reviews, About, Contacts.
2. ✅ Tailwind CSS + Framer Motion: hero с 3D фоном, services overview, cases, testimonials с 3D каруселью.
3. ✅ Интеграция с API (CSR). Lazy loading изображений, dynamic imports.
4. ✅ Формы: контактная форма, подписка на новости — отправка через API с reCAPTCHA v3.
5. ✅ SEO: meta/OG/Twitter, JSON-LD structured data, sitemap.xml, robots.txt, Google Analytics 4.

## Phase 4 — Admin Panel (DEFERRED to v2.0)
1. [D] React SPA с авторизацией (JWT + refresh) - **DEFERRED**
2. [D] CRUD UI для кейсов, отзывов, услуг - **DEFERRED**
3. [D] Модерация пользовательских отзывов - **DEFERRED**
4. [D] Управление мультимедиа (S3/cloud storage) - **DEFERRED**
5. [D] Настройки (контакты, контент) - **DEFERRED**

## Phase 5 — Integrations & Optimizations
1. ✅ Bitrix24: отправка заявок через webhook, создание лидов.
2. ✅ Google Analytics 4 с событиями отслеживания.
3. ✅ Видео-отзывы: YouTube iframe embedding, live chat widget.
4. ✅ Производительность: lazy loading, dynamic imports, preconnect, bundle optimization (87.6kB shared).

## Phase 6 — QA & Hardening
1. ✅ Производительность: bundle size optimization, lazy loading, Core Web Vitals.
2. ✅ Accessibility: ARIA labels, SkipLink, semantic HTML, keyboard navigation.
3. ✅ Безопасность: reCAPTCHA v3, защита от спама, HTTPS, environment variables.
4. ✅ DevOps: GitHub Actions, Vercel deployment, SSL.

## Phase 7 — Deployment & Handover (COMPLETED)
1. ✅ Деплой на Vercel: https://tb-group-website-g86xznne9-zhaslantoishybayevs-projects.vercel.app
2. ✅ Документация: README.md, коммиты с деталями, спецификация.
3. ✅ Успешный запуск в production.
4. ✅ Передача исходников, готовность к использованию.

## Next Phase (v2.0) — Admin Panel & Dynamic Content
1. Реализация админ-панели с полным CRUD функционалом
2. Настройка базы данных (PostgreSQL/MongoDB)
3. JWT авторизация и роутинг с защитой
4. Система модерации контента
5. Управление медиа (S3/cloud storage)
