import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SlideUp } from '../../components/Animated';
import { colors, spacing, radius } from '../../constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.glow} pointerEvents="none" />

      <View style={styles.logoSection}>
        <SlideUp delay={0} duration={500} distance={32}>
          <Text style={styles.houseIcon}>⌂</Text>
        </SlideUp>

        <SlideUp delay={100} duration={500} distance={32}>
          <Text style={styles.wordmark}>hirafi</Text>
        </SlideUp>

        <SlideUp delay={200} duration={500} distance={32}>
          <Text style={styles.arabicSubtitle}>حرفي</Text>
        </SlideUp>

        <SlideUp delay={300} duration={500} distance={24}>
          <Text style={styles.tagline}>HOME CRAFTED · TRUSTED HANDS</Text>
        </SlideUp>
      </View>

      <SlideUp delay={420} duration={480} distance={20} style={styles.bottomSection}>
        <Pressable
          style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
          onPress={() => router.push('/auth/phone?role=customer')}
        >
          <Text style={styles.btnPrimaryText}>Get Started as Customer</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.btnOutline, pressed && styles.btnPressed]}
          onPress={() => router.push('/auth/phone?role=pro')}
        >
          <Text style={styles.btnOutlineText}>Join as a Pro</Text>
        </Pressable>

        <View style={styles.loginRow}>
          <Text style={styles.loginMuted}>Already have an account? </Text>
          <Pressable onPress={() => router.push('/auth/phone?role=customer')}>
            <Text style={styles.loginLink}>Log in</Text>
          </Pressable>
        </View>
      </SlideUp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  glow: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'transparent',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 120,
    elevation: 0,
  },
  logoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  houseIcon: {
    fontSize: 72,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 88,
  },
  wordmark: {
    fontSize: 56,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -1,
    marginTop: 4,
  },
  arabicSubtitle: {
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 2,
  },
  tagline: {
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 3,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '500',
  },
  bottomSection: {
    paddingBottom: spacing.lg,
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
  btnPressed: {
    opacity: 0.8,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    paddingBottom: 8,
  },
  loginMuted: {
    color: colors.textMuted,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
