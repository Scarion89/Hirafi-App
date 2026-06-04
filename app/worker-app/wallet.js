import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';

const TABS = ['Today', 'This week', 'This month'];
const EARNINGS = [
  { id: 'e1', service: 'Pipe leak repair', customer: 'Ahmed M.', time: '2:30 PM', amount: 265 },
  { id: 'e2', service: 'AC maintenance', customer: 'Layla K.', time: '10:00 AM', amount: 380 },
  { id: 'e3', service: 'Faucet replacement', customer: 'Sara O.', time: '9:00 AM', amount: 190 },
];

export default function Wallet() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('Today');

  const total = EARNINGS.reduce((s, e) => s + e.amount, 0);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      {/* Balance card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>AVAILABLE BALANCE · الرصيد المتاح</Text>
        <Text style={styles.balanceAmount}>{total} <Text style={styles.balanceCurrency}>EGP</Text></Text>
        <Text style={styles.balanceSub}>Pending: 120 EGP · قيد التحصيل</Text>
        <Pressable style={styles.cashOutBtn}>
          <Text style={styles.cashOutText}>Cash out → تحويل</Text>
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabsBar}>
        {TABS.map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={[styles.tabBtn, tab === t && styles.tabBtnActive]}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Summary */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryVal}>{EARNINGS.length}</Text>
            <Text style={styles.summaryLabel}>Jobs</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryVal}>{total}</Text>
            <Text style={styles.summaryLabel}>EGP earned</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryVal}>⭐ 4.9</Text>
            <Text style={styles.summaryLabel}>Avg rating</Text>
          </View>
        </View>

        {/* Earnings list */}
        <Text style={styles.listTitle}>TRANSACTIONS · المعاملات</Text>
        {EARNINGS.map((e) => (
          <View key={e.id} style={styles.earningRow}>
            <View style={styles.earningIcon}>
              <Text style={styles.earningIconText}>🔧</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.earningService}>{e.service}</Text>
              <Text style={styles.earningCustomer}>{e.customer} · {e.time}</Text>
            </View>
            <Text style={styles.earningAmount}>+{e.amount} EGP</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark },

  balanceCard: {
    backgroundColor: colors.darkCard, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
    padding: spacing.xl, alignItems: 'center',
  },
  balanceLabel: { fontSize: 10, fontWeight: '700', color: colors.textLightMuted, letterSpacing: 1.2, marginBottom: 8 },
  balanceAmount: { fontSize: 52, fontWeight: '900', color: colors.primary },
  balanceCurrency: { fontSize: 22, fontWeight: '700' },
  balanceSub: { fontSize: 12, color: colors.textLightMuted, marginTop: 4, marginBottom: spacing.lg },
  cashOutBtn: {
    backgroundColor: colors.primary, borderRadius: radius.lg,
    paddingHorizontal: spacing.xxl, paddingVertical: 12,
  },
  cashOutText: { fontSize: 15, fontWeight: '900', color: '#000' },

  tabsBar: {
    flexDirection: 'row', paddingHorizontal: spacing.lg, gap: 8,
    paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  tabBtn: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  tabBtnActive: { backgroundColor: colors.primaryMuted, borderColor: colors.primary },
  tabText: { fontSize: 13, fontWeight: '600', color: colors.textLightMuted },
  tabTextActive: { color: colors.primary, fontWeight: '700' },

  content: { padding: spacing.lg, paddingBottom: 40 },
  summaryRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  summaryCard: {
    flex: 1, backgroundColor: colors.darkCard, borderRadius: radius.lg,
    padding: spacing.sm, alignItems: 'center', borderWidth: 1, borderColor: colors.borderLight,
  },
  summaryVal: { fontSize: 18, fontWeight: '900', color: colors.primary },
  summaryLabel: { fontSize: 10, color: colors.textLightMuted, marginTop: 2 },

  listTitle: { fontSize: 10, fontWeight: '700', color: colors.textLightMuted, letterSpacing: 1.2, marginBottom: spacing.md },
  earningRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.darkCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.borderLight, marginBottom: spacing.sm,
  },
  earningIcon: {
    width: 40, height: 40, borderRadius: 10, backgroundColor: colors.darkMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  earningIconText: { fontSize: 18 },
  earningService: { fontSize: 14, fontWeight: '700', color: colors.textLight },
  earningCustomer: { fontSize: 11, color: colors.textLightMuted, marginTop: 2 },
  earningAmount: { fontSize: 16, fontWeight: '900', color: colors.primary },
});
