// URL delle immagini
export const STORAGE_URL = "http://localhost:8000/storage";
export const getImageUrl = (path: string) => {
  return `${STORAGE_URL}/${path}`;
};