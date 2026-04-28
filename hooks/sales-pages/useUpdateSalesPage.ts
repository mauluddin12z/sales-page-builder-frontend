import useSWRMutation from "swr/mutation";
import { mutate } from "swr";

import { SWR_KEYS } from "@/lib/swrKeys";
import { updateSalesPage } from "@/lib/api/salesPages";

type UpdateArgs = {
  id: number;
  payload: any;
};

export const useUpdateSalesPage = () => {
  return useSWRMutation(
    "sales-pages-update",
    async (_, { arg }: { arg: UpdateArgs }) => {
      try {
        const { id, payload } = arg;
        const result = await updateSalesPage(id, payload);

        const updated = result.data;

        await mutate(SWR_KEYS.salesPage(id), updated, false);
        await mutate((key) => Array.isArray(key) && key[0] === "sales-pages");

        return result;
      } catch (error) {
        console.error("Update failed:", error);
        throw error;
      }
    },
  );
};
