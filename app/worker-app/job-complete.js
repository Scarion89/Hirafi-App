import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

const GOAL_TARGET = 1000;
const GOAL_EARNED = 980;

export default function JobComplete() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const progress = Math.min(1, GOAL_EARNED / GOAL_TARGET);

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      {/* Check hero */}
      <View style={styles.hero}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkEmoji}>✓</Text>
        </View>
        <Text style={styles.heroTitle}>Job Complete!</Text>
        <Text style={styles.heroSub}>Great work, Hassan</Text>
      </View>

      {/* Earned card */}
      <View style={styles.earnedCard}>
        <Text style={styles.earnedLabel}>YOU EARNED</Text>
        <Text style={styles.earnedAmount}>315 EGP</Text>
        <Text style={styles.earnedSub}>Cash · Faucet replacement</Text>
      </View>

      {/* Customer rating */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CUSTOMER RATING</Text>
        <View style={styles.ratingCard}>
          <View style={styles.ratingLeft}>
            <View style={styles.custAvatar}>
              <Text style={styles.custInitials}>SM</Text>
            </View>
            <View>
              <Text style={styles.custName}>Sara Mostafa</Text>
              <Text style={styles.custAddr}>Rehab, Phase 2</Text>
            </View>
          </View>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Text key={n} style={[styles.star, n <= 5 && styles.starActive]}>★</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Daily goal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DAILY GOAL</Text>
        <View style={styles.goalCard}>
          <View style={styles.goalRow}>
            <Text style={styles.goalLabel}>{GOAL_EARNED} EGP earned</Text>
            <Text style={styles.goalTarget}>Goal: {GOAL_TARGET} EGP</Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.goalSub}>{GOAL_TARGET - GOAL_EARNED} EGP to reach your daily goal</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable style={styles.dashBtn} onPress={() => router.replace('/worker-app')}>
          <Text style={styles.dashTxt}>Dashboard</Text>
        </Pressable>
        <Pressable style={styles.nextBtn} onPress={() => router.replace('/worker-app')}>
          <Text style={styles.nextTxt}>Next Job →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: spacing.lg },
  hero: { alignItems: 'center', paddingVertical: spacing.xl },
  checkCircle: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: colors.success + '22', borderWidth: 3, borderColor: colors.success,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  checkEmoji: { fontSize: 48, color: colors.success, fontWeight: '900' },
  heroTitle: { fontSize: 32, fontWeight: '900', color: colors.text },
  heroSub: { fontSize: 16, color: colors.textMuted, marginTop: 6 },
  earnedCard: {
    backgroundColor: colors.primary, borderRadius: radius.xl, padding: spacing.xl,
    alignItems: 'center', marginBottom: spacing.lg,
  },
  earnedLabel: { fontSize: 10, fontWeight: '700', color: '#000', letterSpacing: 1.2, opacity: 0.7 },
  earnedAmount: { fontSize: 52, fontWeight: '900', color: '#000', marginTop: 4 },
  earnedSub: { fontSize: 13, color: '#000', opacity: 0.6, marginTop: 4 },
  section: { marginBottom: spacing.md },
  sectionTitle: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.sm },
  ratingCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  ratingLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  custAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center',
  },
  custInitials: { fontSize: 13, fontWeight: '800', color: colors.text },
  custName: { fontSize: 14, fontWeight: '700', color: colors.text },
  custAddr: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  starsRow: { flexDirection: 'row', gap: 2 },
  star: { fontSize: 22, color: colors.border },
  starActive: { color: colors.primary },
  goalCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  goalLabel: { fontSize: 14, fontWeight: '700', color: colors.text },
  goalTarget: { fontSize: 12, color: colors.textMuted },
  progressBg: { height: 8, backgroundColor: colors.bgMuted, borderRadius: 4, marginBottom: 8 },
  progressFill: { height: 8, backgroundColor: colors.primary, borderRadius: 4 },
  goalSub: { fontSize: 12, color: colors.textMuted },
  actions: { flexDirection: 'row', gap: spacing.md, marginTop: 'auto' },
  dashBtn: {
    flex: 1, height: 56, backgroundColor: colors.bgCard,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  dashTxt: { fontSize: 15, fontWeight: '700', color: colors.textMuted },
  nextBtn: {
    flex: 2, height: 56, backgroundColor: colors.primary,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
  },
  nextTxt: { fontSize: 15, fontWeight: '800', color: '#000' },
});
