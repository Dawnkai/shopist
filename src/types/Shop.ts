export type Shop = {
  shopId?: number;
  shopDisplayName: string;
  shopName: string;
  shopDescription: string;
  shopAddress: string;
  [key: string]: any;
};

export type ShopModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  handleSubmit: (arg: Shop) => void;
};

export const defaultShop: Shop = {
  shopId: 0,
  shopDisplayName: '',
  shopName: '',
  shopDescription: '',
  shopAddress: '',
};
