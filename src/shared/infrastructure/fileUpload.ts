import axios from 'axios';

import { API_FILES_BASE_URL, API_URL } from '../../core/baseApi';

export interface UploadResponse {
  url: string;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const { data } = await axios.post<UploadResponse>(API_FILES_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const reponse = {
      url: `${API_URL}${data.url}`,
    };

    return reponse;
  } catch (_) {
    throw new Error('Failed to upload file');
  }
};
