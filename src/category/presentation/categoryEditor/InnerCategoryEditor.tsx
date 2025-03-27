import classNames from 'classnames';
import {
  closestCorners,
  DndContext,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { EditIcon } from '../../../assets/icons';
import Button from '../../../shared/presentation/ui/button';

import AddNewRow from './components/addNewRow';
import EditModeFooter from './components/editModeFooter';
import SortableRow from './components/sortableRow';
import { useCategoryManager } from './context/categoryManagerContext';
import useDragAndDrop from './hooks/useDragAndDrop';

import styles from './InnerCategoryEditor.module.css';

export const TRASH_ID = 'void';

const InnerCategoryEditor = () => {
  const { category, moveRow, moveProductToAnotherPosition, isEditMode, setEditMode } =
    useCategoryManager();
  const { handleDragEnd, handleDragOver, sensors } = useDragAndDrop({
    category: category!,
    moveRow,
    moveProductToAnotherPosition,
  });

  return (
    <div className={styles.container}>
      <div className={styles.topSectionContainer}>
        <h1 className={classNames('header1', styles.header)}>{category?.name}</h1>
        <Button
          data-testid="edit-mode-toggle"
          onClick={() => setEditMode(!isEditMode)}
          variant="text"
        >
          <EditIcon size={30} className={isEditMode ? styles.activeEditButton : ''} />
        </Button>
      </div>
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

      {isEditMode && <EditModeFooter />}
    </div>
  );
};

export default InnerCategoryEditor;
