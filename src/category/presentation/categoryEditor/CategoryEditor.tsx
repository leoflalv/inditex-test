import { CATEGORY } from '../../../__mocks__/category';
import InnerCategoryEditor from './InnerCategoryEditor';

import { CategoryManagerProvider } from './context/categoryManagerContext';

const CategoryEditor = () => (
  <CategoryManagerProvider category={CATEGORY}>
    <InnerCategoryEditor />
  </CategoryManagerProvider>
);

export default CategoryEditor;
