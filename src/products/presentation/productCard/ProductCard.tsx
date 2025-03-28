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
    <article data-testid={`product-card-${product.id}`} className={styles.container}>
      <div className={styles.productCard}>
        <figure className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
        </figure>
        <div className={styles.productDetails}>
          <h2 title={product.name} className="header2">
            {product.name}
          </h2>
          <p title={`Price: ${product.price.toFixed(2)}`} className="subtitle">
            <strong>Price:</strong> {`${product.price.toFixed(2)} €`}
          </p>
        </div>
        {onRemove && isEditMode && (
          <RemoveButton onClick={() => onRemove(product.id)} classes={styles.removeButton} />
        )}
      </div>
    </article>
  );
};

export default ProductCard;
