import classNames from 'classnames';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { useProductModal } from '../../../products/presentation/context/ProductModalContext';
import SortableProductCard from '../../../products/presentation/sortableProductCard/SortableProductCard';
import AddButton from '../../../shared/presentation/addButton';
import { CategorySection } from '../../domain/category';
import { useCategoryManager } from '../../usecase/useCategoryManager';

import styles from './CategoryRow.module.css';

interface CategoryRowProps {
  section: CategorySection;
}

const CategoryRow = ({ section }: CategoryRowProps) => {
  const { removeProduct } = useCategoryManager();
  const { template, products } = section;

  const { openModal } = useProductModal();

  return (
    <div className={styles.categoryRowWrapper}>
      <div
        className={classNames(styles.categoryRow, {
          [styles.alignLeft]: !template || template === 'left',
          [styles.alignCenter]: template === 'center',
          [styles.alignRight]: template === 'right',
        })}
      >
        <SortableContext items={products.map((p) => p.id)} strategy={horizontalListSortingStrategy}>
          {products.map((product) => (
            <SortableProductCard key={product.id} product={product} onRemove={removeProduct} />
          ))}
        </SortableContext>
      </div>
      <div className={styles.buttonContainer}>
        <AddButton onClick={() => openModal(section.index)} />
      </div>
    </div>
  );
};

export default CategoryRow;
