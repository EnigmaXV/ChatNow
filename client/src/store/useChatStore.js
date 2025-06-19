import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";

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
}));
