import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, Stack } from 'expo-router';
import { colors, spacing } from '../../constants/theme';
import { getCategory, providersByCategory } from '../../data/services';
import ProviderCard from '../../components/ProviderCard';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const cat = getCategory(id);
  const list = providersByCategory(id);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen options={{ title: cat?.name || 'Category' }} />
      <View style={styles.head}>
        <View style={[styles.icon, { backgroundColor: (cat?.color || colors.primary) + '22' }]}>
          <Ionicons name={cat?.icon || 'build'} size={28} color={cat?.color || colors.primary} />
        </View>
        <View>
          <Text style={styles.title}>{cat?.name}</Text>
          <Text style={styles.sub}>{list.length} pros available near you</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: spacing.lg }}>
        {list.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg },
  icon: {
    width: 56, height: 56, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
  },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  sub: { fontSize: 14, color: colors.textMuted, marginTop: 2 },
});
