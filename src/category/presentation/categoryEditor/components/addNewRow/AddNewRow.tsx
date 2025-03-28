import { TEMP_PRODUCT_ID } from '../../../../../products/domain/constants';
import { useCategoryManager } from '../../context/categoryManagerContext';

import styles from './AddNewRow.module.css';

const AddNewRow = () => {
  const { isEditMode, addRow, category } = useCategoryManager();

  const existTempRow = category.sections
    .slice(-1)[0]
    .products.some((p) => p.id === TEMP_PRODUCT_ID);

  if (!isEditMode || existTempRow) return null;

  return (
    <div data-testid="add-new-row-button" onClick={addRow} className={styles.addRowContainer}>
      <div className={styles.dottedBorder}>
        <span className={styles.addText}>+ Add new row</span>
      </div>
    </div>
  );
};

export default AddNewRow;
