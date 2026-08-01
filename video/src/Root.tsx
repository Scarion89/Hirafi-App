import "./index.css";
import { Composition } from "remotion";
import { HirafiIntro, hirafiSchema } from "./Hirafi/HirafiIntro";
import { colors } from "./Hirafi/theme";

// Each <Composition> is an entry in the Remotion Studio sidebar.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/*
        Hirafi promo intro — portrait 1080x1920, ideal for app stores,
        Reels / Stories / TikTok. Render with:
        npx remotion render HirafiIntro out/hirafi-intro.mp4
      */}
      <Composition
        id="HirafiIntro"
        component={HirafiIntro}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        schema={hirafiSchema}
        defaultProps={{
          tagline: "Vetted local pros, booked in minutes.",
          cta: "Book a pro now",
          bgColor: colors.bg,
          accentColor: colors.primary,
        }}
      />
    </>
  );
};
