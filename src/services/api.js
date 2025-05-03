import axios from "axios";


const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const api = axios.create({
  baseURL: backendBaseUrl,
  timeout: 10000, // 10 seconds
});

// Response interceptor for global error handling
api.interceptors.response.use(
  response => response,
  error => {
    const data = error.response?.data;
    let message = "API error";

    if (typeof data === "string") {
      message = data;
    } else if (data?.detail) {
      message = data.detail;
    } else if (data) {
      // Collect all error messages from fields
      message = Object.entries(data)
        .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
        .join(" | ");
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
