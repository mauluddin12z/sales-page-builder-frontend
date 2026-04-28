"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, Plus, FileText } from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import {
  useDeleteSalesPage,
  useSalesPage,
  useSalesPages,
} from "@/hooks/sales-pages";
import SalesPageCard from "@/components/ui/SalesPageCard";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();

  const { trigger: deleteSalesPage, isMutating } = useDeleteSalesPage();
  const { salesPages } = useSalesPages();
  const salesPageList = salesPages?.data;

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const { salesPage: deleteTarget } = useSalesPage(deleteTargetId ?? undefined);

  const handleDeleteConfirm = async () => {
    if (deleteTargetId == null) return;

    const toastId = toast.loading("Deleting sales page...");

    try {
      await deleteSalesPage(deleteTargetId);

      toast.success("Sales page deleted successfully", {
        id: toastId,
      });

      setDeleteTargetId(null);
    } catch (err) {
      console.error(err);

      toast.error("Failed to delete sales page", {
        id: toastId,
      });
    }
  };
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Your sales pages
            </h1>
            <p className="mt-1 text-muted-foreground">
              {salesPageList?.length}{" "}
              {salesPageList?.length === 1 ? "page" : "pages"} generated
            </p>
          </div>

          <Button
            asChild
            className="bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90 shadow-glow"
          >
            <Link
              className="flex justify-center items-center gap-2"
              href="/generate"
            >
              <Plus className="h-4 w-4" /> New sales page
            </Link>
          </Button>
        </div>

        {salesPageList?.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-border bg-card/50 p-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
              <FileText className="h-7 w-7 text-primary" />
            </div>

            <h3 className="mt-6 text-lg font-semibold">No sales pages yet</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Generate your first AI-powered sales page in under a minute.
            </p>

            <Button
              asChild
              className="mt-6 bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90"
            >
              <Link href="/generate">
                <Plus className="h-4 w-4" /> Create your first page
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {salesPageList?.map((p) => (
              <SalesPageCard
                key={p.id}
                page={p}
                onView={(id) => router.push(`/preview/live-demo-${id}`)}
                onEdit={(id) => router.push(`/generate?id=${id}`)}
                onDelete={(id) => setDeleteTargetId(id)}
              />
            ))}
          </div>
        )}
      </div>
      <Modal isOpen={!!deleteTargetId} onClose={() => setDeleteTargetId(null)}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <Trash2 className="h-7 w-7 text-destructive" />
          </div>

          <h1 className="text-xl font-bold text-foreground">
            Delete sales page?
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {deleteTarget?.product_name
              ? `Are you sure you want to delete "${deleteTarget.product_name}"?`
              : "This action cannot be undone."}
          </p>

          <div className="mt-6 flex gap-3">
            <Button
              variant="default"
              onClick={() => setDeleteTargetId(null)}
              className="px-10"
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="px-10"
              isLoading={isMutating}
              loadingText="Deleting..."
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
}
