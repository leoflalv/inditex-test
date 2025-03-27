import Button from '../../../../../shared/presentation/ui/button';

import styles from './EditModeFooter.module.css';

interface EditModeFooterProps {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const EditModeFooter = ({ onSubmit, onCancel, isLoading }: EditModeFooterProps) => (
  <div data-testid="edit-mode-footer" className={styles.footer}>
    <div className={styles.footerContent}>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSubmit} loading={isLoading}>
        Save Changes
      </Button>
    </div>
  </div>
);

export default EditModeFooter;
