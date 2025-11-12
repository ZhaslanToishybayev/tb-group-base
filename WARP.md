# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

TB Group Base Stack v0.2.2 - A monorepo containing a corporate website with Next.js frontend, Express API backend, and React admin panel. The project uses pnpm workspaces, Prisma ORM with PostgreSQL, and includes Task Master AI for project management.

## Build & Development Commands

### Quick Start

```bash
# Install dependencies (from root)
pnpm install

# Setup environment
cp .env.example .env  # Edit with actual values

# Database setup (using Docker)
docker-compose up -d postgres redis

# Initialize database (from root)
cd apps/api
pnpm prisma migrate dev
pnpm prisma generate
cd ../..

# Start all services
pnpm dev
```

### Development

```bash
# Start all apps in dev mode
pnpm dev

# Start individual apps
cd apps/web && npm run dev      # Next.js web (port 3000)
cd apps/api && npm run dev      # API server (port 4000)
cd apps/admin && npm run dev    # Admin panel (port 5173)

# From root with pnpm filter
pnpm -F @tb/web dev
pnpm -F @tb/api dev
```

### Build

```bash
# Build all packages
pnpm build

# Build specific workspace
cd apps/web && npm run build
cd apps/api && npm run build

# Build with bundle analysis
cd apps/web && npm run build:analyze
```

### Linting & Type Checking

```bash
# Lint all code (from root)
pnpm lint

# Lint specific app
cd apps/web && npm run lint
cd apps/api && npm run lint

# Type check
cd apps/web && npm run type-check
```

### Testing

```bash
# Run all tests (from web or api directory)
cd apps/web && npm test
cd apps/api && npm test

# Run specific test types (API)
cd apps/api
npm run test:unit              # Unit tests only
npm run test:integration       # Integration tests only
npm run test:e2e              # End-to-end with Playwright
npm run test:coverage         # With coverage report
npm run test:watch            # Watch mode

# Run accessibility tests (web)
cd apps/web && npm run test:a11y

# Run single test file
cd apps/api && npx vitest run src/modules/services/services.test.ts
```

### Database Operations

```bash
# All commands run from apps/api directory
cd apps/api

# Generate Prisma Client (after schema changes)
pnpm prisma generate

# Create and run migration
pnpm prisma migrate dev --name migration_name

# Apply migrations to production
pnpm prisma migrate deploy

# Reset database (dev only - destructive!)
pnpm prisma migrate reset

# Open Prisma Studio (database GUI)
pnpm prisma studio

# Bootstrap admin user
npm run bootstrap:admin

# Generate OpenAPI documentation
npm run openapi:generate
```

### Docker

```bash
# Start database services only
docker-compose up -d postgres redis

# Start full stack
docker-compose up -d

# Start with observability (Prometheus/Grafana)
docker-compose --profile observability up -d

# View logs
docker-compose logs -f api
docker-compose logs -f web

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Task Master AI

```bash
# View all tasks
task-master list

# Get next available task
task-master next

# Show task details
task-master show 1.2

# Update task with implementation notes
task-master update-subtask --id=1.2 --prompt="Added auth middleware"

# Mark task complete
task-master set-status --id=1.2 --status=done

# Add new task with research
task-master add-task --prompt="Implement feature X" --research

# Expand task into subtasks
task-master expand --id=1 --research
```

## Architecture

### Monorepo Structure

```
tb-group-base-current-changes-backup/
├── apps/
│   ├── api/          # Express REST API (port 4000)
│   ├── web/          # Next.js 14 App Router website (port 3000)
│   └── admin/        # React admin panel (port 5173)
├── packages/
│   ├── ui/           # Shared React component library
│   └── config/       # Shared configs (ESLint, TypeScript, Vitest)
├── .taskmaster/      # Task Master AI task management
└── docker-compose.yml
```

### API Architecture (apps/api)

**Module-based structure** - Each feature is a self-contained module:

```
apps/api/src/
├── app.ts                    # Express app setup, middleware, routes
├── server.ts                 # HTTP server entry point
├── modules/
│   ├── auth/                 # JWT authentication, admin users
│   ├── services/             # Service offerings CRUD
│   ├── cases/                # Portfolio case studies
│   ├── reviews/              # Client reviews/testimonials
│   ├── banners/              # Homepage banners
│   ├── contact/              # Contact form with Bitrix24 integration
│   ├── media/                # Media asset management
│   ├── analytics/            # Event tracking
│   └── email/                # Email notifications
├── middleware/               # Express middleware
│   ├── auth.middleware.ts    # JWT validation
│   ├── error-handler.ts      # Global error handling
│   ├── logger.ts             # Pino HTTP logging
│   └── api-cache.middleware.ts  # Redis caching layer
├── lib/
│   └── prisma.ts            # Prisma client singleton
├── config/
│   └── env.ts               # Environment validation with Zod
├── services/                # Shared business logic
├── integrations/            # External API integrations (Bitrix24, email)
└── test/
    └── setup.ts             # Test utilities and helpers
