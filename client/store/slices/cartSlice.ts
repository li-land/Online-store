import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBookingResponse, IProduct } from "../../interfaces";

export interface CartState {
  isLoading: boolean;
  products: IProduct[];
  bookings: IBookingResponse[];
}

const initialState: CartState = {
  isLoading: false,
  products: [],
  bookings: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    setBookings: (state, action: PayloadAction<IBookingResponse[]>) => {
      state.bookings = action.payload;
    },
    removeProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
    removeCart: (state) => {
      state.products = [];
      state.isLoading = false;
    },
    changeAmount: (
      state,
      action: PayloadAction<{ id: number; amount: number }>
    ) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.products[index].amount = action.payload.amount;
    },
  },
});

export const { addProduct, removeProduct, changeAmount, removeCart } =
  cartSlice.actions;

export default cartSlice.reducer;
