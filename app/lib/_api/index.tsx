import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor Request
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage (kalau ada)
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Tambahkan Authorization header hanya kalau token ada
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor Response (opsional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Kalau token invalid atau expired
    if (error.response?.status === 401) {
      console.warn("⚠️ Token expired atau tidak valid");
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // redirect ke login kalau perlu
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export { api };
