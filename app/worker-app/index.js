import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

const TODAY_JOBS = [
  {
    id: 'j1', status: 'DONE', time: '9:00 AM', service: 'AC installation',
    customer: 'Mona Samir', addr: 'Madinaty, Group 12, Bldg 3', price: 420,
  },
  {
    id: 'j2', status: 'IN PROGRESS', time: '12:30 PM', service: 'Pipe leak repair',
    customer: 'Tarek Farouk', addr: 'Madinaty, Group 64, Bldg 12', price: 315,
  },
  {
    id: 'j3', status: 'UPCOMING', time: '3:00 PM', service: 'Faucet replacement',
    customer: 'Sara Mostafa', addr: 'Rehab, Phase 2, Villa 88', price: 245,
  },
];

const STATUS_COLOR = {
  DONE: colors.success,
  'IN PROGRESS': colors.primary,
  UPCOMING: colors.textMuted,
};

export default function WorkerDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('today');

  const totalToday = TODAY_JOBS.reduce((s, j) => s + j.price, 0);
  const completed = TODAY_JOBS.filter((j) => j.status === 'DONE').length;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Worker Dashboard</Text>
          <Text style={styles.subGreeting}>Hassan Mahmoud · Master Plumber</Text>
        </View>
        <Pressable onPress={() => router.back()} style={styles.exitBtn}>
          <Text style={styles.exitTxt}>← Exit</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        {/* Earnings card */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsLeft}>
            <Text style={styles.earningsLabel}>TODAY'S EARNINGS</Text>
            <Text style={styles.earningsAmount}>{totalToday} EGP</Text>
            <Text style={styles.earningsSub}>{completed} of {TODAY_JOBS.length} jobs completed</Text>
          </View>
          <View style={styles.earningsRight}>
            <View style={styles.statCircle}>
              <Text style={styles.statCircleNum}>⭐ 4.9</Text>
              <Text style={styles.statCircleLabel}>rating</Text>
            </View>
          </View>
        </View>

        {/* Goal progress */}
        <View style={styles.goalCard}>
          <View style={styles.goalRow}>
            <Text style={styles.goalLabel}>DAILY GOAL</Text>
            <Text style={styles.goalVal}>{totalToday} / 1000 EGP</Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${Math.min(100, (totalToday / 1000) * 100)}%` }]} />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {['today', 'upcoming', 'history'].map((t) => (
            <Pressable key={t} onPress={() => setActiveTab(t)} style={[styles.tab, activeTab === t && styles.tabActive]}>
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Job list */}
        <View style={{ paddingHorizontal: spacing.lg }}>
          {TODAY_JOBS.map((job) => (
            <Pressable
              key={job.id}
              style={styles.jobCard}
              onPress={() => job.status === 'UPCOMING' && router.push('/worker-app/job-request')}
            >
              <View style={styles.jobLeft}>
                <View style={[styles.statusDot, { backgroundColor: STATUS_COLOR[job.status] }]} />
                <View>
                  <Text style={styles.jobService}>{job.service}</Text>
                  <Text style={styles.jobCustomer}>{job.customer}</Text>
                  <Text style={styles.jobAddr}>{job.addr}</Text>
                </View>
              </View>
              <View style={styles.jobRight}>
                <Text style={[styles.jobStatus, { color: STATUS_COLOR[job.status] }]}>{job.status}</Text>
                <Text style={styles.jobTime}>{job.time}</Text>
                <Text style={styles.jobPrice}>{job.price} EGP</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* New job request banner */}
        <Pressable style={styles.newJobBanner} onPress={() => router.push('/worker-app/job-request')}>
          <Text style={styles.newJobTitle}>🔔 New job request!</Text>
          <Text style={styles.newJobSub}>Tap to view — expires in 45s</Text>
        </Pressable>
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
  greeting: { fontSize: 18, fontWeight: '800', color: colors.text },
  subGreeting: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  exitBtn: { paddingHorizontal: 12, paddingVertical: 8 },
  exitTxt: { fontSize: 13, color: colors.primary, fontWeight: '700' },
  earningsCard: {
    marginHorizontal: spacing.lg, marginBottom: spacing.md,
    backgroundColor: colors.primary, borderRadius: radius.xl, padding: spacing.xl,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  earningsLeft: { flex: 1 },
  earningsLabel: { fontSize: 10, fontWeight: '700', color: '#000', letterSpacing: 1.2, opacity: 0.7 },
  earningsAmount: { fontSize: 36, fontWeight: '900', color: '#000', marginTop: 4 },
  earningsSub: { fontSize: 13, color: '#000', opacity: 0.6, marginTop: 4 },
  earningsRight: {},
  statCircle: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: 'rgba(0,0,0,0.15)', alignItems: 'center', justifyContent: 'center',
  },
  statCircleNum: { fontSize: 14, fontWeight: '800', color: '#000' },
  statCircleLabel: { fontSize: 10, color: '#000', opacity: 0.7 },
  goalCard: {
    marginHorizontal: spacing.lg, marginBottom: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  goalLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2 },
  goalVal: { fontSize: 13, fontWeight: '700', color: colors.text },
  progressBg: { height: 6, backgroundColor: colors.bgMuted, borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: colors.primary, borderRadius: 3 },
  tabs: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: 8, marginBottom: spacing.md },
  tab: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.border,
  },
  tabActive: { backgroundColor: colors.primaryMuted, borderColor: colors.primary },
  tabText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: colors.primary },
  jobCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  jobLeft: { flexDirection: 'row', gap: spacing.sm, flex: 1 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  jobService: { fontSize: 14, fontWeight: '700', color: colors.text },
  jobCustomer: { fontSize: 12, color: colors.textSub, marginTop: 2 },
  jobAddr: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  jobRight: { alignItems: 'flex-end', gap: 4 },
  jobStatus: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  jobTime: { fontSize: 12, color: colors.textMuted },
  jobPrice: { fontSize: 14, fontWeight: '800', color: colors.text },
  newJobBanner: {
    marginHorizontal: spacing.lg, marginTop: spacing.md,
    backgroundColor: colors.primaryMuted, borderRadius: radius.lg, padding: spacing.lg,
    borderWidth: 1, borderColor: colors.primary,
  },
  newJobTitle: { fontSize: 16, fontWeight: '800', color: colors.primary },
  newJobSub: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
});
