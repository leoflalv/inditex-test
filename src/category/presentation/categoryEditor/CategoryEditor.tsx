import { Product } from '../../../products/domain/product';
import { useProductModal } from '../../../products/presentation/context/ProductModalContext';
import ProductForm from '../../../products/presentation/productForm';
import { Modal } from '../../../shared/components/modal/Modal';
import { Category } from '../../domain/category';
import CategoryRow from '../categoryRow';

import styles from './CategoryEditor.module.css';

interface CategoryEditorProps {
  category: Category;
  handleUpdate?: (category: Category) => void;
}

const CategoryEditor = ({ category, handleUpdate = () => {} }: CategoryEditorProps) => {
  const { isOpen, closeModal } = useProductModal();

  function handleSubmit(product: Partial<Product>) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>CategoryEditor</h1>
      <div className={styles.rowsContainer}>
        {category?.sections.map((section) => <CategoryRow key={section.index} section={section} />)}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} title="Add New Product">
        <ProductForm onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default CategoryEditor;
