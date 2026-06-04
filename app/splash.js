import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';

// Chevron path lengths (approx for a 100-unit viewBox)
const CHEVRON_LENGTH = 220;

const CHEVRONS = [
  { points: '0,88 50,18 100,88', color: '#5A341A', width: 18, delay: 0 },
  { points: '8,80 50,24 92,80',  color: '#B07946', width: 16, delay: 160 },
  { points: '16,72 50,30 84,72', color: '#E8A93C', width: 14, delay: 300 },
];

// Animated SVG polyline — draws in using strokeDashoffset
function AnimatedChevron({ points, color, strokeWidth, progress }) {
  const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);
  const dashOffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CHEVRON_LENGTH, 0],
  });
  return (
    <AnimatedPolyline
      points={points}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={`${CHEVRON_LENGTH} ${CHEVRON_LENGTH}`}
      strokeDashoffset={dashOffset}
    />
  );
}

export default function Splash() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Per-chevron draw progress
  const chevronProgress = useRef(CHEVRONS.map(() => new Animated.Value(0))).current;
  // Mark scale + opacity (after draw)
  const markScale   = useRef(new Animated.Value(0.88)).current;
  const markOpacity = useRef(new Animated.Value(0)).current;
  // Glow pulse
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const glowScale   = useRef(new Animated.Value(0.7)).current;
  // Wordmark
  const wordOpacity = useRef(new Animated.Value(0)).current;
  const wordY       = useRef(new Animated.Value(18)).current;
  // Arabic
  const arabicOpacity = useRef(new Animated.Value(0)).current;
  const arabicY       = useRef(new Animated.Value(12)).current;
  // Tagline
  const tagOpacity = useRef(new Animated.Value(0)).current;
  // Buttons
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const btnY       = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    // 1. Fade in mark container
    Animated.timing(markOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    Animated.spring(markScale, { toValue: 1, tension: 50, friction: 9, useNativeDriver: true }).start();

    // 2. Draw each chevron with stagger
    const chevronAnims = CHEVRONS.map((c, i) =>
      Animated.timing(chevronProgress[i], {
        toValue: 1,
        duration: 520,
        delay: c.delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false, // strokeDashoffset needs false
      })
    );

    // 3. After chevrons: glow + wordmark cascade
    const afterDraw = Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(glowOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(glowScale, { toValue: 1, tension: 30, friction: 8, useNativeDriver: true }),
      ]),
    ]);

    const wordAnim = Animated.sequence([
      Animated.delay(700),
      Animated.parallel([
        Animated.timing(wordOpacity, { toValue: 1, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(wordY, { toValue: 0, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]),
    ]);

    const arabicAnim = Animated.sequence([
      Animated.delay(900),
      Animated.parallel([
        Animated.timing(arabicOpacity, { toValue: 1, duration: 340, useNativeDriver: true }),
        Animated.timing(arabicY, { toValue: 0, duration: 340, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]),
    ]);

    const tagAnim = Animated.sequence([
      Animated.delay(1100),
      Animated.timing(tagOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]);

    const btnAnim = Animated.sequence([
      Animated.delay(1350),
      Animated.parallel([
        Animated.timing(btnOpacity, { toValue: 1, duration: 420, useNativeDriver: true }),
        Animated.spring(btnY, { toValue: 0, tension: 55, friction: 10, useNativeDriver: true }),
      ]),
    ]);

    // Glow loop after initial
    const glowLoop = Animated.sequence([
      Animated.delay(1800),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, { toValue: 0.55, duration: 1600, easing: Easing.inOut(Easing.sine), useNativeDriver: true }),
          Animated.timing(glowOpacity, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.sine), useNativeDriver: true }),
        ])
      ),
    ]);

    Animated.parallel([
      ...chevronAnims,
      afterDraw,
      wordAnim,
      arabicAnim,
      tagAnim,
      btnAnim,
      glowLoop,
    ]).start();
  }, []);

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom + 24 }]}>
      {/* Ambient glow behind mark */}
      <Animated.View
        style={[styles.glow, {
          opacity: glowOpacity,
          transform: [{ scale: glowScale }],
        }]}
      />

      <View style={styles.center}>
        {/* SVG Logo */}
        <Animated.View style={{ opacity: markOpacity, transform: [{ scale: markScale }], marginBottom: 28 }}>
          <Svg width={160} height={126} viewBox="-8 8 116 86">
            {CHEVRONS.map((c, i) => (
              <AnimatedChevron
                key={i}
                points={c.points}
                color={c.color}
                strokeWidth={c.width}
                progress={chevronProgress[i]}
              />
            ))}
          </Svg>
        </Animated.View>

        {/* Wordmark row */}
        <Animated.View style={[styles.wordmarkRow, { opacity: wordOpacity, transform: [{ translateY: wordY }] }]}>
          <Text style={styles.wordmark}>hirafi</Text>
          <Text style={styles.wordmarkArabic}>حرفي</Text>
        </Animated.View>

        <Animated.Text style={[styles.tagline, { opacity: tagOpacity }]}>
          HOME CRAFTED · TRUSTED HANDS
        </Animated.Text>
      </View>

      {/* Buttons */}
      <Animated.View style={[styles.bottom, { opacity: btnOpacity, transform: [{ translateY: btnY }] }]}>
        <Pressable
          onPress={() => router.replace('/auth/welcome')}
          style={({ pressed }) => [styles.btn, pressed && { opacity: 0.88 }]}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace('/auth/welcome')}
          style={({ pressed }) => [styles.btnOutline, pressed && { opacity: 0.75 }]}
        >
          <Text style={styles.btnOutlineText}>Already have an account? Log in</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  glow: {
    position: 'absolute',
    top: '22%',
    width: 340,
    height: 260,
    borderRadius: 180,
    backgroundColor: 'transparent',
    shadowColor: '#E8A93C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 100,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginBottom: 14,
  },
  wordmark: {
    fontSize: 56,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -2,
    lineHeight: 60,
  },
  wordmarkArabic: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 44,
  },
  tagline: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
  bottom: {
    width: '100%',
    paddingHorizontal: spacing.lg,
    gap: 12,
  },
  btn: {
    height: 58,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 0.3,
  },
  btnOutline: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlineText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
