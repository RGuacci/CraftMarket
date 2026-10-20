const API_URL = import.meta.env.VITE_API_URL;

export const STORAGE_URL = `${API_URL}/storage`;

export const getImageUrl = (path: string) => {
  return `${STORAGE_URL}/${path}`;
};
