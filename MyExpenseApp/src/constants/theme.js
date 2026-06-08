import palette from './colors';

export const lightTheme = {
  dark: false,

  // Backgrounds
  bgPrimary:   palette.white,
  bgSecondary: palette.skyLight, // Soft sky blue from image
  bgTertiary:  palette.skyBase,
  bgElevated:  palette.white,

  // Header / Brand areas
  bgBrand:         palette.skyDeep, // Vibrant sky blue
  bgBrandSurface:  'rgba(79, 195, 247, 0.1)',
  bgBrandElevated: palette.skyDark,

  // Text
  textPrimary:   palette.gray800,
  textSecondary: palette.gray500,
  textMuted:     palette.gray300,
  textInverse:   palette.white,
  textBrand:     palette.skyDark,
  textOnBrand:   palette.white,

  // Borders
  border:       palette.gray100,
  borderStrong: palette.skyBase,

  // Semantic
  danger:      palette.dreamRose, // Pinkish red from image
  dangerBg:    '#FFEBEE',
  success:     palette.success,
  successBg:   '#E8F5E9',
  warning:     palette.warning,
  warningBg:   '#FFF3E0',

  // Nav
  navBg:        palette.white,
  navBorder:    palette.skyLight,
  navIconActive:palette.skyDark,
  navIconIdle:  palette.gray300,

  // Card (for list items)
  cardBg:       palette.white,
  cardBorder:   palette.gray50,

  // Input
  inputBg:      palette.gray50,
  inputBorder:  palette.gray100,
  inputFocusBorder: palette.skyDeep,
  inputFocusBg: palette.skyLight,
  placeholder:  palette.gray300,

  // FAB
  fabBg:    palette.skyDark,
  fabIcon:  palette.white,

  amountNegative: palette.dreamRose,
};

export const darkTheme = {
  dark: true,

  // Backgrounds
  bgPrimary:   palette.gray900,
  bgSecondary: palette.darkSurface,
  bgTertiary:  palette.darkElevated,
  bgElevated:  palette.gray800,

  // Header / Brand
  bgBrand:         '#01579B', // Very deep sky blue
  bgBrandSurface:  'rgba(2, 136, 209, 0.1)',
  bgBrandElevated: '#002F6C',

  // Text
  textPrimary:   palette.skyLight, // High contrast light blue
  textSecondary: palette.gray300,
  textMuted:     palette.gray500,
  textInverse:   palette.white,
  textBrand:     palette.skyDeep,
  textOnBrand:   palette.white,

  // Borders
  border:       palette.gray700,
  borderStrong: palette.gray600,

  // Semantic
  danger:      palette.dreamPink,
  dangerBg:    '#2C0D0D',
  success:     palette.success,
  successBg:   '#0D2C0D',
  warning:     palette.warning,
  warningBg:   '#2C1A0D',

  // Nav
  navBg:        palette.gray900,
  navBorder:    palette.darkSurface,
  navIconActive:palette.skyDeep,
  navIconIdle:  palette.gray600,

  // Card
  cardBg:       palette.darkSurface,
  cardBorder:   palette.gray700,

  // Input
  inputBg:      palette.gray800,
  inputBorder:  palette.gray700,
  inputFocusBorder: palette.skyDeep,
  inputFocusBg: palette.darkElevated,
  placeholder:  palette.gray500,

  // FAB
  fabBg:    palette.skyDeep,
  fabIcon:  palette.white,

  amountNegative: palette.dreamPink,
};

// Category colors updated to match the dream/sky palette
export const categoryTheme = {
  light: {
    Food:          { bg: '#FFEBEE', text: '#D32F2F', dot: palette.dreamPink },
    Transport:     { bg: '#E1F5FE', text: '#0288D1', dot: palette.skyDeep   },
    Utilities:     { bg: '#F3E5F5', text: '#7B1FA2', dot: '#BA68C8' },
    Health:        { bg: '#E8F5E9', text: '#388E3C', dot: palette.success  },
    Entertainment: { bg: '#FFF3E0', text: '#F57C00', dot: palette.warning   },
    Shopping:      { bg: '#FCE4EC', text: '#C2185B', dot: '#F06292'   },
    Education:     { bg: '#E8EAF6', text: '#303F9F', dot: '#7986CB' },
    Other:         { bg: palette.gray100, text: palette.gray500, dot: palette.gray400 },
  },
  dark: {
    Food:          { bg: '#3E1010', text: '#FF8A80', dot: palette.dreamPink },
    Transport:     { bg: '#0D2C3E', text: '#81D4FA', dot: palette.skyDeep   },
    Utilities:     { bg: '#2C103E', text: '#E1BEE7', dot: '#BA68C8' },
    Health:        { bg: '#103E10', text: '#A5D6A7', dot: palette.success  },
    Entertainment: { bg: '#3E2410', text: '#FFCC80', dot: palette.warning   },
    Shopping:      { bg: '#3E102C', text: '#F48FB1', dot: '#F06292'   },
    Education:     { bg: '#10173E', text: '#C5CAE9', dot: '#7986CB' },
    Other:         { bg: palette.gray700, text: palette.gray300, dot: palette.gray500 },
  },
};
