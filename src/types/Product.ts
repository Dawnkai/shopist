export type Product = {
  productId?: number;
  productName: string;
  productDescription: string;
  [key: string]: any;
};

export type ProductModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  handleSubmit: (arg: Product) => void;
};

export const defaultProduct: Product = {
  productId: 0,
  productName: '',
  productDescription: '',
};
