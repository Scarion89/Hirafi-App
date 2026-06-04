import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

export default function KYC() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [nationalId, setNationalId] = useState('');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      {/* Progress */}
      <View style={styles.progressBar}>
        {[1, 2, 3, 4].map((n) => (
          <View key={n} style={[styles.progressStep, n === 1 && styles.progressStepActive]} />
        ))}
      </View>
      <Text style={styles.stepText}>Step 1 of 4 · الخطوة الأولى</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Verify your identity</Text>
        <Text style={styles.titleAr}>تحقق من هويتك</Text>
        <Text style={styles.body}>We need to verify your identity to ensure the safety and trust of our community.</Text>

        {/* National ID number */}
        <Text style={styles.fieldLabel}>National ID number · رقم البطاقة الوطنية</Text>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="14-digit national ID"
            placeholderTextColor={colors.textLightMuted}
            value={nationalId}
            onChangeText={setNationalId}
            keyboardType="numeric"
            maxLength={14}
          />
        </View>

        {/* ID photo upload */}
        <Text style={styles.fieldLabel}>Upload ID photos · صور البطاقة</Text>
        <View style={styles.photoRow}>
          <Pressable style={styles.photoBox}>
            <Text style={styles.photoIcon}>📸</Text>
            <Text style={styles.photoLabel}>Front side</Text>
            <Text style={styles.photoLabelAr}>الوجه الأمامي</Text>
          </Pressable>
          <Pressable style={styles.photoBox}>
            <Text style={styles.photoIcon}>📸</Text>
            <Text style={styles.photoLabel}>Back side</Text>
            <Text style={styles.photoLabelAr}>الوجه الخلفي</Text>
          </Pressable>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteIcon}>🔒</Text>
          <Text style={styles.noteText}>Your data is encrypted and never shared with customers.</Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={[styles.continueBtn, nationalId.length < 14 && styles.continueBtnDisabled]}
          onPress={() => nationalId.length >= 14 && router.push('/worker-app/skills')}
        >
          <Text style={styles.continueText}>Continue →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark },

  progressBar: { flexDirection: 'row', gap: 6, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  progressStep: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.darkMuted },
  progressStepActive: { backgroundColor: colors.primary },
  stepText: { fontSize: 11, color: colors.textLightMuted, paddingHorizontal: spacing.lg, marginTop: 6, marginBottom: spacing.sm },

  content: { padding: spacing.lg, paddingBottom: 120 },
  title: { fontSize: 26, fontWeight: '900', color: colors.textLight, marginBottom: 4 },
  titleAr: { fontSize: 16, color: colors.textLightMuted, marginBottom: spacing.lg },
  body: { fontSize: 14, color: colors.textLightMuted, lineHeight: 20, marginBottom: spacing.xl },

  fieldLabel: { fontSize: 12, fontWeight: '700', color: colors.textLightSub, marginBottom: spacing.sm },
  inputWrap: {
    backgroundColor: colors.darkCard, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.borderLight,
    paddingHorizontal: spacing.md, height: 52, justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  input: { fontSize: 16, color: colors.textLight, letterSpacing: 2 },

  photoRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  photoBox: {
    flex: 1, height: 110, borderRadius: radius.lg,
    backgroundColor: colors.darkCard, borderWidth: 1.5, borderColor: colors.borderLight,
    borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  photoIcon: { fontSize: 28 },
  photoLabel: { fontSize: 12, fontWeight: '600', color: colors.textLightSub },
  photoLabelAr: { fontSize: 10, color: colors.textLightMuted },

  noteCard: {
    flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start',
    backgroundColor: 'rgba(232,169,60,0.08)', borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: 'rgba(232,169,60,0.2)',
  },
  noteIcon: { fontSize: 16 },
  noteText: { flex: 1, fontSize: 13, color: colors.textLightMuted, lineHeight: 18 },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg, paddingTop: 14,
    backgroundColor: colors.dark, borderTopWidth: 1, borderTopColor: colors.borderLight,
  },
  continueBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  continueBtnDisabled: { opacity: 0.4 },
  continueText: { fontSize: 16, fontWeight: '900', color: '#000' },
});
