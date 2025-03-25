export interface Category {
  id: string;
  name: string;
  template: Template;
  products: Product[];
}

export interface Template {
  alignment: 'left' | 'right' | 'center';
}
