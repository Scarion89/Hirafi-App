import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../constants/theme';

export default function OtpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { role, phone } = useLocalSearchParams();

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(59);
  const hiddenInputRef = useRef(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 0) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function focusInput() {
    hiddenInputRef.current?.focus();
  }

  function triggerShake() {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }

  function handleVerify() {
    if (otp.length !== 6) {
      triggerShake();
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/auth/setup?role=' + role + '&phone=' + phone + '&otp=' + otp);
    }, 1500);
  }

  function handleResend() {
    setCountdown(59);
    setOtp('');
  }

  const digits = otp.split('');

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify number</Text>
          <Text style={styles.subtitle}>Code sent to +20 {phone}</Text>
        </View>

        <Animated.View
          style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}
        >
          <Pressable style={styles.otpRowInner} onPress={focusInput}>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const isFilled = digits[i] !== undefined;
              const isActive = i === otp.length && otp.length < 6;
              return (
                <View
                  key={i}
                  style={[
                    styles.digitBox,
                    isActive && styles.digitBoxActive,
                    isFilled && styles.digitBoxFilled,
                  ]}
                >
                  {isFilled ? (
                    <Text style={styles.digitText}>{digits[i]}</Text>
                  ) : isActive ? (
                    <View style={styles.cursor} />
                  ) : null}
                </View>
              );
            })}
          </Pressable>

          <TextInput
            ref={hiddenInputRef}
            style={styles.hiddenInput}
            value={otp}
            onChangeText={(v) => setOtp(v.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="number-pad"
            maxLength={6}
            caretHidden
            autoFocus
          />
        </Animated.View>

        <View style={styles.resendRow}>
          {countdown > 0 ? (
            <Text style={styles.resendCountdown}>
              Resend code in{' '}
              <Text style={styles.resendTimer}>
                0:{countdown < 10 ? '0' + countdown : countdown}
              </Text>
            </Text>
          ) : (
            <Pressable onPress={handleResend}>
              <Text style={styles.resendActive}>Resend code</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.verifyBtn, loading && styles.verifyBtnLoading]}
          onPress={handleVerify}
          disabled={loading}
        >
          <Text style={styles.verifyBtnText}>
            {loading ? 'Verifying…' : 'Verify →'}
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
  topBar: {
    height: 52,
    justifyContent: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
  },
  otpRow: {
    marginBottom: 28,
  },
  otpRowInner: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  digitBox: {
    width: 52,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitBoxActive: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  digitBoxFilled: {
    borderColor: colors.borderLight,
    backgroundColor: colors.bgCardAlt,
  },
  digitText: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0,
  },
  cursor: {
    width: 2,
    height: 26,
    backgroundColor: colors.primary,
    borderRadius: 1,
    opacity: 0.9,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  resendRow: {
    alignItems: 'center',
    marginTop: 8,
  },
  resendCountdown: {
    fontSize: 14,
    color: colors.textMuted,
  },
  resendTimer: {
    color: colors.textSub,
    fontWeight: '600',
  },
  resendActive: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '700',
  },
  footer: {
    paddingBottom: spacing.lg,
  },
  verifyBtn: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyBtnLoading: {
    opacity: 0.7,
  },
  verifyBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 0.3,
  },
});
