import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { getProvider } from '../../data/services';
import { Button } from '../../components/ui';
import { useBookings } from '../../store/bookings';

const DATES = ['Mon 2', 'Tue 3', 'Wed 4', 'Thu 5', 'Fri 6', 'Sat 7'];
const TIMES = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];

export default function BookingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addBooking } = useBookings();
  const p = getProvider(id);

  const [date, setDate] = useState(DATES[2]);
  const [time, setTime] = useState(TIMES[1]);
  const [service, setService] = useState(p?.services[0]);
  const [hours, setHours] = useState(2);
  const [address, setAddress] = useState('Downtown, Apt 4B');
  const [notes, setNotes] = useState('');

  if (!p) return null;
  const estimate = p.hourlyRate * hours;

  const confirm = () => {
    addBooking({
      providerId: p.id,
      providerName: p.name,
      service,
      date,
      time,
      hours,
      address,
      notes,
      estimate,
    });
    Alert.alert('Booking confirmed', `${p.name} is booked for ${date} at ${time}.`, [
      { text: 'View bookings', onPress: () => router.replace('/bookings') },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 120 }}>
        <View style={styles.proCard}>
          <View style={styles.proAvatar}>
            <Text style={styles.proInitials}>{p.name.split(' ').map((n) => n[0]).join('')}</Text>
          </View>
          <View>
            <Text style={styles.proName}>{p.name}</Text>
            <Text style={styles.proTitle}>{p.title}</Text>
          </View>
        </View>

        <Label text="Select service" />
        <View style={styles.chips}>
          {p.services.map((s) => (
            <Chip key={s} label={s} active={service === s} onPress={() => setService(s)} />
          ))}
        </View>

        <Label text="Choose date" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DATES.map((d) => (
            <Pressable key={d} onPress={() => setDate(d)} style={[styles.dateCell, date === d && styles.dateCellActive]}>
              <Text style={[styles.dateText, date === d && styles.dateTextActive]}>{d.split(' ')[0]}</Text>
              <Text style={[styles.dateNum, date === d && styles.dateTextActive]}>{d.split(' ')[1]}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Label text="Choose time" />
        <View style={styles.chips}>
          {TIMES.map((t) => (
            <Chip key={t} label={t} active={time === t} onPress={() => setTime(t)} />
          ))}
        </View>

        <Label text="Estimated hours" />
        <View style={styles.stepper}>
          <Pressable onPress={() => setHours((h) => Math.max(1, h - 1))} style={styles.stepBtn}>
            <Ionicons name="remove" size={20} color={colors.primary} />
          </Pressable>
          <Text style={styles.stepValue}>{hours} hr</Text>
          <Pressable onPress={() => setHours((h) => Math.min(8, h + 1))} style={styles.stepBtn}>
            <Ionicons name="add" size={20} color={colors.primary} />
          </Pressable>
        </View>

        <Label text="Service address" />
        <TextInput value={address} onChangeText={setAddress} style={styles.input} />

        <Label text="Notes for the pro (optional)" />
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Gate code, problem description…"
          placeholderTextColor={colors.textMuted}
          multiline
          style={[styles.input, { height: 90, textAlignVertical: 'top', paddingTop: 12 }]}
        />

        <View style={styles.summary}>
          <Row label={`${p.hourlyRate} × ${hours} hr`} value={`$${estimate}`} />
          <Row label="Service fee" value="$0" />
          <View style={styles.summaryDivider} />
          <Row label="Estimated total" value={`$${estimate}`} bold />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Button title={`Confirm · $${estimate}`} icon="checkmark-circle" onPress={confirm} />
      </View>
    </View>
  );
}

const Label = ({ text }) => <Text style={styles.label}>{text}</Text>;

const Chip = ({ label, active, onPress }) => (
  <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
    <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
  </Pressable>
);

const Row = ({ label, value, bold }) => (
  <View style={styles.row}>
    <Text style={[styles.rowLabel, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.rowValue, bold && styles.bold]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  proCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderRadius: radius.lg, padding: spacing.md, ...shadow.card,
  },
  proAvatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
  },
  proInitials: { color: colors.primary, fontWeight: '800', fontSize: 16 },
  proName: { fontSize: 16, fontWeight: '800', color: colors.text },
  proTitle: { fontSize: 13, color: colors.textMuted },
  label: { fontSize: 15, fontWeight: '700', color: colors.text, marginTop: spacing.xl, marginBottom: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.pill, marginRight: 8, marginBottom: 8,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontWeight: '600', fontSize: 13 },
  chipTextActive: { color: '#fff' },
  dateCell: {
    width: 60, paddingVertical: spacing.md, borderRadius: radius.md, marginRight: 10,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center',
  },
  dateCellActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dateText: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  dateNum: { fontSize: 18, color: colors.text, fontWeight: '800', marginTop: 2 },
  dateTextActive: { color: '#fff' },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepBtn: {
    width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  stepValue: { fontSize: 16, fontWeight: '800', color: colors.text, marginHorizontal: spacing.lg, minWidth: 50, textAlign: 'center' },
  input: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, paddingHorizontal: spacing.md, height: 50, fontSize: 15, color: colors.text,
  },
  summary: {
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg,
    marginTop: spacing.xl, ...shadow.card,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rowLabel: { fontSize: 14, color: colors.textMuted },
  rowValue: { fontSize: 14, color: colors.text, fontWeight: '600' },
  summaryDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  bold: { fontWeight: '800', color: colors.text, fontSize: 16 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.surface, paddingHorizontal: spacing.lg, paddingTop: spacing.md,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
});
