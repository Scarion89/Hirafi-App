import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing, shadow } from '../constants/theme';
import { Rating } from './ui';
import { getCategory } from '../data/services';

export default function ProviderCard({ provider }) {
  const router = useRouter();
  const cat = getCategory(provider.category);
  const initials = provider.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Pressable
      onPress={() => router.push(`/provider/${provider.id}`)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
    >
      <View style={[styles.avatar, { backgroundColor: cat.color + '22' }]}>
        <Text style={[styles.avatarText, { color: cat.color }]}>{initials}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.rate}>${provider.hourlyRate}<Text style={styles.rateUnit}>/hr</Text></Text>
        </View>
        <Text style={styles.title}>{provider.title}</Text>
        <View style={styles.metaRow}>
          <Rating value={provider.rating} reviews={provider.reviews} />
          <View style={styles.metaDot} />
          <Ionicons name="time-outline" size={13} color={colors.textMuted} />
          <Text style={styles.metaText}>{provider.eta}</Text>
          {provider.available ? (
            <View style={styles.availPill}>
              <Text style={styles.availText}>Available</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: { fontSize: 18, fontWeight: '800' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1 },
  rate: { fontSize: 16, fontWeight: '800', color: colors.primary },
  rateUnit: { fontSize: 12, fontWeight: '600', color: colors.textMuted },
  title: { color: colors.textMuted, fontSize: 13, marginTop: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, flexWrap: 'wrap' },
  metaDot: {
    width: 3, height: 3, borderRadius: 2,
    backgroundColor: colors.textMuted, marginHorizontal: 8,
  },
  metaText: { color: colors.textMuted, fontSize: 12, marginLeft: 4 },
  availPill: {
    marginLeft: 8, backgroundColor: colors.primaryLight,
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill,
  },
  availText: { color: colors.primary, fontSize: 11, fontWeight: '700' },
});
