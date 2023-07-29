import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultItem, Item } from '../types/Item';

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
export const { setSelectedItem, setItems, addItem, deleteItem } =
  itemSlice.actions;

export default itemSlice.reducer;
