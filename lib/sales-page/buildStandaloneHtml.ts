import { boldTemplate } from "../templates/bold";
import { elegantTemplate } from "../templates/elegant";
import { modernTemplate } from "../templates/modern";

import { normalizeSalesPage } from "./normalizeSalesPage";
import type { G } from "./types";

const templates: Record<string, (page: any, g: G) => string> = {
  modern: modernTemplate,
  bold: boldTemplate,
  elegant: elegantTemplate,
};

export function buildStandaloneHtml(page: any): string {
  const g = normalizeSalesPage(page);
  const template = page.template ?? "modern";

  const render = templates[template] ?? templates.modern;

  const title = g.headline || page.product_name;
  const desc = (g.subheadline || g.description || "").slice(0, 160);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
</head>
<body>
${render(page, g)}
</body>
</html>`;
}
