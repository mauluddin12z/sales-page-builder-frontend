import { normalizeContent } from "@/lib/content";
import { safeHref } from "@/lib/sales-page/safeHref";
import { NormalizedContentInterface } from "@/types";
import { Check, Sparkles, Star } from "lucide-react";

type Props = { g: NormalizedContentInterface; productName: string };

/* ---------------- MODERN SAAS ---------------- */
export function ModernTemplate({ g, productName }: Props) {
  const content = normalizeContent(g);
  const href = safeHref(content?.cta_url as string | undefined) || "#";
  const label = content.cta_label?.trim() || "Get started";
  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden bg-(image:--gradient-soft)">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-240 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3 w-3 text-primary" /> Now available
          </div>
          <h1 className="mt-6 text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]">
            {content?.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {content?.subheadline}
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <button className="bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90 shadow-glow h-12 px-8 rounded-md font-medium">
              <a href={href}>{label}</a>
            </button>
            <button className="h-12 px-6 border border-input rounded-md font-medium hover:opacity-90">
              <a href={href}>See it in action</a>
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          About
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Built with intention.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          {content?.description}
        </p>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Benefits
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Why teams choose us
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {content?.benefits.map((b, i) => (
              <div
                key={i}
                className="rounded-2xl bg-card border border-border p-8 shadow-elegant"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(image:--gradient-primary) text-primary-foreground font-semibold shadow-glow">
                  {i + 1}
                </div>
                <p className="mt-5 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Everything you need.
          </h2>
        </div>
        <div className="mt-16 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {content?.features.map((f, i) => (
            <div key={i} className="flex gap-4">
              <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <p className="pt-2 leading-relaxed">{f}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Loved by teams
          </p>
          <div className="mt-6 flex justify-center gap-1 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="mt-6 text-2xl sm:text-3xl font-medium tracking-tight leading-snug">
            {content?.social_proof}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Pricing
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Simple, transparent pricing
        </h2>
        <div className="mt-12 rounded-3xl border border-primary bg-card p-10 shadow-glow">
          <p className="text-xl sm:text-2xl font-medium leading-relaxed">
            {content?.pricing}
          </p>
          <button className="mt-8 bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90 h-12 px-8 rounded-md font-medium">
            <a href={href}>Start free trial</a>
          </button>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-(image:--gradient-hero) p-12 sm:p-20 text-center shadow-glow">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary-foreground leading-tight">
            {content?.cta}
          </h2>
          <button className="mt-8 h-12 px-8 font-semibold bg-secondary text-secondary-foreground rounded-md">
            <a href={href}>{label}</a>
          </button>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {productName}. Generated with AI Sales Page
        Builder.
      </footer>
    </div>
  );
}
