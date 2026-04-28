import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { SWR_KEYS } from "@/lib/swrKeys";
import { deleteSalesPage } from "@/lib/api/salesPages";

export const useDeleteSalesPage = () => {
  return useSWRMutation(
    "sales-pages-delete",
    async (_, { arg }: { arg: number }) => {
      await deleteSalesPage(arg);

      mutate((key) => Array.isArray(key) && key[0] === "sales-pages");
      mutate(SWR_KEYS.salesPage(arg));
    },
  );
};
