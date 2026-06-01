import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, shadow } from '../constants/theme';

export function Button({ title, onPress, variant = 'primary', icon, style }) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        isPrimary ? styles.btnPrimary : styles.btnGhost,
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={18}
          color={isPrimary ? '#fff' : colors.primary}
          style={{ marginRight: 8 }}
        />
      ) : null}
      <Text style={[styles.btnText, { color: isPrimary ? '#fff' : colors.primary }]}>
        {title}
      </Text>
    </Pressable>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Rating({ value, reviews, size = 14 }) {
  return (
    <View style={styles.row}>
      <Ionicons name="star" size={size} color={colors.star} />
      <Text style={styles.ratingText}>{value.toFixed(1)}</Text>
      {reviews != null ? (
        <Text style={styles.ratingMuted}>({reviews})</Text>
      ) : null}
    </View>
  );
}

export function Badge({ label, color = colors.success, bg }) {
  return (
    <View style={[styles.badge, { backgroundColor: bg || colors.primaryLight }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  btnPrimary: { backgroundColor: colors.primary },
  btnGhost: { backgroundColor: colors.primaryLight },
  btnText: { fontSize: 16, fontWeight: '700' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
  ratingText: { marginLeft: 4, fontWeight: '700', color: colors.text, fontSize: 13 },
  ratingMuted: { marginLeft: 3, color: colors.textMuted, fontSize: 12 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  badgeText: { fontSize: 12, fontWeight: '700' },
});
