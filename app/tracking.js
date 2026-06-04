import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Pressable, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';
import { getWorker } from '../data/services';

const ROUTE = [
  { x: 32,  y: 210 }, { x: 68,  y: 188 }, { x: 104, y: 168 },
  { x: 140, y: 148 }, { x: 176, y: 126 }, { x: 212, y: 106 },
  { x: 248, y: 86  }, { x: 284, y: 66  }, { x: 310, y: 52  },
];

// City blocks — warm cream map like the design reference
const BLOCKS = [
  { x: 20,  y: 20,  w: 58, h: 38, color: '#C8BCA8' },
  { x: 94,  y: 20,  w: 72, h: 28, color: '#D4C8B0' },
  { x: 182, y: 20,  w: 50, h: 44, color: '#C4B8A4' },
  { x: 248, y: 20,  w: 80, h: 32, color: '#CEC2AA' },
  { x: 20,  y: 74,  w: 40, h: 52, color: '#D0C4AC' },
  { x: 76,  y: 72,  w: 64, h: 36, color: '#C8BCA8' },
  { x: 156, y: 68,  w: 44, h: 48, color: '#CCB8A0' }, // amber block accent
  { x: 216, y: 58,  w: 58, h: 36, color: '#C4B8A4' },
  { x: 20,  y: 140, w: 54, h: 44, color: '#D4C8B0' },
  { x: 90,  y: 124, w: 36, h: 56, color: '#C8BCA8' },
  { x: 142, y: 130, w: 60, h: 40, color: '#CEC2AA' },
  { x: 218, y: 108, w: 50, h: 50, color: '#C4B8A4' },
  { x: 284, y: 100, w: 48, h: 44, color: '#CCB8A0' },
  { x: 20,  y: 198, w: 68, h: 36, color: '#D0C4AC' },
  { x: 104, y: 186, w: 52, h: 48, color: '#C8BCA8' },
  { x: 172, y: 184, w: 44, h: 50, color: '#D4C8B0' },
  { x: 232, y: 162, w: 60, h: 40, color: '#C4B8A4' },
  { x: 20,  y: 248, w: 330, h: 20, color: '#BCAE98' },
];

const STEPS = ['Booked', 'En route', 'Working', 'Done'];
const AVATAR_COLORS = ['#3D2E10', '#1A2E1A', '#1A1A2E', '#2E1A2E'];

function CityMap({ workerX, workerY, pulse, arrived }) {
  return (
    <View style={styles.mapContainer} pointerEvents="box-none">
      {/* Cream background — decorative, no touch */}
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {BLOCKS.map((b, i) => (
          <View key={i} style={[styles.block, { left: b.x, top: b.y, width: b.w, height: b.h, backgroundColor: b.color }]} />
        ))}

        {/* Route dashed line */}
        {ROUTE.slice(0, -1).map((p, i) => {
          const next = ROUTE[i + 1];
          const dx = next.x - p.x; const dy = next.y - p.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          return (
            <View key={`l${i}`} style={[styles.routeLine, {
              left: p.x, top: p.y - 1.5, width: len,
              transform: [{ rotate: `${angle}deg` }],
            }]} />
          );
        })}

        {/* Home destination pin */}
        <View style={[styles.destPin, { left: ROUTE[ROUTE.length - 1].x - 16, top: ROUTE[ROUTE.length - 1].y - 36 }]}>
          <View style={styles.destBubble}><Text style={{ fontSize: 14 }}>🏠</Text></View>
          <View style={styles.destTail} />
        </View>

        {/* Pulse ring */}
        <Animated.View style={[styles.pulseRing, {
          left: Animated.subtract(workerX, 20),
          top: Animated.subtract(workerY, 20),
          opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.8, 0] }),
          transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.3, 2.4] }) }],
        }]} />

        {/* Worker marker */}
        <Animated.View style={[styles.workerMarker, {
          transform: [
            { translateX: Animated.subtract(workerX, 18) },
            { translateY: Animated.subtract(workerY, 18) },
          ],
        }]}>
          <View style={styles.workerBubble}>
            <Text style={styles.workerBubbleText}>YA</Text>
          </View>
        </Animated.View>
      </View>

      {/* Map controls — interactive */}
      <View style={styles.mapControls}>
        <Pressable style={styles.mapControlBtn}><Text style={styles.mapControlText}>+</Text></Pressable>
        <Pressable style={styles.mapControlBtn}><Text style={styles.mapControlText}>−</Text></Pressable>
      </View>
    </View>
  );
}

