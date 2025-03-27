import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useSnackbar } from '../../shared/presentation/snackbar';
import { categoryApi } from '../infrastructure/categoryApi';
import { categoryKeys } from './keys';

const useGetCategory = (id: string) => {
  const { showError } = useSnackbar();

  const queryInfo = useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryApi.getCategory(id),
  });

  useEffect(() => {
    if (queryInfo.error) {
      showError('Something went wrong');
    }
  }, [queryInfo.error, showError]);

  return queryInfo;
};

export default useGetCategory;
