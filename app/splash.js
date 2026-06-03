import React, { useEffect, useRef } from 'react';
import { Text, View, Pressable, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';

export default function Splash() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const markScale  = useRef(new Animated.Value(0.4)).current;
  const markOpacity = useRef(new Animated.Value(0)).current;
  const wordY      = useRef(new Animated.Value(20)).current;
  const wordOpacity = useRef(new Animated.Value(0)).current;
  const arabicY    = useRef(new Animated.Value(16)).current;
  const arabicOpacity = useRef(new Animated.Value(0)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;
  const bottomY    = useRef(new Animated.Value(30)).current;
  const bottomOpacity = useRef(new Animated.Value(0)).current;
  const glowScale  = useRef(new Animated.Value(0.6)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(markScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.timing(markOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(glowOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(glowScale, { toValue: 1, tension: 40, friction: 10, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(wordY, { toValue: 0, duration: 380, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(wordOpacity, { toValue: 1, duration: 380, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(arabicY, { toValue: 0, duration: 300, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(arabicOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(tagOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(bottomY, { toValue: 0, duration: 400, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
        Animated.timing(bottomOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom + 20 }]}>
      <Animated.View style={[styles.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]} />
      <View style={styles.center}>
        <Animated.Text style={[styles.mark, { opacity: markOpacity, transform: [{ scale: markScale }] }]}>
          ⌂
        </Animated.Text>
        <Animated.Text style={[styles.wordmark, { opacity: wordOpacity, transform: [{ translateY: wordY }] }]}>
          hirafi
        </Animated.Text>
        <Animated.Text style={[styles.arabic, { opacity: arabicOpacity, transform: [{ translateY: arabicY }] }]}>
          حرفي
        </Animated.Text>
        <Animated.Text style={[styles.tagline, { opacity: tagOpacity }]}>
          HOME CRAFTED · TRUSTED HANDS
        </Animated.Text>
      </View>
      <Animated.View style={[styles.bottom, { opacity: bottomOpacity, transform: [{ translateY: bottomY }] }]}>
        <Pressable
          onPress={() => router.replace('/auth/welcome')}
          style={({ pressed }) => [styles.btn, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </Pressable>
        <Text style={styles.login}>
          Already have an account?{' '}
          <Text style={{ color: colors.primary, fontWeight: '700' }}>Log in</Text>
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'space-between' },
  glow: {
    position: 'absolute', top: 160, left: -60, width: 520, height: 340,
    backgroundColor: 'transparent',
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35, shadowRadius: 140,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mark: { fontSize: 80, color: colors.primary, marginBottom: -8 },
  wordmark: { fontSize: 64, fontWeight: '900', color: colors.text, letterSpacing: -2, lineHeight: 72 },
  arabic: { fontSize: 24, fontWeight: '700', color: colors.primary, marginTop: 6 },
  tagline: { fontSize: 11, fontWeight: '700', letterSpacing: 3, color: colors.textMuted, marginTop: 14 },
  bottom: { width: '100%', paddingHorizontal: spacing.lg, gap: 14 },
  btn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  btnText: { fontSize: 16, fontWeight: '800', color: '#000' },
  login: { textAlign: 'center', fontSize: 13, color: colors.textMuted, paddingBottom: 8 },
});
