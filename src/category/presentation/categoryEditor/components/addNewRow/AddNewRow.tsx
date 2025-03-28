import { useCategoryManager } from '../../context/categoryManagerContext';

import styles from './AddNewRow.module.css';

const AddNewRow = () => {
  const { isEditMode, addRow } = useCategoryManager();

  if (!isEditMode) return null;

  return (
    <div data-testid="add-new-row-button" onClick={addRow} className={styles.addRowContainer}>
      <div className={styles.dottedBorder}>
        <span className={styles.addText}>+ Add new row</span>
      </div>
    </div>
  );
};

export default AddNewRow;
