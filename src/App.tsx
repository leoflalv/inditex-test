import { Category } from './category/domain/category';
import { ProductModalProvider } from './products/presentation/context/ProductModalContext';
import CategoryEditor from './category/presentation/categoryEditor';
import { CategoryManagerProvider } from './category/usecase/useCategoryManager';
import Template from './shared/presentation/template';

import styles from './App.module.css';

export const CATEGORY: Category = {
  id: 'cat-1',
  name: 'Electronics',
  sections: [
    {
      index: 1,
      products: [
        {
          category: 'Electronics',
          id: 'prod-1',
          image: 'https://via.placeholder.com/150',
          index: 1,
          name: 'Smartphone',
          price: 699.99,
        },
        {
          category: 'Electronics',
          id: 'prod-2',
          image: 'https://via.placeholder.com/150',
          index: 2,
          name: 'Laptop',
          price: 999.99,
        },
        {
          category: 'Electronics',
          id: 'prod-3',
          image: 'https://via.placeholder.com/150',
          index: 3,
          name: 'Headphones',
          price: 199.99,
        },
      ],
      template: 'center',
    },
    {
      index: 2,
      products: [
        {
          category: 'Electronics',
          id: 'prod-4',
          image: 'https://via.placeholder.com/150',
          index: 1,
          name: 'Tablet',
          price: 399.99,
        },
      ],
      template: 'left',
    },
  ],
};

const App = () => (
  <div className={styles.mainContainer}>
    <Template>
      <CategoryManagerProvider category={CATEGORY}>
        <ProductModalProvider>
          <CategoryEditor category={CATEGORY} />
        </ProductModalProvider>
      </CategoryManagerProvider>
    </Template>
  </div>
);

export default App;
