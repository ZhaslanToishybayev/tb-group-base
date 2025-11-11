# Руководство по Деплою — TB Group Website

## Обзор

Данное руководство описывает процесс деплоя приложения TB Group в staging и production окружения.

---

## Архитектура Деплоя

### Компоненты

1. **Web приложение** (Next.js)
   - Платформа: Vercel
   - Регион: Europe (Ближайший к пользователям)
   - Домен: `tb-group.kz`

2. **API сервис** (Node.js/Express)
   - Платформа: Fly.io или Heroku
   - Регион: Europe West
   - Порт: 4000

3. **База данных**
   - PostgreSQL (Railway, Supabase, или AWS RDS)

4. **Кэш**
   - Redis (Upstash или Redis Cloud)

---

## Подготовка к Деплою

### 1. Переменные Окружения

#### Для Web Приложения (`apps/web/.env.production`)

```bash
# Базовые настройки
NEXT_PUBLIC_BASE_URL=https://tb-group.kz
NEXT_PUBLIC_API_URL=https://api-tb-group.fly.dev/api

# reCAPTCHA (Production)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=YOUR_PRODUCTION_RECAPTCHA_SITE_KEY

# Аналитика
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678

# Sentry (Мониторинг ошибок)
SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_ORG=tb-group
SENTRY_PROJECT=tb-group-web

# Дополнительные настройки
NODE_ENV=production
```

#### Для API Сервиса (`apps/api/.env.production`)

```bash
# Базовые настройки
NODE_ENV=production
PORT=4000
API_BASE_URL=https://api-tb-group.fly.dev

# База данных
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Redis
REDIS_URL=redis://user:password@host:6379

# reCAPTCHA (Server-side)
RECAPTCHA_SECRET_KEY=YOUR_PRODUCTION_RECAPTCHA_SECRET_KEY

# Email сервис
EMAIL_SERVICE_API_KEY=YOUR_EMAIL_SERVICE_API_KEY
EMAIL_FROM=noreply@tb-group.kz
EMAIL_TO=info@tb-group.kz

# Bitrix24
BITRIX24_WEBHOOK_URL=https://xxx.bitrix24.kz/rest/xxx/xxx/
BITRIX24_LEAD_SOURCE=WEB

# Безопасность
CORS_ORIGIN=https://tb-group.kz
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 2. Необходимые Сервисы и Аккаунты

#### Обязательные

1. **Vercel Account**
   - План: Hobby (бесплатный) или Pro
   - Домен: tb-group.kz (покупка отдельно)

2. **Fly.io Account**
   - План: Со Saver (минимум)
   - Регион: ams (Amsterdam)

3. **PostgreSQL Database**
   - Railway.app (рекомендуется) или
   - Supabase (бесплатный tier) или
   - AWS RDS (платно)

4. **Redis**
   - Upstash (рекомендуется) или
   - Redis Cloud (бесплатный tier)

#### Опциональные

1. **Домен**: tb-group.kz
   - Registrar: любой (например, Namecheap, GoDaddy)

2. **SSL Certificate**: Автоматически от Vercel/Fly.io

3. **Monitoring**:
   - Sentry (мониторинг ошибок)
   - Vercel Analytics (трафик)
   - Logtail или similar (логи)

---

## Деплой Web Приложения (Vercel)

### Шаг 1: Установка Vercel CLI

```bash
npm i -g vercel
vercel login
```

### Шаг 2: Конфигурация

Проверить файл `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/next",
      "config": {
        "distDir": ".next"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "apps/web/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_BASE_URL": "https://tb-group.kz"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_BASE_URL": "https://tb-group.kz"
    }
  },
  "regions": ["fra1"]
}
```

### Шаг 3: Деплой

```bash
# Из корневой директории проекта
cd apps/web

# Сборка и деплой
vercel --prod

# Или с указанием проекта
vercel --prod --confirm
```

### Шаг 4: Настройка Домена

1. В Vercel Dashboard → Project → Settings → Domains
2. Добавить домен: `tb-group.kz`
3. Добавить DNS записи в регистраторе домена:

```dns
# A запись для корневого домена
A     @     76.76.19.61

