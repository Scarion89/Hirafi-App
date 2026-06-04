import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../constants/theme';

export default function Receipt() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.topTitle}>Receipt · إيصال</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Booking ID */}
        <View style={styles.bookingIdCard}>
          <Text style={styles.bookingId}>Booking #HF-2847</Text>
          <Text style={styles.bookingDate}>Wednesday, 28 May 2025 · 2:30 PM</Text>
          <View style={styles.paidBadge}>
            <Text style={styles.paidText}>✓ PAID</Text>
          </View>
        </View>

        {/* Worker */}
        <View style={styles.workerCard}>
          <View style={styles.workerAvatar}>
            <Text style={styles.workerInitials}>YN</Text>
          </View>
          <View>
            <Text style={styles.workerName}>Youssef Nabil</Text>
            <Text style={styles.workerTitle}>Master Plumber · سباك ماهر</Text>
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ 4.9</Text>
          </View>
        </View>

        {/* Line items */}
        <View style={styles.receiptCard}>
          <Text style={styles.sectionLabel}>SERVICE BREAKDOWN</Text>

          <View style={styles.lineRow}>
            <View>
              <Text style={styles.lineDesc}>Pipe leak repair · إصلاح تسريب</Text>
              <Text style={styles.lineSub}>Labor · 1.5 hrs</Text>
            </View>
            <Text style={styles.lineVal}>220 EGP</Text>
          </View>

          <View style={styles.lineRow}>
            <View>
              <Text style={styles.lineDesc}>Replacement pipe · بايب</Text>
              <Text style={styles.lineSub}>Parts · 1 unit</Text>
            </View>
            <Text style={styles.lineVal}>45 EGP</Text>
          </View>

          <View style={styles.lineRow}>
            <View>
              <Text style={styles.lineDesc}>hirafi service fee</Text>
              <Text style={styles.lineSub}>Platform fee</Text>
            </View>
            <Text style={styles.lineVal}>15 EGP</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.lineRow}>
            <Text style={styles.totalLabel}>TOTAL · الإجمالي</Text>
            <Text style={styles.totalVal}>280 EGP</Text>
          </View>

          <View style={styles.lineRow}>
            <Text style={styles.payMethodLabel}>Payment method</Text>
            <Text style={styles.payMethodVal}>💵 Cash</Text>
          </View>
        </View>

        {/* Actions */}
        <Pressable style={styles.downloadBtn}>
          <Text style={styles.downloadIcon}>⬇️</Text>
          <Text style={styles.downloadText}>Download PDF · تحميل الفاتورة</Text>
        </Pressable>

        <Pressable style={styles.homeLink} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.homeLinkText}>← Back to home · الرئيسية</Text>
        </Pressable>
      </ScrollView>
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

  content: { padding: spacing.lg, paddingBottom: 40 },

  bookingIdCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.xl,
    padding: spacing.lg, marginBottom: spacing.md,
    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  bookingId: { fontSize: 20, fontWeight: '900', color: colors.text },
  bookingDate: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  paidBadge: {
    marginTop: spacing.sm, backgroundColor: colors.successBg,
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.success,
  },
  paidText: { fontSize: 12, fontWeight: '800', color: colors.success },

  workerCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  workerAvatar: {
    width: 44, height: 44, borderRadius: 10, backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
  },
  workerInitials: { fontSize: 14, fontWeight: '900', color: colors.primary },
  workerName: { fontSize: 15, fontWeight: '700', color: colors.text },
  workerTitle: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  ratingBadge: {
    backgroundColor: colors.primaryMuted, paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: radius.pill, borderWidth: 1, borderColor: colors.primary,
  },
  ratingText: { fontSize: 12, fontWeight: '700', color: colors.copper },

  receiptCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.xl,
    padding: spacing.lg, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    ...shadow.card,
  },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.md },
  lineRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  lineDesc: { fontSize: 14, fontWeight: '600', color: colors.text },
  lineSub: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  lineVal: { fontSize: 14, fontWeight: '700', color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 10 },
  totalLabel: { fontSize: 15, fontWeight: '800', color: colors.text },
  totalVal: { fontSize: 20, fontWeight: '900', color: colors.primary },
  payMethodLabel: { fontSize: 13, color: colors.textMuted },
  payMethodVal: { fontSize: 13, fontWeight: '600', color: colors.text },

  downloadBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    height: 52, backgroundColor: colors.bgCard, borderRadius: radius.lg,
    borderWidth: 1.5, borderColor: colors.border, marginBottom: spacing.md,
  },
  downloadIcon: { fontSize: 16 },
  downloadText: { fontSize: 14, fontWeight: '700', color: colors.text },

  homeLink: { alignItems: 'center', paddingVertical: spacing.sm },
  homeLinkText: { fontSize: 14, color: colors.copper, fontWeight: '600' },
});
