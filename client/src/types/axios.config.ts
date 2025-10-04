import axios from "axios";
// const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const axiosClient = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://imdb-clone-1-0ext.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
