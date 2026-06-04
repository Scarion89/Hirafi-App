import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet, TextInput, ScrollView, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../constants/theme';
import { getWorker } from '../data/services';

const TAGS = [
  { id: 'pro',      label: 'Professional · محترف' },
  { id: 'ontime',   label: 'On time · في الموعد' },
  { id: 'clean',    label: 'Clean work · شغل نظيف' },
  { id: 'value',    label: 'Good value · سعر مناسب' },
  { id: 'friendly', label: 'Friendly · ودود' },
  { id: 'skilled',  label: 'Skilled · ماهر' },
];

export default function Rating() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { workerId = 'w1' } = useLocalSearchParams();
  const worker = getWorker(workerId) || { name: 'Hassan Mahmoud', initials: 'HM', title: 'Master Plumber' };

  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState([]);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (id) => setTags((t) => t.includes(id) ? t.filter((x) => x !== id) : [...t, id]);

  if (submitted) {
    return (
      <View style={[styles.root, styles.center, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
        <Text style={styles.doneEmoji}>🎉</Text>
        <Text style={styles.doneTitle}>Thank you!</Text>
        <Text style={styles.doneSub}>Your review helps others find great hirafs.</Text>
        <Pressable style={[styles.btn, { marginTop: 32 }]} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.btnText}>Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32, paddingHorizontal: spacing.lg }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      {/* Worker avatar */}
      <View style={styles.heroSection}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{worker.initials}</Text>
        </View>
        <Text style={styles.heroTitle}>How was {worker.name.split(' ')[0]}?</Text>
        <Text style={styles.heroSub}>{worker.name} · {worker.title}</Text>
      </View>

      {/* Stars */}
      <Text style={styles.label}>YOUR RATING</Text>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable key={n} onPress={() => setStars(n)} style={styles.starBtn}>
            <Text style={[styles.star, n <= stars && styles.starActive]}>★</Text>
          </Pressable>
        ))}
      </View>

      {/* Tags */}
      <Text style={[styles.label, { marginTop: spacing.xl }]}>WHAT STOOD OUT?</Text>
      <View style={styles.tagsWrap}>
        {TAGS.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => toggleTag(t.id)}
            style={[styles.tag, tags.includes(t.id) && styles.tagActive]}
          >
            <Text style={[styles.tagText, tags.includes(t.id) && styles.tagTextActive]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Review text */}
      <Text style={[styles.label, { marginTop: spacing.xl }]}>LEAVE A COMMENT (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Share your experience…"
        placeholderTextColor={colors.textMuted}
        value={review}
        onChangeText={setReview}
        multiline
        numberOfLines={4}
      />

      {/* Submit */}
      <Pressable style={styles.btn} onPress={() => setSubmitted(true)}>
        <Text style={styles.btnText}>Submit review →</Text>
      </Pressable>

      <Pressable onPress={() => router.replace('/(tabs)')} style={{ marginTop: 12, alignItems: 'center' }}>
        <Text style={styles.skipText}>Skip for now</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  center: { alignItems: 'center', justifyContent: 'center' },

  heroSection: { alignItems: 'center', marginBottom: spacing.xl },
  avatar: {
    width: 80, height: 80, borderRadius: 20, backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
    borderWidth: 3, borderColor: colors.primary,
  },
  initials: { fontSize: 26, fontWeight: '900', color: colors.primary },
  heroTitle: { fontSize: 24, fontWeight: '900', color: colors.text },
  heroSub: { fontSize: 13, color: colors.textMuted, marginTop: 4 },

  label: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.sm },
  starsRow: { flexDirection: 'row', gap: 8 },
  starBtn: { padding: 4 },
  star: { fontSize: 44, color: colors.border },
  starActive: { color: colors.primary },

  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    paddingHorizontal: 14, paddingVertical: 9, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard,
  },
  tagActive: { backgroundColor: colors.primaryMuted, borderColor: colors.primary },
  tagText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  tagTextActive: { color: colors.copper, fontWeight: '700' },

  input: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, color: colors.text, fontSize: 14,
    minHeight: 100, textAlignVertical: 'top',
    ...shadow.card,
  },
  btn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl,
  },
  btnText: { fontSize: 16, fontWeight: '900', color: '#000' },
  skipText: { fontSize: 14, color: colors.textMuted, fontWeight: '600' },

  doneEmoji: { fontSize: 80, marginBottom: 16 },
  doneTitle: { fontSize: 36, fontWeight: '900', color: colors.text },
  doneSub: { fontSize: 15, color: colors.textMuted, marginTop: 8, textAlign: 'center', paddingHorizontal: 32 },
});
