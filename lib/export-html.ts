import { buildStandaloneHtml } from "@/lib/sales-page/buildStandaloneHtml";
import { SalesPage } from "./types/salesPage";

export function downloadHtmlFile(page: SalesPage): void {
  const html = buildStandaloneHtml(page);
  const slug =
    page.product_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "sales-page";
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slug}-${page.template ?? "modern"}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
