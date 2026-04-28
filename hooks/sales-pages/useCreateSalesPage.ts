import useSWRMutation from "swr/mutation";
import { mutate } from "swr";

import { createSalesPage } from "@/lib/api/salesPages";
import { SalesPage } from "@/lib/types/salesPage";
import { ApiResponse } from "@/types";

type CreatePayload = Omit<
  SalesPage,
  "id" | "created_at" | "updated_at" | "user_id"
>;

export const useCreateSalesPage = () => {
  return useSWRMutation<ApiResponse<SalesPage>, any, string, CreatePayload>(
    "sales-pages-create",
    async (_, { arg }) => {
      try {
        const result = await createSalesPage(arg);

        await mutate(
          (key) => Array.isArray(key) && key[0] === "sales-pages",
          undefined,
          { revalidate: true, populateCache: false },
        );

        return result;
      } catch (error) {
        console.error("Create failed:", error);
        throw error;
      }
    },
  );
};
