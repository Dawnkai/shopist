import Item from './Item';
import Product from './Product';
import Shop from './Shop';
import Unit from './Unit';

export type EditItemModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  selectedItem: Item;
  shops: Shop[];
  units: Unit[];
  products: Product[];
  handleSubmit: (arg: Item) => void;
};

export type EditProductModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  selectedProduct: Product;
  handleSubmit: (arg: Product) => void;
};

export type EditShopModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  selectedShop: Shop;
  handleSubmit: (arg: Shop) => void;
};

export type EditUnitModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  selectedUnit: Unit;
  handleSubmit: (arg: Unit) => void;
};
