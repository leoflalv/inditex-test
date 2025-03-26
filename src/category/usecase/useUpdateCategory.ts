import { useMutation, useQueryClient } from '@tanstack/react-query';

import { categoryApi } from '../infrastructure/categoryApi';
import { categoryKeys } from './keys';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryApi.updateCategory,
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(categoryKeys.detail(updatedCategory.id), updatedCategory);
    },
  });
};
