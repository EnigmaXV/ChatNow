import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true, // Include cookies in requests
});
