import { AppDispatch } from "..";
import { BookingAPI } from "../../http/api/booking";
import { CatalogAPI } from "../../http/api/catalog";
import { IProduct } from "../../interfaces";
import { cartSlice } from "../slices/cartSlice";

export const CartAsyncActionCreators = {
  createBooking:
    (userId: number, address: string, products: IProduct[]): any =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(cartSlice.actions.setLoading());
        await BookingAPI.createBooking(
          userId,
          address,
          products.map((product) => {
            return { productId: product.id, amount: product.amount };
          })
        );
        dispatch(cartSlice.actions.removeCart());
      } catch (e: any) {
        alert(e.response.data.message);
      }
    },
  fetchBookings:
    (userId: number): any =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await BookingAPI.getAllBookings(userId);
        dispatch(cartSlice.actions.setBookings(response.data));
      } catch (e: any) {
        alert(e.response.data.message);
      }
    },
};
