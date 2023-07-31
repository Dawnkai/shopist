import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultShop, Shop } from '../../types/Shop';

type ShopSliceState = {
  selectedShop: Shop;
  shops: Shop[];
};

const initialState: ShopSliceState = {
  selectedShop: defaultShop,
  shops: [],
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setSelectedShop: (state: ShopSliceState, action: PayloadAction<Shop>) => {
      return { ...state, selectedShop: action.payload };
    },

    setShopDisplayName: (
      state: ShopSliceState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        selectedShop: {
          ...state.selectedShop,
          shop_display_name: action.payload,
        },
      };
    },

    setShopName: (state: ShopSliceState, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedShop: {
          ...state.selectedShop,
          shop_name: action.payload,
        },
      };
    },

    setShopDescription: (
      state: ShopSliceState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        selectedShop: {
          ...state.selectedShop,
          shop_description: action.payload,
        },
      };
    },

    setShopAddress: (state: ShopSliceState, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedShop: {
          ...state.selectedShop,
          shop_address: action.payload,
        },
      };
    },

    setShops: (state: ShopSliceState, action: PayloadAction<Shop[]>) => {
      return {
        ...state,
        shops: action.payload,
      };
    },

    addShop: (state: ShopSliceState, action: PayloadAction<Shop>) => {
      return {
        ...state,
        shops: [...state.shops, action.payload],
      };
    },

    deleteShop: (state: ShopSliceState, action: PayloadAction<number>) => {
      return {
        ...state,
        shops: state.shops.filter((shop) => shop.shop_id !== action.payload),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedShop,
  setShopDisplayName,
  setShopName,
  setShopDescription,
  setShopAddress,
  setShops,
  addShop,
  deleteShop,
} = shopSlice.actions;

export default shopSlice.reducer;
