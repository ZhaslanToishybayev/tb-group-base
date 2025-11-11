# Analytics Integration Documentation

## Overview

This document describes the comprehensive analytics integration implemented in the TB Group website, supporting both Google Analytics 4 (GA4) and Yandex.Metrica with cookie consent management.

## Implemented Features

### 1. Multi-Platform Analytics Support

- **Google Analytics 4 (GA4)**: Full tracking implementation with event monitoring
- **Yandex.Metrica**: Complete integration with goal tracking and webvisor
- **Dual Tracking**: Events are sent to both platforms simultaneously for comprehensive data collection

### 2. Cookie Consent Management

A fully-featured cookie consent component that:
- Displays a customizable banner on first visit
- Allows users to accept all, reject all, or customize preferences
- Stores consent in localStorage with expiration (365 days)
- Provides separate controls for:
  - **Necessary cookies** (always enabled)
  - **Analytics cookies** (optional)
  - **Marketing cookies** (optional)
- Tracks consent decisions in analytics
- Respects user preferences and only initializes analytics if consented

### 3. Event Tracking

#### Predefined Event Types

**GA4 Events:**
- `form_submit` - Form submission attempt
- `form_success` - Successful form submission
- `form_error` - Form submission error
- `cta_click` - CTA button clicks
- `nav_click` - Navigation clicks
- `external_link` - External link clicks
- `page_view` - Page view tracking
- `section_view` - Section view tracking

**Yandex.Metrica Events:**
- Corresponding uppercase event names (e.g., `FORM_SUBMIT`, `CTA_CLICK`)

#### Form Analytics

The ContactForm component includes comprehensive tracking:
- Tracks submission attempts
- Tracks validation errors (with field names)
- Tracks successful submissions (with service interest)
- Tracks submission failures (with error messages)

#### Button Analytics

The Button component supports:
- `analyticsEvent` prop for custom event names
- `analyticsParams` prop for additional event parameters
- Automatic tracking of button text and timestamp
- SSR-safe dynamic imports

### 4. Environment Configuration

Required environment variables in `apps/web/.env.local`:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Yandex.Metrica
NEXT_PUBLIC_YANDEX_ID=12345678

# reCAPTCHA (if used)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
```

## File Structure

### Core Analytics Files

```
apps/web/src/components/analytics/
├── GoogleAnalytics.tsx     # GA4 & Yandex.Metrica initialization
└── AnalyticsProvider.tsx   # React context for analytics (optional)
```

### UI Components

```
apps/web/src/components/ui/
├── Button.tsx              # Enhanced with analyticsEvent prop
└── CookieConsent.tsx       # Full-featured cookie consent banner
```

### Updated Components

```
apps/web/src/components/
├── ContactForm.tsx         # Added comprehensive event tracking
└── sections/
    └── CaseStudiesSection.tsx  # Example CTA tracking
```

### Configuration Files

```
apps/web/
├── .env.example           # Environment variable template
└── .env.local            # Local environment variables (not committed)
```

## Usage Guide

### Tracking Custom Events

#### Method 1: Using the trackEvent function

```typescript
import { trackEvent, GA_EVENTS } from '../analytics/GoogleAnalytics';

trackEvent(GA_EVENTS.CTA_CLICK, {
  button_text: 'Get Started',
  location: 'header',
  custom_param: 'value',
});
```

#### Method 2: Using Button Component

```typescript
import { Button } from '../ui/Button';

<Button
  variant="primary"
  analyticsEvent={GA_EVENTS.CTA_CLICK}
  analyticsParams={{
    location: 'hero',
    button_style: 'primary',
  }}
>
  Get Started
</Button>
```

#### Method 3: Direct GA4/Yandex tracking

```typescript
// GA4
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'custom_event', {
    param1: 'value1',
    param2: 'value2',
  });
}

// Yandex.Metrica
if (typeof window !== 'undefined' && (window as any).ym) {
  (window as any).ym(YANDEX_ID, 'reachGoal', 'CUSTOM_EVENT', {
    param1: 'value1',
    param2: 'value2',
  });
}
```

### Implementing Cookie Consent

The `CookieConsent` component is already integrated into `layout.tsx` and will automatically:
- Display on first visit
- Save user preferences
- Respect user choices when tracking events
- Show/hide based on stored consent

### Adding Analytics to New Forms

```typescript
import { trackEvent, GA_EVENTS } from '../analytics/GoogleAnalytics';

