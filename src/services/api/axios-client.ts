import axios from "axios";
import {
  ApiError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "./errors";
import { getToken, logout } from "./auth-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401:
        logout();
        return Promise.reject(new UnauthorizedError());
      case 404:
        return Promise.reject(new NotFoundError());
      case 500:
        return Promise.reject(new ServerError());
      default:
        return Promise.reject(new ApiError());
    }
  }
);
