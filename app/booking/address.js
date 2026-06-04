import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadow } from '../../constants/theme';

export default function AddressInput() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { workerId } = useLocalSearchParams();

  const [address, setAddress] = useState('Madinaty, 14 شارع التسعين');
  const [apt, setApt] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.topTitle}>Where's the job?</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Map thumbnail */}
        <View style={styles.mapThumb}>
          <View style={styles.mapGrid}>
            {[...Array(16)].map((_, i) => (
              <View key={i} style={styles.mapCell} />
            ))}
          </View>
          <View style={styles.mapPin}>
            <Text style={styles.mapPinIcon}>📍</Text>
          </View>
          <View style={styles.mapLabel}>
            <Text style={styles.mapLabelText}>Madinaty, Cairo</Text>
          </View>
        </View>

        {/* Address field */}
        <Text style={styles.fieldLabel}>Street address · العنوان</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>📍</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your street address"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Apt/floor */}
        <Text style={styles.fieldLabel}>Apt / Floor · الشقة / الدور</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>🏢</Text>
          <TextInput
            style={styles.input}
            value={apt}
            onChangeText={setApt}
            placeholder="e.g. Building 3, Apt 12, 2nd floor"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Notes */}
        <Text style={styles.fieldLabel}>Access notes (optional) · ملاحظات</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder={"e.g. Ring the bell twice, door code is 1234…\nاضغط الجرس مرتين، كود الباب ١٢٣٤..."}
          placeholderTextColor={colors.textMuted}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          onPress={() => router.push({ pathname: '/booking/' + (workerId || 'w1'), params: { workerId } })}
          style={styles.continueBtn}
        >
          <Text style={styles.continueText}>Use this address →</Text>
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

  mapThumb: {
    height: 140, backgroundColor: colors.bgCardAlt,
    borderRadius: radius.xl, marginBottom: spacing.xl,
    overflow: 'hidden', position: 'relative',
    borderWidth: 1, borderColor: colors.border,
  },
  mapGrid: { flexDirection: 'row', flexWrap: 'wrap', position: 'absolute', inset: 0 },
  mapCell: { width: '25%', height: 35, borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.05)' },
  mapPin: { position: 'absolute', top: '40%', left: '50%', marginLeft: -12, marginTop: -12 },
  mapPinIcon: { fontSize: 24 },
  mapLabel: {
    position: 'absolute', bottom: 8, left: 0, right: 0,
    alignItems: 'center',
  },
  mapLabelText: {
    backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: radius.pill, fontSize: 12, fontWeight: '600', color: colors.text,
  },

  fieldLabel: { fontSize: 12, fontWeight: '700', color: colors.textSub, marginBottom: spacing.sm },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    paddingHorizontal: spacing.md, height: 50,
    borderWidth: 1, borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  inputIcon: { fontSize: 16 },
  input: { flex: 1, fontSize: 15, color: colors.text },

  notesInput: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, fontSize: 14, color: colors.text,
    minHeight: 80, lineHeight: 20,
    ...shadow.card,
  },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg, paddingTop: 14,
    backgroundColor: colors.bgCard, borderTopWidth: 1, borderTopColor: colors.border,
  },
  continueBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  continueText: { fontSize: 16, fontWeight: '900', color: '#000' },
});
