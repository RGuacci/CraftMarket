import { api } from "../api/axios";
import { getCsrfCookie } from '../api/csrf';

// Registrazione
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const register = async (data: RegisterData) => {
    await getCsrfCookie();
    const response = await api.post("/register",data);
    return response.data;
}

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
}
