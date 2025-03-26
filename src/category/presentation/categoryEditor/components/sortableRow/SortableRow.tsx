import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { CategorySection } from '../../../category/domain/category';
import CategoryRow from '../categoryRow/CategoryRow';

interface SortableRowProps {
  section: CategorySection;
  id: string;
}

const SortableRow = ({ section, id }: SortableRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
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
