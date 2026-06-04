import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../constants/theme';
import { workers, categories } from '../data/services';

const RECENT = ['Pipe leak', 'AC cleaning', 'Electrical wiring', 'Deep cleaning'];

export default function Search() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  const results = query.length > 0
    ? workers.filter((w) => w.name.toLowerCase().includes(query.toLowerCase()) || w.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      {/* Search bar */}
      <View style={styles.searchRow}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="What needs fixing?"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')}>
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Recent searches */}
        {query.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent searches</Text>
            {RECENT.map((r) => (
              <Pressable key={r} style={styles.recentRow} onPress={() => setQuery(r)}>
                <Text style={styles.recentIcon}>🕐</Text>
                <Text style={styles.recentText}>{r}</Text>
                <Text style={styles.recentArrow}>↗</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Results */}
        {query.length > 0 && results.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No results for "{query}"</Text>
            <Text style={styles.emptySub}>Try searching for a service or worker name.</Text>
          </View>
        )}

        {query.length > 0 && results.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{results.length} hirafs found</Text>
            {results.map((w) => (
              <Pressable key={w.id} style={styles.workerCard} onPress={() => router.push('/worker/' + w.id)}>
                <View style={styles.workerAvatar}>
                  <Text style={styles.workerInitials}>{w.initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.workerName}>{w.name}</Text>
                  <Text style={styles.workerSub}>{w.title} · ★ {w.rating}</Text>
                </View>
                <Text style={styles.workerPrice}>from {w.basePrice} EGP</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Suggested categories */}
        {query.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular services</Text>
            <View style={styles.catRow}>
              {categories.slice(0, 6).map((c) => (
                <Pressable key={c.id} style={styles.catChip} onPress={() => router.push('/category/' + c.id)}>
                  <Text style={styles.catEmoji}>{c.emoji}</Text>
                  <Text style={styles.catName}>{c.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.border,
    backgroundColor: colors.bgCard,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 22, color: colors.text, fontWeight: '300' },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.bg, borderRadius: radius.lg,
    paddingHorizontal: spacing.md, height: 44,
    borderWidth: 1, borderColor: colors.border,
  },
  searchIcon: { fontSize: 14, marginRight: 6 },
  searchInput: { flex: 1, fontSize: 15, color: colors.text },
  clearText: { fontSize: 14, color: colors.textMuted, padding: 4 },

  section: { padding: spacing.lg },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5, marginBottom: spacing.md },

  recentRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  recentIcon: { fontSize: 14, color: colors.textMuted },
  recentText: { flex: 1, fontSize: 15, color: colors.text },
  recentArrow: { fontSize: 14, color: colors.textMuted },

  workerCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.sm,
    borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  workerAvatar: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
  },
  workerInitials: { fontSize: 14, fontWeight: '800', color: colors.primary },
  workerName: { fontSize: 14, fontWeight: '700', color: colors.text },
  workerSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  workerPrice: { fontSize: 13, fontWeight: '800', color: colors.primary },

  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.bgCard, borderRadius: radius.pill,
    paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: colors.border,
  },
  catEmoji: { fontSize: 14 },
  catName: { fontSize: 13, fontWeight: '600', color: colors.textSub },

  empty: { alignItems: 'center', marginTop: 60, padding: spacing.lg },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: spacing.md },
  emptySub: { fontSize: 14, color: colors.textMuted, marginTop: 4, textAlign: 'center' },
});
