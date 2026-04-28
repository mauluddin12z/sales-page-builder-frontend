import useSWRMutation from "swr/mutation";
import { mutate } from "swr";

import { SWR_KEYS } from "@/lib/swrKeys";
import { deleteSalesPage } from "@/lib/api/salesPages";

export const useDeleteSalesPage = () => {
  return useSWRMutation(
    "sales-pages-delete",
    async (_, { arg }: { arg: number }) => {
      try {
        await deleteSalesPage(arg);

        // revalidate ALL paginated lists
        await mutate(
          (key) => Array.isArray(key) && key[0] === "sales-pages",
          undefined,
          { revalidate: true },
        );

        // optional: clear detail cache immediately
        await mutate(SWR_KEYS.salesPage(arg), undefined, false);
      } catch (error) {
        console.error("Delete failed:", error);
        throw error;
      }
    },
  );
};
