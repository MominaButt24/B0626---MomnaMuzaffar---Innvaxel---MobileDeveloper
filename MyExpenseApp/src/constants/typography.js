// src/constants/typography.js
// Font sizes, weights, and line heights only.
// No colors here — colors come from the active theme at runtime.

export const FontSize = {
  xs:   11,
  sm:   13,
  base: 15,
  md:   17,
  lg:   20,
  xl:   24,
  xxl:  28,
  hero: 36,
};

export const FontWeight = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
};

export const LineHeight = {
  tight:  1.2,
  normal: 1.5,
  loose:  1.7,
};

// Pre-built text style objects — spread into StyleSheet, then add color from theme.
// Usage: { ...TextStyles.h1, color: theme.textPrimary }

export const TextStyles = {
  h1:         { fontSize: FontSize.xl,   fontWeight: FontWeight.bold,     lineHeight: FontSize.xl   * 1.2 },
  h2:         { fontSize: FontSize.lg,   fontWeight: FontWeight.semibold,  lineHeight: FontSize.lg   * 1.3 },
  h3:         { fontSize: FontSize.md,   fontWeight: FontWeight.semibold,  lineHeight: FontSize.md   * 1.4 },
  bodyLarge:  { fontSize: FontSize.base, fontWeight: FontWeight.regular,  lineHeight: FontSize.base * 1.5 },
  body:       { fontSize: FontSize.sm,   fontWeight: FontWeight.regular,  lineHeight: FontSize.sm   * 1.5 },
  bodySmall:  { fontSize: FontSize.xs,   fontWeight: FontWeight.regular,  lineHeight: FontSize.xs   * 1.5 },
  label:      { fontSize: FontSize.sm,   fontWeight: FontWeight.medium,   lineHeight: FontSize.sm   * 1.4 },
  labelSmall: { fontSize: FontSize.xs,   fontWeight: FontWeight.medium,   lineHeight: FontSize.xs   * 1.4 },
  caption:    { fontSize: FontSize.xs,   fontWeight: FontWeight.regular,  lineHeight: FontSize.xs   * 1.6 },
  amount:     { fontSize: FontSize.xl,   fontWeight: FontWeight.bold,     lineHeight: FontSize.xl   * 1.1 },
  amountHero: { fontSize: FontSize.hero, fontWeight: FontWeight.bold,     lineHeight: FontSize.hero * 1.0 },
  amountSmall:{ fontSize: FontSize.base, fontWeight: FontWeight.semibold, lineHeight: FontSize.base * 1.2 },
  tabLabel:   { fontSize: FontSize.xs,   fontWeight: FontWeight.medium,   lineHeight: FontSize.xs   * 1.2 },
};