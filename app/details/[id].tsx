import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: `Details #${id}` }} />
      <ThemedText type="title">Details</ThemedText>
      <ThemedText>
        This is a dynamic route. You arrived here with{' '}
        <ThemedText type="defaultSemiBold">id = {id}</ThemedText>.
      </ThemedText>
      <ThemedText>
        Edit this screen in <ThemedText type="code">app/details/[id].tsx</ThemedText>.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 24,
  },
});
