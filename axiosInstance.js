import axios from "axios";
import useAuthStore from "./store/authStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = useAuthStore.getState();
        await refreshToken(); // Refresh tokens using Zustand

        return axiosInstance(originalRequest); // Retry original request
      } catch (refreshError) {
        useAuthStore.getState().logout(); // Clear auth state on failure
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
