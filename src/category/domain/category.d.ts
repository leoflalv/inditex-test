import { Product } from '../../products/domain/product';

export interface Category {
  id: string;
  name: string;
  sections: CategorySection[];
}

export interface CategorySection {
  index: number;
  template?: Template;
  products: Product[];
}

type Template = 'left' | 'right' | 'center';
