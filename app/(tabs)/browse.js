import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadow } from '../../constants/theme';

const ALL_SERVICES = [
  { id: 'plumbing',    emoji: '🔧', name: 'Plumbing',         count: 48 },
  { id: 'electrical',  emoji: '⚡', name: 'Electrical',       count: 62 },
  { id: 'painting',    emoji: '🎨', name: 'Painting',         count: 35 },
  { id: 'cleaning',    emoji: '🧹', name: 'Cleaning',         count: 91 },
  { id: 'ac',          emoji: '❄️', name: 'AC & HVAC',        count: 44 },
  { id: 'carpentry',   emoji: '🪵', name: 'Carpentry',        count: 27 },
  { id: 'appliances',  emoji: '🔌', name: 'Appliances',       count: 39 },
  { id: 'gardening',   emoji: '🌿', name: 'Gardening',        count: 18 },
  { id: 'moving',      emoji: '📦', name: 'Moving',           count: 22 },
  { id: 'security',    emoji: '🔒', name: 'Security',         count: 15 },
  { id: 'flooring',    emoji: '🏠', name: 'Flooring',         count: 20 },
  { id: 'pest',        emoji: '🐜', name: 'Pest Control',     count: 14 },
  { id: 'waterproof',  emoji: '💧', name: 'Waterproofing',    count: 12 },
  { id: 'gypsum',      emoji: '🔨', name: 'Gypsum & Plaster', count: 16 },
  { id: 'glass',       emoji: '🪟', name: 'Glass & Mirrors',  count: 11 },
  { id: 'welding',     emoji: '🔥', name: 'Welding',          count: 9 },
  { id: 'renovation',  emoji: '🏗️', name: 'Renovation',      count: 31 },
  { id: 'pools',       emoji: '🏊', name: 'Swimming Pools',   count: 8 },
];

export default function Browse() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const filtered = ALL_SERVICES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      <View style={styles.header}>
        <Text style={styles.title}>All Services</Text>
        <Text style={styles.subtitle}>كل الخدمات</Text>
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
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <Text style={styles.clearText}>✕</Text>
          </Pressable>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {filtered.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => router.push('/category/' + cat.id)}
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
          >
            <View style={styles.iconBg}>
              <Text style={styles.emoji}>{cat.emoji}</Text>
            </View>
            <Text style={styles.catName}>{cat.name}</Text>
            <Text style={styles.catCount}>{cat.count} pros</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  title: { fontSize: 24, fontWeight: '900', color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard,
    marginHorizontal: spacing.lg, borderRadius: radius.lg, paddingHorizontal: spacing.md,
    height: 48, marginBottom: spacing.lg, marginTop: spacing.sm,
    borderWidth: 1, borderColor: 'rgba(176,121,70,0.18)',
    ...shadow.card,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: colors.text },
  clearText: { fontSize: 14, color: colors.textMuted, padding: 4 },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing.lg, gap: 10,
    paddingBottom: spacing.xxl,
  },
  card: {
    width: '30%', backgroundColor: colors.bgCard,
    borderRadius: radius.md, padding: spacing.sm,
    borderWidth: 1, borderColor: colors.border,
    alignItems: 'center',
    ...shadow.card,
  },
  iconBg: {
    width: 52, height: 52, borderRadius: 14, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  emoji: { fontSize: 24 },
  catName: { fontSize: 11, fontWeight: '700', color: colors.text, textAlign: 'center' },
  catCount: { fontSize: 10, color: colors.textMuted, marginTop: 2, textAlign: 'center' },
});
