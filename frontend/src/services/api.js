import axios from "axios";

export const API_ORIGIN = "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_ORIGIN}/api`
});

// 🔥 ALWAYS attach admin key
API.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers["x-admin-key"] = import.meta.env.VITE_ADMIN_KEY;
  return config;
});

export function assetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? path : "/" + path}`;
}

export default API;
