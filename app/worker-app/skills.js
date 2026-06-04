import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

const SKILLS = [
  { id: 'plumbing',    emoji: '🔧', name: 'Plumbing · سباكة' },
  { id: 'electrical',  emoji: '⚡', name: 'Electrical · كهرباء' },
  { id: 'painting',    emoji: '🎨', name: 'Painting · دهان' },
  { id: 'cleaning',    emoji: '🧹', name: 'Cleaning · نظافة' },
  { id: 'carpentry',   emoji: '🪵', name: 'Carpentry · نجارة' },
  { id: 'ac',          emoji: '❄️', name: 'AC & HVAC · تكييف' },
  { id: 'appliances',  emoji: '🔌', name: 'Appliances · أجهزة' },
  { id: 'gardening',   emoji: '🌿', name: 'Gardening · حدائق' },
  { id: 'flooring',    emoji: '🏠', name: 'Flooring · أرضيات' },
  { id: 'gypsum',      emoji: '🔨', name: 'Gypsum · جبس' },
];

const EXPERIENCE = ['Less than 1 yr', '1–3 yrs', '3–5 yrs', '5–10 yrs', '10+ yrs'];

export default function Skills() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState([]);
  const [exp, setExp] = useState(null);

  const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const canContinue = selected.length > 0 && exp !== null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      <View style={styles.progressBar}>
        {[1, 2, 3, 4].map((n) => (
          <View key={n} style={[styles.progressStep, n <= 2 && styles.progressStepActive]} />
        ))}
      </View>
      <Text style={styles.stepText}>Step 2 of 4</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>What do you do?</Text>
        <Text style={styles.titleAr}>إيه شغلتك؟</Text>
        <Text style={styles.body}>Select all specialties that apply · اختر كل تخصصاتك</Text>

        <View style={styles.skillsGrid}>
          {SKILLS.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => toggle(s.id)}
              style={[styles.skillChip, selected.includes(s.id) && styles.skillChipActive]}
            >
              <Text style={styles.skillEmoji}>{s.emoji}</Text>
              <Text style={[styles.skillText, selected.includes(s.id) && styles.skillTextActive]}>{s.name}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.body, { marginTop: spacing.xl }]}>Years of experience · سنوات الخبرة</Text>
        <View style={styles.expRow}>
          {EXPERIENCE.map((e) => (
            <Pressable
              key={e}
              onPress={() => setExp(e)}
              style={[styles.expBtn, exp === e && styles.expBtnActive]}
            >
              <Text style={[styles.expText, exp === e && styles.expTextActive]}>{e}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
          onPress={() => canContinue && router.push('/worker-app/verify')}
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
  titleAr: { fontSize: 16, color: colors.textLightMuted, marginBottom: spacing.sm },
  body: { fontSize: 13, color: colors.textLightMuted, marginBottom: spacing.md },

  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.pill,
    backgroundColor: colors.darkCard, borderWidth: 1.5, borderColor: colors.borderLight,
  },
  skillChipActive: { backgroundColor: 'rgba(232,169,60,0.15)', borderColor: colors.primary },
  skillEmoji: { fontSize: 16 },
  skillText: { fontSize: 13, fontWeight: '600', color: colors.textLightMuted },
  skillTextActive: { color: colors.primary, fontWeight: '700' },

  expRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  expBtn: {
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.pill,
    backgroundColor: colors.darkCard, borderWidth: 1.5, borderColor: colors.borderLight,
  },
  expBtnActive: { backgroundColor: 'rgba(232,169,60,0.15)', borderColor: colors.primary },
  expText: { fontSize: 13, fontWeight: '600', color: colors.textLightMuted },
  expTextActive: { color: colors.primary },

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
