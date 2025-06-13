import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  signup: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/user/register", formData);
      set({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
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
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
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
        user: res.data,
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
}));
