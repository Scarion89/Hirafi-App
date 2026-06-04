import React from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { getWorker } from '../../data/services';

export default function WorkerProfile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const w = getWorker(id);

  if (!w) return <View style={styles.root}><Text style={{ color: colors.text }}>Not found.</Text></View>;

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.bigAvatar}>
            <Text style={styles.bigInitials}>{w.initials}</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedCheck}>✓</Text>
            </View>
          </View>
          <Text style={styles.name}>{w.name}</Text>
          <Text style={styles.title}>{w.title} · {w.experience}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}><Text style={styles.badgeText}>✓ ID Verified</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>⭐ hirafi Master</Text></View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statVal}>{w.rating}</Text>
            <Text style={styles.statLabel}>⭐ RATING</Text>
          </View>
          <View style={styles.statDiv} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>{w.jobs}</Text>
            <Text style={styles.statLabel}>JOBS DONE</Text>
          </View>
          <View style={styles.statDiv} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>&lt;1hr</Text>
            <Text style={styles.statLabel}>RESPONSE</Text>
          </View>
        </View>

        {/* Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SPECIALTIES</Text>
          <View style={styles.chips}>
            {w.specialties.map((s) => (
              <View key={s} style={styles.chip}><Text style={styles.chipText}>{s}</Text></View>
            ))}
          </View>
        </View>

        {/* Review */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>RECENT REVIEWS</Text>
          <View style={styles.reviewCard}>
            <View style={styles.reviewTop}>
              <Text style={styles.reviewStars}>{'⭐'.repeat(w.review.stars)}</Text>
              <Text style={styles.reviewAuthor}>{w.review.author} · {w.review.daysAgo} days ago</Text>
            </View>
            <Text style={styles.reviewText}>{w.review.text}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Book CTA */}
      <View style={[styles.cta, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          onPress={() => router.push(`/booking/${w.id}`)}
          style={styles.bookBtn}
        >
          <Text style={styles.bookBtnText}>Book {w.name.split(' ')[0]} — from {w.basePrice} EGP</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  hero: {
    alignItems: 'center', padding: spacing.xl, paddingTop: spacing.lg,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  bigAvatar: { position: 'relative', width: 100, height: 100 },
  bigInitials: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: colors.bgMuted,
    textAlign: 'center', lineHeight: 100, fontSize: 32, fontWeight: '800', color: colors.text,
  },
  verifiedBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.bg,
  },
  verifiedCheck: { color: '#fff', fontSize: 14, fontWeight: '800' },
  name: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: spacing.md },
  title: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  badgeRow: { flexDirection: 'row', gap: 8, marginTop: spacing.md },
  badge: {
    backgroundColor: colors.bgMuted, paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border,
  },
  badgeText: { fontSize: 12, fontWeight: '600', color: colors.textSub },
  statsRow: {
    flexDirection: 'row', margin: spacing.lg,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    paddingVertical: spacing.lg, borderWidth: 1, borderColor: colors.border,
  },
  stat: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 24, fontWeight: '800', color: colors.text },
  statLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5, marginTop: 4 },
  statDiv: { width: 1, backgroundColor: colors.border },
  section: { paddingHorizontal: spacing.lg, marginBottom: spacing.xl },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill,
  },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.textSub },
  reviewCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  reviewTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  reviewStars: { fontSize: 14 },
  reviewAuthor: { fontSize: 12, color: colors.textMuted },
  reviewText: { fontSize: 14, color: colors.textSub, lineHeight: 22 },
  cta: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: spacing.lg, backgroundColor: colors.bg,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  bookBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  bookBtnText: { fontSize: 16, fontWeight: '800', color: '#000' },
});
