import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { CategoryChips } from "./CategoryChips";
import { colors, FONT_FAMILY } from "./theme";
import { Wordmark } from "./Wordmark";

export const hirafiSchema = z.object({
  tagline: z.string(),
  cta: z.string(),
  bgColor: zColor(),
  accentColor: zColor(),
});

export const HirafiIntro: React.FC<z.infer<typeof hirafiSchema>> = ({
  tagline,
  cta,
  bgColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Global fade-out on the last 15 frames.
  const opacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const taglineEnter = spring({
    frame: frame - 35,
    fps,
    config: { damping: 200 },
  });

  const ctaEnter = spring({
    frame: frame - 130,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${colors.bgCard}, ${bgColor})`,
      }}
    >
      <AbsoluteFill
        style={{
          opacity,
          padding: 80,
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <Wordmark delay={0} />

        <Sequence from={35} layout="none">
          <div
            style={{
              opacity: taglineEnter,
              transform: `translateY(${(1 - taglineEnter) * 20}px)`,
              fontFamily: FONT_FAMILY,
              fontSize: 52,
              fontWeight: 500,
              color: colors.textSub,
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            {tagline}
          </div>
        </Sequence>

        <Sequence from={60} layout="none">
          <CategoryChips delay={0} />
        </Sequence>

        <Sequence from={130} layout="none">
          <div
            style={{
              opacity: ctaEnter,
              transform: `scale(${0.85 + ctaEnter * 0.15})`,
              padding: "28px 56px",
              borderRadius: 999,
              background: accentColor,
              color: colors.bg,
              fontFamily: FONT_FAMILY,
              fontSize: 44,
              fontWeight: 700,
              boxShadow: `0 16px 48px ${accentColor}66`,
            }}
          >
            {cta}
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
