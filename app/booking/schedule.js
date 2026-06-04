import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';

const DAYS = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => ({
  label: d,
  num: new Date(Date.now() + i * 86400000).getDate(),
}));

const TIME_SLOTS = [
  { id: 'morning1', label: '8:00 AM',  period: 'Morning' },
  { id: 'morning2', label: '9:30 AM',  period: 'Morning' },
  { id: 'morning3', label: '11:00 AM', period: 'Morning' },
  { id: 'afternoon1', label: '1:00 PM', period: 'Afternoon' },
  { id: 'afternoon2', label: '2:30 PM', period: 'Afternoon' },
  { id: 'afternoon3', label: '4:00 PM', period: 'Afternoon' },
  { id: 'evening1', label: '5:30 PM', period: 'Evening' },
  { id: 'evening2', label: '7:00 PM', period: 'Evening' },
];

const PERIODS = ['Morning', 'Afternoon', 'Evening'];

export default function Schedule() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { workerId } = useLocalSearchParams();

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.topTitle}>When do you need it?</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Day picker */}
        <Text style={styles.sectionLabel}>SELECT DATE · اختر التاريخ</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
          {DAYS.map((d, i) => (
            <Pressable
              key={i}
              onPress={() => setSelectedDay(i)}
              style={[styles.dayBtn, selectedDay === i && styles.dayBtnActive]}
            >
              <Text style={[styles.dayLabel, selectedDay === i && styles.dayLabelActive]}>{d.label}</Text>
              <Text style={[styles.dayNum, selectedDay === i && styles.dayNumActive]}>{d.num}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Time slots */}
        {PERIODS.map((period) => (
          <View key={period} style={styles.periodSection}>
            <Text style={styles.periodLabel}>{period} · {period === 'Morning' ? 'الصباح' : period === 'Afternoon' ? 'الظهر' : 'المساء'}</Text>
            <View style={styles.slotsGrid}>
              {TIME_SLOTS.filter((s) => s.period === period).map((slot) => (
                <Pressable
                  key={slot.id}
                  onPress={() => setSelectedSlot(slot.id)}
                  style={[styles.slotBtn, selectedSlot === slot.id && styles.slotBtnActive]}
                >
                  <Text style={[styles.slotText, selectedSlot === slot.id && styles.slotTextActive]}>{slot.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        {selectedSlot && (
          <Text style={styles.selectedInfo}>
            {DAYS[selectedDay].label} · {TIME_SLOTS.find((s) => s.id === selectedSlot)?.label}
          </Text>
        )}
        <Pressable
          onPress={() => selectedSlot && router.push({ pathname: '/booking/address', params: { workerId } })}
          style={[styles.continueBtn, !selectedSlot && styles.continueBtnDisabled]}
        >
          <Text style={styles.continueText}>Continue →</Text>
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
  sectionLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.2, marginBottom: spacing.md },

  daysRow: { gap: spacing.sm, paddingBottom: spacing.lg },
  dayBtn: {
    width: 64, height: 72, borderRadius: radius.md,
    backgroundColor: colors.bgCard, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: colors.border,
  },
  dayBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted },
  dayLabelActive: { color: 'rgba(0,0,0,0.6)' },
  dayNum: { fontSize: 22, fontWeight: '900', color: colors.text, marginTop: 2 },
  dayNumActive: { color: '#000' },

  periodSection: { marginBottom: spacing.lg },
  periodLabel: { fontSize: 12, fontWeight: '700', color: colors.textSub, marginBottom: spacing.sm },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slotBtn: {
    paddingHorizontal: 18, paddingVertical: 12, borderRadius: radius.md,
    backgroundColor: colors.bgCard, borderWidth: 1.5, borderColor: colors.border,
  },
  slotBtnActive: { backgroundColor: colors.primaryMuted, borderColor: colors.primary },
  slotText: { fontSize: 14, fontWeight: '600', color: colors.textSub },
  slotTextActive: { color: colors.copper, fontWeight: '800' },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg, paddingTop: 14,
    backgroundColor: colors.bgCard, borderTopWidth: 1, borderTopColor: colors.border,
  },
  selectedInfo: { fontSize: 13, color: colors.textSub, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  continueBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  continueBtnDisabled: { opacity: 0.4 },
  continueText: { fontSize: 16, fontWeight: '900', color: '#000' },
});
