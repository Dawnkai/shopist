export type Shop = {
  shop_id?: number;
  shop_display_name: string;
  shop_name: string;
  shop_description: string;
  shop_address: string;
  [key: string]: any;
};

export const defaultShop: Shop = {
  shop_id: 0,
  shop_display_name: '',
  shop_name: '',
  shop_description: '',
  shop_address: '',
};
