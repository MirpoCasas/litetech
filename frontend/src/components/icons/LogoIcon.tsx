interface LogoIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export default function LogoIcon({ className, width = 29, height = 28, color = '#D8F34E' }: LogoIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 29 28" fill="none" className={className}>
      <rect x="28.1077" y="12.0684" width="3.86207" height="28.1077" transform="rotate(90 28.1077 12.0684)" fill={color} />
      <rect x="15.9927" y="28" width="3.87692" height="28" transform="rotate(-180 15.9927 28)" fill={color} />
      <rect width="3.8695" height="28.0539" transform="matrix(-0.708462 0.705749 -0.708462 -0.705749 25.3635 22.5342)" fill={color} />
      <rect width="3.8695" height="28.0539" transform="matrix(-0.708462 -0.705749 0.708462 -0.705749 5.48657 25.2646)" fill={color} />
    </svg>
  );
}
