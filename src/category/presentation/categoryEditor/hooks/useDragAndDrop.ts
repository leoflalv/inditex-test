import {
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { Category } from '../../../domain/category';

interface UseDragAndDropProps {
  category: Category;
  moveRow: (oldIndex: number, newIndex: number) => void;
  moveProductToAnotherPosition: (productId: string, overProductId: string) => void;
}

function useDragAndDrop({ category, moveRow, moveProductToAnotherPosition }: UseDragAndDropProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const isRow = active.id.toString().startsWith('row-');

    if (isRow) {
      const oldIndex = category.sections.findIndex((section) => `row-${section.id}` === active.id);
      const newIndex = category.sections.findIndex((section) => `row-${section.id}` === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        moveRow(oldIndex, newIndex);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const isRow = active.id.toString().startsWith('row-');

    if (!isRow) {
      const activeProductId = active.id.toString();
      const overProductId = over.id.toString();

      const activeSection = category.sections.find((section) =>
        section.products.some((product) => product.id === activeProductId),
      );

      const overSection = category.sections.find((section) =>
        section.products.some((product) => product.id === overProductId),
      );

      if (activeSection && overSection) {
        const overSectionProducts = overSection.products.length;

        if (activeSection.id !== overSection.id && overSectionProducts >= 3) {
          return;
        }

        const activeProduct = activeSection.products.find(
          (product) => product.id === activeProductId,
        );

        const overProduct = overSection.products.find((product) => product.id === overProductId);

        if (activeProduct && overProduct) {
          moveProductToAnotherPosition(activeProduct.id, overProduct.id);
        }
      }
    }
  };

  return { handleDragEnd, handleDragOver, sensors };
}

export default useDragAndDrop;
