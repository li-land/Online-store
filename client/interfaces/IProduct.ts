import IReview from "./IReview";

export default interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  amount?: number;
  rating: number;
  catalogId?: number;
  productInfo: { id: number; title: string; description: string }[];
  reviews?: IReview[];
}
