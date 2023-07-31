import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultProduct, Product } from '../../types/Product';

type ProductSliceState = {
  selectedProduct: Product;
  products: Product[];
};

const initialState: ProductSliceState = {
  selectedProduct: defaultProduct,
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProduct: (
      state: ProductSliceState,
      action: PayloadAction<Product>
    ) => {
      return { ...state, selectedProduct: action.payload };
    },

    setProductName: (
      state: ProductSliceState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          product_name: action.payload,
        },
      };
    },

    setProductDescription: (
      state: ProductSliceState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          product_description: action.payload,
        },
      };
    },

    setProducts: (
      state: ProductSliceState,
      action: PayloadAction<Product[]>
    ) => {
      return {
        ...state,
        products: action.payload,
      };
    },

    addProduct: (state: ProductSliceState, action: PayloadAction<Product>) => {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    },

    deleteProduct: (
      state: ProductSliceState,
      action: PayloadAction<number>
    ) => {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.product_id !== action.payload
        ),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedProduct,
  setProductName,
  setProductDescription,
  setProducts,
  addProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
