import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId = null) {
    if (this.socket) {
      return this.socket;
    }

    // Create socket connection
    this.socket = io("http://localhost:5002", {
      withCredentials: true,
    });

    // Join user room if userId is provided
    if (userId) {
      this.socket.emit("join", userId);
    }

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Listen to notification events
  onNotification(callback) {
    if (this.socket) {
      this.socket.on("notification", callback);
    }
  }

  // Remove notification listener
  offNotification(callback) {
    if (this.socket) {
      this.socket.off("notification", callback);
    }
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
