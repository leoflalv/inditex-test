import { useCategoryManager } from '../../../category/presentation/categoryEditor/context/categoryManagerContext';
import RemoveButton from '../../../shared/presentation/removeButton/RemoveButton';
import { Product } from '../../domain/product';

import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onRemove?: (id: string) => void;
}

const ProductCard = ({ product, onRemove = () => {} }: ProductCardProps) => {
  const { isEditMode } = useCategoryManager();

  return (
    <div className={styles.productCardContainer}>
      <div className={styles.productCard}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
        </div>
        <div className={styles.productDetails}>
          <h2 className="header2">{product.name}</h2>
          <p className="subtitle">
            <strong>Price:</strong> {`${product.price.toFixed(2)} €`}
          </p>
        </div>
        {onRemove && isEditMode && (
          <RemoveButton onClick={() => onRemove(product.id)} classes={styles.removeButton} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
