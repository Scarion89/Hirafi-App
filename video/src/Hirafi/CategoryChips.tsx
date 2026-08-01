import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { categories, colors, FONT_FAMILY } from "./theme";

// Service category chips that stagger in one after another.
export const CategoryChips: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 20,
        maxWidth: 900,
      }}
    >
      {categories.map((cat, i) => {
        const enter = spring({
          frame: frame - delay - i * 6,
          fps,
          config: { damping: 200, mass: 0.5 },
        });
        return (
          <div
            key={cat.id}
            style={{
              opacity: enter,
              transform: `translateY(${(1 - enter) * 30}px) scale(${0.9 + enter * 0.1})`,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "20px 28px",
              borderRadius: 999,
              background: colors.bgCardAlt,
              border: `1px solid ${colors.borderLight}`,
              fontFamily: FONT_FAMILY,
              fontSize: 34,
              fontWeight: 600,
              color: colors.textSub,
            }}
          >
            <span style={{ fontSize: 40 }}>{cat.emoji}</span>
            {cat.name}
          </div>
        );
      })}
    </div>
  );
};
