import { Colors, type ThemeColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Returns a colour for the current theme. An explicit `light`/`dark` override
 * wins over the palette entry named by `colorName`.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColor,
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}
