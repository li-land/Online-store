import axios from "axios";
import { IAuthResponse } from "../interfaces";
import { AuthAPI } from "./api/auth";

export enum API_URL {
  AUTH = "/auth",
  CATALOG = "/catalog",
  PRODUCT = "/product",
  REVIEW = "/review",
  BOOKING = "/booking",
}

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  withCredentials: true,
});

http.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get(`${API_URL.AUTH}/check-auth`, {
          withCredentials: true,
        });
        return http.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);
