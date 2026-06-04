import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, TextInput, Animated, Easing, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { categories, workers } from '../../data/services';
import { useAuth } from '../../store/auth';

function useFadeSlide(delay) {
  const d = delay || 0;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  useEffect(() => {
    const t = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 380, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 380, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]).start();
    }, d);
    return () => clearTimeout(t);
  }, []);
  return { opacity, transform: [{ translateY }] };
}

function ScaleCard({ children, onPress, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPressIn={() => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50 }).start()}
        onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30 }).start()}
        onPress={onPress}
        style={{ flex: 1 }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

function StarRow({ rating }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2, marginTop: 4 }}>
      {[1,2,3,4,5].map((s) => (
        <Text key={s} style={{ fontSize: 10, color: s <= Math.floor(rating) ? colors.primary : colors.textMuted }}>★</Text>
      ))}
    </View>
  );
}

const SERVICE_GRID = [
  { id: 'plumbing',    emoji: '🔧', name: 'Plumbing',    nameAr: 'سباكة' },
  { id: 'electrical',  emoji: '⚡', name: 'Electrical',  nameAr: 'كهرباء' },
  { id: 'painting',    emoji: '🎨', name: 'Painting',    nameAr: 'دهان' },
  { id: 'cleaning',    emoji: '🧹', name: 'Cleaning',    nameAr: 'نظافة' },
  { id: 'ac',          emoji: '❄️', name: 'AC',          nameAr: 'تكييف' },
  { id: 'carpentry',   emoji: '🪵', name: 'Carpentry',   nameAr: 'نجارة' },
  { id: 'appliances',  emoji: '🔌', name: 'Appliances',  nameAr: 'أجهزة' },
  { id: 'gardening',   emoji: '🌿', name: 'Gardening',   nameAr: 'حدائق' },
  { id: 'more',        emoji: '⋯',  name: 'More',        nameAr: 'المزيد' },
];

