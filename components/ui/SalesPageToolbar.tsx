"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Download,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  RefreshCw,
  Settings2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";

import { Input } from "@/components/ui/Input";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { downloadHtmlFile } from "@/lib/export-html";
import toast from "react-hot-toast";
import { SectionKey, TemplateId, TEMPLATES } from "@/lib/sales-page/types";

interface Props {
  router: any;
  page: any;

  draftTemplate: TemplateId;
  setDraftTemplate: (v: TemplateId) => void;

  ctaUrl: string;
  setCtaUrl: (v: string) => void;

  ctaLabel: string;
  setCtaLabel: (v: string) => void;

  handleApply: () => Promise<void>;
  isApplying: boolean;
  isGenerating: boolean;

  handleRegenerate: (section: SectionKey) => void;
  regenLoading: SectionKey | null;

  hasChanges: boolean;
}

export function SalesPageToolbar({
  router,
  page,

  draftTemplate,
  setDraftTemplate,

  ctaUrl,
  setCtaUrl,
  ctaLabel,
  setCtaLabel,

  handleApply,
  isGenerating,

  handleRegenerate,
  regenLoading,

}: Props) {
  const [navHidden, setNavHidden] = useState(false);


  return (
    <>
      {/* TOP BAR */}
      {!navHidden && (
        <div className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-lg py-4">
          <div className="mx-auto max-w-7xl px-4 flex items-center justify-between gap-4">
            {/* LEFT */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>

            {/* CENTER - TEMPLATE SWITCH */}
            <Select value={draftTemplate} onValueChange={setDraftTemplate}>
              <SelectTrigger className="h-8 w-44 text-xs">
                <SelectValue placeholder="Template" />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATES.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2">
              {/* EXPORT */}
              <Button
                size="sm"
                onClick={() => {
                  downloadHtmlFile({
                    ...page,
                    template: draftTemplate,
                  });
                  toast.success("HTML exported");
                }}
                className="bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Export</span>
              </Button>

              {/* SETTINGS SHEET */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Settings2 className="h-4 w-4" />
                    Settings
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full sm:max-w-md animate-dialog-in-right"
                >
                  <SheetHeader>
                    <SheetTitle>Page Settings</SheetTitle>
                    <SheetDescription>
                      Manage CTA, regenerate content, and edit page.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    {/* CTA */}
                    <section className="space-y-3">
                      <h3 className="text-sm font-semibold">CTA Settings</h3>

                      <div className="space-y-2">
                        <Label className="text-xs">URL</Label>
                        <Input
                          value={ctaUrl}
                          onChange={(e) => setCtaUrl(e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Label</Label>
                        <Input
                          value={ctaLabel}
                          onChange={(e) => setCtaLabel(e.target.value)}
                          placeholder="Get Started"
                        />
                      </div>

                      <Button
                        size="sm"
                        className="w-full"
                        onClick={handleApply}
                        isLoading={isGenerating}
                      >
                        Save CTA
                      </Button>
                    </section>

                    <Separator />

                    {/* REGENERATE */}
                    <section className="space-y-3">
                      <h3 className="text-sm font-semibold">
                        Regenerate Section
                      </h3>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "headline",
                          "subheadline",
                          "description",
                          "benefits",
                          "features",
                          "social_proof",
                          "pricing",
                          "cta",
                        ].map((key) => (
                          <Button
                            key={key}
                            variant="outline"
                            size="sm"
                            disabled={!!regenLoading}
                            onClick={() => handleRegenerate(key as SectionKey)}
                            className="justify-start"
                          >
                            {regenLoading === key ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3.5 w-3.5" />
                            )}
                            <span className="ml-2 truncate text-xs">
                              {key.replace("_", " ")}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </section>

                    <Separator />

                    {/* EDIT FULL */}
                    <section className="space-y-2">
                      <h3 className="text-sm font-semibold">Edit Full Page</h3>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => router.push(`/generate?id=${page.id}`)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Open Editor
                      </Button>
                    </section>
                  </div>
                </SheetContent>
              </Sheet>

              {/* HIDE UI */}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setNavHidden(true)}
              >
                <EyeOff className="h-4 w-4" /> Hide
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* RESTORE UI BUTTON */}
      {navHidden && (
        <button
          onClick={() => setNavHidden(false)}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-xs shadow"
        >
          <Eye className="h-4 w-4" />
          Show toolbar
        </button>
      )}
    </>
  );
}
