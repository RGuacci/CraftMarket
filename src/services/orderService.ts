import { api } from "../api/axios";
import type { ShippingAddress } from "../components/cart/shippingModal";

export type PaymentMethod = "card" | "paypal";

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: {
    id: number;
    name: string;
    images?: {
      id: number;
      url: string;
    }[];
  } | null;
}

export type OrderStatus = "pending" | "paid" | "failed";

export interface Order {
  id: number;
  user_id: number;
  status: OrderStatus;
  total: string | number;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  orderItems: OrderItem[];
  created_at: string;
  updated_at: string;
}

interface OrdersResponse {
  orders: Order[];
}

interface OrderResponse {
  message: string;
  order: Order;
}

// checkout
export async function checkout(
  shippingAddress: ShippingAddress,
): Promise<Order> {
  const response = await api.post<OrderResponse>(
    "/api/checkout",
    shippingAddress,
  );

  return response.data.order;
}

// pagamento
export async function payOrder(
  orderId: number,
  method: PaymentMethod,
): Promise<Order> {
  const response = await api.post<OrderResponse>(`/api/orders/${orderId}/pay`, {
    method,
  });

  return response.data.order;
}

// caricamento ordini
export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get<OrdersResponse>("api/orders");

  return response.data.orders;
};

// caricamento ordine
export const getOrder = async (orderId: number): Promise<Order> => {
  const response = await api.get<OrderResponse>(`api/orders/${orderId}`);

  return response.data.order;
};
