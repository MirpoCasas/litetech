interface CloseIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

export default function CloseIcon({ className, width = 48, height = 48, color = 'currentColor', strokeWidth = 3 }: CloseIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" className={className}>
      <line x1="14" y1="14" x2="34" y2="34" stroke={color} strokeWidth={strokeWidth} />
      <line x1="34" y1="14" x2="14" y2="34" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}
