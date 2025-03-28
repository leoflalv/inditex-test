import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { CategorySection } from '../../../../domain/category';
import { useCategoryManager } from '../../context/categoryManagerContext';
import CategoryRow from '../categoryRow/CategoryRow';

interface SortableRowProps {
  section: CategorySection;
  id: string;
}

const SortableRow = ({ section, id }: SortableRowProps) => {
  const { isEditMode } = useCategoryManager();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !isEditMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CategoryRow section={section} />
    </div>
  );
};

export default SortableRow;
