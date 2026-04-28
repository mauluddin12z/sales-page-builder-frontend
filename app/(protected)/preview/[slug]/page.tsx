"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Download,
  Loader2,
  Pencil,
  RefreshCw,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useSalesPage, useUpdateSalesPage } from "@/hooks/sales-pages";
import toast from "react-hot-toast";
import { downloadHtmlFile } from "@/lib/export-html";
import BoldTemplate from "@/components/templates/BoldTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { regenerateSalesPage } from "@/lib/api/salesPages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

export const TEMPLATES: {
  id: TemplateId;
  name: string;
  description: string;
}[] = [
  {
    id: "modern",
    name: "Modern SaaS",
    description: "Clean, gradient hero, soft shadows",
  },
  {
    id: "bold",
    name: "Bold Dark",
    description: "High-contrast, brutalist, neon accents",
  },
  {
    id: "elegant",
    name: "Elegant Editorial",
    description: "Serif typography, generous whitespace",
  },
];

const SECTION_LABELS: { key: SectionKey; label: string }[] = [
  { key: "headline", label: "Headline" },
  { key: "subheadline", label: "Subheadline" },
  { key: "description", label: "Description" },
  { key: "benefits", label: "Benefits" },
  { key: "features", label: "Features" },
  { key: "social_proof", label: "Social proof" },
  { key: "pricing", label: "Pricing" },
  { key: "cta", label: "Call to action" },
];

export default function Page({ params }: PageProps) {
  const { slug } = React.use(params);
  const id = slug.split("-")[2];
  const router = useRouter();

  const { salesPage: page, isLoading } = useSalesPage(Number(id));
  const { trigger: updateSalesPage } = useUpdateSalesPage();

  const [template, setTemplate] = useState<TemplateId>(
    page?.template || "modern",
  );
  const [regenLoading, setRegenLoading] = useState<SectionKey | null>(null);
  const [flashKey, setFlashKey] = useState<SectionKey | null>(null);

  console.log(page?.template)

  useEffect(() => {
    if (page && template !== page.template) {
      updateSalesPage({
        id: Number(id),
        payload: {
          ...page,
          template,
        },
      });
    }
  }, [template]);

  const handleRegenerate = async (section: SectionKey) => {
    if (!page || regenLoading) return;

    setRegenLoading(section);

    try {
      const regenerated = await regenerateSalesPage({
        field: section,
        product_name: page.product_name,
        description: page.description,
        features: page.features,
        target_audience: page.target_audience,
        price: page.price || "",
        usp: page.usp || "",
        current_output: JSON.parse(page.generated_content),
      });

      const updatedContent = {
        ...JSON.parse(page.generated_content),
        ...regenerated.text,
      };

      updateSalesPage({
        id: Number(id),
        payload: {
          ...page,
          template,
          generated_content: JSON.stringify(updatedContent),
        },
      });

      setFlashKey(section);
      toast.success(`${section.replace("_", " ")} regenerated`);

      setTimeout(() => setFlashKey(null), 1200);
    } catch (err) {
      console.error(err);
      toast.error("Regeneration failed");
    } finally {
      setRegenLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Page not found</h2>
          <Button asChild className="mt-4">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const g = JSON.parse(page?.generated_content);

  const Renderer =
    template === "bold"
      ? BoldTemplate
      : template === "elegant"
        ? ElegantTemplate
        : ModernTemplate;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-border bg-card p-1">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  template === t.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" disabled={!!regenLoading}>
                  {regenLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3.5 w-3.5" />
                  )}
                  Regenerate
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Regenerate a section</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {SECTION_LABELS.map((s) => (
                  <DropdownMenuItem
                    key={s.key}
                    onClick={() => handleRegenerate(s.key)}
                    disabled={!!regenLoading}
                    className="bg-popover cursor-pointer data-disabled:pointer-events-none data-disabled:opacity-50"
                  >
                    {regenLoading === s.key ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3.5 w-3.5" />
                    )}
                    {s.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                downloadHtmlFile({ ...page, template });
                toast.success("HTML file downloaded");
              }}
            >
              <Download className="h-3.5 w-3.5" /> Export HTML
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/generate?id=${page.id}`)}
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Button>
          </div>
        </div>

        {/* Mobile template switcher */}
        <div className="md:hidden flex gap-1 px-4 pb-2 overflow-x-auto">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full border whitespace-nowrap cursor-pointer ${
                template === t.id
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div
        className={flashKey ? "animate-in fade-in duration-500" : ""}
        key={JSON.stringify(g)}
      >
        <Renderer g={g} productName={page.product_name} />
      </div>

      {regenLoading && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-elegant">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm font-medium">
            Regenerating {regenLoading.replace("_", " ")}…
          </span>
        </div>
      )}
    </div>
  );
}