const AVATAR_COLORS = ['#5A341A', '#1A2E1A', '#1A1A35', '#2E1A2E'];

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const firstName = user?.name ? user.name.split(' ')[0] : 'Ahmed';
  const initials = user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'AH';

  const h0 = useFadeSlide(0);
  const h1 = useFadeSlide(60);
  const h2 = useFadeSlide(120);
  const h3 = useFadeSlide(180);
  const h4 = useFadeSlide(250);
  const h5 = useFadeSlide(340);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      {/* Top bar */}
      <Animated.View style={[styles.topBar, h0]}>
        <View>
          <Text style={styles.greeting}>Good morning · صباح الخير</Text>
          <Text style={styles.headline}>Find a hirafi.</Text>
        </View>
        <View style={styles.topRight}>
          <Pressable style={styles.bellBtn} onPress={() => router.push('/notifications')}>
            <Text style={styles.bellEmoji}>🔔</Text>
          </Pressable>
          <View style={styles.avatarSquare}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </View>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Address strip */}
        <Animated.View style={[styles.addrStrip, h1]}>
          <Text style={styles.pinIcon}>📍</Text>
          <Text style={styles.addrText}>Madinaty · 14 شارع التسعين</Text>
          <Pressable>
            <Text style={styles.changeText}>Change</Text>
          </Pressable>
        </Animated.View>

        {/* Search bar */}
        <Animated.View style={[styles.searchWrap, h2]}>
          <Pressable
            style={styles.searchBar}
            onPress={() => router.push('/search')}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>What needs fixing?</Text>
          </Pressable>
        </Animated.View>

        {/* Urgent banner */}
        <Animated.View style={h3}>
          <ScaleCard onPress={() => router.push('/category/electrical')} style={{ marginHorizontal: spacing.lg, marginBottom: spacing.xl }}>
            <View style={styles.urgentCard}>
              <View style={styles.urgentLeft}>
                <Text style={styles.urgentClock}>⏰</Text>
                <View>
                  <Text style={styles.urgentTitle}>Need it fixed now?</Text>
                  <Text style={styles.urgentSub}>Emergency pros · 30 min response</Text>
                </View>
              </View>
              <Text style={styles.urgentCta}>Book emergency →</Text>
            </View>
          </ScaleCard>
        </Animated.View>

        {/* Services grid */}
        <Animated.View style={h4}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Our services</Text>
            <Pressable onPress={() => router.push('/(tabs)/browse')}>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>
          <View style={styles.serviceGrid}>
            {SERVICE_GRID.map((svc) => (
              <ScaleCard
                key={svc.id}
                onPress={() => svc.id === 'more' ? router.push('/(tabs)/browse') : router.push('/category/' + svc.id)}
                style={styles.svcWrap}
              >
                <View style={styles.svcCard}>
                  <View style={styles.svcIconBg}>
                    <Text style={styles.svcEmoji}>{svc.emoji}</Text>
                  </View>
                  <Text style={styles.svcName}>{svc.name}</Text>
                  <Text style={styles.svcNameAr}>{svc.nameAr}</Text>
                </View>
              </ScaleCard>
            ))}
          </View>
        </Animated.View>

        {/* Top-rated hirafs */}
        <Animated.View style={[h5, { marginTop: spacing.xl }]}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Top-rated hirafs near you</Text>
            <Pressable><Text style={styles.seeAll}>View map →</Text></Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.nearbyScroll}>
            {workers.map((w, i) => (
              <ScaleCard key={w.id} onPress={() => router.push('/worker/' + w.id)} style={styles.workerCardWrap}>
                <View style={styles.workerCard}>
                  <View style={[styles.workerAvatar, { backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }]}>
                    <Text style={styles.workerInitials}>{w.initials}</Text>
                  </View>
                  <Text style={styles.workerName}>{w.name}</Text>
                  <Text style={styles.workerTitle}>{w.title}</Text>
                  <StarRow rating={w.rating} />
                  <View style={styles.workerBottom}>
                    <Text style={styles.distanceText}>📍 {w.distanceKm} km</Text>
                    <Text style={styles.workerPrice}>from {w.basePrice} EGP</Text>
                  </View>
                </View>
              </ScaleCard>
            ))}
          </ScrollView>
        </Animated.View>

        <View style={{ height: 40 }} />
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
  greeting: { fontSize: 12, fontWeight: '600', color: colors.textSub, marginBottom: 2 },
  headline: { fontSize: 26, fontWeight: '900', color: colors.text, letterSpacing: -0.5 },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  bellBtn: {
    width: 38, height: 38, backgroundColor: colors.bgCard, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  bellEmoji: { fontSize: 16 },
  avatarSquare: {
    width: 38, height: 38, borderRadius: 10, backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 14, fontWeight: '800', color: colors.primary },

  addrStrip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.bgMuted,
    paddingHorizontal: spacing.lg, paddingVertical: 10,
    marginBottom: spacing.md,
  },
  pinIcon: { fontSize: 13 },
  addrText: { flex: 1, fontSize: 13, fontWeight: '500', color: colors.text },
  changeText: { fontSize: 12, fontWeight: '700', color: colors.copper },

  searchWrap: { paddingHorizontal: spacing.lg, marginBottom: spacing.xl },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard,
    borderRadius: radius.lg, paddingHorizontal: spacing.md, height: 50,
    borderWidth: 1, borderColor: 'rgba(176,121,70,0.18)',
    ...shadow.card,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchPlaceholder: { fontSize: 15, color: colors.textMuted },

  urgentCard: {
    backgroundColor: colors.dark, borderRadius: radius.lg,
    padding: spacing.lg, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
  },
  urgentLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  urgentClock: { fontSize: 20 },
  urgentTitle: { fontSize: 14, fontWeight: '800', color: colors.textLight },
  urgentSub: { fontSize: 11, color: colors.textLightMuted, marginTop: 2 },
  urgentCta: { fontSize: 12, fontWeight: '800', color: colors.primary },

  sectionHead: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text },
  seeAll: { fontSize: 13, fontWeight: '700', color: colors.copper },

  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.lg, gap: 8 },
  svcWrap: { width: '21%' },
  svcCard: { alignItems: 'center', paddingVertical: spacing.sm },
  svcIconBg: {
    width: 54, height: 54, borderRadius: 16, backgroundColor: colors.bgCard,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
    borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  svcEmoji: { fontSize: 24 },
  svcName: { fontSize: 10, fontWeight: '700', color: colors.text, textAlign: 'center' },
  svcNameAr: { fontSize: 9, color: colors.textMuted, textAlign: 'center', marginTop: 1 },

  nearbyScroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm, gap: 12 },
  workerCardWrap: { width: 190 },
  workerCard: {
    backgroundColor: colors.bgCard, borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  workerAvatar: {
    width: 52, height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  workerInitials: { fontSize: 18, fontWeight: '800', color: colors.primary },
  workerName: { fontSize: 14, fontWeight: '800', color: colors.text },
  workerTitle: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  workerBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  distanceText: { fontSize: 10, color: colors.textSub, fontWeight: '600' },
  workerPrice: { fontSize: 12, fontWeight: '800', color: colors.primary },
});
