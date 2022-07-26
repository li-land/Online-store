import { AxiosResponse } from "axios";
import { API_URL, http } from "..";
import { IBookingResponse } from "../../interfaces";

export class BookingAPI {
  static async getAllBookings(
    userId: number
  ): Promise<AxiosResponse<IBookingResponse[]>> {
    return http.get<IBookingResponse[]>(`${API_URL.BOOKING}/${userId}`);
  }
  static async createBooking(
    userId: number,
    address: string,
    bookingsProducts: { productId: number; amount: number }[]
  ): Promise<void> {
    return http.post(API_URL.BOOKING, {
      userId,
      address,
      bookingsProducts,
    });
  }
}
