import safeParseJSON from "../safeParseJson";
import { toText } from "./toText";
import type { G } from "./types";

export function normalizeSalesPage(page: any): G {
  const raw = page.generated_content
    ? safeParseJSON(page.generated_content)
    : {};

  const arr = (v: unknown) =>
    Array.isArray(v) ? v.map(toText).filter(Boolean) : [];

  return {
    headline: toText(raw.headline),
    subheadline: toText(raw.subheadline),
    description: toText(raw.description),
    benefits: arr(raw.benefits),
    features: arr(raw.features),
    social_proof: toText(raw.social_proof ?? raw.socialProof),
    pricing: toText(raw.pricing),
    cta: toText(raw.cta),
  };
}
