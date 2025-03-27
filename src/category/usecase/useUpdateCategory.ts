import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSnackbar } from '../../shared/presentation/snackbar';
import { categoryApi } from '../infrastructure/categoryApi';
import { categoryKeys } from './keys';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useSnackbar();

  return useMutation({
    mutationFn: categoryApi.updateCategory,
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(categoryKeys.detail(updatedCategory.id), updatedCategory);
      showSuccess('Category updated successfully');
    },
    onError: () => {
      showError('Something went wrong. Category not updated');
    },
  });
};
