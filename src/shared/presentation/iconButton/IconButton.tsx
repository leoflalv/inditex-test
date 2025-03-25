import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './IconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, className = '', ...props }) => (
  <button
    title="Edit"
    type="button"
    className={classNames(styles.iconButton, className)}
    {...props}
  >
    {icon}
  </button>
);

export default IconButton;
