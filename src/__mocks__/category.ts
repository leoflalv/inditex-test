import { Category, Template } from '../category/domain/category';

export const CATEGORY: Category = {
  id: '1',
  name: 'Test Category',
  sections: [
    {
      id: 'section1',
      index: 0,
      template: 'center' as Template,
      products: [
        {
          id: 'product1',
          name: 'Product 1',
          price: 10,
          image: 'image1.jpg',
          index: 0,
        },
        {
          id: 'product2',
          name: 'Product 2',
          price: 20,
          image: 'image2.jpg',
          index: 1,
        },
      ],
    },
    {
      id: 'section2',
      index: 1,
      template: 'left' as Template,
      products: [
        {
          id: 'product3',
          name: 'Product 3',
          price: 30,
          image: 'image3.jpg',
          index: 0,
        },
      ],
    },
  ],
};
