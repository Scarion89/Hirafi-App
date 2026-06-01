import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';
import { useBookings } from '../../store/bookings';
import { Badge, Button } from '../../components/ui';

const TABS = ['upcoming', 'cancelled'];

export default function Bookings() {
  const insets = useSafeAreaInsets();
  const { bookings, cancelBooking } = useBookings();
  const [tab, setTab] = useState('upcoming');

  const list = bookings.filter((b) => b.status === tab);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      <View style={styles.tabs}>
        {TABS.map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={styles.tabBtn}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t[0].toUpperCase() + t.slice(1)}
            </Text>
            {tab === t ? <View style={styles.tabUnderline} /> : null}
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={56} color={colors.border} />
            <Text style={styles.emptyTitle}>No {tab} bookings</Text>
            <Text style={styles.emptySub}>
              Booked services will show up here.
            </Text>
          </View>
        ) : (
          list.map((b) => (
            <View key={b.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.provider}>{b.providerName}</Text>
                  <Text style={styles.service}>{b.service}</Text>
                </View>
                <Badge
                  label={b.status === 'upcoming' ? 'Upcoming' : 'Cancelled'}
                  color={b.status === 'upcoming' ? colors.success : colors.danger}
                  bg={b.status === 'upcoming' ? colors.primaryLight : '#FCE8E8'}
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={15} color={colors.textMuted} />
                <Text style={styles.infoText}>{b.date} · {b.time}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={15} color={colors.textMuted} />
                <Text style={styles.infoText}>{b.address}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="cash-outline" size={15} color={colors.textMuted} />
                <Text style={styles.infoText}>Est. ${b.estimate}</Text>
              </View>
              {b.status === 'upcoming' ? (
                <Button
                  title="Cancel booking"
                  variant="ghost"
                  onPress={() => cancelBooking(b.id)}
                  style={{ marginTop: spacing.md, height: 44 }}
                />
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md, backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  tabs: { flexDirection: 'row', paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  tabBtn: { marginRight: spacing.xl, paddingBottom: spacing.md },
  tabText: { fontSize: 15, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: colors.primary },
  tabUnderline: {
    position: 'absolute', bottom: -1, left: 0, right: 0,
    height: 3, borderRadius: 2, backgroundColor: colors.primary,
  },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.md, ...shadow.card,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  provider: { fontSize: 16, fontWeight: '800', color: colors.text },
  service: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoText: { marginLeft: 8, color: colors.text, fontSize: 14 },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: spacing.md },
  emptySub: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
});
