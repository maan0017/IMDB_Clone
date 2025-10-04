import { useEffect } from "react";
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

import useAuth from "./useAuth";

const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

// Extend AxiosRequestConfig to include `_retry`
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const useAxiosPrivate = (): AxiosInstance => {
  const axiosAuth: AxiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true, // important for HTTP-only cookies
  });

  const { setAuth } = useAuth();

  let isRefreshing = false;
  let failedQueue: FailedRequest[] = [];

  // Helper to process queued requests after token refresh
  const processQueue = (error: unknown, response: unknown = null): void => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(response);
      }
    });

    failedQueue = [];
  };

  useEffect(() => {
    const responseInterceptor = axiosAuth.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        console.log("⚠ Interceptor caught error:", error);

        const originalRequest = error.config as AxiosRequestConfigWithRetry;

        if (!originalRequest || !error.response) {
          return Promise.reject(error);
        }

        // If refresh request itself fails → hard logout
        if (
          originalRequest.url?.includes("/refresh") &&
          error.response.status === 401
        ) {
          console.error("❌ Refresh token has expired or is invalid.");
          return Promise.reject(error);
        }

        // Handle 401s
        if (error.response.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            // Queue this request until refresh is done
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then(() => axiosAuth(originalRequest))
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          return new Promise((resolve, reject) => {
            axiosAuth
              .post("/refresh")
              .then(() => {
                processQueue(null);
                axiosAuth(originalRequest).then(resolve).catch(reject);
              })
              .catch((refreshError) => {
                processQueue(refreshError, null);
                localStorage.removeItem("user");
                setAuth(null);
                reject(refreshError);
              })
              .finally(() => {
                isRefreshing = false;
              });
          });
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosAuth.interceptors.response.eject(responseInterceptor);
    };
  }, [setAuth]);

  return axiosAuth;
};

export default useAxiosPrivate;
