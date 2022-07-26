import { AxiosResponse } from "axios";
import { API_URL, http } from "..";
import { IAuthResponse } from "../../interfaces";

export class AuthAPI {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return http.post<IAuthResponse>(`${API_URL.AUTH}/login`, {
      email,
      password,
    });
  }
  static async registration(
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return http.post<IAuthResponse>(`${API_URL.AUTH}/registration`, {
      name,
      email,
      password,
    });
  }
  static async checkAuth(): Promise<AxiosResponse<IAuthResponse>> {
    return http.get(`${API_URL.AUTH}/check-auth`);
  }
  static async logout(): Promise<void> {
    return http.get(`${API_URL.AUTH}/logout`);
  }
}
