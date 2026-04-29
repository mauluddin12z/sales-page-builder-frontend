"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Wand2, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <AppLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-(image:--gradient-soft) -z-10" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-7xl rounded-full bg-primary/20 blur-3xl -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3 w-3 text-primary" />
            AI-powered landing pages in seconds
          </div>

          <h1 className="mt-6 text-5xl sm:text-7xl font-bold tracking-tight text-foreground">
            Sales pages{" "}
            <span className="bg-clip-text text-transparent bg-(image:--gradient-hero)">
              generated.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Describe your product. Get a beautiful, high-converting landing page
            — copy, layout, and design — ready to ship in under a minute.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Button
              size="lg"
              asChild
              className="bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90 shadow-glow h-12 px-6"
            >
              <Link className="flex justify-center items-center gap-2" href="/register">
                Start generating <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="h-12 px-6">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>

          <div className="mt-24 grid gap-6 sm:grid-cols-3 text-left">
            {[
              {
                icon: Wand2,
                title: "Describe it",
                body: "Tell us about your product — name, audience, features.",
              },
              {
                icon: Sparkles,
                title: "Generate it",
                body: "AI writes copy and assembles a polished landing page.",
              },
              {
                icon: Zap,
                title: "Ship it",
                body: "Preview, edit, and publish in minutes — not weeks.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-elegant"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>

                <h3 className="mt-4 font-semibold text-foreground">
                  {f.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
