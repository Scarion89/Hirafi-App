import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../constants/theme';

const TIPS = [10, 20, 50];

export default function Complete() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { workerId = 'w1' } = useLocalSearchParams();
  const [tip, setTip] = useState(0);

  const labor = 220;
  const parts = 45;
  const fee = 15;
  const total = labor + parts + fee + tip;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
          <Text style={styles.headerTitle}>Job complete</Text>
          <Text style={styles.headerTitleAr}>الشغلانة خلصت</Text>
        </View>

        {/* Worker row */}
        <View style={styles.workerRow}>
          <View style={styles.workerAvatar}>
            <Text style={styles.workerInitials}>YN</Text>
          </View>
          <View>
            <Text style={styles.workerName}>Youssef Nabil finished the job</Text>
            <Text style={styles.workerSub}>يوسف نبيل أنهى الشغلانة ✓</Text>
          </View>
        </View>

        {/* Receipt */}
        <View style={styles.receiptCard}>
          <Text style={styles.receiptTitle}>RECEIPT · الفاتورة</Text>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Labor · أجرة</Text>
            <Text style={styles.receiptVal}>{labor} EGP</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Parts · قطع غيار</Text>
            <Text style={styles.receiptVal}>{parts} EGP</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>hirafi fee · رسوم حرفي</Text>
            <Text style={styles.receiptVal}>{fee} EGP</Text>
          </View>
          {tip > 0 && (
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Tip · إكرامية 🎁</Text>
              <Text style={styles.receiptVal}>{tip} EGP</Text>
            </View>
          )}
          <View style={styles.divider} />
          <View style={styles.receiptRow}>
            <Text style={styles.totalLabel}>TOTAL · الإجمالي</Text>
            <Text style={styles.totalVal}>{total} EGP</Text>
          </View>
        </View>

        {/* Tip row */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Leave a tip? · إكرامية؟</Text>
          <View style={styles.tipRow}>
            {TIPS.map((t) => (
              <Pressable
                key={t}
                onPress={() => setTip(tip === t ? 0 : t)}
                style={[styles.tipBtn, tip === t && styles.tipBtnActive]}
              >
                <Text style={[styles.tipText, tip === t && styles.tipTextActive]}>EGP {t}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Payment method */}
        <View style={styles.paymentRow}>
          <Text style={styles.paymentIcon}>💵</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.paymentLabel}>Cash on delivery · كاش</Text>
            <Text style={styles.paymentSub}>Pay Youssef directly</Text>
          </View>
          <Text style={styles.changeText}>Change</Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={styles.payBtn}
          onPress={() => router.push({ pathname: '/rating', params: { workerId } })}
        >
          <Text style={styles.payBtnText}>Pay & rate → {total} EGP</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },

  header: { alignItems: 'center', marginBottom: spacing.xl, marginTop: spacing.lg },
  checkCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: colors.successBg, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.success, marginBottom: spacing.md,
  },
  checkIcon: { fontSize: 32, color: colors.success },
  headerTitle: { fontSize: 28, fontWeight: '900', color: colors.text },
  headerTitleAr: { fontSize: 14, color: colors.textMuted, marginTop: 4 },

  workerRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  workerAvatar: {
    width: 48, height: 48, borderRadius: 12, backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
  },
  workerInitials: { fontSize: 16, fontWeight: '900', color: colors.primary },
  workerName: { fontSize: 14, fontWeight: '700', color: colors.text },
  workerSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },

  receiptCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.xl,
    padding: spacing.lg, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  receiptTitle: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.md },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  receiptLabel: { fontSize: 14, color: colors.textSub },
  receiptVal: { fontSize: 14, fontWeight: '600', color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  totalLabel: { fontSize: 15, fontWeight: '800', color: colors.text },
  totalVal: { fontSize: 20, fontWeight: '900', color: colors.primary },

  tipCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  tipTitle: { fontSize: 13, fontWeight: '700', color: colors.textSub, marginBottom: spacing.sm },
  tipRow: { flexDirection: 'row', gap: 8 },
  tipBtn: {
    flex: 1, height: 44, borderRadius: radius.md,
    backgroundColor: colors.bgCardAlt, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: colors.border,
  },
  tipBtnActive: { backgroundColor: colors.primaryMuted, borderColor: colors.primary },
  tipText: { fontSize: 14, fontWeight: '700', color: colors.textSub },
  tipTextActive: { color: colors.copper },

  paymentRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  paymentIcon: { fontSize: 24 },
  paymentLabel: { fontSize: 14, fontWeight: '700', color: colors.text },
  paymentSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  changeText: { fontSize: 13, fontWeight: '700', color: colors.copper },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg, paddingTop: 14,
    backgroundColor: colors.bgCard, borderTopWidth: 1, borderTopColor: colors.border,
    ...shadow.card,
  },
  payBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  payBtnText: { fontSize: 16, fontWeight: '900', color: '#000' },
});
