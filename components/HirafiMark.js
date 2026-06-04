import React from 'react';
import Svg, { Polyline } from 'react-native-svg';

// Three-chevron hirafi mark
// Outer = dark brown, middle = mid brown, inner = bright amber
// Each chevron rises 6u and narrows 8u (4u per side) from the one below
// strokeLinecap/Join = round for the "tools laid by hand" feel

const CHEVRONS = [
  { points: '0,88 50,18 100,88', color: '#5A341A', width: 18 },
  { points: '8,80 50,24 92,80',  color: '#B07946', width: 16 },
  { points: '16,72 50,30 84,72', color: '#E8A93C', width: 14 },
];

export default function HirafiMark({ size = 80, style }) {
  return (
    <Svg
      width={size}
      height={size * 0.78}
      viewBox="0 0 100 100"
      style={style}
    >
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
