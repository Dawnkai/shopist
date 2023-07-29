export type Product = {
  product_id?: number;
  product_name: string;
  product_description: string;
  [key: string]: any;
};

export const defaultProduct: Product = {
  product_id: 0,
  product_name: '',
  product_description: '',
};
