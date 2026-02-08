interface ArticleIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export default function ArticleIcon({ className, width = 15, height = 15, color = '#8C8C8C' }: ArticleIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 15 15" fill="none" className={className}>
      <path
        d="M3.16667 3.16667H8.5M3.16667 5.83333H11.1667M7.83333 8.5H11.1667M7.83333 11.1667H11.1667M0.5 13.4333V0.9C0.5 0.793913 0.542143 0.692172 0.617157 0.617157C0.692172 0.542143 0.793913 0.5 0.9 0.5H11.3347C11.4407 0.500093 11.5424 0.542297 11.6173 0.617333L13.716 2.716C13.7533 2.75327 13.7829 2.79754 13.803 2.84628C13.8232 2.89502 13.8335 2.94726 13.8333 3V13.4333C13.8333 13.4859 13.823 13.5379 13.8029 13.5864C13.7828 13.6349 13.7533 13.679 13.7162 13.7162C13.679 13.7533 13.6349 13.7828 13.5864 13.8029C13.5379 13.823 13.4859 13.8333 13.4333 13.8333H0.9C0.847471 13.8333 0.795457 13.823 0.746927 13.8029C0.698396 13.7828 0.654301 13.7533 0.617157 13.7162C0.580014 13.679 0.55055 13.6349 0.530448 13.5864C0.510346 13.5379 0.5 13.4859 0.5 13.4333Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1667 0.5V2.76667C11.1667 2.8192 11.177 2.87121 11.1971 2.91974C11.2172 2.96827 11.2467 3.01237 11.2838 3.04951C11.321 3.08665 11.3651 3.11612 11.4136 3.13622C11.4621 3.15632 11.5141 3.16667 11.5667 3.16667H13.8333"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.16666 8.5V11.1667H5.16666V8.5H3.16666Z"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
