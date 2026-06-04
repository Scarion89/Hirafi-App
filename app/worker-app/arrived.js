import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';

export default function Arrived() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📍</Text>
        </View>

        <Text style={styles.title}>You've arrived!</Text>
        <Text style={styles.titleAr}>وصلت!</Text>

        <View style={styles.addressCard}>
          <Text style={styles.addressLabel}>CUSTOMER ADDRESS · عنوان العميل</Text>
          <Text style={styles.addressText}>Madinaty, 14 شارع التسعين{'\n'}Building 3, Apt 8, 2nd floor</Text>
          <View style={styles.noteRow}>
            <Text style={styles.noteIcon}>🔑</Text>
            <Text style={styles.noteText}>Ring bell twice, code 1234 · اضغط الجرس مرتين</Text>
          </View>
        </View>

        <View style={styles.customerCard}>
          <View style={styles.customerAvatar}>
            <Text style={styles.customerInitials}>AM</Text>
          </View>
          <View>
            <Text style={styles.customerName}>Ahmed Mahmoud</Text>
            <Text style={styles.customerSub}>Tap to call if needed</Text>
          </View>
          <Pressable style={styles.callBtn}>
            <Text style={styles.callIcon}>📞</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.startBtn} onPress={() => router.replace('/worker-app/working')}>
          <Text style={styles.startText}>Start job · ابدأ الشغل</Text>
        </Pressable>
        <Pressable style={styles.callCustomerBtn}>
          <Text style={styles.callCustomerText}>📞 Call customer · اتصل بالعميل</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: spacing.lg, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: spacing.xxl },
  iconCircle: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: colors.successBg, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.success, marginBottom: spacing.xl,
  },
  icon: { fontSize: 40 },
  title: { fontSize: 30, fontWeight: '900', color: colors.text, marginBottom: 4 },
  titleAr: { fontSize: 18, color: colors.textMuted, marginBottom: spacing.xl },

  addressCard: {
    width: '100%', backgroundColor: colors.bgCard, borderRadius: radius.xl,
    padding: spacing.lg, borderWidth: 1, borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  addressLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.sm },
  addressText: { fontSize: 15, fontWeight: '600', color: colors.text, lineHeight: 22, marginBottom: spacing.sm },
  noteRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  noteIcon: { fontSize: 14 },
  noteText: { fontSize: 12, color: colors.textSub, flex: 1 },

  customerCard: {
    width: '100%', flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  customerAvatar: {
    width: 44, height: 44, borderRadius: 10, backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
  },
  customerInitials: { fontSize: 14, fontWeight: '900', color: colors.primary },
  customerName: { fontSize: 14, fontWeight: '700', color: colors.text, flex: 1 },
  customerSub: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  callBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  callIcon: { fontSize: 18 },

  actions: { gap: spacing.sm, paddingBottom: spacing.sm },
  startBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  startText: { fontSize: 16, fontWeight: '900', color: '#000' },
  callCustomerBtn: {
    height: 50, borderRadius: radius.lg, borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgCard,
  },
  callCustomerText: { fontSize: 14, fontWeight: '700', color: colors.textSub },
});
