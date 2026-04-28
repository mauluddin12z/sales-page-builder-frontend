import { ApiResponse, PaginatedResponse } from "@/types";
import { SalesPage } from "../types/salesPage";
import api from "./client";

/**
 * GET ALL (pagination)
 */
export const fetchSalesPages = async (
  page = 1,
): Promise<PaginatedResponse<SalesPage[]>> => {
  const { data } = await api.get(`/sales-pages?page=${page}`);
  return data;
};

/**
 * GET ONE
 */
export const fetchSalesPage = async (id: number): Promise<SalesPage> => {
  const { data } = await api.get(`/sales-pages/${id}`);
  return data;
};

/**
 * CREATE
 */
export const createSalesPage = async (
  payload: Omit<SalesPage, "id" | "created_at" | "updated_at" | "user_id">,
): Promise<ApiResponse<SalesPage>> => {
  const { data } = await api.post("/sales-pages", payload);
  return data;
};

/**
 * UPDATE
 */
export const updateSalesPage = async (
  id: number,
  payload: Partial<SalesPage>,
): Promise<ApiResponse<SalesPage>> => {
  const { data } = await api.put(`/sales-pages/${id}`, payload);
  return data;
};

/**
 * DELETE
 */
export const deleteSalesPage = async (id: number): Promise<void> => {
  await api.delete(`/sales-pages/${id}`);
};

/**
 * generate sales page
 */
export const generateSalesPage = async (
  payload: Omit<
    SalesPage,
    | "id"
    | "created_at"
    | "updated_at"
    | "user_id"
    | "generated_content"
    | "template"
  >,
): Promise<{ success: boolean; text: string }> => {
  const { data } = await api.post("/generate-sales-page", payload);
  return data;
};
export const regenerateSalesPage = async (
  payload: Omit<
    SalesPage,
    | "id"
    | "created_at"
    | "updated_at"
    | "user_id"
    | "generated_content"
    | "template"
  > & {
    field: string;
    current_output: Record<string, any>;
  },
): Promise<{ success: boolean; text: any }> => {
  const { data } = await api.post("/regenerate-sales-page", payload);
  return data;
};