```

**Module pattern**: Each module contains `*.router.ts` (Express routes) and `*.schemas.ts` (Zod validation schemas). Some have additional files for complex logic.

**Key dependencies**:
- Express + Helmet + CORS for HTTP
- Prisma for database ORM
- Zod for validation
- Argon2 for password hashing
- JWT for authentication
- Redis (via ioredis) for caching
- Pino for structured logging
- Nodemailer for email
- Swagger UI Express for API docs

### Web Architecture (apps/web)

**Next.js 14 App Router** with server/client component separation:

```
apps/web/src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout with providers, analytics
│   ├── page.tsx              # Homepage
│   ├── services/             # Services pages
│   ├── cases/                # Case studies
│   ├── about/                # About page
│   └── contact/              # Contact page
├── components/
│   ├── layout/               # Header, Footer
│   ├── home/                 # Homepage sections
│   ├── cases/                # Case study components
│   ├── ui/                   # Base UI components
│   ├── analytics/            # Google Analytics, tracking
│   └── animations/           # Framer Motion animations
├── contexts/
│   └── LenisContext.tsx      # Smooth scroll provider
├── hooks/                    # Custom React hooks
├── lib/                      # Client utilities
├── store/                    # Zustand state management
├── styles/
│   └── globals.css           # Tailwind + custom styles
└── test/                     # Test utilities
```

**Key dependencies**:
- Next.js 14 with App Router
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lenis for smooth scrolling
- React Three Fiber for 3D graphics
- Zustand for state management
- React Hook Form for forms
- Lucide React for icons

**Performance optimizations**:
- next/font for font optimization
- next/image for image optimization
- Dynamic imports for code splitting
- Aggressive caching headers in next.config.mjs
- Bundle analysis available with `build:analyze`

### Database Schema

PostgreSQL with Prisma ORM (schema at `apps/api/prisma/schema.prisma`):

**Core models**:
- `Service` - Service offerings with slug, title, description
- `Case` - Portfolio case studies linked to services
- `Review` - Client testimonials (text or video)
- `Banner` - Homepage promotional banners
- `ContactRequest` - Contact form submissions with Bitrix24 integration
- `MediaAsset` - Uploaded images/videos
- `AdminUser` - Admin authentication with Argon2 hashed passwords
- `RefreshToken` - JWT refresh token management
- `AnalyticsEvent` - Event tracking
- `EmailNotificationLog` - Email delivery tracking
- `LeadLog` - Bitrix24 CRM integration logs

**Key patterns**:
- CUID IDs for all models
- Soft deletes via `published` flags where needed
- JSON fields for flexible metadata
- Cascading deletes on media relationships
- Timestamps: `createdAt`, `updatedAt` on all models

### Authentication

JWT-based authentication for admin panel:
- Access tokens (short-lived): 15 minutes
- Refresh tokens (long-lived): 7 days stored in database
- Routes: `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`
- Protected routes use `authMiddleware` from `apps/api/src/middleware/auth.middleware.ts`

### Caching Strategy

Redis caching layer via `api-cache.middleware.ts`:
- Session-based caching with user-specific keys
- Automatic cache invalidation on mutations
- Cache tags for granular invalidation
- Manual cache clearing via `/api/cache/clear` endpoint

### External Integrations

**Bitrix24 CRM** (`apps/api/src/integrations/bitrix24-service.ts`):
- Contact form submissions create leads
- Stub mode available for development (set `BITRIX24_USE_STUB=true`)

**Email Notifications** (`apps/api/src/integrations/email-service.ts`):
- Nodemailer with SMTP
- Retry logic for failed sends
- Delivery tracking in `EmailNotificationLog` model

**Google reCAPTCHA**:
- Client: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- Server: `RECAPTCHA_SECRET`

## Environment Variables

Required in `.env` at project root:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tbgroup"

# JWT Secrets (generate secure random strings)
JWT_ACCESS_SECRET="your-secret-here"
JWT_REFRESH_SECRET="your-secret-here"

# Admin Bootstrap
ADMIN_BOOTSTRAP_EMAIL="admin@example.com"
ADMIN_BOOTSTRAP_PASSWORD="SecurePassword123!"

# Redis (optional, defaults to localhost)
REDIS_URL="redis://localhost:6379"

# API Configuration
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-site-key"
RECAPTCHA_SECRET="your-secret-key"

# Bitrix24
BITRIX24_WEBHOOK_URL="https://your-domain.bitrix24.kz/rest/..."
BITRIX24_USE_STUB="false"  # Set to "true" for dev

# Email (SMTP)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-username"
SMTP_PASS="your-password"
SMTP_FROM="noreply@example.com"
EMAIL_NOTIFICATIONS_TO="admin@example.com"

# Analytics (optional)
GA4_MEASUREMENT_ID="G-XXXXXXXXXX"
YANDEX_METRICA_COUNTER_ID="12345678"
```

