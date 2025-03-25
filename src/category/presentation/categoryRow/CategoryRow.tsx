import classNames from 'classnames';

import ProductCard from '../../../products/presentation/ProductCard';
import { CategorySection } from '../../domain/category';

import styles from './CategoryRow.module.css';

interface CategoryRowProps {
  section: CategorySection;
  onAddProduct?: () => void; // If you want to handle "Add" outside
  onRemoveProduct?: (productId: string) => void;
}

const CategoryRow = ({ section, onAddProduct, onRemoveProduct }: CategoryRowProps) => {
  const a = 2;
  const { template, products } = section;

  return (
    <div className={styles.categoryRowWrapper}>
      <div
        className={classNames(
          styles.categoryRow,
          template?.alignment === 'left' && styles.alignLeft,
          template?.alignment === 'center' && styles.alignCenter,
          template?.alignment === 'right' && styles.alignRight,
        )}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onRemove={() => {}} />
        ))}
      </div>
      {/* Show an add button (if desired) */}
      <button className={styles.addButton} onClick={() => {}}>
        Add Product
      </button>
    </div>
  );
};

export default CategoryRow;
