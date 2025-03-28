import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useCategoryManager } from '../../../category/presentation/categoryEditor/context/categoryManagerContext';
import { Product } from '../../domain/product';
import ProductCard from '../productCard/ProductCard';

interface SortableProductCardProps {
  product: Product;
  onRemove: (id: string) => void;
}

const SortableProductCard = ({ product, onRemove }: SortableProductCardProps) => {
  const { isEditMode } = useCategoryManager();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: product.id,
    disabled: !isEditMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div id={product.id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ProductCard product={product} onRemove={onRemove} />
    </div>
  );
};

export default SortableProductCard;
