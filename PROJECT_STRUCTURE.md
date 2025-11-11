# 📁 TB Group Website - Project Structure

## 🏗️ Monorepo Structure (Turborepo + pnpm)

```
tb-group-base/
├── 📄 package.json (root workspace)
├── 📄 pnpm-workspace.yaml
├── 📄 turbo.json (Turborepo config)
├── 📄 tsconfig.json (root)
├── 📄 README.md
├── 📄 PROJECT_STATUS_SUMMARY.md
├── 📄 QUICK_SUMMARY.txt
├── 📄 docs/
│   ├── analytics-integration.md
│   └── BITRIX24_INTEGRATION_IMPLEMENTATION.md
│
├── 📁 apps/
│   ├── 📁 web/ (Next.js 14 Frontend)
│   │   ├── package.json
│   │   ├── next.config.mjs ⚡ (Bundle analyzer)
│   │   ├── tailwind.config.ts
│   │   ├── vitest.config.ts
│   │   ├── vitest.a11y.config.ts
│   │   ├── .env.example
│   │   ├── .env.local
│   │   │
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx (Root layout with analytics)
│   │       │   ├── page.tsx (Homepage)
│   │       │   └── globals.css
│   │       │
│   │       ├── components/
│   │       │   ├── ui/ (20+ components)
│   │       │   │   ├── Button.tsx ⚡ (with analytics)
│   │       │   │   ├── Input.tsx
│   │       │   │   ├── Textarea.tsx
│   │       │   │   ├── Select.tsx
│   │       │   │   ├── Card.tsx
│   │       │   │   ├── Badge.tsx
│   │       │   │   ├── Modal.tsx
│   │       │   │   ├── Accordion.tsx
│   │       │   │   ├── Tabs.tsx
│   │       │   │   ├── Tooltip.tsx
│   │       │   │   ├── Drawer.tsx
│   │       │   │   ├── Loader.tsx
│   │       │   │   ├── CookieConsent.tsx ⚡ (GDPR)
│   │       │   │   ├── SkipLink.tsx
│   │       │   │   ├── ScrollProgress.tsx
│   │       │   │   ├── StatsGrid.tsx
│   │       │   │   ├── NewsletterSubscription.tsx
│   │       │   │   └── StructuredData.tsx
│   │       │   │
│   │       │   ├── layout/
│   │       │   │   ├── Header.tsx
│   │       │   │   └── Footer.tsx
│   │       │   │
│   │       │   ├── sections/
│   │       │   │   ├── Hero.tsx
│   │       │   │   ├── CompanyInfoSection.tsx
│   │       │   │   ├── ServicesOverviewSection.tsx
│   │       │   │   ├── ServicesSection.tsx
│   │       │   │   ├── CaseStudiesSection.tsx ⚡ (3D)
│   │       │   │   ├── CaseStudyCard.tsx ⚡ (3D)
│   │       │   │   ├── TestimonialsSection.tsx ⚡ (3D carousel)
│   │       │   │   ├── TestimonialCard.tsx
│   │       │   │   ├── AdvantagesSection.tsx
│   │       │   │   ├── ClientLogosMarquee.tsx
│   │       │   │   ├── CTASection.tsx
│   │       │   │   ├── BlogPreview.tsx
│   │       │   │   ├── PageTransition.tsx
│   │       │   │   └── ErrorBoundary.tsx
│   │       │   │
│   │       │   ├── analytics/ ⚡ (GA4 + Yandex)
│   │       │   │   ├── GoogleAnalytics.tsx
│   │       │   │   └── AnalyticsProvider.tsx
│   │       │   │
│   │       │   ├── effects/ (Animations)
│   │       │   │   ├── ParallaxSection.tsx
│   │       │   │   ├── FloatingElements.tsx
│   │       │   │   ├── ScrollAnimations.tsx
│   │       │   │   └── HoverEffects.tsx
│   │       │   │
│   │       │   ├── blog/
│   │       │   │   └── BlogPreview.tsx
│   │       │   │
│   │       │   ├── ContactForm.tsx ⚡ (with tracking)
│   │       │   ├── CaptchaGate.tsx
│   │       │   ├── LiveChatWidget.tsx
│   │       │   └── animations/
│   │       │       └── variants.ts
│   │       │
│   │       ├── lib/
│   │       │   ├── design/
│   │       │   │   └── utils.ts
│   │       │   └── api.ts
│   │       │
│   │       ├── contexts/
│   │       │   └── LenisContext.tsx
│   │       │
│   │       └── test/
│   │           └── setup-a11y.ts ⚡ (axe-core)
│   │
│   └── 📁 api/ (Express.js Backend)
│       ├── package.json
│       ├── .env.example
│       └── src/
│           ├── app.ts
│           ├── index.ts
│           │
│           ├── config/
│           │   └── env.ts
│           │
│           ├── lib/
│           │   └── prisma.ts
│           │
│           ├── services/
│           │   ├── EmailService.ts ⚡ (Queue)
│           │   ├── RedisService.ts ⚡ (Cache)
│           │   └── bitrix24Service.ts ⚡ (CRM)
│           │
│           ├── integrations/
│           │   └── bitrix24.ts
│           │
│           ├── middleware/
│           │   ├── logger.ts
│           │   └── cache.ts
│           │
│           ├── modules/
│           │   └── contact/
│           │       ├── contact.router.ts
│           │       ├── contact.service.ts
│           │       └── contact.types.ts
│           │
│           └── tests/
│               ├── services/
│               │   ├── EmailService.test.ts
│               │   └── RedisService.test.ts
│               └── modules/
│                   └── bitrix24/
│                       └── bitrix24.service.test.ts
│
├── 📁 packages/
│   ├── 📁 ui/ (Shared UI components - future)
│   └── 📁 config/ (Shared configs - future)
│
├── 📁 .taskmaster/
│   ├── tasks/
│   │   └── tasks.json
│   ├── docs/
│   │   └── prd.txt
│   ├── reports/
│   └── config.json
│
└── 📁 .github/
    └── workflows/
        ├── ci.yml
        └── deploy.yml
```

