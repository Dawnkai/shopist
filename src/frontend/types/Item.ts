export type Item = {
  itemId?: number;
  itemQuantity: number;
  itemPrice: number;
  itemProductId?: number;
  itemProductName: string;
  itemUnitId?: number;
  itemUnitDisplayName: string;
  itemShopId?: number;
  itemShopDisplayName: string;
  itemDate: string;
};

export const defaultItem: Item = {
  itemId: 0,
  itemQuantity: 0,
  itemPrice: 0,
  itemProductName: '',
  itemUnitDisplayName: '',
  itemShopDisplayName: '',
  itemDate: new Date().toJSON().slice(0, 10).toString(),
};
