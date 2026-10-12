import type { Product } from "./productService";
import { getCsrfCookie } from "../api/csrf";
import { api } from "../api/axios";

export interface Cart {
  id: number | null;
  items: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AddToCartData {
  product_id: number;
  quantity?: number;
}

// Visualizzazione del carrello
export const getCart = async (): Promise<Cart> => {
  const response = await api.get("/api/cart");

  return response.data.data;
};

// Aggiunta prodotto al carrello
export const addToCart = async (productData: AddToCartData) => {
  await getCsrfCookie();

  const response = await api.post("/api/cart/products", {
    product_id: productData.product_id,
    quantity: productData.quantity ?? 1,
  });

  return response.data;
};

// Modifica qauntità prodotti nel carrello
export const updateCartItem = async (productId: number, quantity: number) => {
  await getCsrfCookie();

  const response = await api.patch(`/api/cart/products/${productId}`, {
    quantity,
  });

  return response.data;
};
