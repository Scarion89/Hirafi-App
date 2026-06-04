import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';
import { getWorker } from '../data/services';

const TAGS = [
  { id: 'ontime', label: '⏱️ On time' },
  { id: 'pro', label: '👔 Professional' },
  { id: 'clean', label: '✨ Clean work' },
  { id: 'fair', label: '💰 Fair price' },
  { id: 'skilled', label: '🔧 Skilled' },
  { id: 'friendly', label: '😊 Friendly' },
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

  const submit = () => setSubmitted(true);

  if (submitted) {
    return (
      <View style={[styles.root, styles.center, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Text style={styles.doneEmoji}>🎉</Text>
        <Text style={styles.doneTitle}>Thank you!</Text>
        <Text style={styles.doneSub}>Your review helps others find great workers.</Text>
        <Pressable style={[styles.btn, { marginTop: 32 }]} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.btnText}>Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom + 32, paddingHorizontal: spacing.lg }}
    >
      {/* Hero */}
      <View style={styles.heroSection}>
        <Text style={styles.heroEmoji}>🎉</Text>
        <Text style={styles.heroTitle}>Job done!</Text>
        <Text style={styles.heroSub}>How did {worker.name.split(' ')[0]} do?</Text>
      </View>

      {/* Worker row */}
      <View style={styles.workerRow}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{worker.initials}</Text>
        </View>
        <View>
          <Text style={styles.workerName}>{worker.name}</Text>
          <Text style={styles.workerTitle}>{worker.title}</Text>
        </View>
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
      <Text style={[styles.label, { marginTop: spacing.xl }]}>LEAVE A REVIEW (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Share your experience..."
        placeholderTextColor={colors.textMuted}
        value={review}
        onChangeText={setReview}
        multiline
        numberOfLines={3}
      />

      {/* Submit */}
      <Pressable style={styles.btn} onPress={submit}>
        <Text style={styles.btnText}>Submit Review</Text>
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
  heroEmoji: { fontSize: 64, marginBottom: 8 },
  heroTitle: { fontSize: 32, fontWeight: '900', color: colors.text },
  heroSub: { fontSize: 16, color: colors.textMuted, marginTop: 6 },
  workerRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.xl,
    borderWidth: 1, borderColor: colors.border,
  },
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center',
  },
  initials: { fontSize: 16, fontWeight: '800', color: colors.text },
  workerName: { fontSize: 15, fontWeight: '700', color: colors.text },
  workerTitle: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  label: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.sm },
  starsRow: { flexDirection: 'row', gap: 8 },
  starBtn: { padding: 4 },
  star: { fontSize: 40, color: colors.border },
  starActive: { color: colors.primary },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard,
  },
  tagActive: { backgroundColor: colors.primaryMuted, borderColor: colors.primary },
  tagText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  tagTextActive: { color: colors.primary },
  input: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, color: colors.text, fontSize: 14,
    minHeight: 90, textAlignVertical: 'top',
  },
  btn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl,
  },
  btnText: { fontSize: 16, fontWeight: '800', color: '#000' },
  skipText: { fontSize: 14, color: colors.textMuted, fontWeight: '600' },
  doneEmoji: { fontSize: 80, marginBottom: 16 },
  doneTitle: { fontSize: 36, fontWeight: '900', color: colors.text },
  doneSub: { fontSize: 15, color: colors.textMuted, marginTop: 8, textAlign: 'center', paddingHorizontal: 32 },
});
