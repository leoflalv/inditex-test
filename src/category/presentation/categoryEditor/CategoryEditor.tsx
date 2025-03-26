import classNames from 'classnames';

import { Product } from '../../../products/domain/product';
import { useProductModal } from '../../../products/presentation/context/ProductModalContext';
import ProductForm from '../../../products/presentation/productForm';
import Modal from '../../../shared/presentation/modal';
import { Category } from '../../domain/category';
import { useCategoryManager } from '../../usecase/useCategoryManager';
import CategoryRow from '../categoryRow';

import styles from './CategoryEditor.module.css';

interface CategoryEditorProps {
  category: Category;
  handleUpdate?: (category: Category) => void;
}

const CategoryEditor = ({ category: _category, handleUpdate = () => {} }: CategoryEditorProps) => {
  const { isOpen, closeModal } = useProductModal();
  const { category } = useCategoryManager();

  function handleSubmit(product: Partial<Product>) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={classNames('header1', styles.header)}>{category?.name}</h1>
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
