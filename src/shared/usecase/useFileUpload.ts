import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { uploadFile } from '../infrastructure/fileUpload';

export const useFileUpload = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      setPreview(null);
    },
  });

  const handleFileSelect = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    mutation.mutate(file);
  };

  const clearPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  return {
    uploadFile: handleFileSelect,
    isUploading: mutation.isPending,
    uploadError: mutation.error,
    preview,
    clearPreview,
    uploadedUrl: mutation.data?.url,
  };
};
