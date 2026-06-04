import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

export default function LocationPermission() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const allow = () => router.replace('/(tabs)');
  const manual = () => router.replace('/(tabs)');

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📍</Text>
        </View>

        <Text style={styles.title}>Allow Hirafi to access{'\n'}your location</Text>
        <Text style={styles.body}>
          We use your location to find verified hirafs near you and give accurate arrival times.{'\n\n'}
          نستخدم موقعك للعثور على الحرفيين القريبين منك وتوفير أوقات وصول دقيقة.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.allowBtn} onPress={allow}>
          <Text style={styles.allowText}>Allow location · السماح بالموقع</Text>
        </Pressable>
        <Pressable style={styles.manualBtn} onPress={manual}>
          <Text style={styles.manualText}>Enter manually · إدخال يدوي</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, backgroundColor: colors.dark,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  icon: { fontSize: 44 },
  title: {
    fontSize: 26, fontWeight: '900', color: colors.textLight,
    textAlign: 'center', lineHeight: 34, marginBottom: spacing.lg,
  },
  body: {
    fontSize: 14, color: colors.textLightMuted, textAlign: 'center', lineHeight: 22,
  },
  actions: { gap: spacing.md, paddingBottom: spacing.lg },
  allowBtn: {
    height: 56, backgroundColor: colors.primary,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
  },
  allowText: { fontSize: 15, fontWeight: '900', color: '#000' },
  manualBtn: { alignItems: 'center', paddingVertical: spacing.sm },
  manualText: { fontSize: 14, color: colors.textLightMuted, fontWeight: '600' },
});
