import { useMutation } from '@tanstack/react-query';

import { uploadFile } from '../infrastructure/fileUpload';

export const useFileUpload = () => {
  const mutation = useMutation({
    mutationFn: uploadFile,
  });

  const handleFileSelect = (file: File) => {
    mutation.mutate(file);
  };

  return {
    uploadFile: handleFileSelect,
    isUploading: mutation.isPending,
    uploadError: mutation.error,
    uploadedUrl: mutation.data?.url,
  };
};
