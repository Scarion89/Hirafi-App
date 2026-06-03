import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../constants/theme';

export default function PhoneScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { role } = useLocalSearchParams();
  const [phone, setPhone] = useState('');

  const isPro = role === 'pro';
  const canProceed = phone.length >= 7;

  function handleSend() {
    if (!canProceed) return;
    router.push('/auth/otp?role=' + role + '&phone=' + phone);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Enter your number</Text>
          <Text style={styles.subtitle}>We'll send a verification code</Text>
        </View>

        <View style={styles.roleBadge}>
          <Text style={styles.roleBadgeText}>
            {isPro ? '👷 Joining as Pro' : '🏠 Joining as Customer'}
          </Text>
        </View>

        <View style={styles.phoneRow}>
          <View style={styles.countryCode}>
            <Text style={styles.flag}>🇪🇬</Text>
            <Text style={styles.dialCode}>+20</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="100 000 0000"
            placeholderTextColor={colors.textMuted}
            maxLength={11}
            returnKeyType="done"
            onSubmitEditing={handleSend}
          />
        </View>

        <Text style={styles.noteText}>Standard rates apply · OTP expires in 60s</Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.sendBtn, !canProceed && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={!canProceed}
        >
          <Text style={[styles.sendBtnText, !canProceed && styles.sendBtnTextDisabled]}>
            Send Code →
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
    marginBottom: spacing.xl,
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
  roleBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: spacing.xl,
  },
  roleBadgeText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  flag: {
    fontSize: 18,
  },
  dialCode: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    paddingVertical: 8,
  },
  noteText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  footer: {
    paddingBottom: spacing.lg,
  },
  sendBtn: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: colors.primaryMuted,
    opacity: 0.5,
  },
  sendBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 0.3,
  },
  sendBtnTextDisabled: {
    color: colors.textMuted,
  },
});
