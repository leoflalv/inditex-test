import axios from 'axios';

import { API_BASE_URL } from '../../core/baseApi';
import { TEMP_PRODUCT_ID } from '../../products/domain/constants';
import { Category } from '../domain/category';
import { GetCategorySchema, mapGetCategoryDtoToCategory } from './getCategoryDto';

export const categoryApi = {
  getCategory: async (id: string): Promise<Category> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);

    const categoryDto = GetCategorySchema.safeParse(response.data);

    if (!categoryDto.success) {
      console.error(categoryDto.error);
      throw new Error('Invalid category');
    }

    const category = mapGetCategoryDtoToCategory(categoryDto.data);

    return category;
  },

  updateCategory: async (category: Category): Promise<Category> => {
    const cleanSections = category.sections
      .map((section, sectionIndex) => ({
        ...section,
        products: section.products
          .filter((product) => product.id !== TEMP_PRODUCT_ID)
          .map((product, productIndex) => ({
            ...product,
            index: productIndex,
          })),
        index: sectionIndex,
      }))
      .filter((section) => section.products.length > 0);

    const newCategory = {
      ...category,
      sections: cleanSections,
    };

    const response = await axios.put(`${API_BASE_URL}/categories/${newCategory.id}`, newCategory);
    return response.data;
  },
};
