import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  socket: null,
  onlineUsers: [],

  signup: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/user/register", formData);
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      get().connectSocket();
      toast.success("Signup successful!");
    } catch (err) {
      console.error("Signup error:", err);
      set({ isLoading: false });
      toast.error(
        err.response?.data?.error || "Signup failed. Please try again."
      );
    }
  },
  login: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/user/login", formData);
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      get().connectSocket();
      toast.success("Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      set({ isLoading: false });
      toast.error(
        err.response?.data?.error || "Login failed. Please try again."
      );
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.get("/user/logout");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      get().disconnectSocket();
      toast.success("Logout successful!");
    } catch (err) {
      console.error("Logout error:", err);
      set({ isLoading: false });
      toast.error(
        err.response?.data?.error || "Logout failed. Please try again."
      );
    }
  },
  updateProfile: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.patch("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({
        user: res.data.user,
        isLoading: false,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update profile error:", err);
      set({ isLoading: false });
      toast.error(
        err.response?.data?.error || "Profile update failed. Please try again."
      );
    }
  },
  loadUser: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/user/me");
      set({
        user: res.data.currentUser,
        isAuthenticated: true,
        isLoading: false,
      });
      get().connectSocket();
    } catch (err) {
      console.error("load user error:", err);
      set({ isLoading: false });
      toast.error(
        err.response?.data?.error ||
          "Can't load the current user please try to login"
      );
    }
  },
  connectSocket: () => {
    if (get().isAuthenticated && get().socket?.connected) {
      return; // Socket already connected
    }
    const socket = io("http://localhost:3000/", {
      query: {
        userId: get().user?._id,
      },
    });
    socket.on("getOnlineUsers", (usersIds) => {
      set({ onlineUsers: usersIds });
    });
    socket.connect();
    set({ socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));
