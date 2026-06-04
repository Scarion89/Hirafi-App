import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../constants/theme';

export default function Chat() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.card}>
        <Text style={styles.icon}>💬</Text>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.sub}>Chat with your hirafi coming soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, backgroundColor: colors.bg,
    alignItems: 'center', justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.bgCard, borderRadius: radius.xl,
    padding: spacing.xxl, alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
    width: '100%', maxWidth: 320,
  },
  icon: { fontSize: 48, marginBottom: spacing.md },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  sub: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
});
