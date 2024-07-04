// src/app/types.ts

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authUserSlice.tsx';

const rootReducer = combineReducers({
  auth: authReducer,
  // tambahkan reducer lain jika ada
});

export type RootState = ReturnType<typeof rootReducer>;
