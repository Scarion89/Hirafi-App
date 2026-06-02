import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';
import { getWorker } from '../data/services';

// Simple animated dot grid for mock map
function MapDots() {
  const dots = [];
  const cols = [30, 85, 140, 195, 250, 305];
  const rows = [30, 75, 120, 165];
  cols.forEach((x) => rows.forEach((y) => dots.push({ x, y })));
  const routeDots = [
    { x: 56, y: 148 }, { x: 97, y: 130 }, { x: 131, y: 115 },
    { x: 165, y: 100 }, { x: 200, y: 84 }, { x: 234, y: 69 },
  ];
  return (
    <View style={styles.mapContainer}>
      {dots.map((d, i) => (
        <View key={i} style={[styles.mapDot, { left: d.x, top: d.y }]} />
      ))}
      {routeDots.map((d, i) => (
        <View key={'r' + i} style={[styles.routeDot, { left: d.x, top: d.y }]} />
      ))}
      <View style={[styles.mapPin, { left: 56, top: 140 }]}><Text style={{ fontSize: 18 }}>📍</Text></View>
      <View style={[styles.mapPin, { left: 260, top: 52 }]}><Text style={{ fontSize: 18 }}>🏠</Text></View>
    </View>
  );
}

export default function Tracking() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { workerId = 'w1' } = useLocalSearchParams();
  const worker = getWorker(workerId) || { name: 'Hassan Mahmoud', initials: 'HM', rating: 4.9, title: 'Master Plumber' };

  const [eta, setEta] = useState(12);
  useEffect(() => {
    const t = setInterval(() => setEta((e) => Math.max(0, e - 1)), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeTxt}>✕</Text>
        </Pressable>
        <Text style={styles.topTitle}>Active Job</Text>
      </View>

      {/* Status card */}
      <View style={styles.statusCard}>
        <View style={styles.liveRow}>
          <View style={styles.liveDotOuter}><View style={styles.liveDot} /></View>
          <Text style={styles.liveLabel}>{worker.name.split(' ')[0].toUpperCase()} IS ON THE WAY</Text>
        </View>
        <Text style={styles.etaText}>Arriving in {eta} minutes</Text>
        <Text style={styles.distText}>📍 He's 2.4 km from your location</Text>
      </View>

      {/* Map */}
      <MapDots />

      {/* Worker contact card */}
      <View style={styles.workerCard}>
        <View style={styles.workerAvatar}>
          <Text style={styles.workerInitials}>{worker.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.workerName}>{worker.name}</Text>
          <Text style={styles.workerTitle}>{worker.title} · ⭐ {worker.rating}</Text>
          <Text style={styles.workerCar}>🚗 White Toyota · ABC 1234</Text>
        </View>
        <Pressable style={styles.actionBtn}><Text style={styles.actionEmoji}>📞</Text></Pressable>
        <Pressable style={styles.actionBtn}><Text style={styles.actionEmoji}>💬</Text></Pressable>
      </View>

      {/* Job summary */}
      <View style={styles.jobSummary}>
        <Text style={styles.jobLabel}>JOB</Text>
        <Text style={styles.jobName}>Pipe leak repair · 350 EGP</Text>
        <Text style={styles.jobAddr}>Madinaty, Group 64, Building 12, Apt 8</Text>
      </View>

      {/* Help */}
      <Pressable
        style={[styles.helpBtn, { marginBottom: insets.bottom + 12 }]}
        onPress={() => router.push({ pathname: '/rating', params: { workerId } })}
      >
        <Text style={styles.helpText}>Job complete? Leave a review →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: 12 },
  closeBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  closeTxt: { fontSize: 20, color: colors.text, fontWeight: '300' },
  topTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  statusCard: {
    marginHorizontal: spacing.lg, backgroundColor: colors.bgCard,
    borderRadius: radius.lg, padding: spacing.lg,
    borderWidth: 1, borderColor: colors.border,
  },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  liveDotOuter: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: colors.primaryMuted, alignItems: 'center', justifyContent: 'center',
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  liveLabel: { fontSize: 11, fontWeight: '700', color: colors.primary, letterSpacing: 0.5 },
  etaText: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 4 },
  distText: { fontSize: 13, color: colors.textMuted, marginTop: 6 },
  mapContainer: {
    height: 200, marginHorizontal: spacing.lg, marginTop: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border, overflow: 'hidden', position: 'relative',
  },
  mapDot: { position: 'absolute', width: 2, height: 2, borderRadius: 1, backgroundColor: colors.border },
  routeDot: { position: 'absolute', width: 4, height: 4, borderRadius: 2, backgroundColor: colors.primary },
  mapPin: { position: 'absolute' },
  workerCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    marginHorizontal: spacing.lg, marginTop: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  workerAvatar: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  workerInitials: { fontSize: 16, fontWeight: '800', color: colors.text },
  workerName: { fontSize: 15, fontWeight: '700', color: colors.text },
  workerTitle: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  workerCar: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  actionBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  actionEmoji: { fontSize: 18 },
  jobSummary: { paddingHorizontal: spacing.lg, marginTop: spacing.md },
  jobLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2 },
  jobName: { fontSize: 15, fontWeight: '700', color: colors.text, marginTop: 4 },
  jobAddr: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  helpBtn: {
    marginHorizontal: spacing.lg, marginTop: spacing.md,
    height: 50, backgroundColor: colors.bgCard, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  helpText: { fontSize: 14, fontWeight: '600', color: colors.textSub },
});
