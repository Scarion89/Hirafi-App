import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, TextInput, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { categories, featuredWorker } from '../../data/services';
import { useAuth } from '../../store/auth';

function useFadeSlide(delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(22)).current;
  useEffect(() => {
    const t = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]).start();
    }, delay);
    return () => clearTimeout(t);
  }, []);
  return { opacity, transform: [{ translateY }] };
}

function ScaleCard({ children, onPress, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPressIn={() => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, speed: 50 }).start()}
        onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30 }).start()}
        onPress={onPress}
        style={{ flex: 1 }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const firstName = user?.name?.split(' ')[0] || 'there';

  const headerAnim  = useFadeSlide(0);
  const searchAnim  = useFadeSlide(80);
  const promoAnim   = useFadeSlide(160);
  const gridAnim    = useFadeSlide(240);
  const featuredAnim = useFadeSlide(340);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.topBar, headerAnim]}>
        <View style={styles.logoRow}>
          <Text style={styles.logoMark}>⌂</Text>
          <Text style={styles.greeting}>Hi, {firstName} 👋</Text>
        </View>
        <Pressable style={styles.bell}>
          <Text style={styles.bellEmoji}>🔔</Text>
          <View style={styles.bellDot} />
        </Pressable>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.search, searchAnim]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search for a service…"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </Animated.View>

        <Animated.View style={promoAnim}>
          <Pressable style={styles.promo} onPress={() => router.push('/category/plumbing')}>
            <Text style={styles.promoLabel}>FIRST BOOKING OFFER</Text>
            <Text style={styles.promoTitle}>20% off your first job</Text>
            <Text style={styles.promoSub}>Vetted craftsmen · Upfront pricing · Guaranteed</Text>
            <View style={styles.promoArrow}><Text style={styles.promoArrowText}>Book now →</Text></View>
          </Pressable>
        </Animated.View>

        <Animated.View style={gridAnim}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Quick Services</Text>
            <Pressable><Text style={styles.seeAll}>See all</Text></Pressable>
          </View>
          <View style={styles.catGrid}>
            {categories.map((cat, i) => (
              <ScaleCard
                key={cat.id}
                onPress={() => router.push(`/category/${cat.id}`)}
                style={styles.catCardWrap}
              >
                <View style={styles.catCard}>
                  <View style={styles.catIconBg}>
                    <Text style={styles.catEmoji}>{cat.emoji}</Text>
                  </View>
                  <Text style={styles.catName}>{cat.name}</Text>
                  <Text style={styles.catCount}>{cat.count} pros</Text>
                </View>
              </ScaleCard>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={featuredAnim}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: spacing.lg, marginTop: spacing.xl, marginBottom: spacing.md }]}>
            Top-Rated This Week
          </Text>
          <ScaleCard
            onPress={() => router.push(`/worker/${featuredWorker.id}`)}
            style={{ marginHorizontal: spacing.lg }}
          >
            <View style={styles.featuredCard}>
              <View style={styles.favRow}>
                <View style={styles.featuredAvatarWrap}>
                  <View style={styles.featuredAvatar}>
                    <Text style={styles.featuredInitials}>{featuredWorker.initials}</Text>
                  </View>
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
            </View>
          </ScaleCard>
        </Animated.View>

        <Animated.View style={[{ marginTop: spacing.xl }, featuredAnim]}>
          <Text style={styles.demoLabel}>EXPLORE SCREENS</Text>
          <View style={styles.demoRow}>
            {[
              { emoji: '📍', label: 'Tracking', route: { pathname: '/tracking', params: { workerId: 'w1' } } },
              { emoji: '⭐', label: 'Rate Job', route: { pathname: '/rating', params: { workerId: 'w1' } } },
              { emoji: '🔧', label: 'Worker App', route: '/worker-app' },
              { emoji: '📊', label: 'Admin', route: '/admin' },
            ].map((item) => (
              <ScaleCard key={item.label} onPress={() => router.push(item.route)} style={{ flex: 1 }}>
                <View style={styles.demoBtn}>
                  <Text style={styles.demoEmoji}>{item.emoji}</Text>
                  <Text style={styles.demoBtnText}>{item.label}</Text>
                </View>
              </ScaleCard>
            ))}
          </View>
        </Animated.View>

        <View style={{ height: 32 }} />
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
  bell: {
    width: 40, height: 40, backgroundColor: colors.bgCard, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  bellEmoji: { fontSize: 18 },
  bellDot: {
    position: 'absolute', top: 6, right: 6, width: 10, height: 10,
    borderRadius: 5, backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.bg,
  },
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
  promoArrow: { marginTop: 10 },
  promoArrowText: { fontSize: 13, fontWeight: '700', color: colors.primary },
  sectionHead: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  seeAll: { fontSize: 14, fontWeight: '700', color: colors.primary },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.lg, gap: 12 },
  catCardWrap: { width: '47%' },
  catCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  catIconBg: {
    width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  catEmoji: { fontSize: 22 },
  catName: { fontSize: 15, fontWeight: '700', color: colors.text },
  catCount: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  featuredCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.lg, borderWidth: 1, borderColor: colors.border, ...shadow.card,
  },
  favRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  featuredAvatarWrap: { position: 'relative', width: 64, height: 64 },
  featuredAvatar: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  featuredInitials: { fontSize: 20, fontWeight: '800', color: colors.text },
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
  demoRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.sm },
  demoBtn: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.sm,
    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
  },
  demoEmoji: { fontSize: 22, marginBottom: 4 },
  demoBtnText: { fontSize: 10, fontWeight: '700', color: colors.textSub, textAlign: 'center' },
});
