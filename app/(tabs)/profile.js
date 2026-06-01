import React from 'react';
import { Text, View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { useBookings } from '../../store/bookings';

const ROWS = [
  { icon: 'person-outline', label: 'Edit profile' },
  { icon: 'card-outline', label: 'Payment methods' },
  { icon: 'location-outline', label: 'Saved addresses' },
  { icon: 'heart-outline', label: 'Favorite pros' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'help-circle-outline', label: 'Help & support' },
  { icon: 'settings-outline', label: 'Settings' },
];

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { bookings } = useBookings();
  const completed = bookings.filter((b) => b.status !== 'cancelled').length;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>YH</Text>
        </View>
        <Text style={styles.name}>Yousef Hamdan</Text>
        <Text style={styles.email}>yousef.h@example.com</Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{bookings.length}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>{completed}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      <View style={styles.list}>
        {ROWS.map((r) => (
          <Pressable key={r.label} style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}>
            <View style={styles.rowIcon}>
              <Ionicons name={r.icon} size={20} color={colors.primary} />
            </View>
            <Text style={styles.rowLabel}>{r.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        ))}

        <Pressable style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}>
          <View style={[styles.rowIcon, { backgroundColor: '#FCE8E8' }]}>
            <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          </View>
          <Text style={[styles.rowLabel, { color: colors.danger }]}>Log out</Text>
        </Pressable>
      </View>

      <Text style={styles.version}>Hirafi v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary, alignItems: 'center',
    paddingBottom: spacing.xl, borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
  },
  avatar: {
    width: 84, height: 84, borderRadius: 42,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: '800' },
  name: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: spacing.md },
  email: { color: '#D6EFE8', fontSize: 14, marginTop: 2 },
  stats: {
    flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: radius.lg, marginTop: spacing.lg, paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  stat: { alignItems: 'center', paddingHorizontal: spacing.lg },
  statNum: { color: '#fff', fontSize: 18, fontWeight: '800' },
  statLabel: { color: '#D6EFE8', fontSize: 12, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.25)' },
  list: {
    margin: spacing.lg, backgroundColor: colors.surface,
    borderRadius: radius.lg, paddingVertical: spacing.xs, ...shadow.card,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: spacing.lg },
  rowIcon: {
    width: 38, height: 38, borderRadius: radius.md, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
  },
  rowLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text },
  version: { textAlign: 'center', color: colors.textMuted, fontSize: 12, marginBottom: spacing.xl },
});
