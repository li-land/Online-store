import IProduct from "./IProduct";

export default interface IBookingResponse {
  id: number;
  address: string;
  status: string;
  createdAt: string;
  Bookinginfos: { amount: number; product: IProduct }[];
}
