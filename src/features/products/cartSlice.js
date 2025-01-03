import { createSlice } from "@reduxjs/toolkit";
import { createCart, editCarts, fetchCarts, removeCarts } from "./cartAction";

const initialState = {
  carts: [],
  loading: false,
  error: null,
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts.push(action.payload);
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCarts.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.carts.findIndex(
          (carts) => carts.id === action.payload.id
        );
        if (index !== -1) {
          state.carts[index] = action.payload;
        }
      })
      .addCase(editCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = state.carts.filter(
          (carts) => carts.id !== action.payload
        );
      })
      .addCase(removeCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const cartsReducer = cartsSlice.reducer;

export default cartsReducer;
