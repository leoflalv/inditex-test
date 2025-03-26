import { Product } from '../../domain/product';

import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onRemove?: (id: string) => void;
}

const ProductCard = ({ product, onRemove = () => {} }: ProductCardProps) => (
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
      {onRemove && (
        <button
          className={styles.removeButton}
          onClick={() => onRemove(product.id)}
          aria-label="Remove product"
        >
          <span>X</span>
        </button>
      )}
    </div>
  </div>
);

export default ProductCard;
