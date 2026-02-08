interface ChevronIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export default function ChevronIcon({ className, width = 24, height = 24, color = '#9C73F7' }: ChevronIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
