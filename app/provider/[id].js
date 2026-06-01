import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { getProvider, getCategory } from '../../data/services';
import { Rating, Button } from '../../components/ui';

export default function ProviderScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const p = getProvider(id);

  if (!p) {
    return (
      <View style={styles.center}><Text>Provider not found.</Text></View>
    );
  }
  const cat = getCategory(p.category);
  const initials = p.name.split(' ').map((n) => n[0]).join('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={[styles.hero, { paddingTop: insets.top + 8 }]}>
          <View style={[styles.avatar, { backgroundColor: cat.color + '33' }]}>
            <Text style={[styles.avatarText, { color: '#fff' }]}>{initials}</Text>
          </View>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.title}>{p.title}</Text>
          <View style={{ marginTop: 6 }}>
            <Rating value={p.rating} reviews={p.reviews} size={16} />
          </View>
        </View>

        <View style={styles.statsRow}>
          <Stat icon="briefcase-outline" value={`${p.jobs}+`} label="Jobs" />
          <Stat icon="ribbon-outline" value={`${p.experience} yr`} label="Experience" />
          <Stat icon="time-outline" value={p.eta} label="ETA" />
        </View>

        <Section title="About">
          <Text style={styles.body}>{p.bio}</Text>
        </Section>

        <Section title="Services offered">
          <View style={styles.chips}>
            {p.services.map((s) => (
              <View key={s} style={styles.chip}>
                <Ionicons name="checkmark-circle" size={15} color={colors.primary} />
                <Text style={styles.chipText}>{s}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Pricing">
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Hourly rate</Text>
            <Text style={styles.price}>${p.hourlyRate}<Text style={styles.priceUnit}>/hr</Text></Text>
          </View>
          <Text style={styles.fine}>Final price confirmed after inspection. No call-out fee.</Text>
        </Section>
      </ScrollView>

      <View style={[styles.cta, { paddingBottom: insets.bottom + 12 }]}>
        <View>
          <Text style={styles.ctaLabel}>Starting at</Text>
          <Text style={styles.ctaPrice}>${p.hourlyRate}/hr</Text>
        </View>
        <Button
          title="Book now"
          icon="calendar"
          onPress={() => router.push(`/booking/${p.id}`)}
          style={{ flex: 1, marginLeft: spacing.lg }}
        />
      </View>
    </View>
  );
}

function Stat({ icon, value, label }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: {
    backgroundColor: colors.primary, alignItems: 'center',
    paddingBottom: spacing.xl, borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
  },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.lg,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: { fontSize: 30, fontWeight: '800' },
  name: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: spacing.md },
  title: { color: '#D6EFE8', fontSize: 14, marginTop: 2 },
  statsRow: {
    flexDirection: 'row', backgroundColor: colors.surface,
    marginHorizontal: spacing.lg, marginTop: -24, borderRadius: radius.lg,
    paddingVertical: spacing.lg, ...shadow.card,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: '800', color: colors.text, marginTop: 6 },
  statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  body: { fontSize: 14, lineHeight: 22, color: colors.textMuted },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryLight,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill,
    marginRight: 8, marginBottom: 8,
  },
  chipText: { marginLeft: 6, color: colors.primaryDark, fontWeight: '600', fontSize: 13 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { fontSize: 15, color: colors.text },
  price: { fontSize: 20, fontWeight: '800', color: colors.primary },
  priceUnit: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  fine: { fontSize: 12, color: colors.textMuted, marginTop: 6 },
  cta: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, paddingHorizontal: spacing.lg, paddingTop: spacing.md,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  ctaLabel: { fontSize: 12, color: colors.textMuted },
  ctaPrice: { fontSize: 18, fontWeight: '800', color: colors.text },
});
