import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../../constants/theme';
import { useBookings } from '../../store/bookings';

const TABS = ['upcoming', 'cancelled'];

export default function Bookings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { bookings, cancelBooking } = useBookings();
  const [tab, setTab] = useState('upcoming');

  const list = bookings.filter((b) => b.status === tab);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Text style={styles.title}>My Bookings</Text>

      {/* Active job banner — shown when there are upcoming bookings */}
      {bookings.some((b) => b.status === 'upcoming') && (
        <Pressable
          style={styles.activeBanner}
          onPress={() => router.push({ pathname: '/tracking', params: { workerId: bookings.find((b) => b.status === 'upcoming')?.workerId || 'w1' } })}
        >
          <View style={styles.activeDotOuter}><View style={styles.activeDot} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.activeBannerTitle}>Worker is on the way</Text>
            <Text style={styles.activeBannerSub}>Tap to track live location →</Text>
          </View>
          <Text style={styles.activeBannerArrow}>›</Text>
        </Pressable>
      )}

      <View style={styles.tabsBar}>
        {TABS.map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={styles.tabBtn}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t[0].toUpperCase() + t.slice(1)}
            </Text>
            {tab === t && <View style={styles.tabLine} />}
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyTitle}>No {tab} bookings</Text>
            <Text style={styles.emptySub}>Confirmed bookings will show up here.</Text>
          </View>
        ) : (
          list.map((b) => (
            <View key={b.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.workerName}>{b.workerName}</Text>
                  <Text style={styles.service}>{b.service}</Text>
                </View>
                <View style={[styles.badge, b.status === 'upcoming' ? styles.badgeUpcoming : styles.badgeCancelled]}>
                  <Text style={[styles.badgeText, { color: b.status === 'upcoming' ? colors.primary : colors.danger }]}>
                    {b.status === 'upcoming' ? '● Upcoming' : '● Cancelled'}
                  </Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}><Text style={styles.infoEmoji}>📅</Text><Text style={styles.infoText}>{b.date} · {b.time}</Text></View>
              <View style={styles.infoRow}><Text style={styles.infoEmoji}>📍</Text><Text style={styles.infoText}>{b.address}</Text></View>
              <View style={styles.infoRow}><Text style={styles.infoEmoji}>💵</Text><Text style={styles.infoText}>{b.price} EGP</Text></View>
              {b.status === 'upcoming' ? (
                <Pressable onPress={() => cancelBooking(b.id)} style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>Cancel booking</Text>
                </Pressable>
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, padding: spacing.lg, paddingBottom: spacing.sm },
  tabsBar: { flexDirection: 'row', paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  tabBtn: { marginRight: spacing.xl, paddingBottom: spacing.md },
  tabText: { fontSize: 15, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: colors.text },
  tabLine: { position: 'absolute', bottom: -1, left: 0, right: 0, height: 3, borderRadius: 2, backgroundColor: colors.primary },
  card: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  workerName: { fontSize: 16, fontWeight: '800', color: colors.text },
  service: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  badgeUpcoming: { backgroundColor: colors.primaryMuted },
  badgeCancelled: { backgroundColor: colors.dangerBg },
  badgeText: { fontSize: 11, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  infoEmoji: { fontSize: 14 },
  infoText: { fontSize: 14, color: colors.textSub },
  cancelBtn: {
    marginTop: spacing.sm, backgroundColor: colors.bgMuted,
    borderRadius: radius.md, height: 44, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  cancelText: { fontSize: 14, fontWeight: '700', color: colors.primary },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: spacing.md },
  emptySub: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  activeBanner: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    marginHorizontal: spacing.lg, marginBottom: spacing.md,
    backgroundColor: colors.primaryMuted, borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.primary,
  },
  activeDotOuter: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.primary + '44', alignItems: 'center', justifyContent: 'center' },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  activeBannerTitle: { fontSize: 14, fontWeight: '700', color: colors.primary },
  activeBannerSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  activeBannerArrow: { fontSize: 24, color: colors.primary },
});
