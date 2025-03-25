import ProductCard from '../../../products/presentation/ProductCard';

const PRODUCT = {
  category: 'Category 1',
  column: 1,
  description: 'Product 1 description',
  id: '1',
  image: 'https://picsum.photos/id/100/200/300',
  name: 'Product 1',
  price: 100,
  row: 1,
};

const CategoryEditor = () => (
  <>
    <h1>CategoryEditor</h1>
    <ProductCard product={PRODUCT} />
  </>
);

export default CategoryEditor;
