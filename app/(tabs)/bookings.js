import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { useBookings } from '../../store/bookings';

const TABS = [
  { id: 'upcoming', label: 'Upcoming', count: 2 },
  { id: 'past', label: 'Past', count: 14 },
  { id: 'drafts', label: 'Drafts', count: 0 },
];

const MOCK_PAST = [
  { id: 'p1', workerName: 'Hassan Mahmoud', initials: 'HM', service: 'Pipe leak repair', date: 'Mon', dateNum: '27', month: 'May', rating: 5, price: 280 },
  { id: 'p2', workerName: 'Karim Adel',     initials: 'KA', service: 'Electrical wiring', date: 'Thu', dateNum: '15', month: 'May', rating: 4, price: 350 },
  { id: 'p3', workerName: 'Tarek Said',     initials: 'TS', service: 'AC cleaning',       date: 'Fri', dateNum: '3',  month: 'May', rating: 5, price: 200 },
];

export default function Bookings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { bookings, cancelBooking } = useBookings();
  const [tab, setTab] = useState('upcoming');

  const upcomingList = bookings.filter((b) => b.status === 'upcoming');
  const hasLive = upcomingList.length > 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsBar}>
        {TABS.map((t) => (
          <Pressable key={t.id} onPress={() => setTab(t.id)} style={styles.tabBtn}>
            <View style={styles.tabInner}>
              <Text style={[styles.tabText, tab === t.id && styles.tabTextActive]}>{t.label}</Text>
              {t.count > 0 && (
                <View style={[styles.tabBadge, tab === t.id && styles.tabBadgeActive]}>
                  <Text style={[styles.tabBadgeText, tab === t.id && styles.tabBadgeTextActive]}>{t.count}</Text>
                </View>
              )}
            </View>
            {tab === t.id && <View style={styles.tabLine} />}
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 32 }}>
        {/* LIVE card */}
        {tab === 'upcoming' && hasLive && (
          <Pressable
            style={styles.liveCard}
            onPress={() => router.push({ pathname: '/tracking', params: { workerId: upcomingList[0]?.workerId || 'w1' } })}
          >
            <View style={styles.liveHeader}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveBadgeText}>LIVE</Text>
              </View>
              <Text style={styles.liveTitle}>Worker on the way</Text>
            </View>
            <Text style={styles.liveSub}>Tap to track live location →</Text>
            <View style={styles.liveWorkerRow}>
              <View style={styles.liveAvatar}>
                <Text style={styles.liveInitials}>HM</Text>
              </View>
              <View>
                <Text style={styles.liveWorkerName}>Hassan Mahmoud</Text>
                <Text style={styles.liveWorkerSub}>Master Plumber · ETA 8 min</Text>
              </View>
            </View>
          </Pressable>
        )}

        {tab === 'upcoming' && upcomingList.map((b) => (
          <View key={b.id} style={styles.upcomingCard}>
            <View style={styles.dateSquare}>
              <Text style={styles.dateDay}>{new Date().toLocaleDateString('en', { weekday: 'short' })}</Text>
              <Text style={styles.dateNum}>{new Date().getDate()}</Text>
            </View>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingWorker}>{b.workerName}</Text>
              <Text style={styles.upcomingService}>{b.service}</Text>
              <Text style={styles.upcomingTime}>📍 {b.address}</Text>
            </View>
            <View>
              <Text style={styles.upcomingPrice}>{b.price} EGP</Text>
              <Pressable onPress={() => cancelBooking(b.id)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {tab === 'upcoming' && upcomingList.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyTitle}>No upcoming bookings</Text>
            <Text style={styles.emptySub}>Book a hirafi to get started.</Text>
            <Pressable style={styles.bookNowBtn} onPress={() => router.push('/(tabs)')}>
              <Text style={styles.bookNowText}>Find a hirafi →</Text>
            </Pressable>
          </View>
        )}

        {tab === 'past' && MOCK_PAST.map((b) => (
          <Pressable key={b.id} style={styles.pastCard} onPress={() => router.push('/receipt')}>
            <View style={styles.pastLeft}>
              <View style={styles.pastDateSquare}>
                <Text style={styles.pastDay}>{b.date}</Text>
                <Text style={styles.pastNum}>{b.dateNum}</Text>
                <Text style={styles.pastMonth}>{b.month}</Text>
              </View>
            </View>
            <View style={styles.pastInfo}>
              <Text style={styles.pastWorker}>{b.workerName}</Text>
              <Text style={styles.pastService}>{b.service}</Text>
              <View style={styles.starRow}>
                {[1,2,3,4,5].map((s) => (
                  <Text key={s} style={[styles.starSmall, { color: s <= b.rating ? colors.primary : colors.textMuted }]}>★</Text>
                ))}
              </View>
            </View>
            <Text style={styles.pastPrice}>{b.price} EGP</Text>
          </Pressable>
        ))}

        {tab === 'drafts' && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={styles.emptyTitle}>No drafts</Text>
            <Text style={styles.emptySub}>Incomplete bookings appear here.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  title: { fontSize: 24, fontWeight: '900', color: colors.text },

  tabsBar: {
    flexDirection: 'row', paddingHorizontal: spacing.lg,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  tabBtn: { marginRight: spacing.xl, paddingBottom: spacing.md, position: 'relative' },
  tabInner: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tabText: { fontSize: 15, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: colors.text, fontWeight: '700' },
  tabBadge: {
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: radius.pill,
    backgroundColor: colors.bgCardAlt,
  },
  tabBadgeActive: { backgroundColor: colors.primary },
  tabBadgeText: { fontSize: 10, fontWeight: '700', color: colors.textMuted },
  tabBadgeTextActive: { color: '#000' },
  tabLine: { position: 'absolute', bottom: -1, left: 0, right: 0, height: 3, borderRadius: 2, backgroundColor: colors.primary },

  liveCard: {
    backgroundColor: colors.dark, borderRadius: radius.xl,
    padding: spacing.lg, marginBottom: spacing.md,
  },
  liveHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(232,169,60,0.2)', borderRadius: radius.pill,
    paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: colors.primary,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary },
  liveBadgeText: { fontSize: 10, fontWeight: '800', color: colors.primary, letterSpacing: 0.8 },
  liveTitle: { fontSize: 16, fontWeight: '800', color: colors.textLight },
  liveSub: { fontSize: 12, color: colors.textLightMuted, marginBottom: spacing.md },
  liveWorkerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  liveAvatar: {
    width: 40, height: 40, borderRadius: 10, backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
  },
  liveInitials: { fontSize: 14, fontWeight: '800', color: colors.primary },
  liveWorkerName: { fontSize: 14, fontWeight: '700', color: colors.textLight },
  liveWorkerSub: { fontSize: 11, color: colors.textLightMuted, marginTop: 2 },

  upcomingCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.sm,
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  dateSquare: {
    width: 48, height: 52, borderRadius: 10, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  dateDay: { fontSize: 9, fontWeight: '700', color: '#000', opacity: 0.7 },
  dateNum: { fontSize: 22, fontWeight: '900', color: '#000', lineHeight: 26 },
  upcomingInfo: { flex: 1 },
  upcomingWorker: { fontSize: 15, fontWeight: '800', color: colors.text },
  upcomingService: { fontSize: 12, color: colors.textSub, marginTop: 2 },
  upcomingTime: { fontSize: 11, color: colors.textMuted, marginTop: 3 },
  upcomingPrice: { fontSize: 14, fontWeight: '800', color: colors.primary, textAlign: 'right' },
  cancelBtn: { marginTop: 4 },
  cancelText: { fontSize: 11, color: colors.danger, fontWeight: '600', textAlign: 'right' },

  pastCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.sm,
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  pastLeft: {},
  pastDateSquare: {
    width: 44, height: 50, borderRadius: 8, backgroundColor: colors.bgCardAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  pastDay: { fontSize: 9, fontWeight: '600', color: colors.textMuted },
  pastNum: { fontSize: 18, fontWeight: '900', color: colors.text },
  pastMonth: { fontSize: 9, color: colors.textMuted },
  pastInfo: { flex: 1 },
  pastWorker: { fontSize: 14, fontWeight: '700', color: colors.text },
  pastService: { fontSize: 12, color: colors.textSub, marginTop: 2 },
  starRow: { flexDirection: 'row', gap: 2, marginTop: 4 },
  starSmall: { fontSize: 12 },
  pastPrice: { fontSize: 14, fontWeight: '800', color: colors.text },

  empty: { alignItems: 'center', marginTop: 80 },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: spacing.md },
  emptySub: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  bookNowBtn: {
    marginTop: spacing.xl, backgroundColor: colors.primary, borderRadius: radius.lg,
    paddingHorizontal: spacing.xl, paddingVertical: 14,
  },
  bookNowText: { fontSize: 15, fontWeight: '800', color: '#000' },
});
