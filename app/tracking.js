import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Pressable, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';
import { getWorker } from '../data/services';

// Route waypoints the worker travels along (pixel coords on the 340×220 map canvas)
const ROUTE = [
  { x: 28,  y: 175 },
  { x: 60,  y: 162 },
  { x: 92,  y: 148 },
  { x: 124, y: 134 },
  { x: 156, y: 118 },
  { x: 188, y: 102 },
  { x: 220, y: 88  },
  { x: 252, y: 74  },
  { x: 284, y: 60  },
  { x: 308, y: 48  },
];

const H_STREETS = [48, 88, 128, 168, 208];
const V_STREETS = [40, 90, 140, 190, 240, 290];
const MAP_W = 340;
const MAP_H = 220;

function AnimatedMap({ workerX, workerY, pulse }) {
  return (
    <View style={styles.mapOuter}>
      {/* Block fills */}
      {H_STREETS.slice(0, -1).map((y, yi) =>
        V_STREETS.slice(0, -1).map((x, xi) => (
          <View
            key={`b${yi}${xi}`}
            style={[styles.block, {
              left: x + 2, top: y + 2,
              width: V_STREETS[xi + 1] - x - 4,
              height: H_STREETS[yi + 1] - y - 4,
            }]}
          />
        ))
      )}
      {/* Street grid */}
      {H_STREETS.map((y) => (
        <View key={`h${y}`} style={[styles.hStreet, { top: y }]} />
      ))}
      {V_STREETS.map((x) => (
        <View key={`v${x}`} style={[styles.vStreet, { left: x }]} />
      ))}

      {/* Route path */}
      {ROUTE.slice(0, -1).map((p, i) => {
        const next = ROUTE[i + 1];
        const dx = next.x - p.x;
        const dy = next.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        return (
          <View
            key={`l${i}`}
            style={[styles.routeLine, {
              left: p.x, top: p.y - 1, width: len,
              transform: [{ rotate: `${angle}deg` }],
            }]}
          />
        );
      })}

      {/* Destination pin */}
      <View style={[styles.pin, { left: ROUTE[ROUTE.length - 1].x - 13, top: ROUTE[ROUTE.length - 1].y - 30 }]}>
        <View style={styles.pinBubble}><Text style={{ fontSize: 13 }}>🏠</Text></View>
        <View style={styles.pinTail} />
      </View>

      {/* Origin pin */}
      <View style={[styles.pin, { left: ROUTE[0].x - 13, top: ROUTE[0].y + 2 }]}>
        <View style={[styles.pinBubble, { borderColor: colors.textMuted }]}><Text style={{ fontSize: 11 }}>📍</Text></View>
      </View>

      {/* Pulse ring */}
      <Animated.View style={[styles.pulseRing, {
        left: Animated.subtract(workerX, 18),
        top: Animated.subtract(workerY, 18),
        opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] }),
        transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 2.2] }) }],
      }]} />

      {/* Worker car */}
      <Animated.View style={[styles.workerMarker, {
        transform: [
          { translateX: Animated.subtract(workerX, 14) },
          { translateY: Animated.subtract(workerY, 14) },
        ],
      }]}>
        <Text style={{ fontSize: 20 }}>🚗</Text>
      </Animated.View>

      <View style={styles.mapLabel}>
        <Text style={styles.mapLabelText}>LIVE MAP · DEMO</Text>
      </View>
    </View>
  );
}

