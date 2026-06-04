import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';

export default function RequestPayment() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const labor = 220;
  const parts = 45;
  const fee = 15;
  const total = labor + parts + fee;
  const payout = labor + parts - fee;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.topTitle}>Request payment · طلب الدفع</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Customer */}
        <View style={styles.customerRow}>
          <View style={styles.customerAvatar}>
            <Text style={styles.customerInitials}>AM</Text>
          </View>
          <View>
            <Text style={styles.customerName}>Ahmed Mahmoud</Text>
            <Text style={styles.customerSub}>Payment request will be sent to customer</Text>
          </View>
        </View>

        {/* Line items */}
        <View style={styles.receiptCard}>
          <Text style={styles.sectionLabel}>ITEMS · العناصر</Text>

          <View style={styles.lineRow}>
            <View>
              <Text style={styles.lineName}>Labor · أجرة</Text>
              <Text style={styles.lineSub}>1 hr 40 min</Text>
            </View>
            <Text style={styles.lineVal}>{labor} EGP</Text>
          </View>

          <View style={styles.lineRow}>
            <View>
              <Text style={styles.lineName}>Replacement pipe · بايب</Text>
              <Text style={styles.lineSub}>1 unit</Text>
            </View>
            <Text style={styles.lineVal}>{parts} EGP</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.lineRow}>
            <Text style={styles.subtotalLabel}>Customer total</Text>
            <Text style={styles.subtotalVal}>{total} EGP</Text>
          </View>
        </View>

        {/* Payout breakdown */}
        <View style={styles.payoutCard}>
          <Text style={styles.sectionLabel}>YOUR PAYOUT · مكسبك</Text>
          <View style={styles.lineRow}>
            <Text style={styles.lineName}>Revenue</Text>
            <Text style={styles.lineVal}>{labor + parts} EGP</Text>
          </View>
          <View style={styles.lineRow}>
            <Text style={styles.lineName}>hirafi fee (10%)</Text>
            <Text style={[styles.lineVal, { color: colors.danger }]}>-{fee} EGP</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.lineRow}>
            <Text style={styles.payoutLabel}>You receive · هتاخد</Text>
            <Text style={styles.payoutVal}>{payout} EGP</Text>
          </View>
        </View>

        {/* Payment method */}
        <View style={styles.methodCard}>
          <Text style={styles.sectionLabel}>PAYMENT METHOD · طريقة الدفع</Text>
          <View style={styles.methodRow}>
            <Text style={styles.methodIcon}>💵</Text>
            <Text style={styles.methodLabel}>Cash · كاش</Text>
            <Text style={styles.methodSub}>Collect from customer</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={styles.sendBtn}
          onPress={() => router.push('/worker-app/job-complete')}
        >
          <Text style={styles.sendText}>Send payment request → {total} EGP</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 22, color: colors.text, fontWeight: '300' },
  topTitle: { fontSize: 17, fontWeight: '800', color: colors.text },

  content: { padding: spacing.lg, paddingBottom: 120 },

  customerRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  customerAvatar: {
    width: 44, height: 44, borderRadius: 10, backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
  },
  customerInitials: { fontSize: 14, fontWeight: '900', color: colors.primary },
  customerName: { fontSize: 15, fontWeight: '700', color: colors.text },
  customerSub: { fontSize: 11, color: colors.textMuted, marginTop: 2 },

  receiptCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.xl,
    padding: spacing.lg, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  payoutCard: {
    backgroundColor: colors.successBg, borderRadius: radius.xl,
    padding: spacing.lg, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.success,
  },
  methodCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.md },
  lineRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  lineName: { fontSize: 14, fontWeight: '600', color: colors.text },
  lineSub: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  lineVal: { fontSize: 14, fontWeight: '700', color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  subtotalLabel: { fontSize: 14, fontWeight: '700', color: colors.text },
  subtotalVal: { fontSize: 16, fontWeight: '800', color: colors.text },
  payoutLabel: { fontSize: 15, fontWeight: '800', color: colors.success },
  payoutVal: { fontSize: 20, fontWeight: '900', color: colors.success },
  methodRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  methodIcon: { fontSize: 22 },
  methodLabel: { fontSize: 15, fontWeight: '700', color: colors.text, flex: 1 },
  methodSub: { fontSize: 12, color: colors.textMuted },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg, paddingTop: 14,
    backgroundColor: colors.bgCard, borderTopWidth: 1, borderTopColor: colors.border,
    ...shadow.card,
  },
  sendBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  sendText: { fontSize: 15, fontWeight: '900', color: '#000' },
});
