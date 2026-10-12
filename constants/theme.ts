import { Platform } from 'react-native';

/**
 * Colour palette used across the app. Both themes expose the same keys so a
 * colour can be looked up by name instead of by hex value.
 */
export const Colors = {
  light: {
    text: '#11181C',
    textMuted: '#60646C',
    background: '#FFFFFF',
    card: '#F1F3F5',
    border: '#E1E3E6',
    tint: '#0A7EA4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0A7EA4',
  },
  dark: {
    text: '#ECEDEE',
    textMuted: '#9BA1A6',
    background: '#151718',
    card: '#1E2022',
    border: '#2E3135',
    tint: '#4FC3F7',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#4FC3F7',
  },
} as const;

/** Every colour name that exists in both the light and dark palettes. */
export type ThemeColor = keyof (typeof Colors)['light'] & keyof (typeof Colors)['dark'];

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'system-ui',
    serif: 'Georgia',
    rounded: "'SF Pro Rounded', system-ui",
    mono: 'ui-monospace',
  },
});
