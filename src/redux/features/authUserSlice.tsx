// src/features/auth/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  full_name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
    updateUser(state, action: PayloadAction<User>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { setUser, setToken, clearUser, clearToken, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
