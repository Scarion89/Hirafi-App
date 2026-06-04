import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';

export default function JobDetail() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.confirmedBadge}>
          <Text style={styles.confirmedText}>✓ JOB CONFIRMED · تم تأكيد الشغلانة</Text>
        </View>
        <Text style={styles.title}>Job Details · تفاصيل الشغلانة</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Customer */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>CUSTOMER · العميل</Text>
          <View style={styles.customerRow}>
            <View style={styles.customerAvatar}>
              <Text style={styles.customerInitials}>AM</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.customerName}>Ahmed Mahmoud</Text>
              <Text style={styles.customerSub}>⭐ 4.7 · 8 bookings</Text>
            </View>
            <Pressable style={styles.callBtn}>
              <Text style={styles.callIcon}>📞</Text>
            </Pressable>
          </View>
        </View>

        {/* Address */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>ADDRESS · العنوان</Text>
          <Text style={styles.addrText}>Madinaty, 14 شارع التسعين, Building 3, Apt 8, 2nd floor</Text>
          <View style={styles.addrNote}>
            <Text style={styles.noteIcon}>🔑</Text>
            <Text style={styles.noteText}>Ring bell twice, code 1234</Text>
          </View>
        </View>

        {/* Job description */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>JOB DESCRIPTION · وصف الشغلانة</Text>
          <Text style={styles.descText}>
            Pipe leak under kitchen sink. Been dripping for 2 days. Might need pipe replacement.
          </Text>
        </View>

        {/* Schedule */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>SCHEDULE · الموعد</Text>
          <View style={styles.scheduleRow}>
            <Text style={styles.scheduleIcon}>📅</Text>
            <Text style={styles.scheduleText}>Today · 2:30 PM</Text>
          </View>
        </View>

        {/* Estimate */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>ESTIMATED PAYOUT · المكسب المتوقع</Text>
          <Text style={styles.payoutVal}>180–260 EGP</Text>
          <Text style={styles.payoutSub}>After hirafi fee deduction</Text>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.footerRow}>
          <Pressable style={styles.callFooterBtn}>
            <Text style={styles.callFooterIcon}>📞</Text>
          </Pressable>
          <Pressable style={styles.navigateBtn} onPress={() => router.push('/worker-app/arrived')}>
            <Text style={styles.navigateText}>Navigate → تحرك</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark },
  header: { padding: spacing.lg, gap: spacing.sm },
  confirmedBadge: {
    backgroundColor: colors.successBg, paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: radius.pill, alignSelf: 'flex-start',
    borderWidth: 1, borderColor: colors.success,
  },
  confirmedText: { fontSize: 10, fontWeight: '800', color: colors.success, letterSpacing: 0.5 },
  title: { fontSize: 22, fontWeight: '900', color: colors.textLight },

  content: { paddingHorizontal: spacing.lg, paddingBottom: 120 },
  card: {
    backgroundColor: colors.darkCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.borderLight, marginBottom: spacing.md,
  },
  cardLabel: { fontSize: 10, fontWeight: '700', color: colors.textLightMuted, letterSpacing: 1.2, marginBottom: spacing.sm },

  customerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  customerAvatar: {
    width: 44, height: 44, borderRadius: 10, backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
  },
  customerInitials: { fontSize: 14, fontWeight: '900', color: colors.primary },
  customerName: { fontSize: 15, fontWeight: '700', color: colors.textLight },
  customerSub: { fontSize: 12, color: colors.textLightMuted, marginTop: 2 },
  callBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.darkMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  callIcon: { fontSize: 18 },

  addrText: { fontSize: 14, color: colors.textLight, lineHeight: 20, marginBottom: spacing.sm },
  addrNote: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  noteIcon: { fontSize: 14 },
  noteText: { fontSize: 12, color: colors.textLightMuted },

  descText: { fontSize: 14, color: colors.textLight, lineHeight: 22 },

  scheduleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  scheduleIcon: { fontSize: 16 },
  scheduleText: { fontSize: 15, fontWeight: '700', color: colors.primary },

  payoutVal: { fontSize: 24, fontWeight: '900', color: colors.primary },
  payoutSub: { fontSize: 12, color: colors.textLightMuted, marginTop: 2 },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg, paddingTop: 14,
    backgroundColor: colors.dark, borderTopWidth: 1, borderTopColor: colors.borderLight,
  },
  footerRow: { flexDirection: 'row', gap: spacing.sm },
  callFooterBtn: {
    width: 56, height: 56, borderRadius: radius.lg,
    backgroundColor: colors.darkCard, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.borderLight,
  },
  callFooterIcon: { fontSize: 22 },
  navigateBtn: {
    flex: 1, height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  navigateText: { fontSize: 16, fontWeight: '900', color: '#000' },
});
