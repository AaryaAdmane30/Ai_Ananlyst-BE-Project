// lib/auth-api.ts
import { api } from "./api";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token); // store JWT
  api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
  return res.data.user;
};

export const fetchMe = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const res = await api.get("/auth/me");
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
};
