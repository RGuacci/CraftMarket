import { api } from "../api/axios";
import { getCsrfCookie } from "../api/csrf";
import axios from "axios";

// Registrazione
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const register = async (data: RegisterData) => {
  await getCsrfCookie();
  const response = await api.post("/register", data);
  return response.data;
};

// Login
export interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  await getCsrfCookie();
  const response = await api.post("/login", data);
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

// getUser
export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "seller" | "admin";
  created_at: string;
  updated_at: string;
}

export const getUser = async (): Promise<User | null> => {
  try {
    const response = await api.get("/api/user");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
