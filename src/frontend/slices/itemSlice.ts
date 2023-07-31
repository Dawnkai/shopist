import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultItem, Item } from '../../types/Item';

type ItemSliceState = {
  selectedItem: Item;
  items: Item[];
};

const initialState: ItemSliceState = {
  selectedItem: defaultItem,
  items: [],
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setSelectedItem: (state: ItemSliceState, action: PayloadAction<Item>) => {
      return { ...state, selectedItem: action.payload };
    },

    setItems: (state: ItemSliceState, action: PayloadAction<Item[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },

    setItemPrice: (state: ItemSliceState, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedItem: { ...state.selectedItem, itemPrice: action.payload },
      };
    },

    setItemProductName: (
      state: ItemSliceState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          itemProductName: action.payload,
        },
      };
    },

    setItemUnitDisplayName: (
      state: ItemSliceState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          itemUnitDisplayName: action.payload,
        },
      };
    },

    setItemShopDisplayName: (
      state: ItemSliceState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          itemUnitDisplayName: action.payload,
        },
      };
    },

    setItemDate: (state: ItemSliceState, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedItem: { ...state.selectedItem, itemDate: action.payload },
      };
    },

    setItemQuantity: (state: ItemSliceState, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedItem: { ...state.selectedItem, itemQuantity: action.payload },
      };
    },

    addItem: (state: ItemSliceState, action: PayloadAction<Item>) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },

    deleteItem: (state: ItemSliceState, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter((item) => item.itemId !== action.payload),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedItem,
  setItems,
  addItem,
  deleteItem,
  setItemPrice,
  setItemProductName,
  setItemUnitDisplayName,
  setItemShopDisplayName,
  setItemDate,
  setItemQuantity,
} = itemSlice.actions;

export default itemSlice.reducer;
