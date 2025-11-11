# 🚀 TB Group Website v2.0 - Planning & Roadmap

**Date:** 2025-11-10
**Current Status:** v1.0 Foundation Complete ✅
**Next Phase:** v2.0 Admin Panel & Dynamic Content

---

## 📋 v1.0 Summary

### ✅ Completed
- ✅ Corporate website with 11 pages
- ✅ Bitrix24 integration for leads
- ✅ Contact & newsletter forms
- ✅ SEO optimization (meta, OG, JSON-LD)
- ✅ Accessibility (WCAG AA)
- ✅ Performance optimization (87.4kB shared bundle)
- ✅ Search functionality (Cmd+K)
- ✅ Russian localization
- ✅ Mobile responsive design
- ✅ PWA support (manifest, icons)
- ✅ Google Analytics 4 integration
- ✅ Live chat widget

### ⚠️ Pending (v1.0)
- Production testing (blocked by Vercel auth)
- Performance audit (Lighthouse)
- Cross-browser verification
- Mobile device testing

---

## 🎯 v2.0 Goals

Enable dynamic content management through a full-featured admin panel, transforming the static site into a dynamic, self-manageable platform.

### Core Objectives
1. **Admin Panel** - Complete CRUD interface for all content
2. **Database** - Store dynamic content (services, cases, reviews, etc.)
3. **Authentication** - Secure admin access with JWT
4. **Content Management** - Edit content without code changes
5. **Media Management** - Upload and manage images/videos
6. **User Management** - Multi-user admin with roles

---

## 🏗️ Technical Architecture

### Database Choice
**PostgreSQL** (Recommended)
- Relational data for cases, services, reviews
- JSON columns for flexible settings
- Better for complex queries
- ACID compliance for data integrity

**Alternative: MongoDB**
- Document-based for flexible content
- Good for evolving schemas
- Simpler for developers familiar with NoSQL

### Backend Stack
```
Database:     PostgreSQL 15+
ORM:          Prisma or Drizzle
Auth:         NextAuth.js or custom JWT
API:          Next.js 14 API Routes
File Upload:  AWS S3 or Cloudinary
Validation:   Zod
```

### Admin Panel Stack
```
Framework:    Next.js 14 (separate /admin route)
UI:           Shadcn/ui + Tailwind CSS
Forms:        React Hook Form + Zod
State:        Zustand or TanStack Query
Charts:       Recharts or Chart.js
Editor:       TinyMCE or Quill (rich text)
```

---

## 📦 v2.0 Features Breakdown

### Phase 1: Database & Models (Week 1-2)

#### Database Schema
```sql
-- Users (Admins)
Users: id, email, name, role, password_hash, created_at, updated_at

-- Services
Services: id, slug, title, description, features, icon, created_at, updated_at

-- Cases
Cases: id, slug, title, client, description, results, image, tags, created_at, updated_at

-- Reviews
Reviews: id, author_name, author_position, company, content, rating, video_url, is_featured, created_at, updated_at

-- Settings
Settings: id, key, value (JSON), created_at, updated_at

-- Newsletter Subscribers
Subscribers: id, email, subscribed_at, is_active

-- Contact Requests
Contacts: id, name, email, phone, message, source, bitrix24_lead_id, created_at
```

