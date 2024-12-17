import { combineReducers } from "redux";
import productReducer from "./../features/products/productSlice";

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
