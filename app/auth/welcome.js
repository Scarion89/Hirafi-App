import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../constants/theme';
import HirafiMark from '../../components/HirafiMark';

const STEPS = [
  {
    icon: '🛡',
    headline1: 'Find a real hirafi,',
    headline2: 'not a callout.',
    body: 'Every craftsperson on Hirafi is vetted, rated, and answers in under a minute.',
  },
  {
    icon: '⏱',
    headline1: 'Booked in',
    headline2: '60 seconds.',
    body: 'Tell us what broke. We match you to the closest pro who can fix it today.',
  },
  {
    icon: '💳',
    headline1: 'Pay only when',
    headline2: "it's working.",
    body: "No callout fees. No quotes. Confirm the job and pay through the app.",
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
      Animated.timing(fadeAnim, { toValue: 0, duration: 160, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -24, duration: 160, useNativeDriver: true }),
    ]).start(() => {
      setStep(nextStep);
      slideAnim.setValue(24);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    });
  }

  function goToRoles() {
    Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      setShowRoles(true);
      Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
    });
  }

  function handleNext() {
    if (step < STEPS.length - 1) goToStep(step + 1);
    else goToRoles();
  }

  if (showRoles) {
    return (
      <Animated.View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + spacing.lg, opacity: fadeAnim }]}>
        <View style={styles.roleHeader}>
          <HirafiMark size={36} />
          <View style={styles.roleHeaderText}>
            <Text style={styles.roleTitle}>Welcome to hirafi</Text>
            <Text style={styles.roleSubtitle}>أهلاً بك في حرفي</Text>
          </View>
        </View>

        <Text style={styles.roleQuestion}>How would you like to continue?</Text>
        <Text style={styles.roleQuestionAr}>كيف تريد المتابعة؟</Text>

        <View style={styles.roleCards}>
          {/* Customer Card */}
          <Pressable
            style={({ pressed }) => [styles.roleCard, pressed && styles.roleCardPressed]}
            onPress={() => router.push({ pathname: '/auth/phone', params: { role: 'customer' } })}
          >
            <View style={styles.roleCardIcon}>
              <Text style={styles.roleCardEmoji}>🏠</Text>
            </View>
            <Text style={styles.roleCardTitle}>I need a hirafi</Text>
            <Text style={styles.roleCardTitleAr}>محتاج حرفي</Text>
            <Text style={styles.roleCardDesc}>Book a vetted professional for any home service</Text>
            <View style={styles.roleCardBtn}>
              <Text style={styles.roleCardBtnText}>Sign up as Customer →</Text>
            </View>
          </Pressable>

          {/* Pro Card */}
          <Pressable
            style={({ pressed }) => [styles.roleCardDark, pressed && styles.roleCardPressed]}
            onPress={() => router.push({ pathname: '/auth/phone', params: { role: 'pro' } })}
          >
            <View style={styles.roleCardIconDark}>
              <Text style={styles.roleCardEmoji}>🔧</Text>
            </View>
            <Text style={styles.roleCardTitleDark}>I am a hirafi</Text>
            <Text style={styles.roleCardTitleArDark}>أنا حرفي</Text>
            <Text style={styles.roleCardDescDark}>Join our network of verified professionals</Text>
            <View style={styles.roleCardBtnOutline}>
              <Text style={styles.roleCardBtnOutlineText}>Sign up as Pro →</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.loginRow}>
          <Text style={styles.loginMuted}>Already have an account? </Text>
          <Pressable onPress={() => router.push({ pathname: '/auth/phone', params: { role: 'customer' } })}>
            <Text style={styles.loginLink}>Log in</Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  }

  const current = STEPS[step];

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.topRow}>
        <HirafiMark size={28} />
        <Pressable onPress={goToRoles} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.iconBox}>
          {step === 0
            ? <HirafiMark size={56} />
            : <Text style={styles.iconText}>{current.icon}</Text>
          }
        </View>
        <Text style={styles.headline1}>{current.headline1}</Text>
        <Text style={styles.headline2}>{current.headline2}</Text>
        <Text style={styles.bodyText}>{current.body}</Text>
      </Animated.View>

      <View style={styles.dotsRow}>
        {STEPS.map((_, i) => (
          <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
        ))}
      </View>

      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Pressable
          style={({ pressed }) => [styles.btnPrimary, pressed && { opacity: 0.85 }]}
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
    backgroundColor: colors.dark,
    paddingHorizontal: spacing.xl,
  },

  // Onboarding steps
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  skipBtn: { paddingHorizontal: 4, paddingVertical: 8 },
  skipText: { fontSize: 15, color: colors.textLightMuted, fontWeight: '600' },

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
    backgroundColor: 'rgba(232,169,60,0.08)',
  },
  iconText: { fontSize: 40 },

  headline1: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.textLight,
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
    color: colors.textLightMuted,
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
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(245,239,227,0.15)',
  },
  dotActive: {
    width: 24, height: 8, borderRadius: 4,
    backgroundColor: colors.primary,
  },

  bottomSection: { gap: 12 },
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

  // Role selection
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  roleHeaderText: {},
  roleTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: -0.3,
  },
  roleSubtitle: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 1,
  },

  roleQuestion: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.textLight,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  roleQuestionAr: {
    fontSize: 16,
    color: colors.textLightMuted,
    marginBottom: spacing.xl,
  },

  roleCards: {
    gap: 14,
    flex: 1,
    justifyContent: 'center',
  },

  roleCard: {
    backgroundColor: colors.bg,
    borderRadius: radius.xl,
    padding: spacing.xl,
  },
  roleCardDark: {
    backgroundColor: 'rgba(245,239,227,0.06)',
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(245,239,227,0.12)',
  },
  roleCardPressed: { opacity: 0.85 },

  roleCardIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  roleCardIconDark: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(232,169,60,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  roleCardEmoji: { fontSize: 26 },

  roleCardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  roleCardTitleDark: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: -0.3,
  },
  roleCardTitleAr: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  roleCardTitleArDark: {
    fontSize: 13,
    color: colors.textLightMuted,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  roleCardDesc: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  roleCardDescDark: {
    fontSize: 13,
    color: colors.textLightMuted,
    lineHeight: 18,
    marginBottom: spacing.lg,
  },

  roleCardBtn: {
    height: 44,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleCardBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
  },
  roleCardBtnOutline: {
    height: 44,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleCardBtnOutlineText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  loginMuted: { color: colors.textLightMuted, fontSize: 14 },
  loginLink: { color: colors.primary, fontSize: 14, fontWeight: '700' },
});
