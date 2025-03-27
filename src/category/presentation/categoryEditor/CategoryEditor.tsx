import useGetCategory from '../../usecase/useGetCategory';
import InnerCategoryEditor from './InnerCategoryEditor';

import { CategoryManagerProvider } from './context/categoryManagerContext';

interface CategoryEditorProps {
  categoryId: string;
}

// The component is gonna receive the id of the category we want to edit
const CategoryEditor = ({ categoryId }: CategoryEditorProps) => {
  const { data: category, isLoading } = useGetCategory(categoryId);

  if (isLoading || !category) return <div>Loading...</div>;

  return (
    <CategoryManagerProvider category={category}>
      <InnerCategoryEditor />
    </CategoryManagerProvider>
  );
};

export default CategoryEditor;
