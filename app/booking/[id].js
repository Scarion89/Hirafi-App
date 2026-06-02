import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';
import { getWorker } from '../../data/services';
import { useBookings } from '../../store/bookings';

const TIMES = ['2:00 PM', '4:00 PM', '6:00 PM', '8:00 AM', '10:00 AM', '12:00 PM'];
const DATES = ['Today', 'Tomorrow', 'Sat 8', 'Sun 9', 'Mon 10'];

export default function BookingConfirm() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addBooking } = useBookings();
  const w = getWorker(id);

  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('4:00 PM');

  if (!w) return null;

  const confirm = () => {
    addBooking({
      workerId: w.id,
      workerName: w.name,
      service: 'Pipe leak repair',
      date,
      time,
      address: 'Madinaty, Group 64, Building 12, Apt 8',
      price: w.basePrice,
    });
    Alert.alert(
      'Booking confirmed!',
      `${w.name} is booked for ${date} at ${time}.`,
      [{ text: 'View bookings', onPress: () => router.replace('/bookings') }]
    );
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}>

        {/* Service row */}
        <View style={styles.card}>
          <Text style={styles.rowLabel}>SERVICE</Text>
          <View style={styles.svcRow}>
            <Text style={styles.svcEmoji}>🔧</Text>
            <View>
              <Text style={styles.svcName}>Pipe leak repair</Text>
              <Text style={styles.svcSub}>Plumbing · 1-2 hours</Text>
            </View>
          </View>
        </View>

        {/* Worker row */}
        <View style={styles.card}>
          <Text style={styles.rowLabel}>WORKER</Text>
          <View style={styles.svcRow}>
            <View style={styles.smAvatar}>
              <Text style={styles.smInitials}>{w.initials}</Text>
            </View>
            <View>
              <Text style={styles.svcName}>{w.name}</Text>
              <Text style={styles.svcSub}>⭐ {w.rating} · ✓ Verified</Text>
            </View>
          </View>
        </View>

        {/* Date picker */}
        <Text style={styles.fieldLabel}>WHEN</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesRow}>
          {DATES.map((d) => (
            <Pressable key={d} onPress={() => setDate(d)} style={[styles.dateCell, date === d && styles.dateCellActive]}>
              <Text style={[styles.dateCellText, date === d && styles.dateCellTextActive]}>{d}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={[styles.fieldLabel, { marginTop: spacing.lg }]}>TIME</Text>
        <View style={styles.timeGrid}>
          {TIMES.map((t) => (
            <Pressable key={t} onPress={() => setTime(t)} style={[styles.timeCell, time === t && styles.timeCellActive]}>
              <Text style={[styles.timeCellText, time === t && styles.timeCellTextActive]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        {/* Address */}
        <View style={[styles.card, { marginTop: spacing.lg }]}>
          <Text style={styles.rowLabel}>ADDRESS</Text>
          <Text style={styles.svcName}>Madinaty, Group 64, Building 12, Apt 8</Text>
          <Pressable><Text style={styles.editLink}>Edit</Text></Pressable>
        </View>

        {/* Price breakdown */}
        <View style={[styles.card, { marginTop: spacing.md }]}>
          <Text style={styles.rowLabel}>PRICE BREAKDOWN</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Pipe leak repair</Text>
            <Text style={styles.priceVal}>{w.basePrice} EGP</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>hirafi guarantee (incl.)</Text>
            <Text style={[styles.priceVal, { color: colors.success }]}>FREE</Text>
          </View>
        </View>

        {/* Total */}
        <View style={[styles.card, styles.totalCard]}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalVal}>{w.basePrice} EGP</Text>
        </View>

        {/* Payment */}
        <View style={[styles.card, { marginTop: spacing.md }]}>
          <Text style={styles.rowLabel}>PAYMENT</Text>
          <View style={styles.svcRow}>
            <Text style={styles.svcEmoji}>💵</Text>
            <View>
              <Text style={styles.svcName}>Cash to worker after job</Text>
              <Text style={styles.svcSub}>No deposit · No upfront payment</Text>
            </View>
          </View>
        </View>

        <Text style={styles.guarantee}>
          ✓ If anything goes wrong, hirafi fixes it at no extra cost
        </Text>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable onPress={confirm} style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Confirm &amp; Book</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  card: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  rowLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: 10 },
  svcRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  svcEmoji: { fontSize: 28 },
  svcName: { fontSize: 16, fontWeight: '700', color: colors.text },
  svcSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  smAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center',
  },
  smInitials: { fontSize: 14, fontWeight: '800', color: colors.text },
  fieldLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.sm },
  datesRow: { marginBottom: spacing.sm },
  dateCell: {
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard, marginRight: 8,
  },
  dateCellActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dateCellText: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  dateCellTextActive: { color: '#000' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeCell: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard,
  },
  timeCellActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  timeCellText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  timeCellTextActive: { color: '#000' },
  editLink: { fontSize: 13, fontWeight: '700', color: colors.primary, marginTop: 6 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priceLabel: { fontSize: 14, color: colors.textSub },
  priceVal: { fontSize: 14, fontWeight: '600', color: colors.text },
  totalCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2 },
  totalVal: { fontSize: 28, fontWeight: '800', color: colors.text },
  guarantee: { textAlign: 'center', color: colors.textMuted, fontSize: 13, marginTop: spacing.md, lineHeight: 20 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: spacing.lg, backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border,
  },
  confirmBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  confirmText: { fontSize: 16, fontWeight: '800', color: '#000' },
});
