import { api } from "../api/axios";
import type { ShippingAddress } from "../components/cart/shippingModal";

export type PaymentMethod = "card" | "paypal";

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user_id: number;
  status: "pending" | "paid" | "failed";
  total: number;
  order_items: OrderItem[];
}

interface OrderResponse {
  message: string;
  order: Order;
}

export async function checkout(
  shippingAddress: ShippingAddress,
): Promise<Order> {
  const response = await api.post<OrderResponse>("/api/checkout", shippingAddress);

  return response.data.order;
}

export async function payOrder(
  orderId: number,
  method: PaymentMethod,
): Promise<Order> {
  const response = await api.post<OrderResponse>(`/api/orders/${orderId}/pay`, {
    method,
  });

  return response.data.order;
}
