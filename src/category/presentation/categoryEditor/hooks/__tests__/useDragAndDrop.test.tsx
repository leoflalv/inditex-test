import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DragEndEvent, DragOverEvent } from '@dnd-kit/core';

import { CATEGORY } from '../../../../../__mocks__/category';
import useDragAndDrop from '../useDragAndDrop';
import { Template } from '../../../../domain/category';

describe('useDragAndDrop', () => {
  const mockProps = {
    category: CATEGORY,
    moveRow: vi.fn(),
    moveProductToAnotherPosition: vi.fn(),
    removeSection: vi.fn(),
  };

  it('should initialize with sensors', () => {
    const { result } = renderHook(() => useDragAndDrop(mockProps));

    expect(result.current.sensors).toBeDefined();
    expect(result.current.sensors.length).toBe(2);
  });

  describe('handleDragEnd', () => {
    it('should not move row when over is not defined', () => {
      const { result } = renderHook(() => useDragAndDrop(mockProps));

      const event = {
        active: { id: 'row-section1' },
        over: null,
      } as unknown as DragEndEvent;

      result.current.handleDragEnd(event);

      expect(mockProps.moveRow).not.toHaveBeenCalled();
    });

    it('should not move row when active and over are the same', () => {
      const { result } = renderHook(() => useDragAndDrop(mockProps));

      const event = {
        active: { id: 'row-section1' },
        over: { id: 'row-section1' },
      } as unknown as DragEndEvent;

      result.current.handleDragEnd(event);

      expect(mockProps.moveRow).not.toHaveBeenCalled();
    });

    it('should move row when dragging row to new position', () => {
      const { result } = renderHook(() => useDragAndDrop(mockProps));

      const event = {
        active: { id: 'row-section1' },
        over: { id: 'row-section2' },
      } as unknown as DragEndEvent;

      result.current.handleDragEnd(event);

      expect(mockProps.moveRow).toHaveBeenCalledWith(0, 1);
    });

    it('should remove empty sections after drag', () => {
      const categoryWithEmptySection = {
        ...CATEGORY,
        sections: [
          ...CATEGORY.sections,
          { id: 'section3', products: [], template: 'left' as Template, index: 2 },
        ],
      };

      const props = {
        ...mockProps,
        category: categoryWithEmptySection,
      };

      const { result } = renderHook(() => useDragAndDrop(props));

      const event = {
        active: { id: 'row-section1' },
        over: { id: 'row-section2' },
      } as unknown as DragEndEvent;

      result.current.handleDragEnd(event);

      expect(mockProps.removeSection).toHaveBeenCalledWith('section3');
    });
  });

  describe('handleDragOver', () => {
    it('should not move product when over is not defined', () => {
      const { result } = renderHook(() => useDragAndDrop(mockProps));

      const event = {
        active: { id: 'product1' },
        over: null,
      } as unknown as DragOverEvent;

      result.current.handleDragOver(event);

      expect(mockProps.moveProductToAnotherPosition).not.toHaveBeenCalled();
    });

    it('should not move product when active and over are the same', () => {
      const { result } = renderHook(() => useDragAndDrop(mockProps));

      const event = {
        active: { id: 'product1' },
        over: { id: 'product1' },
      } as unknown as DragOverEvent;

      result.current.handleDragOver(event);

      expect(mockProps.moveProductToAnotherPosition).not.toHaveBeenCalled();
    });

    it('should move product within same section', () => {
      const { result } = renderHook(() => useDragAndDrop(mockProps));

      const event = {
        active: {
          id: 'product1',
          rect: { current: { translated: { left: 100 } } },
        },
        over: {
          id: 'product2',
          rect: { left: 50 },
        },
      } as unknown as DragOverEvent;

      result.current.handleDragOver(event);

      expect(mockProps.moveProductToAnotherPosition).toHaveBeenCalled();
    });
  });
});
