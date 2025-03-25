import { createContext, useContext, useState, ReactNode } from 'react';

interface ProductModalContextType {
  isOpen: boolean;
  rowIndex: number | null;
  openModal: (index: number) => void;
  closeModal: () => void;
}

const ProductModalContext = createContext<ProductModalContextType | undefined>(undefined);

interface ProductModalProviderProps {
  children: ReactNode;
}

export const ProductModalProvider = ({ children }: ProductModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rowIndex, setRowIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setIsOpen(true);
    setRowIndex(index);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <ProductModalContext.Provider value={{ isOpen, openModal, closeModal, rowIndex }}>
      {children}
    </ProductModalContext.Provider>
  );
};

export const useProductModal = () => {
  const context = useContext(ProductModalContext);
  if (context === undefined) {
    throw new Error('useProductModal must be used within a ProductModalProvider');
  }
  return context;
};