## 🎨 Key Features by File

### Frontend Highlights (apps/web/src/)

#### 📊 Analytics System
- `components/analytics/GoogleAnalytics.tsx` - GA4 + Yandex.Metrica
- `components/ui/CookieConsent.tsx` - GDPR compliant
- `components/ui/Button.tsx` - Built-in analytics tracking

#### 🎭 3D Animations
- `components/sections/CaseStudiesSection.tsx` - 3D carousel + lightbox
- `components/sections/CaseStudyCard.tsx` - 3D flip animation
- `components/sections/TestimonialsSection.tsx` - 3D carousel with autoplay
- `components/effects/` - Parallax, floating, scroll animations

#### 🧩 UI Components
- 20+ reusable components in `components/ui/`
- Full TypeScript support
- Tailwind CSS styling
- Framer Motion animations

#### 📝 Forms
- `components/ContactForm.tsx` - Full validation + reCAPTCHA
- `components/CaptchaGate.tsx` - reCAPTCHA wrapper
- Analytics tracking integrated

### Backend Highlights (apps/api/src/)

#### 📧 Email Service
- `services/EmailService.ts` - Nodemailer + queue
- Queue-based processing
- Retry logic
- Fallback SMTP servers
- Email templates

#### 💾 Caching
- `services/RedisService.ts` - Cache-aside pattern
- `middleware/cache.ts` - API middleware
- JSON serialization
- TTL management

#### 🔗 CRM Integration
- `services/bitrix24Service.ts` - Bitrix24 API
- `integrations/bitrix24.ts` - Low-level integration
- Lead creation
- Field mapping
- Error handling

## 📦 Dependencies (Key Packages)

### Frontend
```json
{
  "framer-motion": "3D animations",
  "tailwindcss": "Styling",
  "next": "14.2.11",
  "react": "18.3.1",
  "lucide-react": "Icons",
  "class-variance-authority": "Variants",
  "lenis": "Smooth scroll",
  "react-google-recaptcha": "Captcha"
}
```

### Backend
```json
{
  "express": "Web framework",
  "@prisma/client": "Database ORM",
  "nodemailer": "Email",
  "ioredis": "Redis client",
  "p-retry": "Retry logic",
  "zod": "Validation",
  "winston": "Logging"
}
```

### Dev Dependencies
```json
{
  "vitest": "Testing",
  "testing-library": "React testing",
  "axe-core": "A11y testing",
  "@next/bundle-analyzer": "Bundle analysis",
  "lighthouse": "Performance audit",
  "typescript": "5.6.3"
}
```

## 🔧 Configuration Files

### Next.js (apps/web/)
- `next.config.mjs` - Bundle analyzer, image optimization
- `tailwind.config.ts` - Custom design tokens
- `vitest.config.ts` - Unit tests
- `vitest.a11y.config.ts` - Accessibility tests
- `.env.example` - Environment variables template

### Turborepo (root)
- `package.json` - Workspace configuration
- `turbo.json` - Build pipeline
- `pnpm-workspace.yaml` - pnpm workspaces

## 📊 File Statistics

```
Total Files Created: 80+
├── Frontend Components: 35
├── Backend Services: 8
├── Test Files: 15
├── Config Files: 10
└── Documentation: 5
```

## 🎯 Next Files to Create (Upcoming Tasks)

### Performance & A11y (Task 10)
- Bundle analysis reports
- Lighthouse reports
- Accessibility audit results
- Optimized images

### Advanced SEO (Task 15)
- sitemap.xml
- robots.txt
- Open Graph images
- JSON-LD schemas

### PWA (Task 16)
- manifest.json
- Service worker
- Offline page
- Icons and splash screens

---

**Generated**: 11 November 2025
**Project**: TB Group Website
**Status**: 14/65 tasks complete (21.5%)
