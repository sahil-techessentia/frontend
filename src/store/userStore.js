import { API_ENDPOINTS } from "@/config/api";
import { apiHandler } from "@/utils/apiHandler";
import { create } from "zustand";

const userStore = create((set) => ({
  users: [],
  user: null,
  loading: false,
  error: null,

  getUser: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        set({ error: "Unauthorized", loading: false });
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiHandler.get(API_ENDPOINTS.users.userDetails, {
        headers,
      });
      if (!response?.user) throw new Error("Failed to fetch data");

      set({ user: response?.user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  createUser: async (user) => {
    set({ loading: true, error: null });
    try {
      const response = await apiHandler.post(API_ENDPOINTS.users.user, user);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  updateUser: async (user) => {
    set({ loading: true, error: null });
    try {
      const response = await apiHandler.put(API_ENDPOINTS.users.user, user);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  loginUser: async (user) => {
    set({ loading: true, error: null });
    try {
      const response = await apiHandler.post(API_ENDPOINTS.auth.login, user);
      console.log(response, "response");
      localStorage.setItem("token", response.token);
      document.cookie = `token=${response.token}; path=/`;
      set({ user: response.user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default userStore;
