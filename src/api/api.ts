import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.ENV === "production" ? process.env.VUE_APP_API_BASE_URL : "/",
  withCredentials: true,
});

export default api;
