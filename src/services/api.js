import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const api = axios.create({
  baseURL: backendBaseUrl,
  timeout: 10000, // 10 seconds
});

// --- Token helpers (optional, for parity with Expo) ---
function getToken(key) {
  return localStorage.getItem(key);
}
function setToken(key, value) {
  localStorage.setItem(key, value);
}
function removeTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

// Request interceptor: attach token unless skipAuth=true in config
api.interceptors.request.use(
  (config) => {
    if (!config.skipAuth) {
      const token = getToken("access");
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
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => ({
    status: response.status,
    data: response.data,
    message: response.data?.message || "Success",
  }),
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic for requests with skipAuth=true
    if (originalRequest?.skipAuth) {
      return Promise.reject({
        message: parseApiError(error),
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = getToken("refresh");
      if (refreshToken) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = "Bearer " + token;
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
          setToken("access", newAccess);
          api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
          processQueue(null, newAccess);

          originalRequest.headers.Authorization = "Bearer " + newAccess;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          removeTokens();
          // Optionally trigger a logout handler here
          return Promise.reject({
            message: parseApiError(refreshError),
            status: refreshError.response?.status,
            data: refreshError.response?.data,
          });
        } finally {
          isRefreshing = false;
        }
      } else {
        removeTokens();
        // Optionally trigger a logout handler here
        return Promise.reject({
          message: parseApiError(error),
          status: error.response?.status,
          data: error.response?.data,
        });
      }
    }

    return Promise.reject({
      message: parseApiError(error),
      status: error.response?.status,
      data: error.response?.data,
    });
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
export { getToken, setToken, removeTokens };
