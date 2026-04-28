import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { createSalesPage } from "@/lib/api/salesPages";
import { SalesPage } from "@/lib/types/salesPage";

type CreatePayload = Omit<
  SalesPage,
  "id" | "created_at" | "updated_at" | "user_id"
>;

export const useCreateSalesPage = () => {
  return useSWRMutation<SalesPage, any, "sales-pages-create", CreatePayload>(
    "sales-pages-create",
    async (_, { arg }) => {
      const result = await createSalesPage(arg);

      mutate((key) => Array.isArray(key) && key[0] === "sales-pages");

      return result;
    },
  );
};
