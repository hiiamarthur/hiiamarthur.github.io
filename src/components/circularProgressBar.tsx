// components/CircularProgress.tsx
import { Component, createEffect } from 'solid-js';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const CircularProgress: Component<CircularProgressProps> = (props) => {
  const size = props.size || 100;
  const strokeWidth = props.strokeWidth || 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  const progress = () => {
    const value = Math.min(100, Math.max(0, props.value));
    return ((100 - value) / 100) * circumference;
  };

  return (
    <svg width={size} height={size}>
      <circle
        stroke="#eee"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke-width={strokeWidth}
      />
      <circle
        stroke={props.color || "#00ff99"}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke-width={strokeWidth}
        stroke-dasharray={`${circumference}`}
        stroke-dashoffset={progress()}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          "transition": "stroke-dashoffset 0.3s ease"
        }}
      />
    </svg>
  );
};

export default CircularProgress;