import { api } from "../api/axios";
import { getCsrfCookie } from "../api/csrf";
import axios from "axios";
import type { User } from "./authService";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ProductImages {
  id: number;
  product_id: number;
  path: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  user: User;
  user_id: number;
  categories: Category[];
  images: ProductImages[];
  created_at: string;
  updated_at: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: number[];
  images: File[];
}

export interface UpdatedProductData extends CreateProductData {
  remove_images: number[];
}

export interface CategorySelectorProps {
    categories: Category[];
    selectedCategories: number[];
    onChange: (ids: number[]) => void;
  }

// Index
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

// Create
export const createProduct = async (productData: CreateProductData) => {
  await getCsrfCookie();
  const formData = new FormData();

  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", String(productData.price));
  formData.append("stock", String(productData.stock));
  productData.images.forEach((image) => {
    formData.append("images[]", image);
  });
  productData.categories.forEach((category) => {
    formData.append("categories[]", String(category));
  });

  const response = await api.post("/api/products", formData);
  return response.data;
};

// Show
export const getProduct = async (slug: string) => {
  const response = await api.get(`/api/products/${slug}`);
  return response.data;
};

// Update
export const updateProduct = async (
  slug: string,
  productData: UpdatedProductData,
) => {
  await getCsrfCookie();
  const formData = new FormData();

  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", String(productData.price));
  formData.append("stock", String(productData.stock));
  //Nuove immagini   
  productData.images.forEach((image) => {
    formData.append("images[]", image);
  });
  //Immagini da eliminare
    productData.remove_images.forEach((id) => {
    formData.append("images[]", String(id));
  });

  productData.categories.forEach((category) => {
    formData.append("categories[]", String(category));
  });

  const response = await api.put(`/api/products/${slug}`,formData);
  return response.data;
};

// Delete
export const deleteProduct = async(slug: string) => {
   await getCsrfCookie();
   const response = await api.delete(`/api/products/${slug}`);
   return response.data;
}

// Index categorie
export const getCategories = async(): Promise<Category[]> => {
   const response = await api.get("/api/categories");
   return response.data;
}