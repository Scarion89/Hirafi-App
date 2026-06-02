import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { colors, radius, spacing } from '../../constants/theme';
import { workersByCategory } from '../../data/services';
import WorkerCard from '../../components/WorkerCard';

const FILTERS = ['Available now', 'Top rated', 'Nearest', 'Lowest price'];

export default function WorkerList() {
  const { categoryId, serviceId } = useLocalSearchParams();
  const [filter, setFilter] = useState('Top rated');
  const workers = workersByCategory(categoryId);

  const sorted = [...workers].sort((a, b) => {
    if (filter === 'Nearest') return a.distanceKm - b.distanceKm;
    if (filter === 'Lowest price') return a.basePrice - b.basePrice;
    return b.rating - a.rating;
  });

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: 'Choose your pro' }} />

      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersRow}
      >
        {FILTERS.map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.chip, filter === f && styles.chipActive]}
          >
            <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {sorted.map((w) => (
          <WorkerCard key={w.id} worker={w} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  filtersRow: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: 8 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard,
  },
  chipActive: { backgroundColor: colors.primaryMuted, borderColor: colors.primary },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  chipTextActive: { color: colors.primary },
});
