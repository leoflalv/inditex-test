import { createContext, useContext, useState } from 'react';

import { Product } from '../../products/domain/product';
import { Category, Template } from '../domain/category';

interface CategoryManager {
  category?: Category;
  moveRow: (rowIndex: number, newRowIndex: number) => void;
  addProduct: (product: Product, rowIndex: number, columnIndex?: number) => void;
  removeProduct: (productId: string) => void;
  modifyRowTemplate: (rowIndex: number, template: Template) => void;
  moveProductToAnotherPosition: (productId: string, rowIndex: number, columnIndex: number) => void;
  addRow: () => void;
  removeRow: (rowIndex: number) => void;
}

const CategoryManagerContext = createContext<CategoryManager>({
  category: undefined,
  moveRow: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  modifyRowTemplate: () => {},
  moveProductToAnotherPosition: () => {},
  addRow: () => {},
  removeRow: () => {},
});

interface CategoryManagerProviderProps {
  children: React.ReactNode;
  category: Category;
}

export const CategoryManagerProvider = ({
  children,
  category: initialCategory,
}: CategoryManagerProviderProps) => {
  const [category, setCategory] = useState<Category>(initialCategory);

  function moveRow(rowIndex: number, newRowIndex: number) {
    setCategory((prev) => {
      const newArray = [...prev.sections].sort((a, b) => a.index - b.index);
      const [item] = newArray.splice(rowIndex, 1);
      newArray.splice(newRowIndex, 0, item);

      const newSections = newArray.map((section, index) => ({
        ...section,
        index,
      }));

      return { ...prev, sections: newSections };
    });
  }

  function addProduct(product: Product, rowIndex: number, columnIndex = 0) {
    setCategory((prev) => {
      const newSections = prev.sections.map((section) => {
        if (section.index === rowIndex) {
          const newProduct = {
            ...product,
            index: columnIndex,
            id: product.id ?? crypto.randomUUID(),
          };

          const updatedProducts = [...section.products];
          updatedProducts.splice(columnIndex, 0, newProduct);

          const reindexedProducts = updatedProducts.map((p, idx) => ({ ...p, index: idx }));
          return { ...section, products: reindexedProducts };
        }
        return section;
      });
      return { ...prev, sections: newSections };
    });
  }

  function removeProduct(productId: string) {
    setCategory((prev) => {
      const newSections = prev.sections.map((section) => {
        if (section.products.some((product) => product.id === productId)) {
          const updatedProducts = section.products
            .filter((product) => product.id !== productId)
            .map((p, idx) => ({ ...p, index: idx }));
          return { ...section, products: updatedProducts };
        }
        return section;
      });
      return { ...prev, sections: newSections };
    });
  }

  function modifyRowTemplate(rowIndex: number, template: Template) {
    setCategory((prev) => {
      const newSections = prev.sections.map((section) =>
        section.index === rowIndex ? { ...section, template } : section,
      );
      return { ...prev, sections: newSections };
    });
  }

  function moveProductToAnotherPosition(productId: string, rowIndex: number, columnIndex: number) {
    const product = category.sections
      .flatMap((section) => section.products)
      .find((product) => product.id === productId)!;

    removeProduct(productId);
    addProduct(product, rowIndex, columnIndex);
  }

  function addRow() {
    setCategory((prev) => {
      const newRow = { index: 0, template: 'left' as Template, products: [] };
      const newSections = [...prev.sections];
      newSections.push(newRow);
      const reindexedSections = newSections.map((section, idx) => ({ ...section, index: idx }));
      return { ...prev, sections: reindexedSections };
    });
  }

  function removeRow(rowIndex: number) {
    setCategory((prev) => {
      const newSections = [...prev.sections];
      newSections.splice(rowIndex, 1);
      const reindexedSections = newSections.map((section, idx) => ({ ...section, index: idx }));
      return { ...prev, sections: reindexedSections };
    });
  }

  return (
    <CategoryManagerContext.Provider
      value={{
        category,
        moveRow,
        addProduct,
        removeProduct,
        modifyRowTemplate,
        moveProductToAnotherPosition,
        addRow,
        removeRow,
      }}
    >
      {children}
    </CategoryManagerContext.Provider>
  );
};

export const useCategoryManager = () => {
  const context = useContext(CategoryManagerContext);
  if (context === undefined) {
    throw new Error('useCategoryManager must be used within a CategoryManagerProvider');
  }

  return context;
};
