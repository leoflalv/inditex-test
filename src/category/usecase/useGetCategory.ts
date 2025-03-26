import { useQuery } from '@tanstack/react-query';

import { categoryApi } from '../infrastructure/categoryApi';
import { categoryKeys } from './keys';

const useGetCategory = (id: string) => useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryApi.getCategory(id),
  });

export default useGetCategory;
