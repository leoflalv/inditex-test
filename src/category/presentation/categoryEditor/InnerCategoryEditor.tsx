import classNames from 'classnames';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { EditIcon } from '../../../assets/icons';
import { Product } from '../../../products/domain/product';
import { useProductModal } from '../../../products/presentation/context/ProductModalContext';
import ProductForm from '../../../products/presentation/productForm';
import IconButton from '../../../shared/presentation/iconButton';
import Modal from '../../../shared/presentation/ui/modal';

import EditModeFooter from './components/editModeFooter';
import SortableRow from './components/sortableRow';
import { useCategoryManager } from './context/categoryManagerContext';
import useDragAndDrop from './hooks/useDragAndDrop';

import styles from './InnerCategoryEditor.module.css';

const InnerCategoryEditor = () => {
  const { isOpen, closeModal } = useProductModal();
  const { category, moveRow, moveProductToAnotherPosition, isEditMode, setEditMode } =
    useCategoryManager();
  const { handleDragEnd, handleDragOver, sensors } = useDragAndDrop({
    category: category!,
    moveRow,
    moveProductToAnotherPosition,
  });

  function handleSubmit(product: Partial<Product>) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topSectionContainer}>
        <h1 className={classNames('header1', styles.header)}>{category?.name}</h1>
        <IconButton onClick={() => setEditMode(!isEditMode)} icon={<EditIcon />} />
      </div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <div className={styles.rowsContainer}>
          <SortableContext
            items={category?.sections.map((section) => `row-${section.id}`) || []}
            strategy={verticalListSortingStrategy}
          >
            <div>
              {category?.sections.map((section) => (
                <SortableRow key={section.id} id={`row-${section.id}`} section={section} />
              ))}
            </div>
          </SortableContext>
        </div>
      </DndContext>

      <Modal isOpen={isOpen} onClose={closeModal} title="Add New Product">
        <ProductForm onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
      {isEditMode && <EditModeFooter />}
    </div>
  );
};

export default InnerCategoryEditor;
