import { create } from "zustand";
import API from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  //I removed the signin/logout for the time being
  //signup
  signup: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.post("/auth/signup", formData);
      set({ user: response.data.user, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      set({ error: errorMsg, isLoading: false });
      throw errorMsg;
    }
  },

  //login
  login: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.post("/auth/login", formData);
      set({ user: response.data.user, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      set({ error: errorMsg, isLoading: false });
      throw errorMsg;
    }
  },

  //logout
  logout: async () => {
    try {
      await API.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  //get current user
  getCurrentUser: async () => {
    try {
      const response = await API.get("/auth/me");
      set({ user: response.data });
    } catch (error) {
      set({ user: null });
    }
  },

  //update profile
  updateProfile: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.put("/auth/profile", formData);
      set({ user: response.data.user, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      set({ error: errorMsg, isLoading: false });
      throw errorMsg;
    }
  },

  //clear error
  clearError: () => set({ error: null })
}));

export default useAuthStore;