import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCart,
  deleteCart,
  getAllCart,
  updateCart,
} from "../../services/cartServices";

export const fetchCarts = createAsyncThunk("carts/fetchCarts", async (id) => {
  return await getAllCart(id);
});

export const createCart = createAsyncThunk("cart/createCarts", async (cart) => {
  return await addCart(cart);
});

export const editCarts = createAsyncThunk(
  "cart/editCarts",
  async ({ id, cart }) => {
    return await updateCart(id, cart);
  }
);

export const removeCarts = createAsyncThunk("cart/removeCarts", async (id) => {
  await deleteCart(id);
  return id;
});
