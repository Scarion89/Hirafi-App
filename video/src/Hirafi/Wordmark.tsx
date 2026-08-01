import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, FONT_FAMILY } from "./theme";

// The Hirafi wordmark: an amber "wrench" glyph badge + the name springing in.
export const Wordmark: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.6 },
  });

  const scale = interpolate(enter, [0, 1], [0.7, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const translateY = interpolate(enter, [0, 1], [40, 0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 44,
          background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.primary})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 20px 60px ${colors.primary}55`,
        }}
      >
        <span style={{ fontSize: 96, lineHeight: 1 }}>🔧</span>
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 120,
          fontWeight: 800,
          letterSpacing: -2,
          color: colors.text,
        }}
      >
        Hira<span style={{ color: colors.primary }}>fi</span>
      </div>
    </div>
  );
};