# CNAME для www
CNAME www   cname.vercel-dns.com
```

### Шаг 5: Настройка SSL

Автоматически от Vercel. Проверить:
- https://tb-group.kz должен работать
- Перенаправление с http на https

---

## Деплой API (Fly.io)

### Шаг 1: Установка Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
flyctl auth login
```

### Шаг 2: Инициализация

```bash
cd apps/api

# Создать fly.toml
flyctl apps create tb-group-api

# Инициализировать
flyctl launch --no-deploy
```

### Шаг 3: Конфигурация Docker

Проверить `apps/api/Dockerfile`:

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

USER nodejs

EXPOSE 4000
ENV PORT 4000

CMD ["npm", "start"]
```

### Шаг 4: Создать fly.toml

```toml
app = "tb-group-api"
primary_region = "ams"

[build]
  dockerfile = "Dockerfile"

[env]
  PORT = "4000"
  NODE_ENV = "production"

[http_service]
  internal_port = 4000
  force_https = true
  auto_stop_machines = false
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 512

[[http_service.checks]]
  grace_period = "10s"
  interval = "30s"
  method = "GET"
  path = "/api/health"
  protocol = "http"
  restart_limit = 3
  timeout = "5s"

[deploy]
  strategy = "rolling"
```

### Шаг 5: Установить Secrets

```bash
# Переменные окружения
flyctl secrets set NODE_ENV=production
flyctl secrets set DATABASE_URL="postgresql://..."
flyctl secrets set REDIS_URL="redis://..."
flyctl secrets set RECAPTCHA_SECRET_KEY="..."
flyctl secrets set EMAIL_SERVICE_API_KEY="..."
flyctl secrets set BITRIX24_WEBHOOK_URL="..."
flyctl secrets set CORS_ORIGIN="https://tb-group.kz"

# Список секретов
flyctl secrets list
```

### Шаг 6: Деплой

```bash
flyctl deploy
```

### Шаг 7: Получить URL

```bash
flyctl info
```

Получить URL: `https://tb-group-api.fly.dev`

---

## Настройка Базы Данных

### Вариант 1: Railway PostgreSQL

1. Создать аккаунт на railway.app
2. Создать новый проект
3. Добавить PostgreSQL plugin
4. Получить DATABASE_URL из переменных проекта

### Вариант 2: Supabase

1. Создать аккаунт на supabase.com
2. Создать новый проект
3. В Settings → Database → Connection string
4. Скопировать URI

### Вариант 3: AWS RDS

1. Создать RDS instance (PostgreSQL)
2. Настроить Security Group (разрешить подключения)
3. Получить connection string

---

## Настройка Redis

### Вариант 1: Upstash

1. Создать аккаунт на upstash.com
2. Создать новую базу
3. Скопировать REDIS_URL

### Вариант 2: Redis Cloud

1. Создать аккаунт на redislabs.com
2. Создать бесплатную базу
3. Скопировать connection string

---

## После Деплоя

### 1. Проверки

#### Web Приложение
```bash
# Проверить главную страницу
curl https://tb-group.kz

# Проверить sitemap
curl https://tb-group.kz/sitemap.xml

# Проверить robots.txt
curl https://tb-group.kz/robots.txt
```

#### API
```bash
# Проверить health check
curl https://api-tb-group.fly.dev/api/health

# Проверить сервисы
curl https://api-tb-group.fly.dev/api/services
```

### 2. Миграция БД (если нужна)

```bash
# Подключиться к серверу
flyctl ssh console -a tb-group-api

# Запустить миграции
npm run db:migrate
```

### 3. Обновить Переменные

Убедиться, что в web приложении указан правильный API URL:
- `NEXT_PUBLIC_API_URL=https://api-tb-group.fly.dev/api`

### 4. Тестирование

#### Ручное тестирование

1. **Главная страница**
   - Открыть https://tb-group.kz
   - Проверить загрузку всех элементов
   - Проверить навигацию

2. **Форма контакта**
   - Заполнить и отправить форму
   - Проверить, что данные приходят в Bitrix24

3. **SEO**
   - Проверить meta теги
   - Проверить sitemap.xml
   - Проверить hreflang (когда будет EN версия)

