import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

export default function Verify() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [certUploaded, setCertUploaded] = useState(false);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      <View style={styles.progressBar}>
        {[1, 2, 3, 4].map((n) => (
          <View key={n} style={[styles.progressStep, n <= 3 && styles.progressStepActive]} />
        ))}
      </View>
      <Text style={styles.stepText}>Step 3 of 4</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Upload your documents</Text>
        <Text style={styles.titleAr}>ارفع مستنداتك</Text>
        <Text style={styles.body}>Upload your professional certificates to build trust with customers.</Text>

        <Text style={styles.fieldLabel}>Trade certificate · شهادة مهنية (required)</Text>
        <Pressable onPress={() => setCertUploaded(true)} style={[styles.uploadBox, certUploaded && styles.uploadBoxDone]}>
          {certUploaded ? (
            <>
              <Text style={styles.doneIcon}>✓</Text>
              <Text style={styles.doneText}>Certificate uploaded</Text>
            </>
          ) : (
            <>
              <Text style={styles.uploadIcon}>📄</Text>
              <Text style={styles.uploadText}>Tap to upload certificate</Text>
              <Text style={styles.uploadSub}>JPG, PNG or PDF · max 10 MB</Text>
            </>
          )}
        </Pressable>

        <Text style={styles.fieldLabel}>Trade license · رخصة المهنة (optional)</Text>
        <Pressable style={styles.uploadBox}>
          <Text style={styles.uploadIcon}>📋</Text>
          <Text style={styles.uploadText}>Tap to upload license</Text>
          <Text style={styles.uploadSub}>Optional but recommended</Text>
        </Pressable>

        <View style={styles.noteCard}>
          <Text style={styles.noteIcon}>ℹ️</Text>
          <Text style={styles.noteText}>Documents are reviewed within 24 hours. You'll be notified when approved.</Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={[styles.submitBtn, !certUploaded && styles.submitBtnDisabled]}
          onPress={() => certUploaded && router.push('/worker-app/pending')}
        >
          <Text style={styles.submitText}>Submit for review →</Text>
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
  uploadBox: {
    height: 110, borderRadius: radius.lg,
    backgroundColor: colors.darkCard, borderWidth: 1.5, borderColor: colors.borderLight,
    borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 4,
    marginBottom: spacing.xl,
  },
  uploadBoxDone: { borderColor: colors.success, backgroundColor: 'rgba(122,140,106,0.1)', borderStyle: 'solid' },
  uploadIcon: { fontSize: 28 },
  uploadText: { fontSize: 13, fontWeight: '600', color: colors.textLightSub },
  uploadSub: { fontSize: 11, color: colors.textLightMuted },
  doneIcon: { fontSize: 28, color: colors.success },
  doneText: { fontSize: 13, fontWeight: '700', color: colors.success },
  noteCard: {
    flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start',
    backgroundColor: colors.darkMuted, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.borderLight,
  },
  noteIcon: { fontSize: 16 },
  noteText: { flex: 1, fontSize: 13, color: colors.textLightMuted, lineHeight: 18 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg, paddingTop: 14,
    backgroundColor: colors.dark, borderTopWidth: 1, borderTopColor: colors.borderLight,
  },
  submitBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  submitBtnDisabled: { opacity: 0.4 },
  submitText: { fontSize: 16, fontWeight: '900', color: '#000' },
});
