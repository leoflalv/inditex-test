import { createContext, useContext, useState } from 'react';

import { Product } from '../../../../products/domain/product';
import { Category, CategorySection, Template } from '../../../domain/category';

interface CategoryManager {
  category?: Category;
  isEditMode: boolean;
  zoom: number;
  setEditMode: (isEdit: boolean) => void;
  moveRow: (rowIndex: number, newRowIndex: number) => void;
  addProduct: (product: Partial<Product>, rowIndex: number) => void;
  removeProduct: (productId: string) => void;
  modifyRowTemplate: (rowIndex: number, template: Template) => void;
  moveProductToAnotherPosition: (currentProductId: string, targetProductId: string) => void;
  addRow: () => void;
  removeRow: (rowIndex: number) => void;
  cancelChanges: () => void;
  increaseZoom: () => void;
  decreaseZoom: () => void;
}

const CategoryManagerContext = createContext<CategoryManager>({
  category: undefined,
  isEditMode: false,
  zoom: 100,
  setEditMode: () => {},
  moveRow: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  modifyRowTemplate: () => {},
  moveProductToAnotherPosition: () => {},
  addRow: () => {},
  removeRow: () => {},
  cancelChanges: () => {},
  increaseZoom: () => {},
  decreaseZoom: () => {},
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [backupCategory, setBackupCategory] = useState<Category | null>(null);
  const [zoom, setZoom] = useState(100);

  function increaseZoom() {
    setZoom((prev) => Math.min(prev + 10, 100));
  }

  function decreaseZoom() {
    setZoom((prev) => Math.max(prev - 10, 40));
  }

  function setEditMode(isEdit: boolean) {
    if (isEdit && !isEditMode) {
      setBackupCategory(category);
    }

    if (!isEdit && isEditMode && backupCategory) {
      setCategory(backupCategory);
      setZoom(100);
    }

    setIsEditMode(isEdit);
  }

  function cancelChanges() {
    if (backupCategory) {
      setCategory(backupCategory);
    }
    setEditMode(false);
    setBackupCategory(null);
  }

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

  function addProduct(product: Partial<Product>, rowIndex: number) {
    setCategory((prev) => {
      const newSections = prev.sections.map((section) => {
        if (section.index === rowIndex) {
          const newProduct = {
            price: product.price ?? 0,
            name: product.name ?? '',
            image: product.image ?? '',
            index: section.products.length,
            id: product.id ?? crypto.randomUUID(),
          };

          const updatedProducts = [...section.products, newProduct];

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

  function moveProductToAnotherPosition(currentProductId: string, targetProductId: string) {
    setCategory((prev) => {
      const sections = [...prev.sections];

      const sourceRowId = prev.sections.find((section) =>
        section.products.some((p) => p.id === currentProductId),
      )?.id;
      const targetRowId = prev.sections.find((section) =>
        section.products.some((p) => p.id === targetProductId),
      )?.id;

      const sourceSection = sections.find((section) => section.id === sourceRowId);
      const targetSection = sections.find((section) => section.id === targetRowId);

      if (!sourceSection || !targetSection) return prev;

      const sourceProducts = [...(sourceSection?.products ?? [])];
      const targetProducts = [...(targetSection?.products ?? [])];

      const sourceProductIndex = sourceProducts.findIndex((p) => p.id === currentProductId);
      const targetProductIndex = targetProducts.findIndex((p) => p.id === targetProductId);

      if (sourceProductIndex === -1 || targetProductIndex === -1) return prev;

      if (sourceSection.id === targetSection.id) {
        // Moving within the same section
        const [movedProduct] = targetProducts.splice(sourceProductIndex, 1);
        targetProducts?.splice(targetProductIndex, 0, movedProduct);
      } else {
        // Moving to a different section
        const [movedProduct] = sourceProducts.splice(sourceProductIndex, 1);
        targetProducts.splice(targetProductIndex, 0, {
          ...movedProduct,
          index: targetProductIndex,
        });
      }

      sourceSection.products = sourceProducts;
      targetSection.products = targetProducts;

      const newSections = sections
        .map((section) => (section.id === sourceSection.id ? sourceSection : section))
        .map((section) => (section.id === targetSection.id ? targetSection : section))
        .map((section, idx) => ({ ...section, index: idx }));

      return { ...prev, sections: newSections };
    });
  }

  function addRow() {
    setCategory((prev) => {
      const newRow: CategorySection = {
        id: crypto.randomUUID(),
        index: 0,
        template: 'left',
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
        isEditMode,
        zoom,
        setEditMode,
        moveRow,
        addProduct,
        removeProduct,
        modifyRowTemplate,
        moveProductToAnotherPosition,
        addRow,
        removeRow,
        cancelChanges,
        increaseZoom,
        decreaseZoom,
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
