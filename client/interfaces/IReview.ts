import IUser from "./IUser";

export default interface IReview {
  id: number;
  review: string;
  rate: number;
  user: { id: number; name: string };
  productId: number;
  createdAt: string;
}
