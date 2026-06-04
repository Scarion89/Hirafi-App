import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Easing, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../constants/theme';

export default function Pending() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.08, duration: 1200, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      <View style={styles.content}>
        <Animated.View style={[styles.markOuter, { transform: [{ scale: pulse }] }]}>
          <View style={styles.markInner}>
            <Text style={styles.markText}>H</Text>
          </View>
        </Animated.View>

        <Text style={styles.title}>Application under review</Text>
        <Text style={styles.titleAr}>طلبك قيد المراجعة</Text>
        <Text style={styles.body}>
          We'll notify you within 24 hours once your account has been verified and approved.{'\n\n'}
          هنبعتلك إشعار خلال ٢٤ ساعة لما حسابك يتراجع ويتفعل.
        </Text>

        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusIcon}>✓</Text>
            <Text style={styles.statusLabel}>Identity verified</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusIcon}>✓</Text>
            <Text style={styles.statusLabel}>Skills confirmed</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusIconPending}>⏳</Text>
            <Text style={styles.statusLabelPending}>Documents under review</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.supportBtn} onPress={() => router.push('/profile/help')}>
          <Text style={styles.supportText}>Contact support · تواصل معنا</Text>
        </Pressable>
        <Pressable style={styles.homeLink} onPress={() => router.replace('/worker-app')}>
          <Text style={styles.homeLinkText}>Go to dashboard</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark, paddingHorizontal: spacing.xl, justifyContent: 'space-between' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  markOuter: {
    width: 110, height: 110, borderRadius: 28,
    backgroundColor: 'rgba(232,169,60,0.12)',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xxl,
  },
  markInner: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  markText: { fontSize: 36, fontWeight: '900', color: '#000' },
  title: { fontSize: 24, fontWeight: '900', color: colors.textLight, textAlign: 'center', marginBottom: 4 },
  titleAr: { fontSize: 15, color: colors.textLightMuted, textAlign: 'center', marginBottom: spacing.lg },
  body: { fontSize: 14, color: colors.textLightMuted, textAlign: 'center', lineHeight: 22, marginBottom: spacing.xl },
  statusCard: {
    width: '100%', backgroundColor: colors.darkCard, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.borderLight, gap: 10,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  statusIcon: { fontSize: 16, color: colors.success, width: 24 },
  statusLabel: { fontSize: 14, fontWeight: '600', color: colors.textLight },
  statusIconPending: { fontSize: 16, width: 24, textAlign: 'center' },
  statusLabelPending: { fontSize: 14, fontWeight: '600', color: colors.textLightMuted },
  actions: { gap: spacing.md, paddingBottom: spacing.lg },
  supportBtn: {
    height: 52, borderRadius: radius.lg, borderWidth: 1.5, borderColor: colors.borderLight,
    alignItems: 'center', justifyContent: 'center',
  },
  supportText: { fontSize: 14, fontWeight: '700', color: colors.textLightSub },
  homeLink: { alignItems: 'center', paddingVertical: spacing.sm },
  homeLinkText: { fontSize: 13, color: colors.textLightMuted },
});
