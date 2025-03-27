import { FormEvent, useRef } from 'react';

import ImageUpload from '../../../shared/presentation/imageUpload';
import Button from '../../../shared/presentation/ui/button';
import { useFileUpload } from '../../../shared/usecase/useFileUpload';
import { Product } from '../../domain/product';

import styles from './ProductForm.module.css';

interface ProductFormProps {
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const ProductForm = ({ onSubmit, onCancel }: ProductFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const { uploadFile, isUploading, uploadError, uploadedUrl } = useFileUpload();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: crypto.randomUUID(),
      name: nameRef.current?.value || '',
      price: Number(priceRef.current?.value || 0),
      image: uploadedUrl || '',
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
        <ImageUpload
          onFileSelect={uploadFile}
          isUploading={isUploading}
          error={uploadError}
          imageUrl={uploadedUrl}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUploading}>
          Create Product
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
