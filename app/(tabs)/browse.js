import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../constants/theme';
import { categories } from '../../data/services';

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

export default function Browse() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse services</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Search services…"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {filtered.map((cat) => (
          <ScaleCard
            key={cat.id}
            onPress={() => router.push('/category/' + cat.id)}
            style={styles.cardWrap}
          >
            <View style={styles.card}>
              <View style={styles.iconBg}>
                <Text style={styles.emoji}>{cat.emoji}</Text>
              </View>
              <Text style={styles.catName}>{cat.name}</Text>
              <Text style={styles.catCount}>{cat.count} pros</Text>
            </View>
          </ScaleCard>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard,
    marginHorizontal: spacing.lg, borderRadius: radius.lg, paddingHorizontal: spacing.md,
    height: 48, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border,
    marginTop: spacing.sm,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: colors.text },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing.lg, gap: 12,
    paddingBottom: spacing.xxl,
  },
  cardWrap: { width: '30%' },
  card: {
    backgroundColor: colors.bgCard, borderRadius: radius.md,
    padding: spacing.sm, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center',
  },
  iconBg: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  emoji: { fontSize: 22 },
  catName: { fontSize: 11, fontWeight: '700', color: colors.textSub, textAlign: 'center' },
  catCount: { fontSize: 10, color: colors.textMuted, marginTop: 2, textAlign: 'center' },
});
