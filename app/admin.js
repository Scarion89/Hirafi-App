import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';

const KPI = [
  { label: 'JOBS TODAY', value: '24', sub: '+3 vs yesterday', positive: true },
  { label: 'REVENUE', value: '9,840 EGP', sub: '+12% this week', positive: true },
  { label: 'CUSTOMERS', value: '18', sub: '6 new today', positive: true },
  { label: 'AVG RATING', value: '4.87 ⭐', sub: '↑ 0.04 this week', positive: true },
];

const ACTIVE_WORKERS = [
  { id: 'w1', name: 'Hassan Mahmoud', title: 'Master Plumber', initials: 'HM', status: 'ON JOB', jobs: 3, earned: 420 },
  { id: 'w2', name: 'Karim Adel', title: 'AC Technician', initials: 'KA', status: 'AVAILABLE', jobs: 2, earned: 315 },
  { id: 'w3', name: 'Tarek Said', title: 'Electrician', initials: 'TS', status: 'ON JOB', jobs: 4, earned: 560 },
  { id: 'w4', name: 'Youssef Nabil', title: 'Carpenter', initials: 'YN', status: 'OFFLINE', jobs: 1, earned: 245 },
  { id: 'w5', name: 'Amr Khaled', title: 'Painter', initials: 'AK', status: 'AVAILABLE', jobs: 2, earned: 300 },
];

const STATUS_COLOR = {
  'ON JOB': colors.primary,
  AVAILABLE: colors.success,
  OFFLINE: colors.textMuted,
};

const RECENT_BOOKINGS = [
  { id: 'b1', customer: 'Mona Samir', service: 'AC installation', worker: 'Karim Adel', price: 420, status: 'DONE' },
  { id: 'b2', customer: 'Tarek Farouk', service: 'Pipe leak repair', worker: 'Hassan Mahmoud', price: 315, status: 'IN PROGRESS' },
  { id: 'b3', customer: 'Laila Hassan', service: 'Electrical wiring', worker: 'Tarek Said', price: 500, status: 'UPCOMING' },
  { id: 'b4', customer: 'Omar Galal', service: 'Deep cleaning', worker: 'Amr Khaled', price: 300, status: 'DONE' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('overview');

  const GOAL_CURRENT = 9840;
  const GOAL_TARGET = 15000;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.sub}>Monday, Jun 2 · Madinaty Hub</Text>
        </View>
        <Pressable onPress={() => router.back()} style={styles.exitBtn}>
          <Text style={styles.exitTxt}>← Exit</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        {/* KPI grid */}
        <View style={styles.kpiGrid}>
          {KPI.map((k) => (
            <View key={k.label} style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>{k.label}</Text>
              <Text style={styles.kpiValue}>{k.value}</Text>
              <Text style={[styles.kpiSub, { color: k.positive ? colors.success : colors.danger }]}>{k.sub}</Text>
            </View>
          ))}
        </View>

        {/* 90-day goal */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>90-DAY REVENUE GOAL</Text>
            <Text style={styles.goalPct}>{Math.round((GOAL_CURRENT / GOAL_TARGET) * 100)}%</Text>
          </View>
          <Text style={styles.goalAmounts}>{GOAL_CURRENT.toLocaleString()} / {GOAL_TARGET.toLocaleString()} EGP</Text>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${(GOAL_CURRENT / GOAL_TARGET) * 100}%` }]} />
          </View>
          <Text style={styles.goalSub}>{(GOAL_TARGET - GOAL_CURRENT).toLocaleString()} EGP remaining · 61 days left</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {['overview', 'workers', 'bookings'].map((t) => (
            <Pressable key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Workers list */}
        {(tab === 'overview' || tab === 'workers') && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>ACTIVE WORKERS</Text>
            {ACTIVE_WORKERS.map((w) => (
              <View key={w.id} style={styles.workerRow}>
                <View style={styles.wAvatar}>
                  <Text style={styles.wInitials}>{w.initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.wName}>{w.name}</Text>
                  <Text style={styles.wTitle}>{w.title} · {w.jobs} jobs today</Text>
                </View>
                <View style={styles.wRight}>
                  <Text style={[styles.wStatus, { color: STATUS_COLOR[w.status] }]}>{w.status}</Text>
                  <Text style={styles.wEarned}>{w.earned} EGP</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Recent bookings */}
        {(tab === 'overview' || tab === 'bookings') && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>RECENT BOOKINGS</Text>
            {RECENT_BOOKINGS.map((b) => (
              <View key={b.id} style={styles.bookingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bService}>{b.service}</Text>
                  <Text style={styles.bMeta}>{b.customer} · {b.worker}</Text>
                </View>
                <View style={styles.bRight}>
                  <Text style={[styles.bStatus, { color: STATUS_COLOR[b.status] || colors.textMuted }]}>{b.status}</Text>
                  <Text style={styles.bPrice}>{b.price} EGP</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  sub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  exitBtn: { paddingHorizontal: 12, paddingVertical: 8 },
  exitTxt: { fontSize: 13, color: colors.primary, fontWeight: '700' },
  kpiGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.lg,
    gap: spacing.sm, marginBottom: spacing.md,
  },
  kpiCard: {
    flex: 1, minWidth: '45%', backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  kpiLabel: { fontSize: 9, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2 },
  kpiValue: { fontSize: 20, fontWeight: '900', color: colors.text, marginTop: 6 },
  kpiSub: { fontSize: 11, marginTop: 4 },
  goalCard: {
    marginHorizontal: spacing.lg, marginBottom: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg,
    borderWidth: 1, borderColor: colors.border,
  },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  goalTitle: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2 },
  goalPct: { fontSize: 20, fontWeight: '900', color: colors.primary },
  goalAmounts: { fontSize: 16, fontWeight: '800', color: colors.text, marginTop: 4, marginBottom: 10 },
  progressBg: { height: 8, backgroundColor: colors.bgMuted, borderRadius: 4, marginBottom: 8 },
  progressFill: { height: 8, backgroundColor: colors.primary, borderRadius: 4 },
  goalSub: { fontSize: 12, color: colors.textMuted },
  tabs: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: 8, marginBottom: spacing.md },
  tab: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.border,
  },
  tabActive: { backgroundColor: colors.primaryMuted, borderColor: colors.primary },
  tabText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: colors.primary },
  section: { paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.sm },
  workerRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  wAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center',
  },
  wInitials: { fontSize: 13, fontWeight: '800', color: colors.text },
  wName: { fontSize: 14, fontWeight: '700', color: colors.text },
  wTitle: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  wRight: { alignItems: 'flex-end' },
  wStatus: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  wEarned: { fontSize: 13, fontWeight: '800', color: colors.text, marginTop: 2 },
  bookingRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  bService: { fontSize: 14, fontWeight: '700', color: colors.text },
  bMeta: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  bRight: { alignItems: 'flex-end' },
  bStatus: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  bPrice: { fontSize: 13, fontWeight: '800', color: colors.text, marginTop: 2 },
});
