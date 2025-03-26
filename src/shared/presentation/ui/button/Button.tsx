import { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Button.module.css';

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error';
export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  children?: ReactNode;
  classes?: string;
}

const Button = ({
  color = 'primary',
  variant = 'contained',
  size = 'medium',
  startIcon,
  endIcon,
  fullWidth = false,
  loading = false,
  className = '',
  classes = '',
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[`button-${color}`],
    styles[`button-${variant}`],
    styles[`button-${size}`],
    fullWidth ? styles.buttonFullWidth : '',
    loading ? styles.buttonLoading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames(buttonClasses, classes)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </button>
  );
};

export default Button;
