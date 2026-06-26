import axios from "axios";

const api = axios.create({
  baseURL: "https://bellezaa.onrender.com/api",
});

export default api;