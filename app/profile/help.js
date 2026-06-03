import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, LayoutAnimation } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

const FAQ = [
  {
    id: 'f1',
    q: 'How do I cancel a booking?',
    a: 'Go to your Bookings tab and tap on the active booking. You can cancel for free up to 2 hours before the scheduled time.',
  },
  {
    id: 'f2',
    q: 'What is the hirafi guarantee?',
    a: 'The hirafi guarantee covers your job for 30 days after completion. If the issue returns, we send the same pro back at no extra cost.',
  },
  {
    id: 'f3',
    q: 'How are workers verified?',
    a: 'Every pro undergoes identity verification, skill assessment, and background checks before they can accept jobs on hirafi.',
  },
  {
    id: 'f4',
    q: 'What payment methods are accepted?',
    a: 'Currently we accept cash payment to the worker on job completion. Digital payments via card and Instapay are coming soon.',
  },
  {
    id: 'f5',
    q: 'How do I become a Pro?',
    a: 'Sign up with your phone number and select "I\'m a worker" on the welcome screen. Complete your profile and pass the verification steps.',
  },
];

export default function HelpSupport() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [openId, setOpenId] = useState(null);

  function toggle(id) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Help & Support</Text>
        <View style={styles.topBarEnd} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* FAQ header */}
        <View style={styles.faqHeader}>
          <Text style={styles.faqHeaderEmoji}>💬</Text>
          <Text style={styles.faqHeaderTitle}>Frequently Asked Questions</Text>
        </View>

        {/* Accordion items */}
        <View style={styles.accordionCard}>
          {FAQ.map((item, idx) => (
            <View key={item.id}>
              <Pressable
                style={({ pressed }) => [styles.accordionRow, pressed && { opacity: 0.7 }]}
                onPress={() => toggle(item.id)}
              >
                <Text style={styles.accordionQ}>{item.q}</Text>
                <Text style={[styles.accordionChevron, openId === item.id && styles.accordionChevronOpen]}>
                  ›
                </Text>
              </Pressable>
              {openId === item.id && (
                <View style={styles.accordionBody}>
                  <Text style={styles.accordionA}>{item.a}</Text>
                </View>
              )}
              {idx < FAQ.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Still need help? */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactSub}>Our team is available Sun–Thu, 9am – 10pm</Text>
          <View style={styles.contactBtns}>
            <Pressable style={styles.contactBtn}>
              <Text style={styles.contactBtnEmoji}>💬</Text>
              <Text style={styles.contactBtnText}>Chat with us</Text>
            </Pressable>
            <Pressable style={[styles.contactBtn, styles.contactBtnAlt]}>
              <Text style={styles.contactBtnEmoji}>📞</Text>
              <Text style={[styles.contactBtnText, styles.contactBtnTextAlt]}>Call support</Text>
            </Pressable>
          </View>
        </View>
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

  faqHeader: { alignItems: 'center', marginBottom: spacing.xl },
  faqHeaderEmoji: { fontSize: 36, marginBottom: spacing.sm },
  faqHeaderTitle: { fontSize: 17, fontWeight: '800', color: colors.text },

  accordionCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border, overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  accordionRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.md, gap: 8,
  },
  accordionQ: { flex: 1, fontSize: 14, fontWeight: '700', color: colors.text, lineHeight: 20 },
  accordionChevron: { fontSize: 22, color: colors.textMuted, transform: [{ rotate: '0deg' }] },
  accordionChevronOpen: { transform: [{ rotate: '90deg' }] },
  accordionBody: {
    paddingHorizontal: spacing.md, paddingBottom: spacing.md,
    backgroundColor: colors.bgMuted,
  },
  accordionA: { fontSize: 13, color: colors.textSub, lineHeight: 20 },
  divider: { height: 1, backgroundColor: colors.border },

  contactCard: {
    backgroundColor: colors.bgCard, borderRadius: radius.lg,
    padding: spacing.lg, borderWidth: 1, borderColor: colors.border,
  },
  contactTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 4 },
  contactSub: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.lg },
  contactBtns: { flexDirection: 'row', gap: 10 },
  contactBtn: {
    flex: 1, height: 50, borderRadius: radius.md,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    flexDirection: 'row', gap: 8,
  },
  contactBtnAlt: {
    backgroundColor: colors.bgMuted, borderWidth: 1, borderColor: colors.border,
  },
  contactBtnEmoji: { fontSize: 16 },
  contactBtnText: { fontSize: 14, fontWeight: '700', color: '#000' },
  contactBtnTextAlt: { color: colors.text },
});
