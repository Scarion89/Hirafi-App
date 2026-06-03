import React from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../../constants/theme';
import { useBookings } from '../../store/bookings';
import { useAuth } from '../../store/auth';

const MENU = [
  { emoji: '👤', label: 'Edit profile' },
  { emoji: '💳', label: 'Payment methods' },
  { emoji: '📍', label: 'Saved addresses' },
  { emoji: '❤️', label: 'Favorite workers' },
  { emoji: '🔔', label: 'Notifications' },
  { emoji: '🛡️', label: 'hirafi guarantee' },
  { emoji: '💬', label: 'Help & support' },
];

export default function Profile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { bookings } = useBookings();
  const { user, logout } = useAuth();

  const displayName = user?.name || 'Ahmed Hassan';
  const initials = displayName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
  const roleBadge = user?.role === 'pro' ? '👷 Pro Account' : '🏠 Customer';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Hero */}
      <View style={[styles.hero, { paddingTop: insets.top + 20 }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{displayName}</Text>
        <View style={styles.rolePill}>
          <Text style={styles.roleText}>{roleBadge}</Text>
        </View>
        {user?.phone && <Text style={styles.email}>+20 {user.phone}</Text>}

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statVal}>{bookings.length}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statDiv} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDiv} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>3</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {MENU.map((item) => (
          <Pressable key={item.label} style={({ pressed }) => [styles.menuRow, pressed && { opacity: 0.6 }]}>
            <View style={styles.menuIcon}>
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
        <Pressable
          style={({ pressed }) => [styles.menuRow, pressed && { opacity: 0.6 }]}
          onPress={() => { logout(); router.replace('/auth/welcome'); }}
        >
          <View style={[styles.menuIcon, { backgroundColor: colors.dangerBg }]}>
            <Text style={styles.menuEmoji}>🚪</Text>
          </View>
          <Text style={[styles.menuLabel, { color: colors.danger }]}>Log out</Text>
        </Pressable>
      </View>

      {/* Dev access links */}
      <View style={styles.devSection}>
        <Text style={styles.devLabel}>SWITCH MODE</Text>
        <Pressable style={styles.devBtn} onPress={() => router.push('/worker-app')}>
          <Text style={styles.devBtnText}>🔧 Worker App</Text>
        </Pressable>
        <Pressable style={styles.devBtn} onPress={() => router.push('/admin')}>
          <Text style={styles.devBtnText}>📊 Admin Dashboard</Text>
        </Pressable>
      </View>

      <Text style={styles.version}>hirafi v1.0.0 · Customer App</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.bgCard, alignItems: 'center',
    paddingBottom: spacing.xl, borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
    borderBottomWidth: 1, borderColor: colors.border,
  },
  avatar: {
    width: 84, height: 84, borderRadius: 42,
    backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.primaryMuted,
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: colors.primary },
  name: { fontSize: 20, fontWeight: '800', color: colors.text, marginTop: spacing.md },
  rolePill: {
    marginTop: 6, paddingHorizontal: 12, paddingVertical: 4,
    backgroundColor: colors.primaryMuted, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.primary,
  },
  roleText: { fontSize: 12, fontWeight: '700', color: colors.primary },
  email: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  statsRow: {
    flexDirection: 'row', marginTop: spacing.lg,
    backgroundColor: colors.bgMuted, borderRadius: radius.lg,
    paddingVertical: spacing.md, paddingHorizontal: spacing.xl,
    borderWidth: 1, borderColor: colors.border,
  },
  stat: { alignItems: 'center', paddingHorizontal: spacing.lg },
  statVal: { fontSize: 18, fontWeight: '800', color: colors.text },
  statLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  statDiv: { width: 1, backgroundColor: colors.border },
  menu: { margin: spacing.lg, backgroundColor: colors.bgCard, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcon: { width: 38, height: 38, borderRadius: radius.md, backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center' },
  menuEmoji: { fontSize: 18 },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text },
  chevron: { fontSize: 20, color: colors.textMuted },
  devSection: { marginHorizontal: spacing.lg, marginBottom: spacing.md, gap: 8 },
  devLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: 4 },
  devBtn: {
    height: 44, backgroundColor: colors.bgCard, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  devBtnText: { fontSize: 14, fontWeight: '700', color: colors.textSub },
  version: { textAlign: 'center', color: colors.textMuted, fontSize: 12, marginBottom: 8 },
});
