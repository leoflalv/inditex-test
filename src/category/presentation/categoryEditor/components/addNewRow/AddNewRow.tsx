import { useCategoryManager } from '../../context/categoryManagerContext';

import styles from './AddNewRow.module.css';

const AddNewRow = () => {
  const { isEditMode, addRow } = useCategoryManager();

  if (!isEditMode) return null;

  return (
    <div className={styles.addRowContainer} onClick={addRow}>
      <div className={styles.dottedBorder}>
        <span className={styles.addText}>+ Add new row</span>
      </div>
    </div>
  );
};

export default AddNewRow;
