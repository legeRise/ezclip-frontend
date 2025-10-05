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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic for requests with skipAuth=true
    if (originalRequest?.skipAuth) {
    return Promise.reject(new Error(parseApiError(error)));
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await axios.post(
            `${backendBaseUrl}/auth/jwt/refresh/`,
            { refresh: refreshToken }
          );
          const newAccess = res.data.access;
          localStorage.setItem("access", newAccess);
          api.defaults.headers.common["Authorization"] = "Bearer " + newAccess;
          processQueue(null, newAccess);
          originalRequest.headers["Authorization"] = "Bearer " + newAccess;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.reload();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.reload();
      }
    }

    // Use the parser for all other errors
    return Promise.reject(new Error(parseApiError(error)));
  }
);



function parseApiError(error) {
  const data = error.response?.data;
  let message = "API Error: Something went wrong";
  if (typeof data === "string") message = data;
  else if (data?.detail) message = data.detail;
  else if (data) {
    const firstField = Object.keys(data)[0];
    message = Array.isArray(data[firstField])
      ? data[firstField][0]
      : data[firstField];
  }
  return message;
}

export default api;
