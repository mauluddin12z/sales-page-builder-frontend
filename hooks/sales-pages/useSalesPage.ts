import { fetchSalesPage } from "@/lib/api/salesPages";
import { SWR_KEYS } from "@/lib/swrKeys";
import useSWR from "swr";

export const useSalesPage = (id?: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? SWR_KEYS.salesPage(id) : null,
    () => fetchSalesPage(id!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 60000,
    },
  );

  return {
    salesPage: data,
    isLoading,
    error,
    mutate,
  };
};
