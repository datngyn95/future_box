// FutureBoxes — Dark Theme Tokens
// Nguồn: design/uiuxguides.md (Full Dark Redesign + Single Orange Accent)
// Tái dùng Spacing/Radius từ ./spacing và FontWeight/LineHeight/LetterSpacing từ ./typography.

import { Spacing, Radius } from './spacing';
import { FontFamily, FontWeight, LineHeight, LetterSpacing } from './typography';

// ── Colors ────────────────────────────────────────────────────────────────
export const ThemeColors = {
  // Brand & Action
  accent: '#F26B1F',
  accentPressed: '#D85A12',
  accentSoft: 'rgba(242,107,31,0.14)',
  accentGradient: ['#F58A33', '#F26B1F'] as const, // 135°

  // Backgrounds & Surfaces
  background: '#0E0E10',
  backgroundElevated: '#161618',
  surfaceGlass: 'rgba(255,255,255,0.06)',
  surfaceGlassStrong: 'rgba(255,255,255,0.10)',
  surfaceSolid: '#1C1C1F', // Android fallback khi không blur được
  inputBg: 'rgba(255,255,255,0.05)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A8',
  textMuted: '#6B6B73',
  textOnAccent: '#FFFFFF',

  // Borders & Effects
  borderGlass: 'rgba(255,255,255,0.10)',
  borderGlassStrong: 'rgba(255,255,255,0.18)',
  divider: 'rgba(255,255,255,0.06)',
  overlay: 'rgba(0,0,0,0.55)',
  trackOff: 'rgba(255,255,255,0.16)',
  grabber: 'rgba(255,255,255,0.25)',

  // Semantic
  success: '#3CCB7F',
  warning: '#F2B01F',
  danger: '#FF5A5A',
  info: '#5B8DEF',

  transparent: 'transparent',
} as const;

// expo-blur intensity cho card kính (24–40)
export const BlurIntensity = {
  card: 30,
  sheet: 40,
} as const;

// ── Typography scale ────────────────────────────────────────────────────────
export const TextStyles = {
  display: { fontSize: 30, fontWeight: FontWeight.bold, lineHeight: 30 * 1.2, letterSpacing: LetterSpacing.tight, color: ThemeColors.textPrimary },
  h1: { fontSize: 24, fontWeight: FontWeight.bold, lineHeight: 24 * 1.25, letterSpacing: LetterSpacing.tight, color: ThemeColors.textPrimary },
  h2: { fontSize: 19, fontWeight: FontWeight.semiBold, lineHeight: 19 * 1.3, letterSpacing: -0.2, color: ThemeColors.textPrimary },
  body: { fontSize: 15, fontWeight: FontWeight.regular, lineHeight: 15 * 1.5, color: ThemeColors.textSecondary },
  bodyStrong: { fontSize: 15, fontWeight: FontWeight.semiBold, lineHeight: 15 * 1.4, color: ThemeColors.textPrimary },
  label: { fontSize: 13, fontWeight: FontWeight.medium, lineHeight: 13 * 1.4, color: ThemeColors.textSecondary },
  overline: { fontSize: 11, fontWeight: FontWeight.semiBold, lineHeight: 11 * 1.2, letterSpacing: LetterSpacing.wider, color: ThemeColors.textMuted },
  button: { fontSize: 16, fontWeight: FontWeight.semiBold, lineHeight: 16, letterSpacing: 0.2, color: ThemeColors.textOnAccent },
} as const;

// ── Motion ──────────────────────────────────────────────────────────────────
export const Motion = {
  duration: {
    micro: 160,    // press, toggle, ripple
    standard: 280, // sheet, fade, slide
    emphasis: 500, // mở hộp, confetti
  },
  // ease-out-quint — dùng với Easing.bezier(...)
  easeOut: [0.22, 1, 0.36, 1] as const,
  spring: { damping: 14, stiffness: 120 } as const,
  pressScale: 0.97,
  cardPressScale: 0.98,
} as const;

// ── Glass shadow (chỉ dùng cho CTA cam; card dùng viền + blur) ───────────────
export const GlassShadow = {
  cta: {
    shadowColor: ThemeColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// ── Theme aggregate ──────────────────────────────────────────────────────────
export const Theme = {
  colors: ThemeColors,
  blur: BlurIntensity,
  text: TextStyles,
  motion: Motion,
  shadow: GlassShadow,
  spacing: Spacing,
  radius: Radius,
  fontFamily: FontFamily,
  lineHeight: LineHeight,
} as const;

export type ThemeColorKey = keyof typeof ThemeColors;
export default Theme;
