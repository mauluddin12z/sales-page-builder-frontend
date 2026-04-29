export type PaginatedResponse<T> = {
  current_page: number;
  data: T;
  first_page_url: string | null;
  from: number | null;
  last_page: number;
  last_page_url: string | null;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
};

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export type NormalizedContentInterface = {
  headline: string;
  subheadline: string;
  description: string;
  benefits: string[];
  features: string[];
  social_proof: string;
  pricing: string;
  cta: string;
  cta_label?: string | null;
  cta_url?: string | null;
};
