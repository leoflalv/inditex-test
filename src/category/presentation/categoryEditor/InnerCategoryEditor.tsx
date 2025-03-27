import classNames from 'classnames';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { EditIcon } from '../../../assets/icons';
import Button from '../../../shared/presentation/ui/button';
import { useUpdateCategory } from '../../usecase/useUpdateCategory';

import AddNewRow from './components/addNewRow';
import EditModeFooter from './components/editModeFooter';
import SortableRow from './components/sortableRow';
import ZoomController from './components/zoomController';
import { useCategoryManager } from './context/categoryManagerContext';
import useDragAndDrop from './hooks/useDragAndDrop';

import styles from './InnerCategoryEditor.module.css';

const InnerCategoryEditor = () => {
  const {
    category,
    zoom,
    moveRow,
    moveProductToAnotherPosition,
    isEditMode,
    setEditMode,
    cancelChanges,
    removeRow,
  } = useCategoryManager();

  const { handleDragEnd, handleDragOver, sensors } = useDragAndDrop({
    category: category!,
    moveRow,
    moveProductToAnotherPosition,
    removeSection: removeRow,
  });

  const { mutate: updateCategory, isPending } = useUpdateCategory();

  function handleSubmit() {
    updateCategory(category);
    setEditMode(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.topSectionContainer}>
        <h1 className={classNames('header1', styles.header)}>{category?.name}</h1>
        <Button
          data-testid="edit-mode-toggle"
          onClick={isEditMode ? cancelChanges : () => setEditMode(true)}
          variant="text"
        >
          <EditIcon size={30} className={isEditMode ? styles.activeEditButton : ''} />
        </Button>
      </div>
      <ZoomController />
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div
          className={classNames(styles.rowsContainer, {
            [styles.rowsEditMode]: isEditMode,
          })}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
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
          <AddNewRow />
        </div>
      </DndContext>

      {isEditMode && (
        <EditModeFooter onSubmit={handleSubmit} onCancel={cancelChanges} isLoading={isPending} />
      )}
    </div>
  );
};

export default InnerCategoryEditor;
