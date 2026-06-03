import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { categories, featuredWorker } from '../../data/services';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <Text style={styles.logoMark}>⌂</Text>
          <View>
            <Text style={styles.greeting}>Hi, Ahmed</Text>
          </View>
        </View>
        <View style={styles.bell}>
          <Text style={styles.bellEmoji}>🔔</Text>
          <View style={styles.bellDot} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.search}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search for a service…"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Promo banner */}
        <View style={styles.promo}>
          <Text style={styles.promoLabel}>FIRST BOOKING OFFER</Text>
          <Text style={styles.promoTitle}>20% off your first job</Text>
          <Text style={styles.promoSub}>Vetted craftsmen · Upfront pricing · Guaranteed</Text>
        </View>

        {/* Quick Services */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
          <Pressable>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <View style={styles.catGrid}>
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => router.push(`/category/${cat.id}`)}
              style={({ pressed }) => [styles.catCard, pressed && { opacity: 0.8 }]}
            >
              <View style={styles.catIconBg}>
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
              </View>
              <Text style={styles.catName}>{cat.name}</Text>
              <Text style={styles.catCount}>{cat.count} pros</Text>
            </Pressable>
          ))}
        </View>

        {/* Top rated */}
        <Text style={[styles.sectionTitle, { paddingHorizontal: spacing.lg, marginTop: spacing.xl }]}>
          Top-Rated This Week
        </Text>
        <Pressable
          onPress={() => router.push(`/worker/${featuredWorker.id}`)}
          style={({ pressed }) => [styles.featuredCard, pressed && { opacity: 0.85 }]}
        >
          <View style={styles.favRow}>
            <View style={styles.featuredAvatar}>
              <Text style={styles.featuredInitials}>{featuredWorker.initials}</Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedCheck}>✓</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.featuredName}>{featuredWorker.name}</Text>
              <Text style={styles.featuredTitle}>{featuredWorker.title} · {featuredWorker.experience}</Text>
              <Text style={styles.featuredMeta}>
                ⭐ {featuredWorker.rating} · {featuredWorker.jobs} jobs · {featuredWorker.location}
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Quick access to new screens */}
        <Text style={styles.demoLabel}>EXPLORE SCREENS</Text>
        <View style={styles.demoRow}>
          <Pressable style={styles.demoBtn} onPress={() => router.push({ pathname: '/tracking', params: { workerId: 'w1' } })}>
            <Text style={styles.demoEmoji}>📍</Text>
            <Text style={styles.demoBtnText}>Tracking</Text>
          </Pressable>
          <Pressable style={styles.demoBtn} onPress={() => router.push({ pathname: '/rating', params: { workerId: 'w1' } })}>
            <Text style={styles.demoEmoji}>⭐</Text>
            <Text style={styles.demoBtnText}>Rate Job</Text>
          </Pressable>
          <Pressable style={styles.demoBtn} onPress={() => router.push('/worker-app')}>
            <Text style={styles.demoEmoji}>🔧</Text>
            <Text style={styles.demoBtnText}>Worker App</Text>
          </Pressable>
          <Pressable style={styles.demoBtn} onPress={() => router.push('/admin')}>
            <Text style={styles.demoEmoji}>📊</Text>
            <Text style={styles.demoBtnText}>Admin</Text>
          </Pressable>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoMark: { fontSize: 22, color: colors.primary },
  greeting: { fontSize: 20, fontWeight: '800', color: colors.text },
  bell: { position: 'relative', width: 40, height: 40, backgroundColor: colors.bgCard, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  bellEmoji: { fontSize: 18 },
  bellDot: { position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.bg },
  search: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard,
    marginHorizontal: spacing.lg, borderRadius: radius.lg, paddingHorizontal: spacing.md,
    height: 50, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: colors.text },
  promo: {
    marginHorizontal: spacing.lg, borderRadius: radius.lg, padding: spacing.lg,
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.primaryMuted,
    marginBottom: spacing.xl,
  },
  promoLabel: { fontSize: 10, fontWeight: '700', color: colors.primary, letterSpacing: 1.5, marginBottom: 6 },
  promoTitle: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 4 },
  promoSub: { fontSize: 13, color: colors.textMuted },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  seeAll: { fontSize: 14, fontWeight: '700', color: colors.primary },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.lg, gap: 12 },
  catCard: {
    width: '47%', backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  catIconBg: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  catEmoji: { fontSize: 22 },
  catName: { fontSize: 15, fontWeight: '700', color: colors.text },
  catCount: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  featuredCard: {
    marginHorizontal: spacing.lg, backgroundColor: colors.bgCard,
    borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border,
    marginTop: spacing.md, ...shadow.card,
  },
  favRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  featuredAvatar: { position: 'relative', width: 64, height: 64 },
  featuredInitials: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: colors.bgMuted,
    textAlign: 'center', lineHeight: 64, fontSize: 20, fontWeight: '800', color: colors.text,
  },
  verifiedBadge: {
    position: 'absolute', bottom: -2, right: -2, width: 22, height: 22, borderRadius: 11,
    backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.bgCard,
  },
  verifiedCheck: { color: '#fff', fontSize: 11, fontWeight: '800' },
  featuredName: { fontSize: 16, fontWeight: '800', color: colors.text },
  featuredTitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  featuredMeta: { fontSize: 12, color: colors.textSub, marginTop: 4 },
  demoLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  demoRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.sm, marginBottom: spacing.sm },
  demoBtn: {
    flex: 1, backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.sm,
    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
  },
  demoEmoji: { fontSize: 22, marginBottom: 4 },
  demoBtnText: { fontSize: 10, fontWeight: '700', color: colors.textSub, textAlign: 'center' },
});
