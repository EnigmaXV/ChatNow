import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set) => ({
  users: [],
  messages: [],

  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/message/contacts");
      console.log("Fetched users:", res.data);
      set({ users: res.data.contacts });
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  },
  getMessages: async (receiverId) => {
    try {
      const res = await axiosInstance.get(`/message/${receiverId}`);
      console.log("Fetched messages:", res.data);
      set({ messages: res.data.messages });
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  },
  sendMessage: async (receiverId, content, image) => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }
      const res = await axiosInstance.post(
        `/message/send/${receiverId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      set((state) => ({ messages: [...state.messages, res.data.message] }));
    } catch (err) {
      console.error("Error sending message:", err);
    }
  },
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (data) => {
      console.log("New message received:", data.message);
      set((state) => ({
        messages: [...state.messages, data.message],
      }));
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
