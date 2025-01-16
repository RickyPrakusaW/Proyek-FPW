import { configureStore } from '@reduxjs/toolkit';
import idPenjualanReducer from './idPenjualanSlice';

const store = configureStore({
  reducer: {
    idPenjualan: idPenjualanReducer,
  },
});

export default store;
