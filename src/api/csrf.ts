import { api } from "./axios";

export const getCsrfCookie = async () => {
  await api.get("sanctum/csrf-cookie");
};
