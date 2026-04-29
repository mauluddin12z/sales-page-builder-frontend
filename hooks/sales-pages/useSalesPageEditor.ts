import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { regenerateSalesPage } from "@/lib/api/salesPages";
import safeParseJSON from "@/lib/safeParseJson";
import { useUpdateSalesPage } from "@/hooks/sales-pages";
import { SectionKey, TemplateId } from "@/lib/mock-data";

export function useSalesPageEditor(page: any, id: number) {
  const { trigger: updateSalesPage, isMutating: isGenerating } =
    useUpdateSalesPage();

  const parsedContent = useMemo(() => {
    if (!page) return null;
    return safeParseJSON(page.generated_content);
  }, [page]);

  const [persistedTemplate, setPersistedTemplate] =
    useState<TemplateId>("modern");
  const [draftTemplate, setDraftTemplate] = useState<TemplateId>("modern");

  const [persistedContent, setPersistedContent] = useState<any>(null);
  const [draftContent, setDraftContent] = useState<any>(null);

  const [ctaUrl, setCtaUrl] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");

  const [regenLoading, setRegenLoading] = useState<SectionKey | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const hasChanges =
    draftTemplate !== persistedTemplate ||
    JSON.stringify(draftContent) !== JSON.stringify(persistedContent);

  // INIT
  useEffect(() => {
    if (!page || !parsedContent) return;

    setPersistedTemplate(page.template);
    setDraftTemplate(page.template);

    setPersistedContent(parsedContent);
    setDraftContent(parsedContent);

    setCtaUrl(page.cta_url ?? "");
    setCtaLabel(page.cta_label ?? "");
  }, [page, parsedContent]);

  // REGENERATE
  const handleRegenerate = async (section: SectionKey) => {
    if (!page || regenLoading) return;

    setRegenLoading(section);

    try {
      const res = await regenerateSalesPage({
        field: section,
        product_name: page.product_name,
        description: page.description,
        features: page.features,
        target_audience: page.target_audience,
        price: page.price || "",
        usp: page.usp || "",
        current_output: draftContent,
      });

      setDraftContent((prev: any) => ({
        ...prev,
        ...res.data,
      }));

      toast.success(`${section} updated`);
    } catch {
      toast.error("Regeneration failed");
    } finally {
      setRegenLoading(null);
    }
  };

  // APPLY
  const handleApply = async () => {
    if (!page || !hasChanges) return;

    setIsApplying(true);

    try {
      await updateSalesPage({
        id,
        payload: {
          ...page,
          template: draftTemplate,
          generated_content: JSON.stringify(draftContent),
          cta_label: ctaLabel,
          cta_url: ctaUrl,
        },
      });

      setPersistedTemplate(draftTemplate);
      setPersistedContent(draftContent);

      toast.success("Changes applied");
    } catch {
      toast.error("Failed to apply changes");
    } finally {
      setIsApplying(false);
    }
  };

  return {
    draftTemplate,
    setDraftTemplate,

    draftContent,
    setDraftContent,

    persistedTemplate,

    ctaUrl,
    setCtaUrl,
    ctaLabel,
    setCtaLabel,

    regenLoading,
    isApplying,
    isGenerating,
    hasChanges,

    handleRegenerate,
    handleApply,
  };
}
