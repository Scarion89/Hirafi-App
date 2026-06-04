import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../constants/theme';
import HirafiMark from '../../components/HirafiMark';

const { width: SCREEN_W } = Dimensions.get('window');

const STEPS = [
  {
    icon: '✓',
    iconBg: '#3D2E10',
    headline1: 'Find a real hirafi,',
    headline2: 'not a callout.',
    body: 'Every craftsperson on Hirafi is vetted, rated, and answers in under a minute.',
  },
  {
    icon: '⭐',
    iconBg: '#3D2E10',
    headline1: 'Know the price',
    headline2: 'before you book.',
    body: 'Transparent pricing, no hidden fees. Pay only after the job is done.',
  },
  {
    icon: '📍',
    iconBg: '#3D2E10',
    headline1: 'Track your pro',
    headline2: 'in real time.',
    body: 'See your hirafi on the way. Get live updates from booking to completion.',
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [showRoles, setShowRoles] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  function goToStep(nextStep) {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -30, duration: 180, useNativeDriver: true }),
    ]).start(() => {
      setStep(nextStep);
      slideAnim.setValue(30);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    });
  }

  function goToRoles() {
    Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setShowRoles(true);
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    });
  }

  function handleNext() {
    if (step < STEPS.length - 1) {
      goToStep(step + 1);
    } else {
      goToRoles();
    }
  }

  function handleSkip() {
    goToRoles();
  }

  const current = STEPS[step];

  if (showRoles) {
    return (
      <Animated.View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, opacity: fadeAnim }]}>
        <View style={styles.rolesContent}>
          <Text style={styles.rolesTitle}>Welcome to{'\n'}<Text style={styles.rolesTitleAmber}>hirafi</Text></Text>
          <Text style={styles.rolesBody}>How would you like to continue?</Text>
        </View>
        <View style={[styles.rolesButtons, { paddingBottom: insets.bottom + spacing.lg }]}>
          <Pressable
            style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
            onPress={() => router.push('/auth/phone?role=customer')}
          >
            <Text style={styles.btnPrimaryText}>I'm a Customer</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.btnOutline, pressed && styles.btnPressed]}
            onPress={() => router.push('/auth/phone?role=pro')}
          >
            <Text style={styles.btnOutlineText}>I'm a Pro</Text>
          </Pressable>
          <View style={styles.loginRow}>
            <Text style={styles.loginMuted}>Already have an account? </Text>
            <Pressable onPress={() => router.push('/auth/phone?role=customer')}>
              <Text style={styles.loginLink}>Log in</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Skip button */}
      <View style={styles.topRow}>
        <View style={{ flex: 1 }} />
        <Pressable onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      {/* Step content */}
      <Animated.View
        style={[
          styles.stepContent,
          { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
        ]}
      >
        {/* Icon area — use real mark on step 0, emoji on others */}
        <View style={[styles.iconBox, { backgroundColor: current.iconBg }]}>
          {step === 0
            ? <HirafiMark size={64} />
            : <Text style={styles.iconText}>{current.icon}</Text>
          }
        </View>

        {/* Headline */}
        <Text style={styles.headline1}>{current.headline1}</Text>
        <Text style={styles.headline2}>{current.headline2}</Text>

        {/* Body */}
        <Text style={styles.bodyText}>{current.body}</Text>
      </Animated.View>

      {/* Dot indicators */}
      <View style={styles.dotsRow}>
        {STEPS.map((_, i) => (
          <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
        ))}
      </View>

      {/* Next / Get started button */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Pressable
          style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
          onPress={handleNext}
        >
          <Text style={styles.btnPrimaryText}>
            {step < STEPS.length - 1 ? 'Next →' : 'Get Started'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.xl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  skipBtn: { paddingHorizontal: 4, paddingVertical: 8 },
  skipText: { fontSize: 15, color: colors.textMuted, fontWeight: '600' },

  stepContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    backgroundColor: colors.bgCard,
  },
  iconText: { fontSize: 40 },

  headline1: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 40,
  },
  headline2: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.bgMuted,
  },
  dotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  bottomSection: {
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  btnOutline: {
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  btnOutlineText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  btnPressed: { opacity: 0.8 },

  rolesContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rolesTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 52,
  },
  rolesTitleAmber: { color: colors.primary },
  rolesBody: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 12,
  },
  rolesButtons: { gap: 12 },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    paddingBottom: 8,
  },
  loginMuted: { color: colors.textMuted, fontSize: 14 },
  loginLink: { color: colors.primary, fontSize: 14, fontWeight: '700' },
});
