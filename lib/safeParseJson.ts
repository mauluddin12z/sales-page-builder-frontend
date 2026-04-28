const safeParseJSON = (value: any) => {
  if (!value || typeof value !== "string") return value ?? null;

  try {
    return JSON.parse(value);
  } catch {
    console.error("Invalid JSON:", value);
    return null;
  }
};
export default safeParseJSON;
