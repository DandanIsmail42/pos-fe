// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authUserSlice.tsx";
import productsReducer from "./features/productsSlice.tsx";
import cartReducer from "./features/cartSlice.tsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
