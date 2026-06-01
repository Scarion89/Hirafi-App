import React, { useState, useMemo } from 'react';
import {
  Text, View, ScrollView, Pressable, StyleSheet, TextInput, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { categories, providers } from '../../data/services';
import ProviderCard from '../../components/ProviderCard';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const topRated = useMemo(
    () => [...providers].sort((a, b) => b.rating - a.rating).slice(0, 4),
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return providers.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.services.some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.location}>
              <Ionicons name="location" size={14} color="#fff" /> Downtown, Apt 4B
            </Text>
          </View>
          <View style={styles.bell}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </View>
        </View>
        <Text style={styles.hero}>What service do you need today?</Text>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            placeholder="Search services or pros…"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {filtered ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {filtered.length} result{filtered.length === 1 ? '' : 's'}
          </Text>
          {filtered.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
          {filtered.length === 0 ? (
            <Text style={styles.empty}>No pros match “{query}”.</Text>
          ) : null}
        </View>
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <FlatList
              data={categories}
              numColumns={3}
              scrollEnabled={false}
              keyExtractor={(c) => c.id}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => router.push(`/category/${item.id}`)}
                  style={({ pressed }) => [styles.cat, pressed && { opacity: 0.85 }]}
                >
                  <View style={[styles.catIcon, { backgroundColor: item.color + '22' }]}>
                    <Ionicons name={item.icon} size={24} color={item.color} />
                  </View>
                  <Text style={styles.catName}>{item.name}</Text>
                </Pressable>
              )}
            />
          </View>

          <View style={styles.promo}>
            <View style={{ flex: 1 }}>
              <Text style={styles.promoTitle}>20% off first booking</Text>
              <Text style={styles.promoSub}>Use code HIRAFI20 at checkout</Text>
            </View>
            <Ionicons name="pricetag" size={40} color="#fff" style={{ opacity: 0.9 }} />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Top rated pros</Text>
            </View>
            {topRated.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { color: '#fff', fontSize: 18, fontWeight: '800' },
  location: { color: '#D6EFE8', fontSize: 13, marginTop: 4 },
  bell: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
  },
  hero: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: spacing.lg, lineHeight: 30 },
  search: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: radius.md,
    paddingHorizontal: spacing.md, height: 50, marginTop: spacing.lg,
    ...shadow.card,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: colors.text },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  cat: { width: '31%', alignItems: 'center', marginBottom: spacing.lg },
  catIcon: {
    width: 60, height: 60, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  catName: { fontSize: 12, fontWeight: '600', color: colors.text, textAlign: 'center' },
  promo: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.accent, marginHorizontal: spacing.lg,
    marginTop: spacing.xl, borderRadius: radius.lg, padding: spacing.lg,
  },
  promoTitle: { color: '#fff', fontSize: 17, fontWeight: '800' },
  promoSub: { color: '#fff', opacity: 0.9, fontSize: 13, marginTop: 4 },
  empty: { color: colors.textMuted, fontSize: 14, marginTop: spacing.md },
});
