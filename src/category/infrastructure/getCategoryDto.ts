import { z } from 'zod';

import { Category } from '../domain/category';

const TemplateSchema = z.enum(['left', 'right', 'center']);

// The index is optional because the api don't really have
// to track this, and in the update endpoint should doesn't
// care about this, but since the api is not the porpose of
// this project, we are allowing it.
export const GetCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  sections: z.array(
    z.object({
      index: z.number(),
      template: TemplateSchema.optional(),
      products: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          price: z.number(),
          image: z.string(),
          index: z.number(),
        }),
      ),
    }),
  ),
});

export type CategoryDto = z.infer<typeof GetCategorySchema>;

export function mapGetCategoryDtoToCategory(categoryDto: CategoryDto): Category {
  return {
    id: categoryDto.id.toString(),
    name: categoryDto.name,
    sections: categoryDto.sections.map((sectionDto) => ({
      id: crypto.randomUUID(),
      index: sectionDto.index,
      template: sectionDto.template ?? 'center',
      products: sectionDto.products.map((productDto) => ({
        id: productDto.id,
        name: productDto.name,
        price: productDto.price,
        image: productDto.image,
        index: productDto.index,
      })),
    })),
  };
}
