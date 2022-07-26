import IProduct from "./IProduct";

export default interface ICatalogProductsResponse {
  rows: IProduct[];
  count: number;
}
