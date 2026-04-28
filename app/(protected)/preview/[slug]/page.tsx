"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Loader2, Pencil, RefreshCw } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
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
import Loading from "@/components/ui/Loading";
import safeParseJSON from "@/lib/safeParseJson";

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

export const TEMPLATES = [
  { id: "modern", name: "Modern SaaS", description: "Clean UI" },
  { id: "bold", name: "Bold Dark", description: "High contrast" },
  { id: "elegant", name: "Elegant Editorial", description: "Serif style" },
] as const;

const SECTION_LABELS = [
  { key: "headline", label: "Headline" },
  { key: "subheadline", label: "Subheadline" },
  { key: "description", label: "Description" },
  { key: "benefits", label: "Benefits" },
  { key: "features", label: "Features" },
  { key: "social_proof", label: "Social proof" },
  { key: "pricing", label: "Pricing" },
  { key: "cta", label: "Call to action" },
] as const;

export default function Page({ params }: PageProps) {
  const { slug } = React.use(params);
  const id = slug.split("-")[2];
  const router = useRouter();

  const { salesPage: page, isLoading } = useSalesPage(Number(id));
  const { trigger: updateSalesPage } = useUpdateSalesPage();

  // -----------------------
  // LOADING STATES
  // -----------------------
  const [regenLoading, setRegenLoading] = useState<SectionKey | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // -----------------------
  // PERSISTED STATE (DB)
  // -----------------------
  const [persistedTemplate, setPersistedTemplate] =
    useState<TemplateId>("modern");

  const [persistedContent, setPersistedContent] = useState<any>(null);

  // -----------------------
  // DRAFT STATE (PREVIEW)
  // -----------------------
  const [draftTemplate, setDraftTemplate] = useState<TemplateId>("modern");

  const [draftContent, setDraftContent] = useState<any>(null);

  const hasChanges =
    draftTemplate !== persistedTemplate ||
    JSON.stringify(draftContent) !== JSON.stringify(persistedContent);

  // -----------------------
  // INIT FROM DB
  // -----------------------
  useEffect(() => {
    if (!page) return;

    const parsed = safeParseJSON(page.generated_content);

    setPersistedTemplate(page.template);
    setDraftTemplate(page.template);

    setPersistedContent(parsed);
    setDraftContent(parsed);
  }, [page]);

  // -----------------------
  // TEMPLATE PREVIEW
  // -----------------------
  const handleTemplatePreview = (t: TemplateId) => {
    setDraftTemplate(t);
  };

  // -----------------------
  // REGENERATE (NOW DRAFT ONLY)
  // -----------------------
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
        current_output: draftContent,
      });

      const updated = {
        ...draftContent,
        ...regenerated.text,
      };

      setDraftContent(updated);

      toast.success(`${section.replace("_", " ")} updated (preview)`);
    } catch (err) {
      console.error(err);
      toast.error("Regeneration failed");
    } finally {
      setRegenLoading(null);
    }
  };

  // -----------------------
  // APPLY ALL CHANGES
  // -----------------------
  const handleApplyChanges = async () => {
    if (!page || !hasChanges) return;

    setIsApplying(true);

    try {
      await updateSalesPage({
        id: Number(id),
        payload: {
          ...page,
          template: draftTemplate,
          generated_content: JSON.stringify(draftContent),
        },
      });

      setPersistedTemplate(draftTemplate);
      setPersistedContent(draftContent);

      toast.success("Changes applied");
    } catch (err) {
      toast.error("Failed to apply changes");
    } finally {
      setIsApplying(false);
    }
  };

  // -----------------------
  // LOADING
  // -----------------------
  if (isLoading) return <Loading />;

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Page not found</h2>
          <Button asChild className="mt-4">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  // -----------------------
  // TEMPLATE RENDERER
  // -----------------------
  const Renderer =
    draftTemplate === "bold"
      ? BoldTemplate
      : draftTemplate === "elegant"
        ? ElegantTemplate
        : ModernTemplate;

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          {/* TEMPLATE PREVIEW */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-border bg-card p-1">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTemplatePreview(t.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer ${
                  draftTemplate === t.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" disabled={!!regenLoading}>
                  {regenLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3 w-3" />
                  )}
                  Regenerate
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Regenerate section</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {SECTION_LABELS.map((s) => (
                  <DropdownMenuItem
                    key={s.key}
                    onClick={() => handleRegenerate(s.key)}
                    className="cursor-pointer"
                  >
                    {s.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                downloadHtmlFile({
                  ...page,
                  template: draftTemplate,
                })
              }
            >
              <Download className="h-3 w-3" /> Export
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/generate?id=${page.id}`)}
            >
              <Pencil className="h-3 w-3" /> Edit
            </Button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <Renderer g={draftContent} productName={page.product_name} />

      {/* APPLY BUTTON */}
      {hasChanges && (
        <Button
          onClick={handleApplyChanges}
          disabled={isApplying}
          className="fixed bottom-10 right-10 bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90"
          isLoading={isApplying}
          loadingText="Applying..."
        >
          Apply Changes
        </Button>
      )}

      {/* REGEN LOADING */}
      {regenLoading && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border px-5 py-3 rounded-full flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Regenerating {regenLoading.replace("_", " ")}…
        </div>
      )}
    </div>
  );
}
