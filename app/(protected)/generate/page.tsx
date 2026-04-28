"use client";

import { Loader2, Sparkles, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Label } from "@radix-ui/react-label";
import { useSalesPageForm } from "@/hooks/sales-pages";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id") || undefined;

  const {
    form,
    featureInput,
    setFeatureInput,
    errors,
    isSubmitting,
    updateField,
    addFeature,
    removeFeature,
    handleFeatureKey,
    submit,
    isEdit,
  } = useSalesPageForm(editId);

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
            {isEdit ? "Edit & regenerate" : "Generate a sales page"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Tell us about your product. We'll handle the design.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elegant"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-semibold" htmlFor="productName">
                Product / Service name *
              </Label>
              <Input
                id="productName"
                value={form.productName}
                onChange={(e) => updateField("productName", e.target.value)}
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
                value={form.audience}
                onChange={(e) => updateField("audience", e.target.value)}
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
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
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

              {form.features.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {form.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs"
                    >
                      {f}
                      <button type="button" onClick={() => removeFeature(f)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {errors.features && (
                <p className="text-xs text-destructive">{errors.features}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold" htmlFor="price">
                Price (USD)
              </Label>
              <Input
                id="price"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="e.g. 29"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="font-semibold" htmlFor="usp">
                Unique selling points
              </Label>
              <Textarea
                id="usp"
                value={form.usp}
                onChange={(e) => updateField("usp", e.target.value)}
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
              {isEdit ? "Regenerate page" : "Generate sales page"}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