export default function Tracking() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { workerId = 'w1' } = useLocalSearchParams();
  const worker = getWorker(workerId) || { name: 'Hassan Mahmoud', initials: 'HM', rating: 4.9, title: 'Master Plumber' };

  const [stepIndex, setStepIndex] = useState(0);
  const [arrived, setArrived] = useState(false);

  const workerX = useRef(new Animated.Value(ROUTE[0].x)).current;
  const workerY = useRef(new Animated.Value(ROUTE[0].y)).current;

  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(pulse, { toValue: 1, duration: 1400, easing: Easing.out(Easing.ease), useNativeDriver: true })
    ).start();
  }, []);

  // Advance worker along route every 2.5 seconds (demo speed)
  useEffect(() => {
    if (stepIndex >= ROUTE.length - 1) {
      setArrived(true);
      return;
    }
    const next = ROUTE[stepIndex + 1];
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(workerX, { toValue: next.x, duration: 2200, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(workerY, { toValue: next.y, duration: 2200, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]).start(() => setStepIndex((s) => s + 1));
    }, 2500);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  const stepsLeft = ROUTE.length - 1 - stepIndex;
  const eta = Math.round((stepsLeft / (ROUTE.length - 1)) * 12);
  const distKm = ((stepsLeft) * 0.28).toFixed(1);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeTxt}>✕</Text>
        </Pressable>
        <Text style={styles.topTitle}>Active Job</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Status card */}
      <View style={styles.statusCard}>
        {arrived ? (
          <>
            <View style={styles.liveRow}>
              <View style={[styles.liveDotOuter, { backgroundColor: colors.success + '33' }]}>
                <View style={[styles.liveDot, { backgroundColor: colors.success }]} />
              </View>
              <Text style={[styles.liveLabel, { color: colors.success }]}>
                {worker.name.split(' ')[0].toUpperCase()} HAS ARRIVED
              </Text>
            </View>
            <Text style={styles.etaText}>Worker is at your door 🎉</Text>
            <Text style={styles.distText}>📍 0.0 km · Right outside</Text>
          </>
        ) : (
          <>
            <View style={styles.liveRow}>
              <View style={styles.liveDotOuter}><View style={styles.liveDot} /></View>
              <Text style={styles.liveLabel}>{worker.name.split(' ')[0].toUpperCase()} IS ON THE WAY</Text>
            </View>
            <Text style={styles.etaText}>Arriving in {eta} min{eta !== 1 ? 's' : ''}</Text>
            <Text style={styles.distText}>📍 {distKm} km from your location</Text>
          </>
        )}
      </View>

      {/* Animated map */}
      <AnimatedMap workerX={workerX} workerY={workerY} pulse={pulse} />

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

      {/* Review CTA */}
      <Pressable
        style={[styles.helpBtn, { marginBottom: insets.bottom + 12 }]}
        onPress={() => router.push({ pathname: '/rating', params: { workerId } })}
      >
        <Text style={styles.helpText}>
          {arrived ? '✓ Job complete? Leave a review →' : 'Job complete? Leave a review →'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: spacing.lg,
  },
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
  mapOuter: {
    height: MAP_H, marginHorizontal: spacing.lg, marginTop: spacing.md,
    backgroundColor: '#181D0E', borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border, overflow: 'hidden',
    position: 'relative', width: MAP_W,
  },
  hStreet: { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: '#2E341C' },
  vStreet: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: '#2E341C' },
  block: { position: 'absolute', backgroundColor: '#1E2410', borderRadius: 2 },
  routeLine: {
    position: 'absolute', height: 2.5,
    backgroundColor: colors.primary,
    opacity: 0.5,
  },
  pulseRing: {
    position: 'absolute', width: 36, height: 36, borderRadius: 18,
    borderWidth: 2.5, borderColor: colors.primary,
  },
  workerMarker: { position: 'absolute', width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  pin: { position: 'absolute', alignItems: 'center' },
  pinBubble: {
    backgroundColor: colors.bgCard, borderRadius: 8, padding: 4,
    borderWidth: 1.5, borderColor: colors.primary,
  },
  pinTail: { width: 2, height: 6, backgroundColor: colors.primary },
  mapLabel: {
    position: 'absolute', bottom: 6, right: 8,
    backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4,
  },
  mapLabelText: { fontSize: 8, color: colors.textMuted, letterSpacing: 0.5 },
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
