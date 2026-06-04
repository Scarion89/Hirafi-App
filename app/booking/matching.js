import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

export default function Matching() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { workerId } = useLocalSearchParams();

  const pulse = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.4)).current;
  const [dotIdx, setDotIdx] = useState(0);

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.15, duration: 800, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 600, useNativeDriver: true }),
      ])
    ).start();

    // Dot animation
    const dotInterval = setInterval(() => setDotIdx((d) => (d + 1) % 3), 600);

    // Auto-navigate after 2.5s
    const nav = setTimeout(() => {
      router.replace({ pathname: '/tracking', params: { workerId: workerId || 'w1' } });
    }, 2500);

    return () => { clearInterval(dotInterval); clearTimeout(nav); };
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      <View style={styles.content}>
        {/* Pulsing mark */}
        <Animated.View style={[styles.markOuter, { transform: [{ scale: pulse }] }]}>
          <View style={styles.markInner}>
            <Text style={styles.markText}>H</Text>
          </View>
        </Animated.View>

        <Text style={styles.title}>Finding your hirafi…</Text>
        <Text style={styles.subtitle}>Matching you with a verified pro nearby</Text>
        <Text style={styles.subtitleAr}>نبحث عن أقرب حرفي معتمد</Text>

        {/* Progress dots */}
        <View style={styles.dotsRow}>
          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                i === dotIdx && styles.dotActive,
                i === dotIdx && { opacity },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center' },
  markOuter: {
    width: 110, height: 110, borderRadius: 28,
    backgroundColor: 'rgba(232,169,60,0.15)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  markInner: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  markText: { fontSize: 36, fontWeight: '900', color: '#000' },
  title: { fontSize: 24, fontWeight: '900', color: colors.textLight, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: colors.textLightMuted, textAlign: 'center' },
  subtitleAr: { fontSize: 13, color: colors.textLightMuted, textAlign: 'center', marginTop: 4, marginBottom: spacing.xl },
  dotsRow: { flexDirection: 'row', gap: 10, marginTop: spacing.lg },
  dot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: colors.textLightMuted,
  },
  dotActive: { backgroundColor: colors.primary, width: 24, borderRadius: 5 },
});
