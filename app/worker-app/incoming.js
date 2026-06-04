import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Easing, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';

export default function Incoming() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [timer, setTimer] = useState(30);
  const bellScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bellScale, { toValue: 1.2, duration: 150, useNativeDriver: true }),
        Animated.timing(bellScale, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.timing(bellScale, { toValue: 1.15, duration: 100, useNativeDriver: true }),
        Animated.timing(bellScale, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.delay(1000),
      ])
    ).start();

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(interval); router.back(); return 0; }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const accept = () => router.replace('/worker-app/job-detail');
  const decline = () => router.back();

  const timerPct = timer / 30;
  const timerColor = timer > 10 ? colors.primary : colors.danger;

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      {/* Bell + header */}
      <View style={styles.topSection}>
        <Animated.Text style={[styles.bellIcon, { transform: [{ scale: bellScale }] }]}>🔔</Animated.Text>
        <Text style={styles.title}>New job request!</Text>
        <Text style={styles.titleAr}>طلب شغل جديد!</Text>

        {/* Countdown */}
        <View style={styles.timerWrap}>
          <Text style={[styles.timerNum, { color: timerColor }]}>{timer}</Text>
          <Text style={styles.timerLabel}>seconds to accept · ثانية للقبول</Text>
        </View>
      </View>

      {/* Job card */}
      <View style={styles.jobCard}>
        <View style={styles.customerRow}>
          <View style={styles.customerAvatar}>
            <Text style={styles.customerInitials}>AM</Text>
          </View>
          <View>
            <Text style={styles.customerName}>Ahmed Mahmoud</Text>
            <Text style={styles.customerSub}>New customer · عميل جديد</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>🔧</Text>
          <View>
            <Text style={styles.infoLabel}>Job type · نوع الشغل</Text>
            <Text style={styles.infoVal}>Pipe leak repair · إصلاح تسريب</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📍</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>Address · العنوان</Text>
            <Text style={styles.infoVal}>Madinaty, 14 شارع التسعين, Apt 8</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📏</Text>
          <View>
            <Text style={styles.infoLabel}>Distance · المسافة</Text>
            <Text style={styles.infoVal}>2.4 km away · كيلومترين ونص</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>💰</Text>
          <View>
            <Text style={styles.infoLabel}>Estimated payout</Text>
            <Text style={styles.infoVal}>180–260 EGP</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable style={styles.acceptBtn} onPress={accept}>
          <Text style={styles.acceptText}>Accept → قبول</Text>
        </Pressable>
        <Pressable style={styles.declineBtn} onPress={decline}>
          <Text style={styles.declineText}>Decline · رفض</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark, paddingHorizontal: spacing.lg },
  topSection: { alignItems: 'center', paddingTop: spacing.xl, paddingBottom: spacing.lg },
  bellIcon: { fontSize: 52, marginBottom: spacing.md },
  title: { fontSize: 26, fontWeight: '900', color: colors.textLight },
  titleAr: { fontSize: 15, color: colors.textLightMuted, marginTop: 4, marginBottom: spacing.lg },
  timerWrap: { alignItems: 'center' },
  timerNum: { fontSize: 48, fontWeight: '900' },
  timerLabel: { fontSize: 12, color: colors.textLightMuted, marginTop: 2 },

  jobCard: {
    backgroundColor: colors.darkCard, borderRadius: radius.xl,
    padding: spacing.lg, borderWidth: 1, borderColor: colors.borderLight,
    marginBottom: spacing.lg, flex: 1,
  },
  customerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  customerAvatar: {
    width: 44, height: 44, borderRadius: 10, backgroundColor: colors.walnut,
    alignItems: 'center', justifyContent: 'center',
  },
  customerInitials: { fontSize: 14, fontWeight: '900', color: colors.primary },
  customerName: { fontSize: 15, fontWeight: '700', color: colors.textLight },
  customerSub: { fontSize: 11, color: colors.textLightMuted, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.borderLight, marginBottom: spacing.md },
  infoRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  infoIcon: { fontSize: 18, width: 24 },
  infoLabel: { fontSize: 10, fontWeight: '700', color: colors.textLightMuted, letterSpacing: 0.5 },
  infoVal: { fontSize: 14, fontWeight: '600', color: colors.textLight, marginTop: 2 },

  actions: { gap: spacing.md, paddingBottom: spacing.sm },
  acceptBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  acceptText: { fontSize: 16, fontWeight: '900', color: '#000' },
  declineBtn: { height: 48, alignItems: 'center', justifyContent: 'center' },
  declineText: { fontSize: 15, color: colors.textLightMuted, fontWeight: '600' },
});
