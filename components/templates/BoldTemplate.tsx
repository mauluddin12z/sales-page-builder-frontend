import { normalizeContent } from "@/lib/content";
import { safeHref } from "@/lib/sales-page/safeHref";
import { NormalizedContentInterface } from "@/types";
import { Check } from "lucide-react";

type Props = { g: NormalizedContentInterface; productName: string };
export default function BoldTemplate({ g, productName }: Props) {
  const content = normalizeContent(g);
  const href = safeHref(content?.cta_url as string | undefined) || "#";
  const label = content.cta_label?.trim() || "Get started";
  return (
    <div
      className="bg-zinc-950 text-zinc-50"
      style={{ fontFamily: "ui-sans-serif, system-ui" }}
    >
      <section className="border-b-4 border-lime-400">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="inline-block border-2 border-lime-400 px-3 py-1 text-xs font-bold uppercase tracking-widest text-lime-400">
            ▲ New Drop
          </div>
          <h1 className="mt-8 text-5xl sm:text-8xl font-black uppercase leading-[0.95] tracking-tighter">
            {content?.headline}
          </h1>
          <p className="mt-8 max-w-2xl text-xl text-zinc-400 leading-relaxed">
            {content?.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button className="bg-lime-400 text-zinc-950 px-8 h-14 font-black uppercase tracking-wider hover:bg-lime-300">
              <a href={href}>{label} →</a>
            </button>
            <button className="border-2 border-zinc-50 text-zinc-50 px-8 h-14 font-bold uppercase tracking-wider hover:bg-zinc-50 hover:text-zinc-950">
              <a href={href}>Learn more</a>
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-lime-400">
            // About
          </p>
          <p className="mt-6 text-2xl sm:text-3xl font-medium leading-snug">
            {content?.description}
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
            Benefits.
          </h2>
          <div className="mt-12 grid gap-0 md:grid-cols-2 border-t border-l border-zinc-800">
            {content?.benefits.map((b, i) => (
              <div
                key={i}
                className="border-b border-r border-zinc-800 p-8 hover:bg-zinc-900 transition-colors"
              >
                <div className="text-5xl font-black text-lime-400">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
            Features.
          </h2>
          <ul className="mt-12 divide-y divide-zinc-800 border-y border-zinc-800">
            {content?.features.map((f, i) => (
              <li key={i} className="flex items-center gap-6 py-6">
                <span className="text-lime-400 font-mono text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Check className="h-5 w-5 text-lime-400 shrink-0" />
                <span className="text-lg">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-lime-400 text-zinc-950 border-b-4 border-zinc-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
          <p className="text-xs font-black uppercase tracking-[0.3em]">
            // Proof
          </p>
          <p className="mt-6 text-3xl sm:text-4xl font-black leading-tight">
            "{content?.social_proof}"
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
            Pricing.
          </h2>
          <div className="mt-12 border-2 border-lime-400 p-10 bg-zinc-900">
            <p className="text-xl sm:text-2xl font-medium">
              {content?.pricing}
            </p>
            <button className="mt-8 bg-lime-400 text-zinc-950 px-10 h-14 font-black uppercase tracking-wider">
              <a href={href}>Claim it now</a>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 text-zinc-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.95]">
            {content?.cta}
          </h2>
          <button className="mt-10 bg-zinc-950 text-lime-400 px-10 h-14 font-black uppercase tracking-wider">
            <a href={href}>Start now →</a>
          </button>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-zinc-500 uppercase tracking-widest">
        © {new Date().getFullYear()} {productName}
      </footer>
    </div>
  );
}
