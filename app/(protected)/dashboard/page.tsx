"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, Pencil, Trash2, Plus, FileText, Calendar } from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { useDeleteSalesPage, useSalesPages } from "@/hooks/sales-pages";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const { trigger: deleteSalesPage } = useDeleteSalesPage();
  const { salesPages } = useSalesPages();

  const handleDelete = async (id:number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sales page?",
    );

    if (!confirmDelete) return;

    try {
      await deleteSalesPage(id);
    } catch (err) {
      console.error("Failed to delete sales page:", err);
    }
  };

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

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Your sales pages
            </h1>
            <p className="mt-1 text-muted-foreground">
              {salesPages?.length} {salesPages?.length === 1 ? "page" : "pages"} generated
            </p>
          </div>

          <Button
            asChild
            className="bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90 shadow-glow"
          >
            <Link href="/generate">
              <Plus className="h-4 w-4" /> New sales page
            </Link>
          </Button>
        </div>

        {salesPages?.length === 0 ? (
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
            {salesPages?.map((p) => (
              <div
                key={p.id}
                className="group rounded-2xl border border-border bg-card p-6 shadow-(--shadow-sm) transition-all hover:shadow-(--shadow-lg) hover:-translate-y-1"
              >
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {p.product_name}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {p.description}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(p.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                <div className="mt-5 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.push(`/preview/live-demo-${p.id}`)}
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/generate?id=${p.id}`)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (confirm(`Delete "${p.product_name}"?`)) {
                        handleDelete(p.id);
                      }
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
