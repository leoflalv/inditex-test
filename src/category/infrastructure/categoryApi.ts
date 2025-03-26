import axios from 'axios';

import { API_URL } from '../../core/baseApi';
import { Category } from '../domain/category';

export const categoryApi = {
  getCategory: async (id: string): Promise<Category> => {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
  },

  updateCategory: async (category: Category): Promise<Category> => {
    const response = await axios.put(`${API_URL}/categories/${category.id}`, category);
    return response.data;
  },
};
