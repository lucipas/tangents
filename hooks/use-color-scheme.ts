import { useColorScheme as useRNColorScheme } from 'react-native';

export type ColorSchemeName = 'light' | 'dark';

/**
 * Resolves the active colour scheme, defaulting to `light` when the platform
 * reports `null` (e.g. during static rendering on the web).
 */
export function useColorScheme(): ColorSchemeName {
  return useRNColorScheme() === 'dark' ? 'dark' : 'light';
}
