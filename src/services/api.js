import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const api = axios.create({
  baseURL: backendBaseUrl,
  timeout: 10000, // 10 seconds
});

// Request interceptor: attach token unless skipAuth=true in config
api.interceptors.request.use(
  (config) => {
    if (!config.skipAuth) {
      const token = localStorage.getItem("access");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    let message = "API Error: Something went wrong";

    if (typeof data === "string") {
      message = data;
    } else if (data?.detail) {
      message = data.detail;
    } else if (data) {
      // Pick first field's first error message if possible
      const firstField = Object.keys(data)[0];
      message = Array.isArray(data[firstField])
        ? data[firstField][0]
        : data[firstField];
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
