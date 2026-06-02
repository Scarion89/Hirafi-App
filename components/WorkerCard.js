import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, radius, spacing, shadow } from '../constants/theme';

export default function WorkerCard({ worker, serviceOption }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: `/worker/${worker.id}`, params: { serviceId: serviceOption?.id } })
      }
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      {worker.recommended && (
        <View style={styles.recBadge}>
          <Text style={styles.recText}>⭐ RECOMMENDED</Text>
        </View>
      )}

      <View style={styles.top}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{worker.initials}</Text>
          <View style={styles.verifiedDot}>
            <Text style={styles.verifiedCheck}>✓</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{worker.name}</Text>
          <Text style={styles.title}>{worker.title} · {worker.experience}</Text>
          <Text style={styles.meta}>⭐ {worker.rating} · {worker.jobs} jobs</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottom}>
        <Text style={styles.dist}>📍 {worker.distanceKm} km · {worker.etaMin} min away</Text>
        <View>
          <Text style={styles.priceFrom}>from</Text>
          <Text style={styles.price}>{worker.basePrice} EGP</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  recBadge: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },
  recText: { color: colors.primary, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  top: { flexDirection: 'row', gap: spacing.md },
  avatar: { position: 'relative', width: 56, height: 56 },
  avatarText: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.bgMuted,
    textAlign: 'center', lineHeight: 56,
    fontSize: 18, fontWeight: '800', color: colors.text,
  },
  verifiedDot: {
    position: 'absolute', bottom: -2, right: -2,
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: colors.success,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.bgCard,
  },
  verifiedCheck: { color: '#fff', fontSize: 10, fontWeight: '800' },
  name: { fontSize: 16, fontWeight: '800', color: colors.text },
  title: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  meta: { fontSize: 12, color: colors.textSub, marginTop: 4 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  dist: { fontSize: 12, color: colors.textMuted },
  priceFrom: { fontSize: 11, color: colors.textMuted, textAlign: 'right' },
  price: { fontSize: 18, fontWeight: '800', color: colors.text },
});
