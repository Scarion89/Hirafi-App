import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

const ADD_OPTIONS = [
  { emoji: '💳', label: 'Credit / Debit card' },
  { emoji: '📱', label: 'Instapay' },
  { emoji: '🏦', label: 'Fawry' },
];

export default function PaymentMethods() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Payment Methods</Text>
        <View style={styles.topBarEnd} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Section: current method */}
        <Text style={styles.sectionLabel}>CURRENT METHOD</Text>
        <View style={styles.currentCard}>
          <View style={styles.currentLeft}>
            <View style={styles.methodIconBg}>
              <Text style={styles.methodEmoji}>💵</Text>
            </View>
            <View>
              <Text style={styles.methodName}>Cash to worker</Text>
              <Text style={styles.methodSub}>Pay when the job is done</Text>
            </View>
          </View>
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultBadgeText}>DEFAULT</Text>
          </View>
        </View>

        {/* Section: add new */}
        <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>ADD PAYMENT METHOD</Text>
        <View style={styles.addCard}>
          {ADD_OPTIONS.map((opt, idx) => (
            <View key={opt.label}>
              <Pressable
                style={({ pressed }) => [styles.addRow, pressed && { opacity: 0.6 }]}
              >
                <View style={styles.addIconBg}>
                  <Text style={styles.addEmoji}>{opt.emoji}</Text>
                </View>
                <Text style={styles.addLabel}>{opt.label}</Text>
                <View style={styles.comingSoonChip}>
                  <Text style={styles.comingSoonText}>Coming soon</Text>
                </View>
              </Pressable>
              {idx < ADD_OPTIONS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Bottom note */}
        <View style={styles.noteCard}>
          <Text style={styles.noteEmoji}>🛡️</Text>
          <Text style={styles.noteText}>All transactions are secured by hirafi guarantee</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center', height: 54,
    paddingHorizontal: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 32, color: colors.text, lineHeight: 36 },
  screenTitle: { flex: 1, fontSize: 17, fontWeight: '800', color: colors.text, textAlign: 'center' },
  topBarEnd: { width: 40 },

  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },

  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: colors.textMuted,
    letterSpacing: 1, marginBottom: spacing.sm,
  },
  currentCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.primary,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  currentLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  methodIconBg: {
    width: 44, height: 44, borderRadius: radius.md,
    backgroundColor: colors.primaryMuted, alignItems: 'center', justifyContent: 'center',
  },
  methodEmoji: { fontSize: 22 },
  methodName: { fontSize: 15, fontWeight: '700', color: colors.text },
  methodSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  defaultBadge: {
    backgroundColor: colors.primaryMuted, borderRadius: radius.pill,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: colors.primary,
  },
  defaultBadgeText: { fontSize: 10, fontWeight: '800', color: colors.primary, letterSpacing: 0.8 },

  addCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border, overflow: 'hidden',
  },
  addRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
  },
  addIconBg: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center',
  },
  addEmoji: { fontSize: 20 },
  addLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text },
  comingSoonChip: {
    backgroundColor: colors.bgMuted, borderRadius: radius.pill,
    paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: colors.border,
  },
  comingSoonText: { fontSize: 10, fontWeight: '600', color: colors.textMuted },
  divider: { height: 1, backgroundColor: colors.border, marginLeft: 64 },

  noteCard: {
    marginTop: spacing.xl, backgroundColor: colors.bgCard,
    borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  noteEmoji: { fontSize: 20 },
  noteText: { flex: 1, fontSize: 13, color: colors.textMuted, lineHeight: 19 },
});
