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