## Testing Patterns

### API Tests

Located in `apps/api/src/**/*.test.ts` and `apps/api/tests/`:

**Use test helpers** from `apps/api/src/test/setup.ts`:
- `setupTestApp()` - Clean DB + create authenticated admin
- `authenticateTestAdmin()` - Get auth tokens
- `cleanupDatabase()` - Delete all test data
- `createTestService()`, `createTestCase()`, etc. - Create sample data
- `expectSuccessResponse()`, `expectErrorResponse()` - Assert response shape
- `measureResponseTime()` - Performance testing

**Test database**: Uses separate PostgreSQL instance (port 5433) configured via `TEST_DATABASE_URL`.

**Example pattern**:
```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app';
import { setupTestApp, cleanupDatabase } from '../test/setup';

describe('Services API', () => {
  let authToken: string;

  beforeAll(async () => {
    const { tokens } = await setupTestApp();
    authToken = tokens.accessToken;
  });

  afterAll(async () => {
    await cleanupDatabase();
  });

  it('should list services', async () => {
    const response = await request(app)
      .get('/api/services')
      .expect(200);
    
    expect(response.body.data).toBeInstanceOf(Array);
  });
});
```

### Web Tests

Component tests using Vitest + React Testing Library in `apps/web/src/**/*.test.tsx`:

**Setup**: `vitest.setup.ts` loads `@testing-library/jest-dom/vitest` matchers.

**Accessibility testing**:
- Run `npm run test:a11y` for Axe-core checks
- Lighthouse audits via `npm run audit:lighthouse` (requires running dev server)

## Code Conventions

### API Modules

When creating a new API module:
1. Create directory in `apps/api/src/modules/<module-name>/`
2. Add `<module-name>.router.ts` with Express routes
3. Add `<module-name>.schemas.ts` with Zod validation schemas
4. Register router in `apps/api/src/app.ts`
5. Add tests in `<module-name>.test.ts`

### Component Structure

- Server Components by default (no 'use client')
- Add 'use client' only when using hooks, state, or browser APIs
- Prefer composition over prop drilling
- Use Tailwind CSS classes with `cn()` utility from `@/lib/utils`
- Follow accessibility best practices (ARIA labels, semantic HTML, keyboard navigation)

### Import Aliases

- API: `@/` maps to `apps/api/src/`
- Web: `@/` maps to `apps/web/src/`
- Use aliases consistently: `import { foo } from '@/lib/bar'`

## Storybook

Storybook available for UI component development:

```bash
cd apps/web
npm run storybook        # Start Storybook dev server (port 6006)
npm run build-storybook  # Build static Storybook
```

Stories located in `apps/web/src/stories/`.

## Deployment

Production deployment uses Docker Compose:

```bash
# Build and start all services
docker-compose up -d

# Services available:
# - Web: port 3000
# - API: port 4000
# - Admin: port 3001
# - Nginx reverse proxy: ports 80/443
# - PostgreSQL: port 5432
# - Redis: port 6379

# With monitoring stack
docker-compose --profile observability up -d
# - Prometheus: port 9090
# - Grafana: port 3001
```

See `docker-compose.yml` for full configuration.

## AI Agent Integration

This project uses **Task Master AI** for task tracking and workflow management. Task definitions are in `.taskmaster/tasks/tasks.json`.

**Daily workflow with Task Master**:
1. `task-master next` - Get next task
2. `task-master show <id>` - Review requirements
3. Implement feature
4. `task-master update-subtask --id=<id> --prompt="notes"` - Log progress
5. `task-master set-status --id=<id> --status=done` - Complete

**Never manually edit** `.taskmaster/tasks/tasks.json` - use CLI commands instead.

## Access Points

When development servers are running:

- **Website**: http://localhost:3000
- **API**: http://localhost:4000
- **API Docs**: http://localhost:4000/docs (Swagger UI)
- **API Health**: http://localhost:4000/health
- **Admin Panel**: http://localhost:5173
- **Prisma Studio**: Run `cd apps/api && pnpm prisma studio` → http://localhost:5555
- **Storybook**: Run `cd apps/web && npm run storybook` → http://localhost:6006
