import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idPenjualan: null, // Default value, bisa disesuaikan
};

const idPenjualanSlice = createSlice({
  name: 'idPenjualan',
  initialState,
  reducers: {
    setIdPenjualan: (state, action) => {
      state.idPenjualan = action.payload;
    },
    clearIdPenjualan: (state) => {
      state.idPenjualan = null;
    },
  },
});

export const { setIdPenjualan, clearIdPenjualan } = idPenjualanSlice.actions;

export default idPenjualanSlice.reducer;
