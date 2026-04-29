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

export type GeneratedContent = {
  headline: string;
  subheadline: string;
  description: string;
  benefits: string[];
  features: string[];
  social_proof: string;
  pricing: string;
  cta: string;
};

export type TemplateId = "modern" | "bold" | "elegant";

export type SectionKey =
  | "headline"
  | "subheadline"
  | "description"
  | "benefits"
  | "features"
  | "social_proof"
  | "pricing"
  | "cta";

export const TEMPLATES = [
  { id: "modern", name: "Modern SaaS", description: "Clean UI" },
  { id: "bold", name: "Bold Dark", description: "High contrast" },
  { id: "elegant", name: "Elegant Editorial", description: "Serif style" },
] as const;
