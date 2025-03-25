import { FormEvent, useRef } from 'react';

import { Product } from '../../domain/product';

import styles from './ProductForm.module.css';

interface ProductFormProps {
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const ProductForm = ({ onSubmit, onCancel }: ProductFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: nameRef.current?.value || '',
      price: Number(priceRef.current?.value || 0),
      image: imageRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" ref={nameRef} defaultValue="" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          ref={priceRef}
          defaultValue=""
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image">Image URL:</label>
        <input type="url" id="image" name="image" ref={imageRef} defaultValue="" required />
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Create Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
