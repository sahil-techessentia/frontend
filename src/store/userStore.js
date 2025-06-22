import { API_ENDPOINTS } from "@/config/api";
import { apiHandler } from "@/utils/apiHandler";
import { create } from "zustand";
import useNotificationStore from "./notificationStore.js";

const userStore = create((set, get) => ({
  users: [],
  user: null,
  loading: false,
  error: null,
  getAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiHandler.get(API_ENDPOINTS.users.getAll);
      set({ users: response.users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
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

      // Initialize socket connection for notifications
      if (response?.user?.id) {
        useNotificationStore.getState().initSocket(response.user.id);
      }
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

      // Initialize socket connection for notifications after login
      if (response?.user?.id) {
        useNotificationStore.getState().initSocket(response.user.id);
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  logoutUser: () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    set({ user: null, loading: false, error: null });

    // Disconnect socket connection
    useNotificationStore.getState().disconnectSocket();
  },
  clearError: () => {
    set({ error: null });
  },
}));

export default userStore;
