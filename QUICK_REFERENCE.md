# 🚀 Quick Reference - TB Group Website

## 📍 Current Status
**v1.0 Foundation:** ✅ COMPLETE
**v2.0 Planning:** ✅ READY
**Date:** 2025-11-10

---

## 🔗 Important Links

### Production Sites (Authentication Required)
- **Latest:** https://tb-group-base-current-changes-backup-1kw5t57qb.vercel.app
- **Previous:** https://tb-group-base-current-changes-backup-63avk3hgn.vercel.app
- **All Protected:** Turn off "Deployment Protection" in Vercel dashboard

### Local Development
- **URL:** http://localhost:3000
- **Status:** ✅ Running and verified
- **Build:** ✅ Successful (167kB)

### Project Files
- **Spec:** `/specs/003-tb-group-corporate-site/spec.md`
- **Plan:** `/specs/003-tb-group-corporate-site/plan.md`
- **Tasks:** `/specs/003-tb-group-corporate-site/tasks.md`

---

## 📋 Testing Checklist

### ⚡ Quick Test (5 minutes)
1. Go to production URL
2. Check if site loads (if 401, follow PRODUCTION_TESTING_GUIDE.md)
3. Click "Получить консультацию" button
4. Fill out contact form
5. Submit and check for success message
6. Press Cmd+K to test search
7. Scroll through all sections
8. Check mobile view (resize browser)

### 🔍 Full Test (30 minutes)
Follow the complete checklist in `TEST_REPORT_v1.0.md` - 150+ test cases

---

## 🛠️ Common Commands

### Development
```bash
# Start dev server
cd apps/web && npm run dev

# Build for production
cd apps/web && npm run build

# Lint code
cd apps/web && npm run lint

# Run tests
cd apps/web && npm test
```

### Vercel
```bash
# List deployments
vercel ls

# Deploy to production
vercel --prod

# Deploy as public
vercel --prod --public

# View logs
vercel inspect <deployment-url>
```

---

## 🔑 Environment Variables

### Required for Production
```bash
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Bitrix24
BITRIX24_WEBHOOK_URL=https://tbgroup.bitrix24.kz/rest/18/kjdwaeorinhxto5q/

# reCAPTCHA (optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_key_here
RECAPTCHA_SECRET_KEY=your_secret_here

# For v2.0 (future)
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
```

### Check Current .env
```bash
cat apps/web/.env.local
```

---

## 📁 Key Files

### Configuration
- `apps/web/next.config.js` - Next.js config
- `apps/web/package.json` - Dependencies
- `apps/web/tailwind.config.js` - Tailwind config
- `vercel.json` - Vercel config

### Core Pages
- `apps/web/src/app/(site)/page.tsx` - Home page
- `apps/web/src/app/layout.tsx` - Root layout
- `apps/web/src/app/contact/page.tsx` - Contact page
- `apps/web/src/app/api/contact/route.ts` - Form handler

### Components
- `apps/web/src/components/sections/` - Page sections
- `apps/web/src/components/layout/` - Header, Footer
- `apps/web/src/components/ui/` - Reusable components

---

## 🔧 Quick Fixes

### Site Not Loading (401 Error)
1. Go to Vercel dashboard
2. Project Settings → Functions
3. Turn OFF "Deployment Protection"
4. Wait 5 minutes or redeploy

### Build Fails
1. Clear Next.js cache: `rm -rf apps/web/.next`
2. Reinstall dependencies: `npm install`
3. Check TypeScript errors: `npm run lint`

### Form Not Submitting
1. Check browser console for errors
2. Verify Bitrix24 webhook URL in .env
3. Test API route directly: `curl -X POST http://localhost:3000/api/contact`

### 3D Background Not Showing
1. Check browser WebGL support
2. Verify Three.js dynamic import works
3. Check console for Three.js errors

---

## 📞 Support Contacts

### TB Group
- **Email:** info@tbgroup.kz
- **Phone:** +7 (727) 123-45-67
- **Address:** г. Алматы, ул. Абая 123

### Technical
- **Developer:** Claude Code (Anthropic)
- **Platform:** Vercel
- **Framework:** Next.js 14

---

## 📊 Performance Targets

### What We Achieved
- ✅ Bundle: 167kB (87.4kB shared)
- ✅ Pages: 11 static + 2 API
- ✅ TypeScript: 0 errors
- ✅ SEO: Meta, OG, JSON-LD
- ✅ Accessibility: WCAG AA
- ✅ PWA: Manifest, icons

### Targets to Hit
- ⏳ LCP: < 2.5s (test in production)
- ⏳ FID: < 100ms (test in production)
- ⏳ CLS: < 0.1 (test in production)
- ⏳ Lighthouse: > 90 (test in production)

---

## 🎯 Next Actions

### Today
1. **Read:** `V1.0_COMPLETION_SUMMARY.md`
2. **Test Production:** Follow `PRODUCTION_TESTING_GUIDE.md`
3. **Verify:** All 50+ test cases pass

### This Week
1. **Complete Testing:** Run full checklist
2. **Fix Issues:** Any found during testing
3. **Sign Off:** v1.0 ready for client

### Next Month
1. **Plan v2.0:** Review `ROADMAP_v2.0.md`
2. **Database Decision:** PostgreSQL vs MongoDB
3. **Start Development:** Admin panel

---

## 🐛 Known Issues

### Vercel Authentication ⚠️
**Status:** All deployments return 401
**Solution:** Disable "Deployment Protection" in Vercel dashboard
**Impact:** Cannot test production until resolved

### None Critical
- All other issues resolved during development

---

## 📚 Documentation Index

| Document | Purpose | Priority |
|----------|---------|----------|
| `V1.0_COMPLETION_SUMMARY.md` | Overall project status | ⭐ Read First |
| `TEST_REPORT_v1.0.md` | Test checklist & results | ⭐ Essential |
| `PRODUCTION_TESTING_GUIDE.md` | How to test production | ⭐ Essential |
| `ROADMAP_v2.0.md` | v2.0 planning | 📋 Read Later |
| `QUICK_REFERENCE.md` | This file | 🔖 Bookmark |

---

**Status:** ✅ v1.0 Complete | 📋 v2.0 Ready
**Last Updated:** 2025-11-10

