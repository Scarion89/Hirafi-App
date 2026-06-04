import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { getWorker } from '../../data/services';

const TABS = ['About', 'Reviews', 'Gallery'];

export default function WorkerProfile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const w = getWorker(id);
  const [activeTab, setActiveTab] = useState('About');

  if (!w) return <View style={styles.root}><Text style={{ color: colors.text, padding: 20 }}>Worker not found.</Text></View>;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Dark header */}
        <View style={[styles.hero, { paddingTop: insets.top + 12 }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>

          <View style={styles.avatarWrap}>
            <View style={styles.bigAvatar}>
              <Text style={styles.bigInitials}>{w.initials}</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>🛡️</Text>
            </View>
          </View>

          <Text style={styles.name}>{w.name}</Text>
          <Text style={styles.specialty}>{w.title}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingVal}>★ {w.rating}</Text>
            <Text style={styles.ratingCount}>({w.jobs} reviews)</Text>
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>&lt;1 hr</Text>
              <Text style={styles.statLabel}>RESPONSE</Text>
            </View>
            <View style={styles.statDiv} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>68%</Text>
              <Text style={styles.statLabel}>REPEAT</Text>
            </View>
            <View style={styles.statDiv} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>{w.basePrice} EGP</Text>
              <Text style={styles.statLabel}>FROM</Text>
            </View>
          </View>
        </View>

        {/* Light body */}
        <View style={styles.body}>
          {/* Tabs */}
          <View style={styles.tabsBar}>
            {TABS.map((t) => (
              <Pressable key={t} onPress={() => setActiveTab(t)} style={styles.tabBtn}>
                <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
                {activeTab === t && <View style={styles.tabLine} />}
              </Pressable>
            ))}
          </View>

          {activeTab === 'About' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionLabel}>ABOUT</Text>
              <Text style={styles.aboutText}>
                {w.name.split(' ')[0]} is a verified {w.title.toLowerCase()} with {w.experience} of experience serving Greater Cairo. Known for clean work, fair pricing, and arriving on time.
              </Text>

              <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>SPECIALTIES</Text>
              <View style={styles.chips}>
                {w.specialties.map((s) => (
                  <View key={s} style={styles.chip}>
                    <Text style={styles.chipText}>{s}</Text>
                  </View>
                ))}
              </View>

              <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>BADGES</Text>
              <View style={styles.badgeRow}>
                <View style={styles.badge}><Text style={styles.badgeText}>✓ ID Verified</Text></View>
                <View style={styles.badge}><Text style={styles.badgeText}>⭐ Top Rated</Text></View>
                <View style={styles.badge}><Text style={styles.badgeText}>🛡️ hirafi Master</Text></View>
              </View>
            </View>
          )}

          {activeTab === 'Reviews' && (
            <View style={styles.tabContent}>
              <View style={styles.reviewCard}>
                <View style={styles.reviewTop}>
                  <Text style={styles.reviewStars}>{'★'.repeat(w.review.stars)}</Text>
                  <Text style={styles.reviewAuthor}>{w.review.author} · {w.review.daysAgo}d ago</Text>
                </View>
                <Text style={styles.reviewText}>{w.review.text}</Text>
              </View>
              <View style={[styles.reviewCard, { marginTop: spacing.md }]}>
                <View style={styles.reviewTop}>
                  <Text style={styles.reviewStars}>★★★★★</Text>
                  <Text style={styles.reviewAuthor}>Sara M. · 12d ago</Text>
                </View>
                <Text style={styles.reviewText}>Very professional and arrived on time. Work was clean and price was fair. Highly recommend!</Text>
              </View>
            </View>
          )}

          {activeTab === 'Gallery' && (
            <View style={styles.tabContent}>
              <View style={styles.galleryGrid}>
                {[1,2,3,4,5,6].map((n) => (
                  <View key={n} style={styles.galleryThumb}>
                    <Text style={styles.galleryIcon}>🔧</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky footer CTA */}
      <View style={[styles.cta, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.ctaLeft}>
          <Text style={styles.ctaPrice}>from {w.basePrice} EGP</Text>
          <Text style={styles.ctaPriceSub}>Pay after work done</Text>
        </View>
        <Pressable
          onPress={() => router.push({ pathname: '/booking/describe', params: { workerId: w.id } })}
          style={styles.bookBtn}
        >
          <Text style={styles.bookBtnText}>Book {w.name.split(' ')[0]} →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  hero: {
    backgroundColor: colors.dark,
    alignItems: 'center', padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  backBtn: {
    position: 'absolute', top: 0, left: spacing.lg,
    width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 24, color: colors.textLight, fontWeight: '300' },

  avatarWrap: { position: 'relative', width: 88, height: 88, marginBottom: spacing.md, marginTop: 36 },
  bigAvatar: {
    width: 88, height: 88, borderRadius: 20,
    backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
  },
  bigInitials: { fontSize: 28, fontWeight: '900', color: colors.primary },
  verifiedBadge: {
    position: 'absolute', bottom: -6, right: -6,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.dark, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.primary,
  },
  verifiedIcon: { fontSize: 14 },

  name: { fontSize: 22, fontWeight: '900', color: colors.textLight },
  specialty: { fontSize: 13, color: colors.textLightMuted, marginTop: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  ratingVal: { fontSize: 15, fontWeight: '800', color: colors.primary },
  ratingCount: { fontSize: 13, color: colors.textLightMuted },

  statsRow: {
    flexDirection: 'row', marginTop: spacing.xl,
    backgroundColor: colors.darkCard, borderRadius: radius.lg,
    paddingVertical: spacing.md, width: '100%',
    borderWidth: 1, borderColor: colors.borderLight,
  },
  stat: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '800', color: colors.textLight },
  statLabel: { fontSize: 9, fontWeight: '700', color: colors.textLightMuted, letterSpacing: 0.8, marginTop: 4 },
  statDiv: { width: 1, backgroundColor: colors.borderLight },

  body: { backgroundColor: colors.bg, minHeight: 400 },

  tabsBar: {
    flexDirection: 'row', paddingHorizontal: spacing.lg,
    borderBottomWidth: 1, borderBottomColor: colors.border,
    backgroundColor: colors.bgCard,
  },
  tabBtn: { marginRight: spacing.xl, paddingVertical: spacing.md, position: 'relative' },
  tabText: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: colors.text, fontWeight: '800' },
  tabLine: { position: 'absolute', bottom: -1, left: 0, right: 0, height: 3, borderRadius: 2, backgroundColor: colors.primary },

  tabContent: { padding: spacing.lg },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.sm },
  aboutText: { fontSize: 14, color: colors.textSub, lineHeight: 22 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill,
  },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.textSub },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badge: {
    backgroundColor: colors.bgMuted, paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border,
  },
  badgeText: { fontSize: 12, fontWeight: '600', color: colors.textSub },

  reviewCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.lg, borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  reviewTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  reviewStars: { fontSize: 14, color: colors.primary },
  reviewAuthor: { fontSize: 12, color: colors.textMuted },
  reviewText: { fontSize: 14, color: colors.textSub, lineHeight: 22 },

  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  galleryThumb: {
    width: '31%', aspectRatio: 1, borderRadius: radius.md,
    backgroundColor: colors.bgCardAlt, alignItems: 'center', justifyContent: 'center',
  },
  galleryIcon: { fontSize: 32 },

  cta: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg, paddingTop: 14,
    backgroundColor: colors.bgCard,
    borderTopWidth: 1, borderTopColor: colors.border,
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    ...shadow.card,
  },
  ctaLeft: { flex: 1 },
  ctaPrice: { fontSize: 18, fontWeight: '900', color: colors.text },
  ctaPriceSub: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  bookBtn: {
    backgroundColor: colors.primary, borderRadius: radius.lg,
    paddingHorizontal: spacing.xl, paddingVertical: 14,
  },
  bookBtnText: { fontSize: 15, fontWeight: '900', color: '#000' },
});
