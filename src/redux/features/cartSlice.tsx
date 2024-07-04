// src/redux/features/cartSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiUpdateCart, apiGetCart, CartItem } from "../../services/api";
import { RootState } from "../store";

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token; // assuming you have auth token in state.auth
    const response = await apiGetCart(token);
    return response.data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token; // assuming you have auth token in state.auth
    const items = state.cart.items;
    const response = await apiUpdateCart(items, token);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.product._id === item.product._id
      );
      if (existingItem) {
        existingItem.qty += item.qty;
      } else {
        state.items.push(item);
      }
    },
    minToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.product._id === item.product._id
      );
      if (existingItem) {
        existingItem.qty -= item.qty;
        if (existingItem.qty <= 0) {
          state.items = state.items.filter(
            (i) => i.product._id !== item.product._id
          );
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { addToCart, removeFromCart, minToCart } = cartSlice.actions;

export default cartSlice.reducer;
