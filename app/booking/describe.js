import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';

const URGENCY = [
  { id: 'today', label: 'Today · اليوم', emoji: '🔥' },
  { id: 'week',  label: 'This week · هذا الأسبوع', emoji: '📅' },
  { id: 'noRush', label: 'No rush · مش مستعجل', emoji: '🌙' },
];

export default function DescribeJob() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { workerId } = useLocalSearchParams();

  const [desc, setDesc] = useState('');
  const [urgency, setUrgency] = useState('today');

  const canContinue = desc.trim().length > 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.topTitle}>What's the job?</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.prompt}>Describe what you need done · اوصف الشغلانة</Text>

        <View style={styles.textAreaWrap}>
          <TextInput
            style={styles.textArea}
            placeholder={"e.g. I have a pipe leaking under the kitchen sink. It's been dripping for 2 days…\n\nمثلاً: عندي بايب بيدرب تحت حوض المطبخ، من يومين وهو بيدرب..."}
            placeholderTextColor={colors.textMuted}
            value={desc}
            onChangeText={setDesc}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Photo row */}
        <View style={styles.photoSection}>
          <Text style={styles.photoLabel}>Add photos (optional) · إضافة صور</Text>
          <View style={styles.photoRow}>
            {[1, 2, 3].map((n) => (
              <Pressable key={n} style={styles.photoThumb}>
                <Text style={styles.photoPlus}>+</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Urgency */}
        <Text style={styles.urgencyLabel}>When do you need it? · امتى تحتاجه</Text>
        <View style={styles.urgencyChips}>
          {URGENCY.map((u) => (
            <Pressable
              key={u.id}
              style={[styles.urgencyChip, urgency === u.id && styles.urgencyChipActive]}
              onPress={() => setUrgency(u.id)}
            >
              <Text style={styles.urgencyEmoji}>{u.emoji}</Text>
              <Text style={[styles.urgencyText, urgency === u.id && styles.urgencyTextActive]}>{u.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          onPress={() => canContinue && router.push({ pathname: '/booking/schedule', params: { workerId } })}
          style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
        >
          <Text style={styles.continueText}>Continue →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 22, color: colors.text, fontWeight: '300' },
  topTitle: { fontSize: 17, fontWeight: '800', color: colors.text },

  content: { padding: spacing.lg, paddingBottom: 120 },
  prompt: { fontSize: 14, color: colors.textSub, marginBottom: spacing.md },

  textAreaWrap: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border, marginBottom: spacing.xl,
    ...shadow.card,
  },
  textArea: {
    fontSize: 15, color: colors.text, padding: spacing.md,
    minHeight: 120, lineHeight: 22,
  },

  photoSection: { marginBottom: spacing.xl },
  photoLabel: { fontSize: 13, fontWeight: '600', color: colors.textSub, marginBottom: spacing.sm },
  photoRow: { flexDirection: 'row', gap: spacing.sm },
  photoThumb: {
    width: 72, height: 72, borderRadius: radius.md,
    backgroundColor: colors.bgCard, borderWidth: 1.5, borderColor: colors.border,
    borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center',
  },
  photoPlus: { fontSize: 28, color: colors.textMuted },

  urgencyLabel: { fontSize: 13, fontWeight: '600', color: colors.textSub, marginBottom: spacing.md },
  urgencyChips: { gap: spacing.sm },
  urgencyChip: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1.5, borderColor: colors.border,
  },
  urgencyChipActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  urgencyEmoji: { fontSize: 18 },
  urgencyText: { fontSize: 14, fontWeight: '600', color: colors.textSub },
  urgencyTextActive: { color: colors.copper, fontWeight: '700' },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg, paddingTop: 14,
    backgroundColor: colors.bgCard,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  continueBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  continueBtnDisabled: { opacity: 0.4 },
  continueText: { fontSize: 16, fontWeight: '900', color: '#000' },
});
