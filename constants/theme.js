export const colors = {
  // Customer light theme (primary)
  bg: '#F5EFE3',           // bone - customer screen background
  bgCard: '#FFFFFF',        // white cards
  bgCardAlt: '#F0E8D8',    // slightly darker
  bgMuted: 'rgba(232,169,60,0.12)',  // amber tint for strips

  // Dark / Pro theme
  dark: '#0E0B08',          // ink
  darkCard: 'rgba(245,239,227,0.08)',
  darkMuted: 'rgba(245,239,227,0.12)',

  // Brand
  primary: '#E8A93C',       // marigold
  primaryLight: '#F0BD5A',
  primaryMuted: 'rgba(232,169,60,0.2)',
  copper: '#B07946',
  walnut: '#5A341A',

  // Text (on light bg)
  text: '#0E0B08',           // ink
  textSub: '#5A341A',        // walnut
  textMuted: '#9C9489',      // mortar

  // Text (on dark bg)
  textLight: '#F5EFE3',      // bone
  textLightSub: 'rgba(245,239,227,0.65)',
  textLightMuted: 'rgba(245,239,227,0.4)',

  border: 'rgba(0,0,0,0.06)',
  borderLight: 'rgba(245,239,227,0.1)',

  success: '#7A8C6A',       // sage
  successBg: 'rgba(122,140,106,0.15)',
  danger: '#A14B36',        // brick
  dangerBg: 'rgba(161,75,54,0.12)',
  overlay: 'rgba(0,0,0,0.5)',
};
export const spacing = { xs:4, sm:8, md:12, lg:16, xl:24, xxl:32 };
export const radius = { sm:8, md:12, lg:16, xl:20, xxl:24, pill:999 };
export const shadow = {
  card: { shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.08, shadowRadius:12, elevation:4 },
  glow: { shadowColor:'#E8A93C', shadowOffset:{width:0,height:0}, shadowOpacity:0.35, shadowRadius:20, elevation:8 },
};
