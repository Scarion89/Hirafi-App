import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';
import { useAuth } from '../../store/auth';

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
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('today');
  const [isOnline, setIsOnline] = useState(true);

  const workerName = user?.name || 'Hassan Mahmoud';
  const workerFirstName = workerName.split(' ')[0];
  const specialty = user?.specialty || 'Master Plumber';
  const initials = workerName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  const totalToday = TODAY_JOBS.reduce((s, j) => s + j.price, 0);
  const completed = TODAY_JOBS.filter((j) => j.status === 'DONE').length;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Text style={styles.wordmark}>hirafi</Text>
          <View style={styles.workerInfo}>
            <Text style={styles.workerName}>{workerName}</Text>
            <Text style={styles.workerSpecialty}>{specialty}</Text>
          </View>
        </View>
        <View style={styles.topRight}>
          <Pressable style={styles.bellBtn} onPress={() => router.push('/notifications')}>
            <Text style={styles.bellEmoji}>🔔</Text>
            <View style={styles.bellDot} />
          </Pressable>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
        </View>
      </View>

      {/* Online / Offline toggle */}
      <View style={styles.statusRow}>
        <Pressable
          style={[styles.statusChip, isOnline ? styles.statusChipOnline : styles.statusChipOffline]}
          onPress={() => setIsOnline((v) => !v)}
        >
          <View style={[styles.statusDotChip, { backgroundColor: isOnline ? colors.success : colors.textMuted }]} />
          <Text style={[styles.statusChipText, { color: isOnline ? colors.success : colors.textMuted }]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: colors.bgMuted, true: colors.primaryMuted }}
            thumbColor={isOnline ? colors.primary : colors.textMuted}
            style={styles.toggle}
          />
        </Pressable>
        {!isOnline && (
          <Text style={styles.offlineHint}>You won't receive new job requests</Text>
        )}
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
        <Pressable
          style={[styles.newJobBanner, !isOnline && styles.newJobBannerDimmed]}
          onPress={() => isOnline && router.push('/worker-app/job-request')}
          disabled={!isOnline}
        >
          <Text style={[styles.newJobTitle, !isOnline && styles.dimmedText]}>🔔 New job request!</Text>
          <Text style={[styles.newJobSub, !isOnline && styles.dimmedText]}>
            {isOnline ? 'Tap to view — expires in 45s' : 'You won\'t receive new job requests'}
          </Text>
          {!isOnline && (
            <View style={styles.offlineOverlay}>
              <Text style={styles.offlineOverlayText}>Go Online to receive jobs</Text>
            </View>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  wordmark: {
    fontSize: 22, fontWeight: '900', color: colors.primary,
    letterSpacing: -0.5,
  },
  workerInfo: { flex: 1 },
  workerName: { fontSize: 14, fontWeight: '700', color: colors.text },
  workerSpecialty: { fontSize: 11, color: colors.textMuted, marginTop: 1 },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bellBtn: {
    width: 38, height: 38, backgroundColor: colors.bgCard, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center', position: 'relative',
    borderWidth: 1, borderColor: colors.border,
  },
  bellEmoji: { fontSize: 16 },
  bellDot: {
    position: 'absolute', top: 5, right: 5, width: 9, height: 9,
    borderRadius: 5, backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.bg,
  },
  avatarCircle: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: colors.primaryMuted,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: colors.primary,
  },
  avatarInitials: { fontSize: 14, fontWeight: '800', color: colors.primary },

  statusRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  statusChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill,
    borderWidth: 1.5,
  },
  statusChipOnline: {
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    borderColor: colors.success,
  },
  statusChipOffline: {
    backgroundColor: colors.bgMuted,
    borderColor: colors.border,
  },
  statusDotChip: { width: 7, height: 7, borderRadius: 4 },
  statusChipText: { fontSize: 13, fontWeight: '700' },
  toggle: { marginLeft: 4, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  offlineHint: { fontSize: 12, color: colors.textMuted, flex: 1 },

  earningsCard: {
    marginHorizontal: spacing.lg, marginTop: spacing.md, marginBottom: spacing.md,
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
    borderWidth: 1, borderColor: colors.primary, overflow: 'hidden',
  },
  newJobBannerDimmed: {
    borderColor: colors.border, opacity: 0.5,
  },
  newJobTitle: { fontSize: 16, fontWeight: '800', color: colors.primary },
  newJobSub: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  dimmedText: { color: colors.textMuted },
  offlineOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(20,16,8,0.7)', alignItems: 'center', justifyContent: 'center',
  },
  offlineOverlayText: { fontSize: 14, fontWeight: '700', color: colors.textMuted },
});
