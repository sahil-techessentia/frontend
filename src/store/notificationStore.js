import { API_ENDPOINTS } from "@/config/api";
import { apiHandler } from "@/utils/apiHandler";
import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notifications) => set({ notifications }),
  getNotifications: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ error: "Unauthorized", loading: false });
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await apiHandler.get(
      API_ENDPOINTS.notifications.get,
      headers
    );
    set({ notifications: response?.notifications || [] });
    set({ unreadCount: response?.unread_count || 0 });
  },
}));

export default useNotificationStore;
