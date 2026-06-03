import React, { useState, useRef, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, Animated } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { colors, radius, spacing } from '../../constants/theme';
import { workersByCategory } from '../../data/services';

const FILTERS = ['Available now', 'Top rated', 'Under 200 EGP'];

const AVATAR_COLORS = ['#3D2E10', '#1A2E1A', '#1A1A2E', '#2E1A2E'];

function StarRow({ rating }) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text
          key={i}
          style={[styles.star, i <= Math.floor(rating) ? styles.starOn : styles.starOff]}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

function WorkerCard({ worker, index }) {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 320,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function onPressIn() {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 30, bounciness: 0 }).start();
  }
  function onPressOut() {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 4 }).start();
  }

  const avatarBg = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const isTopRated = worker.rating > 4.7;
  const isAvailable = worker.etaMin <= 20;

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
      <Pressable
        onPress={() => router.push({ pathname: `/worker/${worker.id}` })}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.card}
      >
        <View style={styles.cardMain}>
          {/* Avatar */}
          <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
            <Text style={styles.avatarText}>{worker.initials}</Text>
          </View>

          {/* Center info */}
          <View style={styles.centerInfo}>
            <Text style={styles.workerName}>{worker.name}</Text>
            <Text style={styles.workerSub}>{worker.title} · {worker.experience}</Text>
            <StarRow rating={worker.rating} />
            <View style={styles.distPill}>
              <Text style={styles.distText}>📍 {worker.distanceKm} km</Text>
            </View>
          </View>

          {/* Price */}
          <View style={styles.priceCol}>
            <Text style={styles.priceFrom}>from</Text>
            <Text style={styles.priceVal}>{worker.basePrice}{'\n'}EGP</Text>
          </View>
        </View>

        {/* Badges */}
        {(isTopRated || isAvailable) && (
          <View style={styles.badgesRow}>
            {isTopRated && (
              <View style={styles.badgeAmber}>
                <Text style={styles.badgeAmberText}>Top rated</Text>
              </View>
            )}
            {isAvailable && (
              <View style={styles.badgeGreen}>
                <Text style={styles.badgeGreenText}>Available now</Text>
              </View>
            )}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

export default function WorkerList() {
  const { categoryId } = useLocalSearchParams();
  const [filter, setFilter] = useState('Top rated');
  const workers = workersByCategory(categoryId);

  const sorted = [...workers].sort((a, b) => {
    if (filter === 'Available now') return a.etaMin - b.etaMin;
    if (filter === 'Under 200 EGP') return a.basePrice - b.basePrice;
    return b.rating - a.rating;
  });

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: 'Choose your pro' }} />

      {/* Filter pills */}
      <View style={styles.filtersRow}>
        {FILTERS.map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.chip, filter === f && styles.chipActive]}
          >
            <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {sorted.map((w, i) => (
          <WorkerCard key={w.id} worker={w} index={i} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
  },
  chipActive: { backgroundColor: colors.primaryMuted, borderColor: colors.primary },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  chipTextActive: { color: colors.primary },
  listContent: { paddingHorizontal: spacing.lg, paddingBottom: 24, paddingTop: 4 },

  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardMain: { flexDirection: 'row', alignItems: 'flex-start' },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '900', color: colors.text },

  centerInfo: { flex: 1, marginLeft: 12 },
  workerName: { fontSize: 15, fontWeight: '800', color: colors.text },
  workerSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  starRow: { flexDirection: 'row', marginTop: 4, gap: 2 },
  star: { fontSize: 13 },
  starOn: { color: colors.primary },
  starOff: { color: colors.textMuted },
  distPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.bgMuted,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },
  distText: { fontSize: 11, color: colors.textSub },

  priceCol: { alignItems: 'flex-end', justifyContent: 'flex-start', paddingTop: 2 },
  priceFrom: { fontSize: 11, color: colors.textMuted, textAlign: 'right' },
  priceVal: { fontSize: 13, fontWeight: '800', color: colors.primary, textAlign: 'right', lineHeight: 18 },

  badgesRow: { flexDirection: 'row', gap: 6, marginTop: 10 },
  badgeAmber: {
    backgroundColor: '#3D2E10',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeAmberText: { fontSize: 10, color: colors.primary, fontWeight: '700' },
  badgeGreen: {
    backgroundColor: colors.successBg,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeGreenText: { fontSize: 10, color: colors.success, fontWeight: '700' },
});
