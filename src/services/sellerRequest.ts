import { api } from "../api/axios";

export type SellerRequestStatus = "pending" | "approved" | "rejected";

export interface SellerRequest {
  id: number;
  user_id: number;
  description: string;
  category: string;
  motivation: string;
  status: SellerRequestStatus;
  created_at: string;
  updated_at: string;
  user?: SellerRequestUser;
}

export interface SellerRequestUser {
  id: number;
  name: string;
  email: string;
}

export interface CreateSellerRequestData {
  description: string;
  category: string;
  motivation: string;
}

export interface PaginatedSellerRequests {
  data: SellerRequest[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// recupero la candidatura dell'utente
export const getMySellerRequest = async (): Promise<SellerRequest | null> => {
  const response = await api.get<{ data: SellerRequest | null }>(
    "/api/seller-requests/me",
  );

  return response.data.data;
};

// invio la candidatura dell'utente
export const createSellerRequest = async (
  data: CreateSellerRequestData,
): Promise<SellerRequest> => {
  const response = await api.post<{ data: SellerRequest }>(
    "/api/seller-requests",
    data,
  );

  return response.data.data;
};

// recupero tutte le candidature
export const getSellerRequests = async (
  page = 1,
): Promise<PaginatedSellerRequests> => {
  const response = await api.get<PaginatedSellerRequests>(
    "/api/seller-requests",
    {
      params: { page },
    },
  );

  return response.data;
};

// approvo una candidatura
export const approveSellerRequest = async (
  id: number,
): Promise<{ message: string }> => {
  const response = await api.patch<{ message: string }>(
    `/api/seller-requests/${id}/approve`,
  );

  return response.data;
};

// rifiuto una candidatura
export const rejectSellerRequest = async (
  id: number,
): Promise<{ message: string }> => {
  const response = await api.patch<{ message: string }>(
    `/api/seller-requests/${id}/reject`,
  );

  return response.data;
};