const handleSubmit = async (event: FormEvent) => {
  event.preventDefault();

  // Track attempt
  trackEvent(GA_EVENTS.FORM_SUBMIT, {
    form_name: 'my_custom_form',
  });

  try {
    // Submit form
    await submitForm();

    // Track success
    trackEvent(GA_EVENTS.FORM_SUCCESS, {
      form_name: 'my_custom_form',
    });
  } catch (error) {
    // Track error
    trackEvent(GA_EVENTS.FORM_ERROR, {
      form_name: 'my_custom_form',
      error_message: error.message,
    });
  }
};
```

## Analytics Configuration

### Google Analytics 4 Setup

1. Create a GA4 property in Google Analytics
2. Get the Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local` as `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Configure enhanced measurement and custom events in GA dashboard

### Yandex.Metrica Setup

1. Create a Yandex.Metrica account
2. Add a new site
3. Get the counter ID
4. Add to `.env.local` as `NEXT_PUBLIC_YANDEX_ID`
5. Configure goals in Yandex.Metrica dashboard

### Recommended Event Configuration

#### GA4 Custom Definitions
Create custom metrics and dimensions for:
- `service_interest` (from contact form)
- `button_location` (where button is clicked)
- `form_section` (which form section)
- `error_type` (type of form error)

#### Yandex.Metrica Goals
Set up goals for:
- `FORM_SUCCESS` (successful form submission)
- `CTA_CLICK` (main CTA clicks)
- `PAGE_VIEW` (key page views)

## Privacy & Compliance

### Cookie Categories

1. **Necessary Cookies**
   - Always enabled
   - Required for basic site functionality
   - No consent required

2. **Analytics Cookies**
   - Optional
   - Used for GA4 and Yandex.Metrica
   - Requires user consent
   - Can be toggled on/off

3. **Marketing Cookies**
   - Optional
   - Used for advertising tracking
   - Requires user consent
   - Can be toggled on/off

### Data Collection

- Only basic analytics data is collected
- No personally identifiable information (PII) in analytics
- IP anonymization available in GA4
- User consent required for analytics cookies

### User Rights

Users can:
- Accept all cookies
- Reject all cookies (except necessary)
- Customize cookie preferences
- Change preferences at any time
- Withdraw consent

## Best Practices

### Event Naming

- Use lowercase with underscores for GA4 (e.g., `form_submit`)
- Use UPPERCASE for Yandex.Metrica goals (e.g., `FORM_SUBMIT`)
- Be consistent with event names across platforms

### Event Parameters

- Include `form_name` for form events
- Include `button_text` for button clicks
- Include `location` or `section` for UI elements
- Keep parameter values concise and meaningful

### Performance

- Analytics scripts load with `strategy="afterInteractive"`
- Dynamic imports prevent SSR issues
- Lightweight implementation with no heavy dependencies
- Minimal impact on page load times

## Testing

### Manual Testing

1. **Cookie Consent Banner**
   - Should appear on first visit
   - Accept/Reject buttons work correctly
   - Settings panel opens and functions
   - Preferences are saved and respected

2. **Event Tracking**
   - Open browser console
   - Submit contact form
   - Check for:
     - `Analytics Event: form_submit`
     - `Analytics Event: form_success`
   - Check GA4 Real-Time reports
   - Check Yandex.Metrica实时 reports

3. **Button Analytics**
   - Click buttons with `analyticsEvent` prop
   - Check console for event logs
   - Verify events appear in analytics dashboards

### GA4 Debugging

Enable GA4 debug mode in browser console:
```javascript
gtag('config', 'G-XXXXXXXXXX', { 'debug_mode': true });
```

### Yandex.Metrica Debugging

Check counter initialization:
```javascript
console.log(Yandex.Metrica is loaded);
```

## Troubleshooting

### Analytics Not Tracking

1. Check environment variables are set
2. Verify IDs are correct (no extra spaces)
3. Check browser console for errors
4. Verify cookie consent has been accepted
5. Test with GA4 Debug mode enabled

### Cookie Consent Not Showing

1. Check localStorage for `tb-group-cookie-consent`
2. Clear localStorage to test again
3. Verify component is imported in layout.tsx

### Type Errors

Ensure all necessary types are imported:
```typescript
import { trackEvent, GA_EVENTS, YANDEX_EVENTS } from '../analytics/GoogleAnalytics';
```

## Future Enhancements

Potential improvements:
- [ ] Integration with Google Tag Manager
- [ ] A/B testing framework
- [ ] Heatmap tracking (Hotjar/Crazy Egg)
- [ ] Conversion funnel analysis
- [ ] Custom dashboards
- [ ] Automated report generation
- [ ] Enhanced ecommerce tracking

## Support

For issues or questions about analytics implementation:
1. Check this documentation
2. Review Google Analytics documentation
3. Review Yandex.Metrica documentation
4. Check browser console for errors
5. Test in different browsers

---

**Last Updated**: Task 14 Implementation Complete
**Version**: 1.0.0
**Status**: ✅ Complete
