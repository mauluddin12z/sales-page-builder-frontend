import BoldTemplate from "@/components/templates/BoldTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";

const map = {
  modern: ModernTemplate,
  bold: BoldTemplate,
  elegant: ElegantTemplate,
};

interface props {
  template: "modern" | "bold" | "elegant";
  content: any;
  productName: string;
}

export function TemplateRenderer({ template, content, productName }: props) {
  const Renderer = map[template] ?? ModernTemplate;
  return <Renderer g={content} productName={productName} />;
}
