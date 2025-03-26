import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Product } from '../../domain/product';
import ProductCard from '../productCard/ProductCard';

interface SortableProductCardProps {
  product: Product;
  onRemove: (id: string) => void;
}

const SortableProductCard = ({ product, onRemove }: SortableProductCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: product.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ProductCard product={product} onRemove={onRemove} />
    </div>
  );
};

export default SortableProductCard;
