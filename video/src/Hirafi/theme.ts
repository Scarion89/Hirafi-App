// Design tokens mirrored from the Hirafi app (constants/theme.js — dark amber theme).
// Keep these in sync with the app so promo videos stay on-brand.
export const colors = {
  bg: "#141008",
  bgCard: "#1E1608",
  bgCardAlt: "#251C0A",
  bgMuted: "#2A2010",

  primary: "#C8920A", // amber gold
  primaryLight: "#D4A830",
  primaryMuted: "#3D2C08",

  text: "#FFFFFF",
  textSub: "#C8B89A",
  textMuted: "#7A6A52",

  border: "#2E2410",
  borderLight: "#3A2E18",
  success: "#4CAF50",
};

export const FONT_FAMILY =
  "SF Pro Display, SF Pro Text, Helvetica, Arial, sans-serif";

// Service categories, matching data/services.js in the app.
export const categories = [
  { id: "plumbing", name: "Plumbing", emoji: "🔧" },
  { id: "ac", name: "AC Service", emoji: "❄️" },
  { id: "electrical", name: "Electrical", emoji: "💡" },
  { id: "cleaning", name: "Cleaning", emoji: "🧹" },
  { id: "carpentry", name: "Carpentry", emoji: "🪚" },
  { id: "painting", name: "Painting", emoji: "🎨" },
];
