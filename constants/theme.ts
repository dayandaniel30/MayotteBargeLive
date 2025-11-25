import { Platform } from "react-native";

const primaryGreen = "#2ECC71";
const primaryGreenDark = "#27AE60";

export const Colors = {
  light: {
    text: "#2C3E50",
    textSecondary: "#7F8C8D",
    buttonText: "#FFFFFF",
    tabIconDefault: "#7F8C8D",
    tabIconSelected: primaryGreen,
    link: "#3498DB",
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F5F5F5",
    backgroundSecondary: "#E6E6E6",
    backgroundTertiary: "#D9D9D9",
    card: "#FFFFFF",
    border: "#E0E0E0",
    primary: primaryGreen,
    primaryDark: primaryGreenDark,
    success: primaryGreen,
    warning: "#F39C12",
    error: "#E74C3C",
    info: "#3498DB",
    mapWater: "#A8D5E2",
    mapLand: "#F0E6D2",
    mapRoutes: "#D4C5A9",
  },
  dark: {
    text: "#ECEDEE",
    textSecondary: "#9BA1A6",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryGreen,
    link: "#3498DB",
    backgroundRoot: "#1F2123",
    backgroundDefault: "#2A2C2E",
    backgroundSecondary: "#353739",
    backgroundTertiary: "#404244",
    card: "#2A2C2E",
    border: "#404244",
    primary: primaryGreen,
    primaryDark: primaryGreenDark,
    success: primaryGreen,
    warning: "#F39C12",
    error: "#E74C3C",
    info: "#3498DB",
    mapWater: "#A8D5E2",
    mapLand: "#F0E6D2",
    mapRoutes: "#D4C5A9",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  inputHeight: 48,
  buttonHeight: 52,
  searchBarHeight: 56,
  alertBannerHeight: 48,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  h3: {
    fontSize: 32,
    fontWeight: "700" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
};

export const Shadows = {
  searchBar: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  fab: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
