export const STORAGE_URL = "/storage";

export const getImageUrl = (path: string) => {
  return `${STORAGE_URL}/${path}`;
};