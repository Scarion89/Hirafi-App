import React from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { useBookings } from '../../store/bookings';
import { useAuth } from '../../store/auth';

const MENU = [
  { emoji: '👤', label: 'Edit profile',       labelAr: 'تعديل الملف', route: '/profile/edit' },
  { emoji: '💳', label: 'Payment methods',    labelAr: 'طرق الدفع',   route: '/profile/payment' },
  { emoji: '📍', label: 'Saved addresses',    labelAr: 'العناوين',     route: '/profile/addresses' },
  { emoji: '❤️', label: 'Favourite workers',  labelAr: 'المفضلة',     route: null },
  { emoji: '🔔', label: 'Notifications',       labelAr: 'الإشعارات',   route: '/notifications' },
  { emoji: '🛡️', label: 'Hirafi guarantee',   labelAr: 'ضمان حرفي',   route: null },
  { emoji: '💬', label: 'Help & support',      labelAr: 'المساعدة',    route: '/profile/help' },
];

export default function Profile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { bookings } = useBookings();
  const { user, logout } = useAuth();

  const displayName = user?.name || 'Ahmed Hassan';
  const initials = displayName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
  const isCustomer = !user?.role || user.role === 'customer';

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      {/* Avatar hero */}
      <View style={[styles.hero, { paddingTop: insets.top + 24 }]}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </View>
        <Text style={styles.name}>{displayName}</Text>
        <View style={styles.rolePill}>
          <Text style={styles.roleText}>{isCustomer ? '🏠 Customer · عميل' : '👷 Pro · حرفي'}</Text>
        </View>
        {user?.phone && <Text style={styles.phone}>+20 {user.phone}</Text>}

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statVal}>{bookings.length}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statDiv} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>4.8 ★</Text>
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
      <View style={styles.menuCard}>
        {MENU.map((item, idx) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [styles.menuRow, idx < MENU.length - 1 && styles.menuRowBorder, pressed && { opacity: 0.6 }]}
            onPress={() => item.route && router.push(item.route)}
          >
            <View style={styles.menuIcon}>
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuLabelAr}>{item.labelAr}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>

      {/* Log out */}
      <View style={styles.logoutWrap}>
        <Pressable
          style={styles.logoutBtn}
          onPress={() => { logout(); router.replace('/auth/welcome'); }}
        >
          <Text style={styles.logoutText}>🚪 Log out · تسجيل الخروج</Text>
        </Pressable>
      </View>

      {/* Dev */}
      <View style={styles.devSection}>
        <Text style={styles.devLabel}>SWITCH MODE (DEV)</Text>
        <View style={styles.devRow}>
          <Pressable style={styles.devBtn} onPress={() => router.push('/worker-app')}>
            <Text style={styles.devBtnText}>🔧 Worker App</Text>
          </Pressable>
          <Pressable style={styles.devBtn} onPress={() => router.push('/admin')}>
            <Text style={styles.devBtnText}>📊 Admin</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.version}>hirafi v1.0.0 · حرفي</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.bgCard, alignItems: 'center',
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
    borderBottomWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  avatarWrap: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 88, height: 88, borderRadius: 20,
    backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: colors.primary,
  },
  avatarText: { fontSize: 30, fontWeight: '900', color: colors.primary },
  name: { fontSize: 22, fontWeight: '900', color: colors.text },
  rolePill: {
    marginTop: 6, paddingHorizontal: 14, paddingVertical: 5,
    backgroundColor: colors.primaryMuted, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.primary,
  },
  roleText: { fontSize: 12, fontWeight: '700', color: colors.copper },
  phone: { fontSize: 13, color: colors.textMuted, marginTop: 5 },
  statsRow: {
    flexDirection: 'row', marginTop: spacing.lg,
    backgroundColor: colors.bg, borderRadius: radius.lg,
    paddingVertical: spacing.md, paddingHorizontal: spacing.xl,
    borderWidth: 1, borderColor: colors.border,
  },
  stat: { alignItems: 'center', paddingHorizontal: spacing.lg },
  statVal: { fontSize: 16, fontWeight: '800', color: colors.text },
  statLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  statDiv: { width: 1, backgroundColor: colors.border },

  menuCard: {
    margin: spacing.lg, backgroundColor: colors.bgCard,
    borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border,
    overflow: 'hidden',
    ...shadow.card,
  },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.md },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcon: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center',
  },
  menuEmoji: { fontSize: 18 },
  menuLabel: { fontSize: 15, fontWeight: '600', color: colors.text },
  menuLabelAr: { fontSize: 11, color: colors.textMuted, marginTop: 1 },
  chevron: { fontSize: 20, color: colors.textMuted },

  logoutWrap: { marginHorizontal: spacing.lg, marginBottom: spacing.md },
  logoutBtn: {
    height: 50, backgroundColor: colors.dangerBg,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.danger,
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: colors.danger },

  devSection: { marginHorizontal: spacing.lg, marginBottom: spacing.md },
  devLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: 8 },
  devRow: { flexDirection: 'row', gap: 8 },
  devBtn: {
    flex: 1, height: 44, backgroundColor: colors.bgCard,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  devBtnText: { fontSize: 13, fontWeight: '700', color: colors.textSub },

  version: { textAlign: 'center', color: colors.textMuted, fontSize: 12 },
});
