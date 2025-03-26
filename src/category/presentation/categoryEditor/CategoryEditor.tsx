import classNames from 'classnames';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Product } from '../../../products/domain/product';
import { useProductModal } from '../../../products/presentation/context/ProductModalContext';
import ProductForm from '../../../products/presentation/productForm';
import Modal from '../../../shared/presentation/ui/modal';
import { useCategoryManager } from '../../usecase/useCategoryManager';
import SortableRow from '../sortableRow/SortableRow';

import useDragAndDrop from './hooks/useDragAndDrop';

import styles from './CategoryEditor.module.css';

const CategoryEditor = () => {
  const { isOpen, closeModal } = useProductModal();
  const { category, moveRow, moveProductToAnotherPosition } = useCategoryManager();
  const { handleDragEnd, handleDragOver, sensors } = useDragAndDrop({
    category: category!,
    moveRow,
    moveProductToAnotherPosition,
  });

  function handleSubmit(product: Partial<Product>) {
    console.log(product);
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={classNames('header1', styles.header)}>{category?.name}</h1>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <div className={styles.rowsContainer}>
          <SortableContext
            items={category?.sections.map((section) => `row-${section.id}`) || []}
            strategy={verticalListSortingStrategy}
          >
            {category?.sections.map((section) => (
              <SortableRow key={section.id} id={`row-${section.id}`} section={section} />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      <Modal isOpen={isOpen} onClose={closeModal} title="Add New Product">
        <ProductForm onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default CategoryEditor;
