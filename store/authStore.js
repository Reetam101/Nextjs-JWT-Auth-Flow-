import { create } from "zustand";
import axiosInstance from "../axiosInstance"; // Import your Axios instance
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // Store user data
      isAuthenticated: false, // Store authentication status
      accessToken: null, // Access token for authenticated requests
      signUp: async (credentials) => {
        try {
          const response = await axiosInstance.post(
            "/api/v1/users/register",
            credentials
          );
          set({
            user: response.data.user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Sign up failed", error);
          throw error;
        }
      },

      // Login method
      login: async (credentials) => {
        try {
          const response = await axiosInstance.post(
            "/api/v1/users/login",
            credentials
          );
          console.log(response.data);
          set({
            user: response.data.user, // Update user data
            isAuthenticated: true, // Set authentication status
            accessToken: response.data.accessToken,
          });
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },

      // Logout method
      logout: async () => {
        try {
          await axiosInstance.post("/api/v1/users/logout");
          set({
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error("Logout failed:", error);
          throw error;
        }
      },

      // Refresh token method
      refreshToken: async () => {
        try {
          const response = await axiosInstance.post(
            "/api/v1/users/refresh-token"
          );
          set({
            accessToken: response.data.accessToken,
            isAuthenticated: true, // Ensure the user is authenticated
          });
        } catch (error) {
          console.error("Token refresh failed:", error);
          set({ isAuthenticated: false });
          throw error;
        }
      },
    }),
    {
      name: "auth", // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Use
      onRehydrateStorage: () => (state) => {
        console.log("State has been rehydrated:", state);
      },
    }
  )
);

export default useAuthStore;
