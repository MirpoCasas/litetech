interface UploadIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export default function UploadIcon({ className, width = 24, height = 24, color = 'currentColor' }: UploadIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 19V5M12 5L5 12M12 5L19 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
