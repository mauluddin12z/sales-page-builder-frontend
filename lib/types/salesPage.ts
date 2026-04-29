export interface SalesPage {
  id: number;
  user_id: number;
  product_name: string;
  description: string;
  features: string[];
  target_audience: string;
  price?: string | null;
  usp?: string | null;
  generated_content: string;
  template: "modern" | "bold" | "elegant";
  cta_label: string | null;
  cta_url: string | null;
  created_at: string;
  updated_at: string;
}
