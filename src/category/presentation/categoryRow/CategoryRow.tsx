import classNames from 'classnames';

import { useProductModal } from '../../../products/presentation/context/ProductModalContext';
import ProductCard from '../../../products/presentation/productCard';
import { CategorySection } from '../../domain/category';
import { useCategoryManager } from '../../usecase/useCategoryManager';

import styles from './CategoryRow.module.css';
import AddButton from '../../../shared/presentation/addButton';

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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onRemove={removeProduct} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <AddButton onClick={() => openModal(section.index)} />
      </div>
    </div>
  );
};

export default CategoryRow;
