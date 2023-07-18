import Item from './Item';
import Product from './Product';
import Shop from './Shop';
import Unit from './Unit';

export type DeleteItemModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  selectedItem: Item;
  handleSubmit: (arg: number) => void;
};

export type DeleteProductModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  selectedProduct: Product;
  handleSubmit: (arg: number) => void;
};

export type DeleteShopModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  selectedShop: Shop;
  handleSubmit: (arg: number) => void;
};

export type DeleteUnitModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  selectedUnit: Unit;
  handleSubmit: (arg: number) => void;
};
