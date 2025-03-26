import { BaseIconProps } from './BaseIcon';

export const CloseIcon = ({ color = 'white', size = 24, className }: BaseIconProps) => (
  <svg viewBox="0 0 50 50" width={size} height={size} fill={color} className={className}>
    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
  </svg>
);
