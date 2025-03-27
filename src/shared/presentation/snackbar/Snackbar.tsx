import { useEffect } from 'react';
import classNames from 'classnames';

import { CloseIcon } from '../../../assets/icons';
import Button from '../ui/button';

import styles from './Snackbar.module.css';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  autoHideDuration?: number;
}

export const Snackbar = ({ message, type, onClose, autoHideDuration = 5000 }: SnackbarProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration, onClose]);

  return (
    <div
      className={classNames(styles.snackbar, {
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      <span className={classNames('subtitle1', styles.text)}>{message}</span>
      <Button size="small" variant="text" onClick={onClose}>
        <CloseIcon size={14} />
      </Button>
    </div>
  );
};
