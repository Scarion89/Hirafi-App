import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { colors, radius, spacing } from '../../constants/theme';
import { getCategory, getServiceOptions, workersByCategory } from '../../data/services';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const cat = getCategory(id);
  const options = getServiceOptions(id);
  const [selected, setSelected] = useState(options[0]?.id || null);

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: cat?.name || 'Service' }} />

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroIconBg}>
          <Text style={styles.heroEmoji}>{cat?.emoji}</Text>
        </View>
        <View>
          <Text style={styles.proCount}>{cat?.count} PROS NEARBY</Text>
          <Text style={styles.heroTitle}>{cat?.name}</Text>
          <Text style={styles.heroSub}>⚡ 1-hour response time</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}>
        <Text style={styles.questionLabel}>What do you need?</Text>

        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <Pressable
              key={opt.id}
              onPress={() => setSelected(opt.id)}
              style={[styles.optCard, isSelected && styles.optCardActive]}
            >
              <View style={[styles.selCircle, isSelected && styles.selCircleActive]}>
                {isSelected ? <Text style={styles.selCheck}>✓</Text> : null}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.optName, isSelected && { color: colors.text }]}>{opt.name}</Text>
                <Text style={styles.optDuration}>{opt.duration}{opt.popular ? ' · Most common' : ''}</Text>
              </View>
              <Text style={styles.optPrice}>{opt.priceRange}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={() => router.push({ pathname: `/workers/${id}`, params: { serviceId: selected } })}
          style={styles.continueBtn}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  hero: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.lg,
    padding: spacing.lg, paddingTop: spacing.md,
  },
  heroIconBg: {
    width: 80, height: 80, borderRadius: radius.lg,
    backgroundColor: colors.bgCard, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  heroEmoji: { fontSize: 36 },
  proCount: { fontSize: 10, fontWeight: '700', color: colors.primary, letterSpacing: 1.2 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 2 },
  heroSub: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  questionLabel: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  optCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  optCardActive: { borderColor: colors.primary, backgroundColor: colors.bgCardAlt },
  selCircle: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  selCircleActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  selCheck: { color: '#000', fontSize: 12, fontWeight: '800' },
  optName: { fontSize: 15, fontWeight: '700', color: colors.textSub },
  optDuration: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  optPrice: { fontSize: 14, fontWeight: '700', color: colors.text, textAlign: 'right' },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: spacing.lg, paddingBottom: 28, backgroundColor: colors.bg,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  continueBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  continueBtnText: { fontSize: 16, fontWeight: '800', color: '#000' },
});
