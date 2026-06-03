import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

const SAVED_ADDRESSES = [
  { id: 'a1', label: 'Home', detail: 'Madinaty, Group 64, Building 12, Apt 8', isDefault: true },
];

export default function SavedAddresses() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showForm, setShowForm] = useState(false);
  const [formLabel, setFormLabel] = useState('');
  const [formStreet, setFormStreet] = useState('');
  const [formArea, setFormArea] = useState('');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Saved Addresses</Text>
        <View style={styles.topBarEnd} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Saved address cards */}
        {SAVED_ADDRESSES.map((addr) => (
          <View key={addr.id} style={styles.addressCard}>
            <View style={styles.addressLeft}>
              <View style={styles.addressIconBg}>
                <Text style={styles.addressEmoji}>🏠</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.addressLabelRow}>
                  <Text style={styles.addressLabelText}>{addr.label}</Text>
                  {addr.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.addressDetail}>{addr.detail}</Text>
              </View>
            </View>
            <View style={styles.addressActions}>
              <Pressable style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>Edit</Text>
              </Pressable>
              <Pressable style={[styles.actionBtn, styles.actionBtnDanger]}>
                <Text style={styles.actionBtnDangerText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* Add new address button */}
        {!showForm && (
          <Pressable style={styles.addBtn} onPress={() => setShowForm(true)}>
            <Text style={styles.addBtnText}>＋  Add new address</Text>
          </Pressable>
        )}

        {/* Inline add form */}
        {showForm && (
          <View style={styles.addForm}>
            <Text style={styles.formTitle}>New Address</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>LABEL (Home, Work…)</Text>
              <TextInput
                style={styles.input}
                value={formLabel}
                onChangeText={setFormLabel}
                placeholder="e.g. Home"
                placeholderTextColor={colors.textMuted}
                returnKeyType="next"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>STREET / BUILDING</Text>
              <TextInput
                style={styles.input}
                value={formStreet}
                onChangeText={setFormStreet}
                placeholder="Building, Floor, Apt number"
                placeholderTextColor={colors.textMuted}
                returnKeyType="next"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>AREA / DISTRICT</Text>
              <TextInput
                style={styles.input}
                value={formArea}
                onChangeText={setFormArea}
                placeholder="e.g. Madinaty, New Cairo"
                placeholderTextColor={colors.textMuted}
                returnKeyType="done"
              />
            </View>

            <View style={styles.formBtnRow}>
              <Pressable style={styles.cancelFormBtn} onPress={() => setShowForm(false)}>
                <Text style={styles.cancelFormBtnText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.saveFormBtn, !formLabel && styles.saveFormBtnDisabled]}
                disabled={!formLabel}
                onPress={() => setShowForm(false)}
              >
                <Text style={styles.saveFormBtnText}>Save address</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center', height: 54,
    paddingHorizontal: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 32, color: colors.text, lineHeight: 36 },
  screenTitle: { flex: 1, fontSize: 17, fontWeight: '800', color: colors.text, textAlign: 'center' },
  topBarEnd: { width: 40 },

  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },

  addressCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border,
    marginBottom: spacing.md,
  },
  addressLeft: { flexDirection: 'row', gap: 12, marginBottom: spacing.md },
  addressIconBg: {
    width: 44, height: 44, borderRadius: radius.md,
    backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center',
  },
  addressEmoji: { fontSize: 22 },
  addressLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  addressLabelText: { fontSize: 15, fontWeight: '700', color: colors.text },
  defaultBadge: {
    backgroundColor: colors.primaryMuted, borderRadius: radius.pill,
    paddingHorizontal: 8, paddingVertical: 2,
    borderWidth: 1, borderColor: colors.primary,
  },
  defaultBadgeText: { fontSize: 9, fontWeight: '800', color: colors.primary, letterSpacing: 0.8 },
  addressDetail: { fontSize: 13, color: colors.textMuted, lineHeight: 18 },
  addressActions: { flexDirection: 'row', gap: 8, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm },
  actionBtn: {
    flex: 1, height: 34, borderRadius: radius.sm,
    backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  actionBtnText: { fontSize: 13, fontWeight: '600', color: colors.textSub },
  actionBtnDanger: { backgroundColor: colors.dangerBg, borderColor: colors.danger },
  actionBtnDangerText: { fontSize: 13, fontWeight: '600', color: colors.danger },

  addBtn: {
    height: 52, borderRadius: radius.lg,
    borderWidth: 1.5, borderColor: colors.primary, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  addBtnText: { fontSize: 15, fontWeight: '700', color: colors.primary },

  addForm: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md,
  },
  formTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: spacing.lg },
  fieldGroup: { marginBottom: spacing.md },
  label: { fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.8, marginBottom: 8 },
  input: {
    height: 50, backgroundColor: colors.bgMuted,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, paddingHorizontal: spacing.md,
    fontSize: 15, color: colors.text, fontWeight: '500',
  },
  formBtnRow: { flexDirection: 'row', gap: 10, marginTop: spacing.sm },
  cancelFormBtn: {
    flex: 1, height: 46, borderRadius: radius.md,
    backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  cancelFormBtnText: { fontSize: 14, fontWeight: '700', color: colors.textMuted },
  saveFormBtn: {
    flex: 2, height: 46, borderRadius: radius.md,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  saveFormBtnDisabled: { opacity: 0.4 },
  saveFormBtnText: { fontSize: 14, fontWeight: '800', color: '#000' },
});