export default function Tracking() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { workerId = 'w1' } = useLocalSearchParams();
  const worker = getWorker(workerId) || { name: 'Youssef Amrani', initials: 'YA', rating: 4.9, title: 'Master Electrician' };

  const [stepIndex, setStepIndex] = useState(0);
  const [arrived, setArrived] = useState(false);

  const workerX = useRef(new Animated.Value(ROUTE[0].x)).current;
  const workerY = useRef(new Animated.Value(ROUTE[0].y)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(pulse, { toValue: 1, duration: 1600, easing: Easing.out(Easing.ease), useNativeDriver: true })
    ).start();
  }, []);

  useEffect(() => {
    if (stepIndex >= ROUTE.length - 1) { setArrived(true); return; }
    const timer = setTimeout(() => {
      const next = ROUTE[stepIndex + 1];
      Animated.parallel([
        Animated.timing(workerX, { toValue: next.x, duration: 2000, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(workerY, { toValue: next.y, duration: 2000, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]).start(() => setStepIndex((s) => s + 1));
    }, 2400);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  const stepsLeft = ROUTE.length - 1 - stepIndex;
  const eta = Math.round((stepsLeft / (ROUTE.length - 1)) * 12);
  const progressStep = arrived ? 2 : stepIndex > 4 ? 1 : 1;

  const initials = worker.initials || worker.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const avatarBg = AVATAR_COLORS[0];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Map fills top portion */}
      <CityMap workerX={workerX} workerY={workerY} pulse={pulse} arrived={arrived} />

      {/* Bottom sheet */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        {/* Status + ETA */}
        <View style={styles.statusRow}>
          <View style={styles.liveRow}>
            <View style={styles.liveDot} />
            <Text style={styles.statusText}>
              {arrived ? `${initials} has arrived!` : `Your hirafi is on the way`}
            </Text>
          </View>
          {!arrived && (
            <View style={styles.etaBadge}>
              <Text style={styles.etaText}>{eta} min</Text>
            </View>
          )}
        </View>

        {/* Progress stepper */}
        <View style={styles.stepper}>
          {STEPS.map((label, i) => {
            const done = i <= progressStep;
            const active = i === progressStep;
            return (
              <React.Fragment key={label}>
                <View style={styles.stepItem}>
                  <View style={[styles.stepDot, done && styles.stepDotDone, active && styles.stepDotActive]}>
                    {done && <Text style={styles.stepCheck}>✓</Text>}
                  </View>
                  <Text style={[styles.stepLabel, done && styles.stepLabelDone]}>{label}</Text>
                </View>
                {i < STEPS.length - 1 && (
                  <View style={[styles.stepLine, i < progressStep && styles.stepLineDone]} />
                )}
              </React.Fragment>
            );
          })}
        </View>

        {/* Worker row */}
        <View style={styles.workerRow}>
          <View style={[styles.workerAvatar, { backgroundColor: avatarBg }]}>
            <Text style={styles.workerInitials}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.workerName}>{worker.name}</Text>
            <Text style={styles.workerTitle}>{worker.title} · ⭐ {worker.rating}</Text>
          </View>
          <Pressable style={styles.actionBtn}><Text style={styles.actionEmoji}>📞</Text></Pressable>
          <Pressable style={styles.actionBtn}><Text style={styles.actionEmoji}>💬</Text></Pressable>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <Pressable style={styles.shareBtn} onPress={() => {}}>
            <Text style={styles.shareTxt}>Share trip</Text>
          </Pressable>
          <Pressable
            style={styles.reviewBtn}
            onPress={() => router.push({ pathname: '/rating', params: { workerId } })}
          >
            <Text style={styles.reviewTxt}>{arrived ? 'Leave a review →' : 'Job complete?'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const MAP_H = 270;
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#E8DFC8' },

  mapContainer: {
    height: MAP_H, overflow: 'hidden', position: 'relative',
    backgroundColor: '#E8DFC8',
  },
  block: { position: 'absolute', borderRadius: 4 },
  routeLine: { position: 'absolute', height: 3, backgroundColor: colors.primary, opacity: 0.7, borderRadius: 2 },
  destPin: { position: 'absolute', alignItems: 'center' },
  destBubble: {
    backgroundColor: '#fff', borderRadius: 10, padding: 5,
    borderWidth: 2, borderColor: colors.primary,
    ...{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  },
  destTail: { width: 2, height: 8, backgroundColor: colors.primary },
  pulseRing: {
    position: 'absolute', width: 40, height: 40, borderRadius: 20,
    borderWidth: 2.5, borderColor: colors.primary,
  },
  workerMarker: { position: 'absolute' },
  workerBubble: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2.5, borderColor: '#fff',
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.35, shadowRadius: 6, elevation: 8,
  },
  workerBubbleText: { fontSize: 12, fontWeight: '900', color: '#000' },
  mapControls: {
    position: 'absolute', right: 12, top: 12,
    backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 10,
    overflow: 'hidden', borderWidth: 1, borderColor: '#D4C8B0',
  },
  mapControlBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#D4C8B0' },
  mapControlText: { fontSize: 20, color: '#555', fontWeight: '400' },

  sheet: {
    flex: 1, backgroundColor: colors.bg,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg, paddingTop: spacing.lg,
    marginTop: -20,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 16,
  },

  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  statusText: { fontSize: 15, fontWeight: '700', color: colors.text },
  etaBadge: {
    backgroundColor: colors.primaryMuted, borderRadius: radius.pill,
    paddingHorizontal: 12, paddingVertical: 4,
  },
  etaText: { fontSize: 13, fontWeight: '800', color: colors.primary },

  stepper: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  stepItem: { alignItems: 'center', gap: 4 },
  stepDot: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: colors.border, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  stepDotDone: { backgroundColor: colors.primary, borderColor: colors.primary },
  stepDotActive: { borderColor: colors.primary },
  stepCheck: { fontSize: 11, fontWeight: '900', color: '#000' },
  stepLabel: { fontSize: 9, fontWeight: '600', color: colors.textMuted },
  stepLabelDone: { color: colors.primary },
  stepLine: { flex: 1, height: 2, backgroundColor: colors.border, marginBottom: 14 },
  stepLineDone: { backgroundColor: colors.primary },

  workerRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md,
  },
  workerAvatar: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  workerInitials: { fontSize: 14, fontWeight: '900', color: colors.text },
  workerName: { fontSize: 14, fontWeight: '800', color: colors.text },
  workerTitle: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  actionBtn: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  actionEmoji: { fontSize: 16 },

  btnRow: { flexDirection: 'row', gap: spacing.md },
  shareBtn: {
    flex: 1, height: 48, backgroundColor: colors.bgCard,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  shareTxt: { fontSize: 14, fontWeight: '700', color: colors.textSub },
  reviewBtn: {
    flex: 1, height: 48, backgroundColor: colors.primary,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
  },
  reviewTxt: { fontSize: 14, fontWeight: '800', color: '#000' },
});
