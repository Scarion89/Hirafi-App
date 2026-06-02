import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';

export default function Splash() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom + 20 }]}>
      <View style={styles.glow} />
      <View style={styles.center}>
        <Text style={styles.mark}>⌂</Text>
        <Text style={styles.wordmark}>hirafi</Text>
        <Text style={styles.arabic}>حرفي</Text>
        <Text style={styles.tagline}>HOME CRAFTED · TRUSTED HANDS</Text>
      </View>
      <View style={styles.bottom}>
        <Pressable onPress={() => router.replace('/(tabs)')} style={styles.btn}>
          <Text style={styles.btnText}>Get Started</Text>
        </Pressable>
        <Text style={styles.login}>
          Already have an account?{' '}
          <Text style={{ color: colors.primary, fontWeight: '700' }}>Log in</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'space-between' },
  glow: {
    position: 'absolute', top: 180, left: -60, width: 510, height: 320,
    backgroundColor: 'transparent',
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3, shadowRadius: 120,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mark: { fontSize: 72, color: colors.primary, marginBottom: -8 },
  wordmark: { fontSize: 64, fontWeight: '900', color: colors.text, letterSpacing: -2, lineHeight: 72 },
  arabic: { fontSize: 24, fontWeight: '700', color: colors.primary, marginTop: 6 },
  tagline: { fontSize: 11, fontWeight: '700', letterSpacing: 3, color: colors.textMuted, marginTop: 12 },
  bottom: { width: '100%', paddingHorizontal: spacing.lg, gap: 14 },
  btn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  btnText: { fontSize: 16, fontWeight: '800', color: '#000' },
  login: { textAlign: 'center', fontSize: 13, color: colors.textMuted, paddingBottom: 8 },
});
