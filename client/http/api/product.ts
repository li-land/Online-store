import { AxiosResponse } from "axios";
import { API_URL, http } from "..";
import { IProduct } from "../../interfaces";

export class ProductAPI {
  static async getOne(id: number): Promise<AxiosResponse<IProduct>> {
    return http.get<IProduct>(`${API_URL.PRODUCT}/${id}`);
  }
  static async createOne(formData: FormData): Promise<AxiosResponse<string>> {
    return http.post<string>(API_URL.PRODUCT, formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  }
  static async deleteOne(id: number): Promise<AxiosResponse<string>> {
    return http.delete<string>(`${API_URL.PRODUCT}/${id}`);
  }
  static async getNoveltyAndPopular(): Promise<
    AxiosResponse<{
      novelties: IProduct[];
      populars: IProduct[];
    }>
  > {
    return http.get<{
      novelties: IProduct[];
      populars: IProduct[];
    }>(API_URL.PRODUCT);
  }

  static async sendReview(
    productId: number,
    userId: number,
    review: string,
    rate: number
  ): Promise<AxiosResponse<void>> {
    return http.post(API_URL.REVIEW, {
      productId,
      userId,
      review,
      rate,
    });
  }
}
