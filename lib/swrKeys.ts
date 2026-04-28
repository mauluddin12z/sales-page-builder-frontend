export const SWR_KEYS = {
  salesPages: (page: number) => ["sales-pages", page] as const,
  salesPage: (id: number) => ["sales-page", id] as const,
};
