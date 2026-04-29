export const toText = (v: unknown): string => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);

  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    const parts = [
      o.title,
      o.body,
      o.description,
      o.text,
      o.label,
      o.name,
    ].filter((x): x is string => typeof x === "string" && x.length > 0);

    if (parts.length) return parts.join(" — ");

    try {
      return JSON.stringify(v);
    } catch {
      return "";
    }
  }

  return String(v);
};
