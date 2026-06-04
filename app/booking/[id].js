import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';
import { getWorker } from '../../data/services';
import { useBookings } from '../../store/bookings';

const AVATAR_COLORS = ['#3D2E10', '#1A2E1A', '#1A1A2E', '#2E1A2E'];

export default function BookingConfirm() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addBooking } = useBookings();
  const w = getWorker(id);

  const [date] = useState('Today');
  const [time] = useState('ASAP');

  if (!w) return null;

  const avatarBg = AVATAR_COLORS[0];

  const confirm = () => {
    addBooking({
      workerId: w.id,
      workerName: w.name,
      service: 'Pipe leak repair',
      date,
      time,
      address: 'Madinaty, Group 64, Building 12, Apt 8',
      price: w.basePrice,
    });
    router.replace({ pathname: '/tracking', params: { workerId: w.id } });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.topTitle}>Confirm booking</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Worker row */}
        <View style={styles.workerRow}>
          <View style={[styles.workerAvatar, { backgroundColor: avatarBg }]}>
            <Text style={styles.workerInitials}>{w.initials}</Text>
          </View>
          <View style={styles.workerInfo}>
            <Text style={styles.workerName}>{w.name}</Text>
            <Text style={styles.workerSub}>{w.title} · ⭐ {w.rating}</Text>
          </View>
          <Pressable style={styles.chatBtn}>
            <Text style={styles.chatEmoji}>💬</Text>
          </Pressable>
        </View>

        {/* JOB card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardLabel}>JOB</Text>
            <Pressable><Text style={styles.editLink}>Edit</Text></Pressable>
          </View>
          <Text style={styles.jobName}>Pipe leak repair</Text>
          <Text style={styles.jobSub}>Living room · ASAP</Text>
        </View>

        {/* WHEN + WHERE row */}
        <View style={styles.whenWhereRow}>
          <View style={[styles.whenWhereCard, { marginRight: 6 }]}>
            <Text style={styles.miniLabel}>WHEN</Text>
            <Text style={styles.whenWhereVal}>Today · ASAP</Text>
          </View>
          <View style={[styles.whenWhereCard, { marginLeft: 6 }]}>
            <Text style={styles.miniLabel}>WHERE</Text>
            <Text style={styles.whenWhereVal}>Madinaty, Grp 64</Text>
          </View>
        </View>

        {/* ESTIMATE card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>ESTIMATE</Text>

          <View style={styles.estimateRow}>
            <Text style={styles.estimateLabel}>Callout · covered</Text>
            <Text style={styles.estimateVal}>0 EGP</Text>
          </View>
          <View style={styles.estimateRow}>
            <Text style={styles.estimateLabel}>Diagnostic + repair</Text>
            <Text style={styles.estimateVal}>180–240 EGP</Text>
          </View>
          <View style={styles.estimateRow}>
            <Text style={styles.estimateLabel}>hirafi service fee</Text>
            <Text style={styles.estimateVal}>15 EGP</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.estimateRow}>
            <Text style={styles.payLabel}>Pay after work</Text>
            <Text style={styles.payVal}>195–255 EGP</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable onPress={confirm} style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Confirm &amp; dispatch →</Text>
        </Pressable>
        <Text style={styles.cancelNote}>Free cancellation up to 30 min before</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 22, color: colors.text, fontWeight: '300' },
  topTitle: { fontSize: 17, fontWeight: '800', color: colors.text },

  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 120 },

  workerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },
  workerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workerInitials: { fontSize: 16, fontWeight: '800', color: colors.text },
  workerInfo: { flex: 1, marginLeft: 12 },
  workerName: { fontSize: 15, fontWeight: '800', color: colors.text },
  workerSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  chatBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.bgMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatEmoji: { fontSize: 16 },

  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2 },
  editLink: { fontSize: 13, fontWeight: '700', color: colors.primary },
  jobName: { fontSize: 16, fontWeight: '800', color: colors.text },
  jobSub: { fontSize: 13, color: colors.textMuted, marginTop: 3 },

  whenWhereRow: { flexDirection: 'row', marginBottom: 12 },
  whenWhereCard: {
    flex: 1,
    backgroundColor: colors.bgMuted,
    borderRadius: 12,
    padding: 12,
  },
  miniLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1, marginBottom: 4 },
  whenWhereVal: { fontSize: 14, fontWeight: '700', color: colors.text },

  estimateRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  estimateLabel: { fontSize: 14, color: colors.textSub },
  estimateVal: { fontSize: 14, fontWeight: '600', color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 10 },
  payLabel: { fontSize: 15, fontWeight: '700', color: colors.text },
  payVal: { fontSize: 16, fontWeight: '800', color: colors.primary },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: 12,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  confirmBtn: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: { fontSize: 16, fontWeight: '800', color: '#000' },
  cancelNote: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 8,
  },
});
