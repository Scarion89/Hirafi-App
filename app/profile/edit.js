import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';
import { useAuth } from '../../store/auth';

export default function EditProfile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useAuth();

  const nameParts = (user?.name || '').split(' ');
  const [firstName, setFirstName] = useState(nameParts[0] || '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '');
  const [area, setArea] = useState(user?.area || '');
  const [showSaved, setShowSaved] = useState(false);

  const initials = ((firstName[0] || '') + (lastName[0] || '')).toUpperCase() || 'U';

  function handleSave() {
    const fullName = (firstName + ' ' + lastName).trim();
    updateUser({ name: fullName, area });
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
      router.back();
    }, 1800);
  }

  const canSave = firstName.trim().length > 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Edit Profile</Text>
        <View style={styles.topBarEnd} />
      </View>

      {/* Success toast */}
      {showSaved && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>✓ Changes saved!</Text>
        </View>
      )}

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <Text style={styles.changePhotoLabel}>Change photo</Text>
        </View>

        {/* Form */}
        <View style={styles.fieldRow}>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>FIRST NAME</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First name"
              placeholderTextColor={colors.textMuted}
              returnKeyType="next"
            />
          </View>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>LAST NAME</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last name"
              placeholderTextColor={colors.textMuted}
              returnKeyType="next"
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <View style={[styles.input, styles.inputDisabled]}>
            <Text style={styles.inputDisabledText}>+20 {user?.phone || '—'}</Text>
          </View>
          <Text style={styles.fieldHint}>Phone number cannot be changed</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>AREA / NEIGHBOURHOOD</Text>
          <TextInput
            style={styles.input}
            value={area}
            onChangeText={setArea}
            placeholder="e.g. Madinaty, New Cairo"
            placeholderTextColor={colors.textMuted}
            returnKeyType="done"
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Pressable
          style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={!canSave}
        >
          <Text style={styles.saveBtnText}>Save changes</Text>
        </Pressable>
      </View>
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

  toast: {
    marginHorizontal: spacing.lg, marginTop: spacing.sm,
    backgroundColor: '#1A2E1A', borderRadius: radius.md, padding: spacing.md,
    borderWidth: 1, borderColor: colors.success, alignItems: 'center',
  },
  toastText: { fontSize: 14, fontWeight: '700', color: colors.success },

  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },

  avatarSection: { alignItems: 'center', marginBottom: spacing.xxl },
  avatarCircle: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: colors.bgMuted,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2.5, borderColor: colors.primary,
  },
  avatarInitials: { fontSize: 30, fontWeight: '800', color: colors.primary },
  changePhotoLabel: {
    marginTop: spacing.sm, fontSize: 13, fontWeight: '600',
    color: colors.primary,
  },

  fieldRow: { flexDirection: 'row', gap: 12 },
  fieldGroup: { marginBottom: spacing.xl },
  label: {
    fontSize: 11, fontWeight: '700', color: colors.textMuted,
    letterSpacing: 0.8, marginBottom: 8,
  },
  input: {
    height: 52, backgroundColor: colors.bgCard,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, paddingHorizontal: spacing.md,
    fontSize: 15, color: colors.text, fontWeight: '500',
  },
  inputDisabled: {
    justifyContent: 'center', backgroundColor: colors.bgMuted,
  },
  inputDisabledText: { fontSize: 15, color: colors.textMuted, fontWeight: '500' },
  fieldHint: { fontSize: 11, color: colors.textMuted, marginTop: 5 },

  footer: {
    paddingHorizontal: spacing.lg, paddingTop: spacing.md,
    borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.bg,
  },
  saveBtn: {
    height: 54, backgroundColor: colors.primary,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
  },
  saveBtnDisabled: { opacity: 0.4 },
  saveBtnText: { fontSize: 16, fontWeight: '800', color: '#000' },
});