#### Автоматическое тестирование

```bash
# Запустить Playwright тесты против staging
npx playwright test --config=e2e/playwright.config.ts --project=chromium
```

### 5. Мониторинг

#### Vercel
- Dashboard → Analytics
- Проверить Core Web Vitals
- Проверить Errors & Logs

#### Fly.io
```bash
flyctl logs -a tb-group-api
```

#### Внешние сервисы
- Sentry для отслеживания ошибок
- UptimeRobot для мониторинга доступности
- Google Analytics для трафика

---

## Troubleshooting

### Проблема: Ошибки сборки на Vercel

**Решение**:
1. Проверить `vercel.json`
2. Убедиться, что все зависимости в `package.json`
3. Проверить environment variables

```bash
# Пересобрать с выводом логов
vercel --prod --debug
```

### Проблема: API возвращает 500 ошибки

**Решение**:
1. Проверить логи Fly.io
2. Проверить переменные окружения
3. Проверить подключение к БД

```bash
flyctl logs -a tb-group-api --instance <instance-id>
```

### Проблема: Форма не отправляется

**Решение**:
1. Проверить reCAPTCHA ключи
2. Проверить CORS настройки
3. Проверить Bitrix24 webhook

### Проблема: Медленная загрузка

**Решение**:
1. Проверить Core Web Vitals в Vercel
2. Оптимизировать изображения
3. Включить CDN для статических файлов

---

## Rollback (Откат)

### Откат Web Приложения

```bash
# Через Vercel CLI
vercel rollback [url] --target=deployment-id

# Или через Dashboard
# Deployments → выбрать предыдущий → Promote to Production
```

### Откат API

```bash
# Найти предыдущую версию
flyctl releases -a tb-group-api

# Откатиться к предыдущей версии
flyctl deploy --config fly.toml --remote-only
```

---

## Автоматизация Деплоя (CI/CD)

### GitHub Actions

Создать `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Staging

on:
  push:
    branches: [main]

jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build --workspace=@tb/web
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./apps/web

  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: superfly/flyctl-actions@1.5
        with:
          flyctl-token: ${{ secrets.FLY_TOKEN }}
      - run: flyctl deploy --remote-only
        working-directory: ./apps/api
```

### GitHub Secrets

Добавить в Settings → Secrets and variables → Actions:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `FLY_TOKEN`

---

## Checklist Перед Go-Live

### Безопасность
- [ ] HTTPS включен
- [ ] HSTS настроен
- [ ] CSP заголовки добавлены
- [ ] reCAPTCHA работает в production
- [ ] API keys не в коде (в secrets)

### SEO
- [ ] Sitemap доступен
- [ ] robots.txt корректный
- [ ] Meta теги настроены
- [ ] Open Graph теги работают
- [ ] Hreflang настроен

### Функциональность
- [ ] Форма контакта работает
- [ ] Email отправка работает
- [ ] Bitrix24 интеграция работает
- [ ] Все страницы загружаются
- [ ] Навигация работает

### Производительность
- [ ] Core Web Vitals < 90
- [ ] Lighthouse Score > 90
- [ ] Сжатие включено (gzip/brotli)
- [ ] Изображения оптимизированы

### Мониторинг
- [ ] Sentry настроен
- [ ] Мониторинг доступности настроен
- [ ] Логи настроены
- [ ] Алерты настроены

### Backup & Recovery
- [ ] Бэкапы БД настроены
- [ ] Процедура восстановления протестирована
- [ ] Доступы к сервисам документированы

---

## Контакты и Поддержка

### Команда

- **DevOps**: TB Group Team
- **Backend**: TB Group Team
- **Frontend**: TB Group Team

### Полезные Ссылки

- Vercel Docs: https://vercel.com/docs
- Fly.io Docs: https://fly.io/docs
- Next.js Deploy: https://nextjs.org/docs/deployment

### Эскалация

При критических проблемах:
1. Создать issue в GitHub
2. Уведомить команду в Slack
3. Включить логи и скриншоты

---

**Документ подготовлен**: TB Group Development Team
**Дата**: 2025-11-11
**Версия**: 1.0
**Статус**: Готов к использованию
