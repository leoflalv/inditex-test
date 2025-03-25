import { Category } from '../../domain/category';
import CategoryRow from '../categoryRow';

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
      template: { alignment: 'center' },
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
      template: { alignment: 'left' },
    },
  ],
};

const CategoryEditor = () => (
  <>
    <h1>CategoryEditor</h1>
    <CategoryRow section={CATEGORY.sections[0]} />
  </>
);

export default CategoryEditor;
