import { normalizeContent } from "@/lib/content";
import { NormalizedContentInterface } from "@/types";

type Props = { g: NormalizedContentInterface; productName: string };

export function ElegantTemplate({ g, productName }: Props) {
  const content = normalizeContent(g);
  const serif = {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
  };
  return (
    <div className="bg-[#faf7f2] text-[#2a2a28]">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#8a7d65]">
          Introducing
        </p>
        <h1
          style={serif}
          className="mt-8 text-5xl sm:text-7xl font-normal italic leading-[1.05] text-[#1a1a18]"
        >
          {content?.headline}
        </h1>
        <div className="mx-auto my-10 h-px w-24 bg-[#8a7d65]" />
        <p className="mx-auto max-w-xl text-lg text-[#5c554a] leading-relaxed">
          {content?.subheadline}
        </p>
        <div className="mt-12">
          <button className="bg-[#1a1a18] text-[#faf7f2] px-10 h-12 text-sm uppercase tracking-[0.2em] hover:bg-[#2a2a28]">
            Discover
          </button>
        </div>
      </section>

      <section className="border-y border-[#e8e0d2]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#8a7d65]">
            — The Story —
          </p>
          <p
            style={serif}
            className="mt-8 text-2xl sm:text-3xl italic leading-relaxed text-[#1a1a18]"
          >
            {content?.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#8a7d65]">
            Benefits
          </p>
          <h2 style={serif} className="mt-4 text-4xl sm:text-5xl italic">
            Crafted for those who notice.
          </h2>
        </div>
        <div className="mt-16 space-y-12">
          {content?.benefits.map((b, i) => (
            <div key={i} className="grid gap-6 md:grid-cols-12 items-baseline">
              <div
                style={serif}
                className="md:col-span-2 text-5xl italic text-[#8a7d65]"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="md:col-span-10 text-lg leading-relaxed text-[#3a3530]">
                {b}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f0ebde]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#8a7d65]">
              Features
            </p>
            <h2 style={serif} className="mt-4 text-4xl sm:text-5xl italic">
              Every detail considered.
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {content?.features.map((f, i) => (
              <div key={i} className="border-l-2 border-[#8a7d65] pl-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8a7d65]">
                  No. {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-[#3a3530]">
                  {f}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#8a7d65]">
          — Acclaim —
        </p>
        <p
          style={serif}
          className="mt-8 text-3xl sm:text-4xl italic leading-snug text-[#1a1a18]"
        >
          "{content?.social_proof}"
        </p>
      </section>

      <section className="border-y border-[#e8e0d2]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#8a7d65]">
            Investment
          </p>
          <p
            style={serif}
            className="mt-6 text-2xl italic leading-relaxed text-[#1a1a18]"
          >
            {content?.pricing}
          </p>
          <button className="mt-10 bg-[#1a1a18] text-[#faf7f2] px-10 h-12 text-sm uppercase tracking-[0.2em]">
            Begin
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h2
          style={serif}
          className="text-4xl sm:text-6xl italic leading-tight text-[#1a1a18]"
        >
          {content?.cta}
        </h2>
        <div className="mx-auto mt-10 h-px w-24 bg-[#8a7d65]" />
        <button className="mt-10 bg-[#1a1a18] text-[#faf7f2] px-12 h-14 text-sm uppercase tracking-[0.3em]">
          Reserve yours
        </button>
      </section>

      <footer className="border-t border-[#e8e0d2] py-8 text-center text-xs uppercase tracking-[0.3em] text-[#8a7d65]">
        {productName} · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
