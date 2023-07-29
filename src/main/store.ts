import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../frontend/slices/itemSlice';
import productReducer from '../frontend/slices/productSlice';
import shopReducer from '../frontend/slices/shopSlice';
import unitReducer from '../frontend/slices/unitSlice';

export const store = configureStore({
  reducer: {
    item: itemReducer,
    product: productReducer,
    shop: shopReducer,
    unit: unitReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
