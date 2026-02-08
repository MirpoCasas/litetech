interface ArrowIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export default function ArrowIcon({ className, width = 20, height = 9, color = '#9C73F7' }: ArrowIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 9" fill="none" className={className}>
      <path
        d="M15 0.75L18.75 4.5M18.75 4.5L15 8.25M18.75 4.5L0.75 4.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
