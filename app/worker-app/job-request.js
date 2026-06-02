import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

const JOB = {
  service: 'Faucet replacement',
  category: 'Plumbing',
  price: 245,
  customer: 'Sara Mostafa',
  rating: 4.8,
  addr: 'Rehab, Phase 2, Villa 88',
  distance: '1.8 km',
  estimatedTime: '45 min',
  notes: 'Kitchen faucet is dripping. Replace with new one.',
};

export default function JobRequest() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [countdown, setCountdown] = useState(45);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          router.back();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const progress = countdown / 45;

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>New Job Request</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.closeTxt}>✕</Text>
        </Pressable>
      </View>

      {/* Countdown */}
      <View style={styles.countdownSection}>
        <Text style={styles.countdownNum}>{countdown}</Text>
        <Text style={styles.countdownLabel}>seconds to respond</Text>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: countdown > 15 ? colors.primary : colors.danger }]} />
        </View>
      </View>

      {/* Earnings preview */}
      <View style={styles.earningsCard}>
        <Text style={styles.earningsLabel}>YOU'LL EARN</Text>
        <Text style={styles.earningsAmount}>{JOB.price} EGP</Text>
        <Text style={styles.earningsSub}>Paid after job completion</Text>
      </View>

      {/* Job details */}
      <View style={styles.detailsCard}>
        <DetailRow icon="🔧" label="Service" value={`${JOB.service} · ${JOB.category}`} />
        <DetailRow icon="👤" label="Customer" value={`${JOB.customer} · ⭐ ${JOB.rating}`} />
        <DetailRow icon="📍" label="Location" value={`${JOB.addr} · ${JOB.distance}`} />
        <DetailRow icon="⏱️" label="Est. duration" value={JOB.estimatedTime} />
        <DetailRow icon="📝" label="Notes" value={JOB.notes} last />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable
          style={styles.declineBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.declineTxt}>Decline</Text>
        </Pressable>
        <Pressable
          style={styles.acceptBtn}
          onPress={() => router.replace('/worker-app/job-complete')}
        >
          <Text style={styles.acceptTxt}>Accept Job →</Text>
        </Pressable>
      </View>
    </View>
  );
}

function DetailRow({ icon, label, value, last }) {
  return (
    <View style={[styles.detailRow, !last && styles.detailRowBorder]}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md },
  title: { fontSize: 20, fontWeight: '800', color: colors.text },
  closeTxt: { fontSize: 20, color: colors.textMuted, fontWeight: '300' },
  countdownSection: { alignItems: 'center', paddingVertical: spacing.xl },
  countdownNum: { fontSize: 72, fontWeight: '900', color: colors.primary, lineHeight: 80 },
  countdownLabel: { fontSize: 14, color: colors.textMuted, marginTop: 4, marginBottom: 16 },
  progressBg: { width: '80%', height: 6, backgroundColor: colors.bgMuted, borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },
  earningsCard: {
    backgroundColor: colors.primaryMuted, borderRadius: radius.xl, padding: spacing.xl,
    borderWidth: 1, borderColor: colors.primary, marginBottom: spacing.md,
    alignItems: 'center',
  },
  earningsLabel: { fontSize: 10, fontWeight: '700', color: colors.primary, letterSpacing: 1.2 },
  earningsAmount: { fontSize: 44, fontWeight: '900', color: colors.primary, marginTop: 4 },
  earningsSub: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  detailsCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg,
  },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, padding: spacing.md },
  detailRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  detailIcon: { fontSize: 18, width: 28, textAlign: 'center' },
  detailLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1, marginBottom: 2 },
  detailValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  actions: { flexDirection: 'row', gap: spacing.md },
  declineBtn: {
    flex: 1, height: 56, backgroundColor: colors.bgCard,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  declineTxt: { fontSize: 15, fontWeight: '700', color: colors.textMuted },
  acceptBtn: {
    flex: 2, height: 56, backgroundColor: colors.primary,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
  },
  acceptTxt: { fontSize: 15, fontWeight: '800', color: '#000' },
});
