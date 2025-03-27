import classNames from 'classnames';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import ProductForm from '../../../../../products/presentation/productForm';
import SortableProductCard from '../../../../../products/presentation/sortableProductCard';
import AddButton from '../../../../../shared/presentation/addButton';
import { useModal } from '../../../../../shared/presentation/ui/modal';
import { CategorySection, Template } from '../../../../domain/category';
import { useCategoryManager } from '../../context/categoryManagerContext';

import styles from './CategoryRow.module.css';
import Select from '../../../../../shared/presentation/ui/select';

interface CategoryRowProps {
  section: CategorySection;
}

const CategoryRow = ({ section }: CategoryRowProps) => {
  const { isEditMode, removeProduct, addProduct, modifyRowTemplate } = useCategoryManager();
  const { template, products } = section;

  const { openModal, closeModal } = useModal();

  const fullSection = products.length === 3;

  function handleAddProduct() {
    openModal(
      'Add New Product',
      <ProductForm
        onSubmit={(newProduct) => {
          addProduct(newProduct, section.index);
          closeModal();
        }}
        onCancel={closeModal}
      />,
    );
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles.alignLeft]: !template || template === 'left',
        [styles.alignCenter]: template === 'center',
        [styles.alignRight]: template === 'right',
        [styles.editMode]: isEditMode,
      })}
    >
      <div className={styles.rowContainer}>
        <div className={styles.categoryRow}>
          <SortableContext
            items={products.map((p) => p.id)}
            strategy={horizontalListSortingStrategy}
          >
            {products.map((product) => (
              <SortableProductCard key={product.id} product={product} onRemove={removeProduct} />
            ))}
          </SortableContext>
        </div>
      </div>
      {isEditMode && (
        <div className={styles.buttonContainer}>
          <Select
            value={template}
            items={[
              { value: 'left', label: 'Left' },
              { value: 'center', label: 'Center' },
              { value: 'right', label: 'Right' },
            ]}
            onChange={(template) => modifyRowTemplate(section.index, template as Template)}
          />
          <AddButton onClick={handleAddProduct} disabled={fullSection} />
        </div>
      )}
    </div>
  );
};

export default CategoryRow;
