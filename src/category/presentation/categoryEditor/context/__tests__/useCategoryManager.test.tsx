import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { Product } from '../../../../../products/domain/product';
import { Category } from '../../../../domain/category';
import { CategoryManagerProvider, useCategoryManager } from '../categoryManagerContext';

const mockProduct: Product = {
  id: 'test-product-1',
  name: 'Test Product',
  price: 29.99,
  image: 'test.jpg',
  category: 'test-category',
  index: 0,
};

const mockCategory: Category = {
  id: 'test-category',
  name: 'Test Category',
  sections: [
    {
      id: 'section-1',
      index: 0,
      template: 'left',
      products: [
        { ...mockProduct, id: 'product-1', index: 0 },
        { ...mockProduct, id: 'product-2', index: 1 },
      ],
    },
    {
      id: 'section-2',
      index: 1,
      template: 'center',
      products: [{ ...mockProduct, id: 'product-3', index: 0 }],
    },
  ],
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CategoryManagerProvider category={mockCategory}>{children}</CategoryManagerProvider>
);

describe('useCategoryManager', () => {
  it('should provide initial category state', () => {
    const { result } = renderHook(() => useCategoryManager(), { wrapper });

    expect(result.current.category).toEqual(mockCategory);
  });

  it('should move row to a new position', () => {
    const { result } = renderHook(() => useCategoryManager(), { wrapper });

    act(() => {
      result.current.moveRow(0, 1);
    });

    const sections = result.current.category?.sections;
    expect(sections?.[0].products[0].id).toBe('product-3');
    expect(sections?.[1].products[0].id).toBe('product-1');
    expect(sections?.[0].index).toBe(0);
    expect(sections?.[1].index).toBe(1);
  });

  it('should add a new product to a row', () => {
    const { result } = renderHook(() => useCategoryManager(), { wrapper });
    const newProduct = { ...mockProduct, id: 'new-product' };

    act(() => {
      result.current.addProduct(newProduct, 0);
    });

    const products = result.current.category?.sections[0].products;
    expect(products).toHaveLength(3);
    expect(products?.[0].id).toBe('new-product');
    expect(products?.[0].name).toBe(newProduct.name);
    expect(products?.[0].index).toBe(0);
  });

  it('should remove a product', () => {
    const { result } = renderHook(() => useCategoryManager(), { wrapper });

    act(() => {
      result.current.removeProduct('product-1');
    });

    const products = result.current.category?.sections[0].products;
    expect(products).toHaveLength(1);
    expect(products?.[0].id).toBe('product-2');
    expect(products?.[0].index).toBe(0);
  });

  it('should modify row template', () => {
    const { result } = renderHook(() => useCategoryManager(), { wrapper });

    act(() => {
      result.current.modifyRowTemplate(0, 'right');
    });

    expect(result.current.category?.sections[0].template).toBe('right');
  });

  it('should move product to another position', () => {
    const { result } = renderHook(() => useCategoryManager(), { wrapper });

    act(() => {
      result.current.moveProductToAnotherPosition('product-1', 1, 1);
    });

    // Product should be removed from original position
    expect(result.current.category?.sections[0].products).toHaveLength(1);
    expect(result.current.category?.sections[0].products[0].id).toBe('product-2');

    // Product should be added to new position
    const targetSection = result.current.category?.sections[1].products;
    expect(targetSection).toHaveLength(2);
    expect(targetSection?.some((p) => p.name === mockProduct.name)).toBeTruthy();
  });

  it('should add a new row', () => {
    const { result } = renderHook(() => useCategoryManager(), { wrapper });

    act(() => {
      result.current.addRow();
    });

    const sections = result.current.category?.sections;
    expect(sections).toHaveLength(3);

    expect(sections?.[2].template).toBe('left');
    expect(sections?.[2].products).toEqual([]);

    expect(sections?.[0].index).toBe(0);
    expect(sections?.[1].index).toBe(1);
    expect(sections?.[2].index).toBe(2);
  });

  it('should remove a row', () => {
    const { result } = renderHook(() => useCategoryManager(), { wrapper });

    act(() => {
      result.current.removeRow(0);
    });

    const sections = result.current.category?.sections;
    expect(sections).toHaveLength(1);
    expect(sections?.[0].index).toBe(0);
    expect(sections?.[0].template).toBe('center');
  });
});
