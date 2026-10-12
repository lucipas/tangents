import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tangent</ThemedText>
      <ThemedText style={styles.body}>
        Your Expo + React Native project is ready. Start editing{' '}
        <ThemedText type="code">app/(tabs)/index.tsx</ThemedText> and the app reloads instantly.
      </ThemedText>

      <Link href="/explore" asChild>
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <ThemedText type="defaultSemiBold" lightColor="#FFFFFF" darkColor="#FFFFFF">
            Open Explore
          </ThemedText>
        </Pressable>
      </Link>

      <Link href={{ pathname: '/details/[id]', params: { id: '1' } }} asChild>
        <Pressable>
          <ThemedText type="link">Or jump straight to a detail route</ThemedText>
        </Pressable>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 24,
    justifyContent: 'center',
  },
  body: {
    marginBottom: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0A7EA4',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignSelf: 'flex-start',
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
