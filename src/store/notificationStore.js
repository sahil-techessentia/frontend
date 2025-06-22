import { API_ENDPOINTS } from "@/config/api";
import { apiHandler } from "@/utils/apiHandler";
import { create } from "zustand";
import socketService from "../config/socket.js";

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,

  setNotifications: (notifications) => set({ notifications }),

  // Initialize socket connection for notifications
  initSocket: (userId) => {
    if (!userId) return;

    const socket = socketService.connect(userId);

    // Listen for new notifications
    socketService.onNotification((notification) => {
      const { notifications, unreadCount } = get();
      set({
        notifications: [notification, ...notifications],
        unreadCount: unreadCount + 1,
      });
    });
  },

  // Disconnect socket
  disconnectSocket: () => {
    socketService.disconnect();
  },

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
