import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const ITEMS = Array.from({ length: 8 }, (_, index) => ({
  id: String(index + 1),
  title: `Placeholder item ${index + 1}`,
  description: 'Tap to open the matching dynamic route.',
}));

export default function ExploreScreen() {
  const palette = Colors[useColorScheme()];

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => (
          <ThemedView style={[styles.separator, { backgroundColor: palette.border }]} />
        )}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/details/[id]', params: { id: item.id } }} asChild>
            <Pressable style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              <ThemedText style={[styles.description, { color: palette.textMuted }]}>
                {item.description}
              </ThemedText>
            </Pressable>
          </Link>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  row: {
    gap: 4,
    paddingVertical: 16,
  },
  rowPressed: {
    opacity: 0.5,
  },
  description: {
    fontSize: 14,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
});
