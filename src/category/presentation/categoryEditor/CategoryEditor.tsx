import useGetCategory from '../../usecase/useGetCategory';
import InnerCategoryEditor from './InnerCategoryEditor';

import { CategoryManagerProvider } from './context/categoryManagerContext';

const CategoryEditor = () => {
  const { data: category, isLoading } = useGetCategory('1');

  if (isLoading || !category) return <div>Loading...</div>;

  return (
    <CategoryManagerProvider category={category}>
      <InnerCategoryEditor />
    </CategoryManagerProvider>
  );
};

export default CategoryEditor;
