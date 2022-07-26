import { combineReducers } from "@reduxjs/toolkit";
import {
  cartReducer,
  catalogReducer,
  productReducer,
  userReducer,
} from "./slices";

export const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
  cart: cartReducer,
  catalog: catalogReducer,
});
