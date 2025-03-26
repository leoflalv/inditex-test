import { createContext, useContext, useState } from 'react';

import { Product } from '../../products/domain/product';
import { Category, Template } from '../domain/category';

interface CategoryManager {
  category?: Category;
  moveRow: (rowIndex: number, newRowIndex: number) => void;
  addProduct: (product: Product, rowIndex: number, columnIndex?: number) => void;
  removeProduct: (productId: string) => void;
  modifyRowTemplate: (rowIndex: number, template: Template) => void;
  moveProductToAnotherPosition: (
    productId: string,
    targetProductId: string,
    sourceRowId: string,
    targetRowId: string,
  ) => void;
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

  function moveProductToAnotherPosition(
    productId: string,
    targetProductId: string,
    sourceRowId: string,
    targetRowId: string,
  ) {
    setCategory((prev) => {
      const newSections = [...prev.sections];

      const sourceSection = newSections.find((section) => section.id === sourceRowId);
      const targetSection = newSections.find((section) => section.id === targetRowId);

      if (!sourceSection || !targetSection) return prev;

      const sourceProductIndex = sourceSection.products.findIndex((p) => p.id === productId);
      const targetProductIndex = targetSection.products.findIndex((p) => p.id === targetProductId);

      if (sourceProductIndex === -1 || targetProductIndex === -1) return prev;

      const [movedProduct] = sourceSection.products.splice(sourceProductIndex, 1);

      if (sourceSection.id === targetSection.id) {
        // Moving within the same section
        sourceSection.products.splice(targetProductIndex, 0, movedProduct);
        sourceSection.products = sourceSection.products.map((p, idx) => ({ ...p, index: idx }));
      } else {
        // Moving to a different section
        targetSection.products.splice(targetProductIndex, 0, {
          ...movedProduct,
          index: targetProductIndex,
        });
        sourceSection.products = sourceSection.products.map((p, idx) => ({ ...p, index: idx }));
        targetSection.products = targetSection.products.map((p, idx) => ({ ...p, index: idx }));
      }

      return { ...prev, sections: newSections };
    });
  }

  function addRow() {
    setCategory((prev) => {
      const newRow = {
        id: crypto.randomUUID(),
        index: 0,
        template: 'left' as Template,
        products: [],
      };
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