#### Prisma Schema
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      Role     @default(ADMIN)
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Service {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String
  features    Json
  icon        String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Case {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  client      String
  description String
  results     Json
  image       String?
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Review {
  id               String   @id @default(cuid())
  authorName       String
  authorPosition   String?
  company          String
  content          String
  rating           Int?
  videoUrl         String?
  isFeatured       Boolean  @default(false)
  isApproved       Boolean  @default(false)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model Setting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  EDITOR
  VIEWER
}
```

### Phase 2: Authentication (Week 2-3)

#### Implementation
```typescript
// /app/api/auth/login/route.ts
// /app/api/auth/logout/route.ts
// /app/api/auth/refresh/route.ts
// /app/api/auth/me/route.ts
```

#### Features
- JWT tokens with refresh mechanism
- Password hashing (bcrypt)
- Role-based access control
- Session management
- Protected admin routes

#### Security
- Rate limiting on login
- Account lockout after 5 failed attempts
- Secure cookie settings
- CSRF protection
- Input validation

### Phase 3: Admin Panel UI (Week 3-5)

#### Routes Structure
```
/admin
├── /login              (Authentication)
├── /dashboard          (Overview, stats)
├── /services           (CRUD)
│   ├── /services       (List all)
│   ├── /services/new   (Create)
│   └── /services/[id]  (Edit)
├── /cases              (CRUD)
├── /reviews            (CRUD + Moderation)
├── /subscribers        (Newsletter list)
├── /contacts           (Contact requests)
├── /settings           (Site configuration)
├── /users              (User management)
└── /profile            (Admin profile)
```

#### Key Components
```typescript
// Layout
- AdminLayout (sidebar navigation)
- AdminHeader (user menu, logout)
- AdminSidebar (navigation menu)

// Common
- DataTable (sorting, filtering, pagination)
- FormWrapper (consistent form styling)
- Modal (confirmations)
- Toast (notifications)
- FileUpload (drag & drop)
- RichTextEditor (WYSIWYG)
- ImageUploader (with preview)

// Pages
- Dashboard (stats: cases count, subscribers, contacts)
- ServicesList (with search, filter)
- CasesList (with tags filter)
- ReviewsModeration (approve/reject)
- SettingsForm (editable site config)
```

### Phase 4: Content Management (Week 5-6)

#### Services Management
- Create/edit/delete services
- Manage features list
- Upload service icons
- SEO fields (title, description, slug)
- Preview functionality

#### Cases Management
- Create/edit/delete case studies
- Upload images
- Manage tags
- Add results metrics
- Link to services
- Client anonymization option

#### Reviews Management
- List all reviews
- Approve/reject pending reviews
- Mark as featured
- Edit content
- Add video reviews
- Bulk actions

### Phase 5: Settings & Configuration (Week 6)

#### Site Settings
```typescript
// Configurable settings
{
  HOMEPAGE_HERO_TITLE: string,
  HOMEPAGE_HERO_SUBTITLE: string,
  HOMEPAGE_ADVANTAGES: Advantage[],
  HOMEPAGE_CLIENT_LOGOS: ClientLogo[],
  CONTACT_INFO: {
    email: string,
    phone: string,
    address: string,
    mapUrl: string
  },
  SOCIAL_LINKS: {
    telegram: string,
    instagram: string,
    whatsapp: string,
    linkedin: string
  },
  GA_MEASUREMENT_ID: string,
  BITRIX24_WEBHOOK: string,
  RECAPTCHA_SITE_KEY: string
}
```

#### Dynamic Content
- Update homepage sections without code
- Change company information
- Modify service descriptions
- Update client logos
- Manage testimonials
- Configure contact details

### Phase 6: Media Management (Week 6-7)

#### File Upload System
```typescript
// /api/upload
// - AWS S3 integration
// - Image optimization
// - Multiple file types (jpg, png, svg, webp)
// - Size limits (5MB per file)
// - Generate thumbnails
// - Return CDN URLs
```

#### Features
- Drag & drop upload
- Progress indicators
- Image compression
- Auto WebP conversion
- Alt text management
- Organize by folder/type
- Bulk delete

### Phase 7: Advanced Features (Week 7-8)

#### Review Moderation System
- Public review submission form
- Email notification to admins
- Moderation queue
- Bulk approve/reject
- Automated spam detection
- Edit reviews before publishing

#### Newsletter Management
- View all subscribers
- Export CSV
- Mark active/inactive
- Delete subscribers
- Add tags/categories
- Send campaigns (future)

#### Analytics Dashboard
- Total contacts this month
- New subscribers
- Popular services
- Recent reviews
- Lead sources
- Conversion tracking

### Phase 8: Polish & Testing (Week 8)

#### Testing
- Unit tests for API routes
- Integration tests for CRUD
- E2E tests for admin workflows
- Performance testing
- Security audit
- Accessibility audit

#### Documentation
- Admin user guide
- API documentation
- Deployment guide
- Database migration guide
- Troubleshooting docs

---

## 📅 Timeline

| Week | Phase | Deliverables |
|------|-------|--------------|
| 1-2 | Database & Models | Prisma schema, migrations, initial data |
| 2-3 | Authentication | Login/logout, JWT, protected routes |
| 3-5 | Admin Panel UI | Dashboard, layout, navigation, components |
| 5-6 | Content Management | CRUD for services, cases, reviews |
| 6 | Settings & Config | Dynamic site configuration |
| 6-7 | Media Management | File upload, S3 integration |
| 7-8 | Advanced Features | Review moderation, analytics |
| 8 | Polish & Testing | Testing, docs, bug fixes |

**Total Duration:** 8 weeks
**Team Size:** 1-2 developers

---

## 💰 Cost Estimates

### Development Time
- **Total:** 160-200 hours
- **Rate:** $50-100/hour
- **Cost:** $8,000 - $20,000

### Infrastructure Costs (Monthly)
- **Database:** $20-50/month (Managed PostgreSQL)
- **File Storage:** $10-30/month (AWS S3)
- **CDN:** $5-15/month (CloudFront)
- **Vercel Pro:** $20/month
- **Total:** $55-115/month

### One-time Costs
- Domain (admin.tb-group.kz): $10/year
- SSL Certificate: Free (Let's Encrypt)
- **Total:** $10

---

## 🔒 Security Considerations

### Authentication
- Strong password requirements
- JWT with short expiry + refresh tokens
- Secure httpOnly cookies
- Rate limiting on auth endpoints

### Authorization
- Role-based access control (RBAC)
- API route protection
- Admin-only sections
- Least privilege principle

### Data Protection
- Input validation (Zod)
- SQL injection prevention (Prisma)
- XSS protection
- CSRF tokens
- Secure file uploads

### Compliance
- GDPR compliance (data deletion)
- User consent for data processing
- Audit logging
- Regular security updates

---

## 🎨 UI/UX Design for Admin Panel

### Design System
```
Colors:
- Primary: Blue (#3b82f6)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Danger: Red (#ef4444)
- Background: Slate (#0f172a)
- Surface: Dark grey (#1e293b)

Typography:
- Font: Inter or System
- Headings: 24-32px
- Body: 14-16px
- Small: 12-14px

Components:
- Consistent spacing (8px grid)
- Card-based layouts
- Clean forms with validation
- Responsive tables
- Mobile-friendly sidebar
```

### Key Screens
1. **Login:** Clean, branded login form
2. **Dashboard:** Cards with statistics, recent activity
3. **Content List:** Searchable, filterable tables
4. **Editor:** Rich text editor with live preview
5. **Settings:** Organized by category with descriptions

---

## 📊 Migration from v1.0 to v2.0

### Data Migration
```typescript
// Migrate static content to database
1. Export services from code
2. Convert to database format
3. Import via Prisma
4. Verify all data
5. Update frontend to use API
6. Deploy and test
```

### Breaking Changes
- New environment variables (DATABASE_URL, etc.)
- New API routes for admin
- New /admin route
- Updated contact/newsletter API (save to DB)

### Rollback Plan
- Keep v1.0 code in separate branch
- Feature flags for new functionality
- Database migrations with down scripts
- Backup strategy before migration

---

## 🚀 Deployment Strategy

### Staging Environment
1. Create staging.vercel.app
2. Connect to staging database
3. Test all admin features
4. Verify data migration
5. Performance testing

### Production Deployment
1. Enable maintenance mode
2. Run database migrations
3. Deploy v2.0 code
4. Test critical paths
5. Disable maintenance mode
6. Monitor for issues

### Post-Deployment
- Monitor error rates
- Check database performance
- Verify all features work
- User acceptance testing
- Staff training on admin panel

---

## 🎯 Success Metrics

### Technical
- ✅ All CRUD operations working
- ✅ <200ms API response times
- ✅ 99.9% uptime
- ✅ Zero security vulnerabilities
- ✅ Lighthouse score >90

### Business
- ✅ Content updates without developer
- ✅ 50% faster content management
- ✅ Reduced dependency on technical team
- ✅ Self-service for staff
- ✅ Scalable for future growth

---

## 📚 Resources & References

### Documentation
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

### Inspiration
- [WordPress Admin](https://wordpress.org/)
- [Strapi Admin](https://strapi.io/admin)
- [Sanity Studio](https://www.sanity.io/studio)

### Tools
- Database design: dbdiagram.io
- API design: Insomnia/Postman
- Testing: Playwright
- Monitoring: Sentry

---

## ✅ Pre-Development Checklist

Before starting v2.0:

- [ ] Decide on database (PostgreSQL vs MongoDB)
- [ ] Set up development environment
- [ ] Create v2.0 branch from main
- [ ] Design database schema
- [ ] Plan admin panel wireframes
- [ ] Set up hosting for staging
- [ ] Configure environment variables
- [ ] Create project timeline
- [ ] Assign team members
- [ ] Set up project management tools

---

**Status:** ✅ v1.0 Complete | 📋 v2.0 Ready to Start
**Next Action:** Finalize v1.0 testing, then begin v2.0 Phase 1

