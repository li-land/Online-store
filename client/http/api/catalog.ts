import { AxiosResponse } from "axios";
import { API_URL, http } from "..";
import { ICatalog, ICatalogProductsResponse, IProduct } from "../../interfaces";

export class CatalogAPI {
  static async getAll(): Promise<AxiosResponse<ICatalog[]>> {
    return http.get<ICatalog[]>(API_URL.CATALOG);
  }
  static async getLimitCatalogsProducts(
    id: number,
    page: number,
    limit: number,
    sorting?: string
  ): Promise<AxiosResponse<ICatalogProductsResponse>> {
    return http.get<ICatalogProductsResponse>(`${API_URL.CATALOG}/${id}`, {
      params: { page, limit, sorting },
    });
  }
  static async getAllCatalogsProducts(
    id: number
  ): Promise<AxiosResponse<IProduct[]>> {
    return http.get<IProduct[]>(`${API_URL.CATALOG}/${id}`, {});
  }
  static async createCatalog(name: string): Promise<AxiosResponse<ICatalog>> {
    return http.post<ICatalog>(API_URL.CATALOG, {
      name,
    });
  }
}
