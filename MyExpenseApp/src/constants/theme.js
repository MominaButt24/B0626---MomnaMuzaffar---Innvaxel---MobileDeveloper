// src/constants/theme.js
// Light and dark token maps built from the palette.
// Import useTheme() hook to access the active theme in components.

import palette from './colors';

export const lightTheme = {
  dark: false,

  // Backgrounds
  bgPrimary:   palette.white,
  bgSecondary: palette.gray50,
  bgTertiary:  palette.gray100,
  bgElevated:  palette.white,

  // Teal header background (home screen top)
  bgBrand:         palette.teal400,
  bgBrandSurface:  'rgba(0, 61, 56, 0.12)',
  bgBrandElevated: palette.teal600,

  // Text
  textPrimary:   palette.gray800,
  textSecondary: palette.gray500,
  textMuted:     palette.gray400,
  textInverse:   palette.white,
  textBrand:     palette.teal600,
  textOnBrand:   palette.teal900,

  // Borders
  border:       palette.gray200,
  borderStrong: palette.gray300,

  // Semantic
  danger:      palette.red400,
  dangerBg:    palette.red100,
  success:     palette.green400,
  successBg:   palette.green100,
  warning:     palette.amber400,
  warningBg:   palette.amber100,

  // Nav & chrome
  navBg:        palette.white,
  navBorder:    palette.gray200,
  navIconActive:palette.teal400,
  navIconIdle:  palette.gray300,

  // Card
  cardBg:       palette.white,
  cardBorder:   palette.gray200,

  // Input
  inputBg:      palette.gray100,
  inputBorder:  palette.gray200,
  inputFocusBorder: palette.teal400,
  inputFocusBg: palette.tealSubtle,
  placeholder:  palette.gray400,

  // FAB
  fabBg:    palette.teal400,
  fabIcon:  palette.teal900,

  // Amount (expense list)
  amountNegative: palette.red400,
};

export const darkTheme = {
  dark: true,

  // Backgrounds
  bgPrimary:   palette.dark900,
  bgSecondary: palette.dark800,
  bgTertiary:  palette.dark700,
  bgElevated:  palette.dark600,

  // Teal header — darker variant on dark mode
  bgBrand:         '#0A2E2B',
  bgBrandSurface:  'rgba(10, 191, 175, 0.10)',
  bgBrandElevated: '#0D3B36',

  // Text
  textPrimary:   '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted:     '#475569',
  textInverse:   palette.gray800,
  textBrand:     palette.teal400,
  textOnBrand:   '#E0FAF8',

  // Borders
  border:       palette.dark700,
  borderStrong: palette.gray700,

  // Semantic
  danger:      palette.red400,
  dangerBg:    '#2A0A0A',
  success:     palette.green400,
  successBg:   '#0A2314',
  warning:     palette.amber400,
  warningBg:   '#2A1A00',

  // Nav & chrome
  navBg:        palette.dark900,
  navBorder:    palette.dark700,
  navIconActive:palette.teal400,
  navIconIdle:  palette.gray700,

  // Card
  cardBg:       palette.dark800,
  cardBorder:   palette.dark700,

  // Input
  inputBg:      palette.dark700,
  inputBorder:  palette.dark600,
  inputFocusBorder: palette.teal400,
  inputFocusBg: '#0A2E2B',
  placeholder:  palette.gray700,

  // FAB
  fabBg:    palette.teal400,
  fabIcon:  palette.teal900,

  // Amount
  amountNegative: '#F87171',
};

// Category colors — both modes in one place
export const categoryTheme = {
  light: {
    Food:          { bg: '#FFF3E0', text: '#C2410C', dot: palette.orange400 },
    Transport:     { bg: '#EFF6FF', text: '#1D4ED8', dot: palette.blue400   },
    Utilities:     { bg: '#F5F3FF', text: '#6D28D9', dot: palette.purple400 },
    Health:        { bg: '#F0FDF4', text: '#15803D', dot: palette.green400  },
    Entertainment: { bg: '#FDF4FF', text: '#A21CAF', dot: palette.pink400   },
    Shopping:      { bg: '#FFF1F2', text: '#BE123C', dot: palette.rose400   },
    Education:     { bg: '#EEF2FF', text: '#3730A3', dot: palette.indigo400 },
    Other:         { bg: palette.gray100, text: palette.gray500, dot: palette.slate400 },
  },
  dark: {
    Food:          { bg: '#2D1A0A', text: '#FB923C', dot: palette.orange400 },
    Transport:     { bg: '#0A1929', text: '#60A5FA', dot: palette.blue400   },
    Utilities:     { bg: '#1E1040', text: '#A78BFA', dot: palette.purple400 },
    Health:        { bg: '#0A2314', text: '#4ADE80', dot: palette.green400  },
    Entertainment: { bg: '#2A0A2E', text: '#E879F9', dot: palette.pink400   },
    Shopping:      { bg: '#2A0A10', text: '#FB7185', dot: palette.rose400   },
    Education:     { bg: '#0A102A', text: '#818CF8', dot: palette.indigo400 },
    Other:         { bg: palette.dark700, text: palette.gray400, dot: palette.slate400 },
  },
};