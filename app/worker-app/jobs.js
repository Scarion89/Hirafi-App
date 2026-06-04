import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

const TABS = ['Upcoming', 'Active', 'History'];

const JOBS = {
  Upcoming: [
    { id: 'u1', service: 'Faucet replacement', customer: 'Sara Mostafa', addr: 'Rehab, Phase 2', time: '3:00 PM · Today', price: 245, status: 'UPCOMING' },
  ],
  Active: [
    { id: 'a1', service: 'Pipe leak repair', customer: 'Tarek Farouk', addr: 'Madinaty, Group 64', time: 'Started 12:30 PM', price: 315, status: 'ACTIVE' },
  ],
  History: [
    { id: 'h1', service: 'AC installation', customer: 'Mona Samir', addr: 'Madinaty, Group 12', time: '9:00 AM · Today', price: 420, status: 'DONE' },
    { id: 'h2', service: 'Electrical wiring', customer: 'Karim Adel', addr: 'Rehab, Phase 3', time: '27 May', price: 380, status: 'DONE' },
    { id: 'h3', service: 'Deep cleaning', customer: 'Nour Hassan', addr: 'Madinaty, Group 8', time: '24 May', price: 290, status: 'DONE' },
  ],
};

const STATUS_COLORS = {
  UPCOMING: colors.textLightMuted,
  ACTIVE: colors.primary,
  DONE: colors.success,
};

export default function Jobs() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('Upcoming');

  const jobs = JOBS[tab] || [];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      <View style={styles.header}>
        <Text style={styles.title}>Jobs · الشغل</Text>
      </View>

      <View style={styles.tabsBar}>
        {TABS.map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={styles.tabBtn}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
            {tab === t && <View style={styles.tabLine} />}
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {jobs.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyTitle}>No {tab.toLowerCase()} jobs</Text>
          </View>
        ) : (
          jobs.map((job) => (
            <Pressable
              key={job.id}
              style={styles.jobCard}
              onPress={() => router.push('/worker-app/job-detail')}
            >
              <View style={styles.jobTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.jobService}>{job.service}</Text>
                  <Text style={styles.jobCustomer}>{job.customer}</Text>
                  <Text style={styles.jobAddr}>{job.addr}</Text>
                </View>
                <View style={styles.jobRight}>
                  <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[job.status] + '22', borderColor: STATUS_COLORS[job.status] }]}>
                    <Text style={[styles.statusText, { color: STATUS_COLORS[job.status] }]}>{job.status}</Text>
                  </View>
                  <Text style={styles.jobPrice}>{job.price} EGP</Text>
                </View>
              </View>
              <View style={styles.jobBottom}>
                <Text style={styles.jobTime}>🕐 {job.time}</Text>
                {tab === 'Active' && (
                  <Pressable style={styles.continueBtn} onPress={() => router.push('/worker-app/working')}>
                    <Text style={styles.continueBtnText}>Continue →</Text>
                  </Pressable>
                )}
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  title: { fontSize: 24, fontWeight: '900', color: colors.textLight },

  tabsBar: {
    flexDirection: 'row', paddingHorizontal: spacing.lg,
    borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  tabBtn: { marginRight: spacing.xl, paddingBottom: spacing.md, position: 'relative' },
  tabText: { fontSize: 15, fontWeight: '600', color: colors.textLightMuted },
  tabTextActive: { color: colors.textLight, fontWeight: '700' },
  tabLine: { position: 'absolute', bottom: -1, left: 0, right: 0, height: 3, borderRadius: 2, backgroundColor: colors.primary },

  content: { padding: spacing.lg, paddingBottom: 32 },

  jobCard: {
    backgroundColor: colors.darkCard, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.sm,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  jobTop: { flexDirection: 'row', gap: spacing.md },
  jobService: { fontSize: 15, fontWeight: '800', color: colors.textLight },
  jobCustomer: { fontSize: 12, color: colors.textLightSub, marginTop: 2 },
  jobAddr: { fontSize: 11, color: colors.textLightMuted, marginTop: 2 },
  jobRight: { alignItems: 'flex-end', gap: 6 },
  statusBadge: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill, borderWidth: 1,
  },
  statusText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  jobPrice: { fontSize: 15, fontWeight: '900', color: colors.primary },
  jobBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
  jobTime: { fontSize: 11, color: colors.textLightMuted },
  continueBtn: {
    backgroundColor: colors.primary, borderRadius: radius.sm,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  continueBtnText: { fontSize: 12, fontWeight: '800', color: '#000' },

  empty: { alignItems: 'center', marginTop: 80 },
  emptyEmoji: { fontSize: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.textLightMuted, marginTop: spacing.md },
});
