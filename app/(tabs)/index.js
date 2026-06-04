import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, TextInput, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { categories, workers } from '../../data/services';
import { useAuth } from '../../store/auth';
import HirafiMark from '../../components/HirafiMark';

function useFadeSlide(delay) {
  var d = delay || 0;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(22)).current;
  useEffect(() => {
    const t = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }),
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

const AVATAR_COLORS = ['#3D2E10', '#1A2E20', '#1A1A2E', '#2E1A2E'];

function StarRow({ rating }) {
  const stars = [1, 2, 3, 4, 5];
  const filled = Math.floor(rating);
  return (
    <View style={{ flexDirection: 'row', gap: 2, marginTop: 4 }}>
      {stars.map((s) => (
        <Text key={s} style={{ fontSize: 11, color: s <= filled ? colors.primary : colors.textMuted }}>★</Text>
      ))}
    </View>
  );
}

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const initials = user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'ME';

  const headerAnim  = useFadeSlide(0);
  const locationAnim = useFadeSlide(60);
  const searchAnim  = useFadeSlide(120);
  const emergencyAnim = useFadeSlide(180);
  const gridAnim    = useFadeSlide(260);
  const nearbyAnim  = useFadeSlide(360);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <Animated.View style={[styles.topBar, headerAnim]}>
        <View style={styles.logoRow}>
          <HirafiMark size={28} />
          <Text style={styles.wordmark}>hirafi</Text>
        </View>
        <View style={styles.topRight}>
          <Pressable style={styles.bellBtn} onPress={() => router.push('/notifications')}>
            <Text style={styles.bellEmoji}>🔔</Text>
          </Pressable>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </View>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Location bar */}
        <Animated.View style={[styles.locationBar, locationAnim]}>
          <Text style={styles.pinEmoji}>📍</Text>
          <Text style={styles.locationText}>Madinaty, Group 64</Text>
          <Pressable>
            <Text style={styles.changeText}>Change</Text>
          </Pressable>
        </Animated.View>

        {/* Search bar */}
        <Animated.View style={[styles.searchBar, searchAnim]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="What needs fixing?"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </Animated.View>

        {/* Emergency banner */}
        <Animated.View style={emergencyAnim}>
          <ScaleCard onPress={() => router.push('/category/electrical')} style={{ marginHorizontal: spacing.lg, marginBottom: spacing.xl }}>
            <View style={styles.emergencyCard}>
              <View style={styles.emergencyAccent} />
              <View style={styles.emergencyContent}>
                <Text style={styles.emergencyTitle}>⚡ Emergency service</Text>
                <Text style={styles.emergencySub}>Available 24/7 · pros in 30 min</Text>
              </View>
              <Text style={styles.emergencyChevron}>›</Text>
            </View>
          </ScaleCard>
        </Animated.View>

        {/* Popular services */}
        <Animated.View style={gridAnim}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Popular services</Text>
            <Pressable><Text style={styles.seeAll}>See all</Text></Pressable>
          </View>
          <View style={styles.catGrid}>
            {categories.map((cat) => (
              <ScaleCard
                key={cat.id}
                onPress={() => router.push('/category/' + cat.id)}
                style={styles.catCardWrap}
              >
                <View style={styles.catCard}>
                  <View style={styles.catIconBg}>
                    <Text style={styles.catEmoji}>{cat.emoji}</Text>
                  </View>
                  <Text style={styles.catName}>{cat.name}</Text>
                </View>
              </ScaleCard>
            ))}
          </View>
        </Animated.View>

        {/* Top rated nearby */}
        <Animated.View style={nearbyAnim}>
          <View style={[styles.sectionHead, { marginTop: spacing.xl }]}>
            <Text style={styles.sectionTitle}>Top rated nearby</Text>
            <Pressable><Text style={styles.mapLink}>View map →</Text></Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.nearbyScroll}>
            {workers.map((w, i) => (
              <ScaleCard key={w.id} onPress={() => router.push('/worker/' + w.id)} style={styles.workerCardWrap}>
                <View style={styles.workerCard}>
                  <View style={[styles.workerAvatar, { backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }]}>
                    <Text style={styles.workerInitials}>{w.initials}</Text>
                  </View>
                  <Text style={styles.workerName}>{w.name}</Text>
                  <Text style={styles.workerTitle}>{w.title} · {w.experience}</Text>
                  <StarRow rating={w.rating} />
                  <View style={styles.workerBottom}>
                    <View style={styles.distancePill}>
                      <Text style={styles.distanceText}>{w.distanceKm} km</Text>
                    </View>
                    <Text style={styles.workerPrice}>from {w.basePrice} EGP</Text>
                  </View>
                </View>
              </ScaleCard>
            ))}
          </ScrollView>
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
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoMark: { fontSize: 20, color: colors.primary },
  wordmark: { fontSize: 16, fontWeight: '900', color: colors.primary },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  bellBtn: {
    width: 36, height: 36, backgroundColor: colors.bgCard, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  bellEmoji: { fontSize: 16 },
  avatarCircle: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primaryMuted,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.primary,
  },
  avatarText: { fontSize: 13, fontWeight: '800', color: colors.primary },

  locationBar: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.bgCard, padding: 10, paddingHorizontal: 16,
    borderRadius: 12, borderWidth: 1, borderColor: colors.border,
    marginHorizontal: spacing.lg, marginTop: spacing.md, marginBottom: spacing.md,
  },
  pinEmoji: { fontSize: 14 },
  locationText: { flex: 1, fontSize: 13, color: colors.textSub },
  changeText: { fontSize: 12, fontWeight: '700', color: colors.primary },

  searchBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard,
    marginHorizontal: spacing.lg, borderRadius: radius.lg, paddingHorizontal: spacing.md,
    height: 48, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: colors.text },

  emergencyCard: {
    backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.primaryMuted,
    flexDirection: 'row', alignItems: 'center', padding: spacing.md, overflow: 'hidden',
    ...shadow.card,
  },
  emergencyAccent: {
    width: 4, borderRadius: 2, backgroundColor: colors.primary,
    alignSelf: 'stretch', marginRight: spacing.md,
  },
  emergencyContent: { flex: 1 },
  emergencyTitle: { fontSize: 15, fontWeight: '800', color: colors.text },
  emergencySub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  emergencyChevron: { fontSize: 24, color: colors.primary, marginLeft: spacing.sm },

  sectionHead: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text },
  seeAll: { fontSize: 13, fontWeight: '700', color: colors.primary },
  mapLink: { fontSize: 13, fontWeight: '700', color: colors.primary },

  catGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.lg, gap: 10 },
  catCardWrap: { width: '30%' },
  catCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.md,
    padding: spacing.sm, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center',
  },
  catIconBg: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  catEmoji: { fontSize: 22 },
  catName: { fontSize: 11, fontWeight: '700', color: colors.textSub, textAlign: 'center' },

  nearbyScroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  workerCardWrap: { width: 200, marginRight: 12 },
  workerCard: {
    backgroundColor: colors.bgCard, borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: colors.border,
  },
  workerAvatar: {
    width: 52, height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  workerInitials: { fontSize: 18, fontWeight: '800', color: colors.text },
  workerName: { fontSize: 14, fontWeight: '800', color: colors.text },
  workerTitle: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  workerBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  distancePill: {
    backgroundColor: colors.bgMuted, borderRadius: radius.pill,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  distanceText: { fontSize: 10, color: colors.textSub, fontWeight: '700' },
  workerPrice: { fontSize: 13, fontWeight: '800', color: colors.primary },
});
