import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, StatusBar, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';

function pad(n) { return String(n).padStart(2, '0'); }

export default function Working() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [seconds, setSeconds] = useState(0);
  const [items, setItems] = useState([
    { id: 1, name: 'Replacement pipe', qty: 1, price: 45 },
  ]);
  const dot = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    Animated.loop(
      Animated.sequence([
        Animated.timing(dot, { toValue: 0.3, duration: 800, useNativeDriver: true }),
        Animated.timing(dot, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
    return () => clearInterval(timer);
  }, []);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const elapsed = hrs > 0 ? `${pad(hrs)}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`;

  const laborCost = Math.ceil(seconds / 60) * 3; // 3 EGP/min estimate
  const partsCost = items.reduce((s, i) => s + i.price, 0);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      {/* Timer */}
      <View style={styles.timerSection}>
        <View style={styles.timerRow}>
          <Animated.View style={[styles.liveDot, { opacity: dot }]} />
          <Text style={styles.liveText}>IN PROGRESS · جارية</Text>
        </View>
        <Text style={styles.timerVal}>{elapsed}</Text>
        <Text style={styles.timerSub}>Time elapsed · الوقت المنقضي</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Job info */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>ACTIVE JOB · الشغلانة</Text>
          <Text style={styles.jobName}>Pipe leak repair · إصلاح تسريب</Text>
          <Text style={styles.jobCustomer}>Ahmed Mahmoud · أحمد محمود</Text>
        </View>

        {/* Running estimate */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>RUNNING ESTIMATE · التقدير الحالي</Text>
          <View style={styles.estimateRow}>
            <Text style={styles.estLabel}>Labor ({Math.ceil(seconds / 60)} min)</Text>
            <Text style={styles.estVal}>{laborCost} EGP</Text>
          </View>
          {items.map((item) => (
            <View key={item.id} style={styles.estimateRow}>
              <Text style={styles.estLabel}>{item.name}</Text>
              <Text style={styles.estVal}>{item.price} EGP</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.estimateRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalVal}>{laborCost + partsCost} EGP</Text>
          </View>
        </View>

        {/* Add items */}
        <Pressable style={styles.addItemBtn}>
          <Text style={styles.addItemIcon}>+</Text>
          <Text style={styles.addItemText}>Add spare parts / materials · أضف قطع غيار</Text>
        </Pressable>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={styles.requestBtn}
          onPress={() => router.push('/worker-app/request-payment')}
        >
          <Text style={styles.requestText}>Request payment → {laborCost + partsCost} EGP</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark },

  timerSection: { alignItems: 'center', padding: spacing.xl, paddingBottom: spacing.lg },
  timerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.sm },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  liveText: { fontSize: 11, fontWeight: '800', color: colors.primary, letterSpacing: 1 },
  timerVal: { fontSize: 52, fontWeight: '900', color: colors.textLight, letterSpacing: 2 },
  timerSub: { fontSize: 12, color: colors.textLightMuted, marginTop: 4 },

  content: { paddingHorizontal: spacing.lg, paddingBottom: 120 },
  card: {
    backgroundColor: colors.darkCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.borderLight, marginBottom: spacing.md,
  },
  cardLabel: { fontSize: 10, fontWeight: '700', color: colors.textLightMuted, letterSpacing: 1.2, marginBottom: spacing.sm },
  jobName: { fontSize: 16, fontWeight: '800', color: colors.textLight },
  jobCustomer: { fontSize: 13, color: colors.textLightMuted, marginTop: 2 },

  estimateRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  estLabel: { fontSize: 13, color: colors.textLightSub },
  estVal: { fontSize: 13, fontWeight: '600', color: colors.textLight },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 8 },
  totalLabel: { fontSize: 14, fontWeight: '700', color: colors.textLight },
  totalVal: { fontSize: 16, fontWeight: '900', color: colors.primary },

  addItemBtn: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.darkMuted, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.borderLight, borderStyle: 'dashed',
  },
  addItemIcon: { fontSize: 20, color: colors.primary, fontWeight: '800' },
  addItemText: { fontSize: 14, color: colors.textLightSub },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg, paddingTop: 14,
    backgroundColor: colors.dark, borderTopWidth: 1, borderTopColor: colors.borderLight,
  },
  requestBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  requestText: { fontSize: 15, fontWeight: '900', color: '#000' },
});
