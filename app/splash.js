import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Easing, Platform } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';

const CHEVRON_LENGTH = 220;
const CHEVRONS = [
  { points: '0,88 50,18 100,88', color: '#5A341A', width: 18, delay: 0 },
  { points: '8,80 50,24 92,80',  color: '#B07946', width: 16, delay: 160 },
  { points: '16,72 50,30 84,72', color: '#E8A93C', width: 14, delay: 300 },
];

// Static logo for web (no animated SVG — avoids collapsable crash)
function StaticMark({ size = 160 }) {
  return (
    <Svg width={size} height={size * 0.79} viewBox="-8 8 116 86">
      {CHEVRONS.map((c, i) => (
        <Polyline
          key={i}
          points={c.points}
          fill="none"
          stroke={c.color}
          strokeWidth={c.width}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}

// Animated draw-in for native only
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
  const isWeb = Platform.OS === 'web';

  const chevronProgress = useRef(CHEVRONS.map(() => new Animated.Value(isWeb ? 1 : 0))).current;
  const markOpacity  = useRef(new Animated.Value(0)).current;
  const markScale    = useRef(new Animated.Value(0.88)).current;
  const glowOpacity  = useRef(new Animated.Value(0)).current;
  const glowScale    = useRef(new Animated.Value(0.7)).current;
  const wordOpacity  = useRef(new Animated.Value(0)).current;
  const wordY        = useRef(new Animated.Value(18)).current;
  const arabicOpacity = useRef(new Animated.Value(0)).current;
  const arabicY      = useRef(new Animated.Value(12)).current;
  const tagOpacity   = useRef(new Animated.Value(0)).current;
  const btnOpacity   = useRef(new Animated.Value(0)).current;
  const btnY         = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    Animated.timing(markOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    Animated.spring(markScale, { toValue: 1, tension: 50, friction: 9, useNativeDriver: true }).start();

    const chevronAnims = isWeb
      ? [] // skip SVG draw-in on web
      : CHEVRONS.map((c, i) =>
          Animated.timing(chevronProgress[i], {
            toValue: 1,
            duration: 520,
            delay: c.delay,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false,
          })
        );

    const glowAnim = Animated.sequence([
      Animated.delay(isWeb ? 100 : 200),
      Animated.parallel([
        Animated.timing(glowOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(glowScale, { toValue: 1, tension: 30, friction: 8, useNativeDriver: true }),
      ]),
    ]);

    const wordAnim = Animated.sequence([
      Animated.delay(isWeb ? 200 : 700),
      Animated.parallel([
        Animated.timing(wordOpacity, { toValue: 1, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(wordY, { toValue: 0, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]),
    ]);

    const arabicAnim = Animated.sequence([
      Animated.delay(isWeb ? 300 : 900),
      Animated.parallel([
        Animated.timing(arabicOpacity, { toValue: 1, duration: 340, useNativeDriver: true }),
        Animated.timing(arabicY, { toValue: 0, duration: 340, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]),
    ]);

    const tagAnim = Animated.sequence([
      Animated.delay(isWeb ? 400 : 1100),
      Animated.timing(tagOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]);

    const btnAnim = Animated.sequence([
      Animated.delay(isWeb ? 500 : 1350),
      Animated.parallel([
        Animated.timing(btnOpacity, { toValue: 1, duration: 420, useNativeDriver: true }),
        Animated.spring(btnY, { toValue: 0, tension: 55, friction: 10, useNativeDriver: true }),
      ]),
    ]);

    const glowLoop = Animated.sequence([
      Animated.delay(isWeb ? 1200 : 1800),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, { toValue: 0.55, duration: 1600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(glowOpacity, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        ])
      ),
    ]);

    Animated.parallel([
      ...chevronAnims,
      glowAnim,
      wordAnim,
      arabicAnim,
      tagAnim,
      btnAnim,
      glowLoop,
    ]).start();
  }, []);

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom + 24 }]}>
      <Animated.View style={[styles.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]} />

      <View style={styles.center}>
        <Animated.View style={{ opacity: markOpacity, transform: [{ scale: markScale }], marginBottom: 28 }}>
          {isWeb ? (
            <StaticMark size={160} />
          ) : (
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
          )}
        </Animated.View>

        <Animated.View style={[styles.wordmarkRow, { opacity: wordOpacity, transform: [{ translateY: wordY }] }]}>
          <Text style={styles.wordmark}>hirafi</Text>
          <Animated.Text style={[styles.wordmarkArabic, { opacity: arabicOpacity, transform: [{ translateY: arabicY }] }]}>
            حرفي
          </Animated.Text>
        </Animated.View>

        <Animated.Text style={[styles.tagline, { opacity: tagOpacity }]}>
          HOME CRAFTED · TRUSTED HANDS
        </Animated.Text>
      </View>

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
    backgroundColor: colors.dark,
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
    color: colors.textLight,
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
    color: colors.textLightMuted,
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
    color: colors.textLightMuted,
    fontWeight: '500',
  },
});
