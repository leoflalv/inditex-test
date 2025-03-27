import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { CATEGORY } from '../../../../../__mocks__/category';
import { TEMP_PRODUCT_ID } from '../../../../../products/domain/constants';
import { CategoryManagerProvider, useCategoryManager } from '../categoryManagerContext';

describe('CategoryManagerContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CategoryManagerProvider category={CATEGORY}>{children}</CategoryManagerProvider>
  );

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useCategoryManager(), { wrapper });

    expect(result.current.category).toEqual(CATEGORY);
    expect(result.current.isEditMode).toBe(false);
    expect(result.current.zoom).toBe(100);
  });

  describe('Edit Mode Management', () => {
    it('should toggle edit mode and create backup', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      act(() => {
        result.current.setEditMode(true);
      });

      expect(result.current.isEditMode).toBe(true);
    });
  });

  describe('Zoom Management', () => {
    it('should increase zoom up to 100%', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      act(() => {
        result.current.decreaseZoom();
        result.current.increaseZoom();
        result.current.increaseZoom();
      });

      expect(result.current.zoom).toBe(100);
    });

    it('should decrease zoom down to 40%', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.decreaseZoom();
        }
      });

      expect(result.current.zoom).toBe(40);
    });
  });

  describe('Row Management', () => {
    it('should move row to new position', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      act(() => {
        result.current.moveRow(0, 1);
      });

      expect(result.current.category.sections[0].id).toBe('section2');
      expect(result.current.category.sections[1].id).toBe('section1');
    });

    it('should add new row with phantom product', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      act(() => {
        result.current.addRow();
      });

      const newSection = result.current.category.sections[2];
      expect(newSection).toBeDefined();
      expect(newSection.products[0].id).toBe(TEMP_PRODUCT_ID);
    });

    it('should remove row', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      act(() => {
        result.current.removeRow('section1');
      });

      expect(result.current.category.sections.length).toBe(1);
      expect(result.current.category.sections[0].id).toBe('section2');
    });

    it('should modify row template', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      act(() => {
        result.current.modifyRowTemplate(0, 'right');
      });

      expect(result.current.category.sections[0].template).toBe('right');
    });
  });

  describe('Product Management', () => {
    it('should add product to row', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      const newProduct = {
        name: 'New Product',
        price: 40,
        image: 'new-image.jpg',
      };

      act(() => {
        result.current.addProduct(newProduct, 0);
      });

      const products = result.current.category.sections[0].products;
      expect(products.length).toBe(3);
      expect(products[2].name).toBe('New Product');
    });

    it('should remove product', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      act(() => {
        result.current.removeProduct('product1');
      });

      const products = result.current.category.sections[0].products;
      expect(products.length).toBe(1);
      expect(products[0].id).toBe('product2');
    });

    it('should move product within same section', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      act(() => {
        result.current.moveProductToAnotherPosition('product1', 'product2', false);
        vi.runAllTimers();
      });

      const products = result.current.category.sections[0].products;
      expect(products[0].id).toBe('product2');
      expect(products[1].id).toBe('product1');
    });

    it('should move product to different section', () => {
      const { result } = renderHook(() => useCategoryManager(), { wrapper });

      act(() => {
        result.current.moveProductToAnotherPosition('product1', 'product3', true);
        vi.runAllTimers();
      });

      expect(result.current.category.sections[0].products.length).toBe(1);
      expect(result.current.category.sections[1].products.length).toBe(2);
      expect(result.current.category.sections[1].products[1].id).toBe('product1');
    });
  });
});
