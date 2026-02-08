interface XIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export default function XIcon({ className, width = 24, height = 24, color = 'currentColor' }: XIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M14.9636 0H17.8771L11.512 7.20103L19 17H13.1361L8.54397 11.057L3.28953 17H0.37431L7.18236 9.29769L0 0H6.01099L10.1619 5.43215L14.9619 0H14.9636ZM13.9411 15.2738H15.5555L5.13466 1.63549H3.40226L13.9411 15.2738Z" fill={color} />
    </svg>
  );
}
