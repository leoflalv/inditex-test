import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { TEMP_PRODUCT_ID } from '../../../../../products/domain/constants';

const TempCard = () => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: TEMP_PRODUCT_ID,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ width: '20rem', height: '25rem' }} />
    </div>
  );
};

export default TempCard;
