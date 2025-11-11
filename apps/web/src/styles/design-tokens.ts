/**
 * Design System Tokens - TypeScript Definitions
 * Version: 1.0.0
 * Centralized design decisions for the TB Group website
 */

/* ==========================================================================
   Color Tokens
   ========================================================================== */

export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
} as const;

/* ==========================================================================
   Typography Tokens
   ========================================================================== */

export const typography = {
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(', '),
    serif: [
      'Merriweather',
      'Georgia',
      'Times New Roman',
      'serif',
    ].join(', '),
    mono: [
      'Fira Code',
      'Courier New',
      'monospace',
    ].join(', '),
    display: [
      'Cal Sans',
      'Inter',
      'sans-serif',
    ].join(', '),
  },
  fontSize: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

/* ==========================================================================
   Spacing Tokens
   ========================================================================== */

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
} as const;

export const container = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/* ==========================================================================
   Border Radius Tokens
   ========================================================================== */

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

/* ==========================================================================
   Shadow Tokens
   ========================================================================== */

export const shadows = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  '2xl': '0 50px 100px -20px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  glow: '0 0 20px rgb(14 165 233 / 0.5)',
  glowSecondary: '0 0 20px rgb(217 70 239 / 0.5)',
} as const;

/* ==========================================================================
   Animation & Transition Tokens
   ========================================================================== */

export const animation = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
} as const;

/* ==========================================================================
   Z-Index Scale
   ========================================================================== */

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

/* ==========================================================================
   Breakpoint Tokens
   ========================================================================== */

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/* ==========================================================================
   Opacity Tokens
   ========================================================================== */

export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
} as const;

/* ==========================================================================
   Component Tokens
   ========================================================================== */

export const components = {
  input: {
    borderRadius: borderRadius.xl,
    padding: {
      sm: `${spacing[1.5]} ${spacing[3]}`,
      md: `${spacing[3]} ${spacing[4]}`,
      lg: `${spacing[4]} ${spacing[5]}`,
    },
    focusRing: '0 0 0 3px rgb(14 165 233 / 0.1)',
    transition: `all ${animation.duration[200]} ${animation.easing.out}`,
  },
  button: {
    borderRadius: borderRadius.lg,
    padding: {
      sm: `${spacing[1.5]} ${spacing[3]}`,
      md: `${spacing[2]} ${spacing[4]}`,
      lg: `${spacing[3]} ${spacing[6]}`,
    },
    fontWeight: typography.fontWeight.medium,
  },
  card: {
    borderRadius: borderRadius['2xl'],
    padding: spacing[6],
    shadow: shadows.md,
    shadowHover: shadows.lg,
  },
  modal: {
    borderRadius: borderRadius['3xl'],
    padding: spacing[8],
    backdrop: 'rgba(0, 0, 0, 0.8)',
    zIndex: zIndex.modal,
  },
  tooltip: {
    borderRadius: borderRadius.md,
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: typography.fontSize.sm,
    zIndex: zIndex.tooltip,
  },
  nav: {
    height: spacing[16],
    borderRadius: borderRadius['2xl'],
    backdrop: 'rgba(15, 23, 42, 0.8)',
  },
} as const;

/* ==========================================================================
   Theme Tokens
   ========================================================================== */

export const themes = {
  glass: {
    bg: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
    backdrop: 'blur(16px)',
    shadow: shadows.xl,
  },
  neon: {
    cyan: '#06b6d4',
    pink: '#ec4899',
    purple: '#a855f7',
    glow: '0 0 20px currentColor',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
} as const;

/* ==========================================================================
   Export All Tokens
   ========================================================================== */

export const designTokens = {
  colors,
  typography,
  spacing,
  container,
  borderRadius,
  shadows,
  animation,
  zIndex,
  breakpoints,
  opacity,
  components,
  themes,
} as const;

/* ==========================================================================
   Type Definitions
   ========================================================================== */

export type ColorScale = keyof typeof colors.primary;
export type ColorShade = keyof typeof colors.primary[ColorScale];
export type SpacingValue = keyof typeof spacing;
export type BreakpointValue = keyof typeof breakpoints;
export type FontSizeValue = keyof typeof typography.fontSize;
export type ShadowValue = keyof typeof shadows;
export type ZIndexValue = keyof typeof zIndex;

/* ==========================================================================
   CSS Custom Property Helper
   ========================================================================== */

/**
 * Convert token to CSS custom property name
 * @param category - Token category (e.g., 'color', 'spacing')
 * @param key - Token key (e.g., 'primary-500', '4')
 * @returns CSS custom property string
 */
export function toCssVar(category: string, key: string): string {
  return `var(--${category}-${key})`;
}

/**
 * Get CSS custom property value for a token
 * @param category - Token category
 * @param key - Token key
 * @param fallback - Fallback value if token not found
 * @returns CSS custom property or fallback
 */
export function getCssVar(
  category: string,
  key: string,
  fallback: string
): string {
  return toCssVar(category, key) || fallback;
}

/* ==========================================================================
   Usage Examples
   ========================================================================== */

/**
 * Example usage in components:
 *
 * import { colors, spacing, designTokens } from '@/styles/design-tokens';
 *
 * const buttonStyle = {
 *   backgroundColor: colors.primary[500],
 *   padding: spacing[4],
 *   borderRadius: designTokens.borderRadius.lg,
 * };
 *
 * const cardStyle = {
 *   boxShadow: designTokens.shadows.md,
 *   borderRadius: designTokens.components.card.borderRadius,
 * };
 */
