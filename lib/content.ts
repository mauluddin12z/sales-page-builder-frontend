import { NormalizedContentInterface } from "@/types";

export const defaultContent: NormalizedContentInterface = {
  headline: "",
  subheadline: "",
  description: "",
  benefits: [],
  features: [],
  social_proof: "",
  pricing: "",
  cta: "",
};

export function normalizeContent(
  g?: Partial<NormalizedContentInterface> | null,
): NormalizedContentInterface {
  return {
    ...defaultContent,
    ...g,
    benefits: g?.benefits ?? [],
    features: g?.features ?? [],
  };
}
