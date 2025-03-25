import classNames from 'classnames';

import { useProductModal } from '../../../products/presentation/context/ProductModalContext';
import ProductCard from '../../../products/presentation/productCard';
import { CategorySection } from '../../domain/category';

import styles from './CategoryRow.module.css';

interface CategoryRowProps {
  section: CategorySection;
  onAddProduct?: () => void; // If you want to handle "Add" outside
  onRemoveProduct?: (productId: string) => void;
}

const CategoryRow = ({ section, onAddProduct, onRemoveProduct }: CategoryRowProps) => {
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
          <ProductCard key={product.id} product={product} onRemove={() => {}} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button
          title="Add Product"
          className={styles.addButton}
          onClick={() => openModal(section.index)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CategoryRow;
