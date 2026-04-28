"use client";

import { FormEvent, useEffect, useState, type KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Sparkles, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { buildGenerated } from "@/lib/mock-data";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import AppLayout from "@/components/layout/AppLayout";
import { Textarea } from "@/components/ui/Textarea";
import {
  useCreateSalesPage,
  useSalesPage,
  useUpdateSalesPage,
} from "@/hooks/sales-pages";
import { generateSalesPage } from "@/lib/api/salesPages";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const editId = searchParams.get("id") || undefined;

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [audience, setAudience] = useState("");
  const [price, setPrice] = useState("");
  const [usp, setUsp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { salesPage } = useSalesPage(editId ? Number(editId) : undefined);
  const { trigger: createSalesPage } = useCreateSalesPage();
  const { trigger: updateSalesPage } = useUpdateSalesPage();

  // Auth redirect
  useEffect(() => {
    if (user === null) {
      const t = setTimeout(() => {
        if (!localStorage.getItem("asp_user")) {
          router.push("/login");
        }
      }, 50);
      return () => clearTimeout(t);
    }
  }, [user, router]);

  // Load edit data
  useEffect(() => {
    if (!salesPage) return;

    setProductName(salesPage.product_name);
    setDescription(salesPage.description);
    setFeatures(salesPage.features || []);
    setAudience(salesPage.target_audience);
    setPrice(salesPage.price || "");
    setUsp(salesPage.usp || "");
  }, [salesPage]);

  const addFeature = () => {
    const v = featureInput.trim();
    if (v && !features.includes(v)) {
      setFeatures((prev) => (prev.includes(v) ? prev : [...prev, v]));
    }
    setFeatureInput("");
  };

  const handleFeatureKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addFeature();
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!productName.trim()) e.productName = "Product name is required";
    if (description.trim().length < 20)
      e.description = "Description should be at least 20 characters";
    if (!audience.trim()) e.audience = "Target audience is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const basePayload = {
        product_name: productName.trim(),
        description: description.trim(),
        features,
        target_audience: audience.trim(),
        price,
        usp,
      };

      // generate AI content
      const generated = await generateSalesPage(basePayload);

      //  save to DB
      if (editId) {
        await updateSalesPage({
          id: Number(editId),
          payload: {
            ...basePayload,
            generated_content: generated.text,
          },
        });

        router.push(`/preview/${editId}`);
        return;
      }

      const result = await createSalesPage({
        ...basePayload,
        generated_content: generated.text,
        template: "modern",
      });

      router.push(`/preview/${result.id}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isSubmitting) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-2xl px-4 py-32 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-(image:--gradient-primary) shadow-glow">
            <Sparkles className="h-8 w-8 text-primary-foreground animate-pulse" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            Generating your sales page…
          </h2>

          <p className="mt-2 text-muted-foreground">
            Crafting copy, layout, and design with AI.
          </p>

          <div className="mt-8 flex justify-center">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {editId ? "Edit & regenerate" : "Generate a sales page"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Tell us about your product. We'll handle the design.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elegant"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-semibold" htmlFor="productName">
                Product / Service name *
              </Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Lumen Analytics"
              />
              {errors.productName && (
                <p className="text-xs text-destructive">{errors.productName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="font-semibold" htmlFor="audience">
                Target audience *
              </Label>
              <Input
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Product managers"
              />
              {errors.audience && (
                <p className="text-xs text-destructive">{errors.audience}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="font-semibold" htmlFor="description">
                Description *
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product or service in detail"
                rows={4}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="font-semibold">Key features</Label>
              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={handleFeatureKey}
                  placeholder="e.g. AI-powered analytics"
                />
                <Button type="button" onClick={addFeature}>
                  Add
                </Button>
              </div>

              {features.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs"
                    >
                      {f}
                      <button
                        type="button"
                        onClick={() =>
                          setFeatures((prev) => prev.filter((x) => x !== f))
                        }
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold" htmlFor="price">
                Price (USD)
              </Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 29"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="font-semibold" htmlFor="usp">
                Unique selling points
              </Label>
              <Textarea
                id="usp"
                value={usp}
                onChange={(e) => setUsp(e.target.value)}
                placeholder="What makes you different?"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>

            <Button type="submit">
              <Sparkles className="h-4 w-4" />
              {editId ? "Regenerate page" : "Generate sales page"}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
