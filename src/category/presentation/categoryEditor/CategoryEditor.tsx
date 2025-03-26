import { Category } from '../../domain/category';
import InnerCategoryEditor from './InnerCategoryEditor';

import { CategoryManagerProvider } from './context/categoryManagerContext';

export const CATEGORY: Category = {
  id: 'cat-1',
  name: 'Electronics',
  sections: [
    {
      id: crypto.randomUUID(),
      index: 1,
      products: [
        {
          category: 'Electronics',
          id: 'prod-1',
          image: 'https://picsum.photos/200/300',
          index: 1,
          name: 'Smartphone',
          price: 699.99,
        },
        {
          category: 'Electronics',
          id: 'prod-2',
          image: 'https://picsum.photos/200/300',
          index: 2,
          name: 'Laptop',
          price: 999.99,
        },
        {
          category: 'Electronics',
          id: 'prod-3',
          image: 'https://picsum.photos/200/300',
          index: 3,
          name: 'Headphones',
          price: 199.99,
        },
      ],
      template: 'center',
    },
    {
      id: crypto.randomUUID(),
      index: 2,
      products: [
        {
          category: 'Electronics',
          id: 'prod-4',
          image: 'https://picsum.photos/200/300',
          index: 1,
          name: 'Tablet',
          price: 399.99,
        },
      ],
      template: 'left',
    },
  ],
};

const CategoryEditor = () => (
  <CategoryManagerProvider category={CATEGORY}>
    <InnerCategoryEditor />
  </CategoryManagerProvider>
);

export default CategoryEditor;
