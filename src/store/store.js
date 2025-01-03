import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartsReducer from "./../features/products/cartSlice";
import rootReducer from "../reducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
