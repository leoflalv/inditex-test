import Button from '../../../../../shared/presentation/ui/button';
import { useCategoryManager } from '../../context/categoryManagerContext';

import styles from './EditModeFooter.module.css';

const EditModeFooter = () => {
  const { saveChanges, cancelChanges } = useCategoryManager();

  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <Button variant="outlined" onClick={cancelChanges} className={styles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={saveChanges} className={styles.saveButton}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditModeFooter;
