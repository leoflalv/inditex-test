import { ReactNode } from 'react';

import { CloseIcon } from '../../../../assets/icons';
import Button from '../button';
import { useModal } from './ModalContext';

import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const { closeModal } = useModal();

  if (!isOpen) return null;

  function handleClose() {
    if (onClose) onClose();
    closeModal();
  }

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <Button variant="text" onClick={handleClose}>
            <CloseIcon className={styles.closeIcon} />
          </Button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
