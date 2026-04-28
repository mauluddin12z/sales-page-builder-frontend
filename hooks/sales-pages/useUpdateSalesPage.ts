import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { SWR_KEYS } from "@/lib/swrKeys";
import { updateSalesPage } from "@/lib/api/salesPages";

export const useUpdateSalesPage = () => {
  return useSWRMutation(
    "sales-pages-update",
    async (_, { arg }: { arg: { id: number; payload: any } }) => {
      const result = await updateSalesPage(arg.id, arg.payload);

      mutate(SWR_KEYS.salesPage(arg.id));
      mutate((key) => Array.isArray(key) && key[0] === "sales-pages");

      return result;
    },
  );
};
