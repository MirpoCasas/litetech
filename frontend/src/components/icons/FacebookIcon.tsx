interface FacebookIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export default function FacebookIcon({ className, width = 24, height = 24, color = 'currentColor' }: FacebookIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M7 11.5H9.5L10.5 7.5H7V5.5C7 4.47 7 3.5 9 3.5H10.5V0.14C10.174 0.0970001 8.943 0 7.643 0C4.928 0 3 1.657 3 4.7V7.5H0V11.5H3V20H7V11.5Z" fill={color} />
    </svg>

  );
}
