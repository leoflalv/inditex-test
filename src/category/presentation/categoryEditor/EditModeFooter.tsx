import { useCategoryManager } from '../../usecase/useCategoryManager';

import styles from './EditModeFooter.module.css';

const EditModeFooter = () => {
  const { saveChanges, cancelChanges } = useCategoryManager();

  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <button onClick={cancelChanges} className={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={saveChanges} className={styles.saveButton}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditModeFooter;
