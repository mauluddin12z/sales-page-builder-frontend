"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { SalesPageToolbar } from "@/components/ui/SalesPageToolbar";
import { TemplateRenderer } from "@/components/ui/TemplateRenderer";
import { useSalesPage, useSalesPageEditor } from "@/hooks/sales-pages";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}
export default function Page({ params }: PageProps) {
  const { slug } = React.use(params);
  const id = slug.split("-")[2];

  const router = useRouter();
  const { salesPage: page, isLoading } = useSalesPage(Number(id));

  const editor = useSalesPageEditor(page, Number(id));

  if (isLoading) return <Loading />;
  if (!page) return <div>Not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <SalesPageToolbar router={router} page={page} {...editor} />

      <TemplateRenderer
        template={editor.draftTemplate}
        content={editor.draftContent}
        productName={page.product_name}
      />

      {editor.hasChanges && (
        <Button
          onClick={editor.handleApply}
          className="fixed bottom-10 right-10"
          isLoading={editor.isApplying}
          loadingText="Applying..."
        >
          Apply Changes
        </Button>
      )}
    </div>
  );
}
