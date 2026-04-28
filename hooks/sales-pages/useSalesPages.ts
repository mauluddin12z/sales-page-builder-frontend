import { fetchSalesPages } from "@/lib/api/salesPages";
import { SWR_KEYS } from "@/lib/swrKeys";
import useSWR from "swr";

export const useSalesPages = (page: number = 1) => {
  const { data, error, isLoading, mutate } = useSWR(
    SWR_KEYS.salesPages(page),
    () => fetchSalesPages(page),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  return {
    salesPages: data,
    isLoading,
    error,
    mutate,
  };
};
