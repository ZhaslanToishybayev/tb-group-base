# 🔓 Production Testing Access Guide

## Issue
All Vercel deployments are protected by authentication (401 error).

## Solutions (Choose One)

### Option 1: Disable Protection in Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select project: `tb-group-base-current-changes-backup`
3. Go to **Settings** → **Functions**
4. Find **"Deployment Protection"**
5. Turn it **OFF**
6. Redeploy or wait 5 minutes for changes to take effect
7. Test: https://tb-group-base-current-changes-backup-1kw5t57qb.vercel.app

### Option 2: Use Vercel CLI with Bypass Token

1. Install Vercel MCP (if not already):
   ```bash
   npm i -g @vercel/mcp
   ```

2. Get bypass token from Vercel dashboard:
   - Project Settings → Functions → Protection Bypass

3. Access with token:
   ```
   https://tb-group-base-current-changes-backup-1kw5t57qb.vercel.app?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=YOUR_TOKEN
   ```

### Option 3: Local Testing (Already Working)

1. Local server is running at: http://localhost:3000
2. All features can be tested locally
3. Forms will work (API routes active)
4. Note: Some external integrations (GA4, Bitrix24) need production environment

---

## Quick Production Test

Once access is resolved, test these key features:

### 1. Main Page
- [ ] Site loads completely
- [ ] 3D background animates
- [ ] All sections visible
- [ ] Russian navigation works

### 2. Contact Form
- [ ] Click "Получить консультацию" button
- [ ] Fill out form with test data
- [ ] Submit form
- [ ] Verify success message
- [ ] Check Bitrix24 for new lead

### 3. Search
- [ ] Press `Cmd+K` (or `Ctrl+K`)
- [ ] Type "Мой Склад"
- [ ] Select result
- [ ] ESC to close

### 4. Navigation
- [ ] Click each menu item
- [ ] Smooth scroll to section
- [ ] Works on mobile (resize browser)

### 5. Live Chat
- [ ] Click chat bubble
- [ ] Try quick actions
- [ ] Verify it opens/closes

### 6. Newsletter
- [ ] Find newsletter form (footer or middle section)
- [ ] Enter email
- [ ] Subscribe
- [ ] Verify success

### 7. Analytics (Check Browser Console)
- [ ] Open DevTools (F12)
- [ ] Go to Console
- [ ] Look for GA4 initialization
- [ ] No errors should appear

---

## Expected Test Results

✅ **Success Indicators:**
- Forms submit without errors
- Success messages appear
- Bitrix24 receives leads
- Console shows no errors
- Search opens with Cmd+K
- All pages load quickly

❌ **Issues to Report:**
- 500 errors on form submit
- Console errors
- Broken layouts
- Missing sections
- Non-functional buttons

---

## Current Deployment URLs

### Active (Protected)
- https://tb-group-base-current-changes-backup-1kw5t57qb.vercel.app (Latest)
- https://tb-group-base-current-changes-backup-63avk3hgn.vercel.app

### Previous (Protected)
- https://tb-group-base-current-changes-backup-es8gt53l6.vercel.app
- https://tb-group-base-current-changes-backup-1zh2gn5qm.vercel.app
- And 6+ more...

**All require authentication until protection is disabled.**

---

## Performance Testing

After production access, run:

1. **Lighthouse Audit**
   - Open DevTools → Lighthouse
   - Generate report
   - Target: >90 scores

2. **Core Web Vitals**
   - Check in DevTools → Lighthouse
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

3. **Cross-Browser**
   - Chrome ✅
   - Firefox
   - Safari
   - Edge

4. **Mobile Testing**
   - iOS Safari
   - Android Chrome
   - Various screen sizes

---

## Need Help?

If you still can't access the site:
1. Check Vercel dashboard for project settings
2. Verify you're logged into correct Vercel account
3. Try Option 3 (local testing) as fallback
4. Contact Vercel support if protection won't disable

**Current Status:** ✅ v1.0 code complete, ⚠️ production testing blocked by auth

