export type TemplateId = "modern" | "bold" | "elegant";

export const TEMPLATES: {
  id: TemplateId;
  name: string;
  description: string;
}[] = [
  {
    id: "modern",
    name: "Modern SaaS",
    description: "Clean, gradient hero, soft shadows",
  },
  {
    id: "bold",
    name: "Bold Dark",
    description: "High-contrast, brutalist, neon accents",
  },
  {
    id: "elegant",
    name: "Elegant Editorial",
    description: "Serif typography, generous whitespace",
  },
];

export type SalesPage = {
  id: string;
  product_name: string;
  description: string;
  features: string[];
  target_audience: string;
  price: string;
  usp: string;
  template: TemplateId;
  createdAt: string;
  generated: GeneratedContent;
};

// Matches the AI prompt's required JSON schema:
// { headline, subheadline, description, benefits, features, social_proof, pricing, cta }
export type GeneratedContent = {
  headline: string;
  subheadline: string;
  description: string;
  benefits: string[];
  features: string[];
  social_proof: string;
  pricing: string;
  cta: string;
};

export const buildGenerated = (input: {
  product_name: string;
  description: string;
  features: string[];
  target_audience: string;
  price: string;
  usp: string;
}): GeneratedContent => {
  const target_audience = input.target_audience || "modern teams";
  const priceLabel = input.price
    ? `$${input.price.replace(/[^0-9.]/g, "") || "29"}/mo`
    : "Starts at $29/mo";

  return {
    headline: `${input.product_name} — the smarter way for ${target_audience} to win.`,
    subheadline:
      input.usp ||
      `Stop wrestling with the old way. ${input.product_name} is built so ${target_audience} can move faster, with less friction and better results.`,
    description:
      input.description ||
      `${input.product_name} is designed from the ground up for ${target_audience} who refuse to settle. It removes the busywork, surfaces what matters, and turns hours of effort into minutes of momentum.`,
    benefits: [
      `Reclaim hours every week — ${input.product_name} automates the repetitive work draining your team.`,
      `Make confident decisions faster with insights tailored to ${target_audience}.`,
      `Scale without rewrites — go from your first user to your millionth on the same foundation.`,
      `Onboard in minutes, not weeks. Your team will actually want to use it.`,
    ],
    features: input.features.length
      ? input.features
      : [
          "Lightning-fast performance with sub-second response times",
          "Beautifully simple interface your team will love",
          "Enterprise-grade security: SOC2, SSO, and audit logs",
          "Powerful integrations with the tools you already use",
        ],
    social_proof: `Join 12,000+ ${target_audience} already shipping faster with ${input.product_name}. Rated 4.9/5 across 800+ verified reviews — “${input.product_name} paid for itself in the first week.” — Sarah Chen, Head of Growth.`,
    pricing: `${priceLabel} — start free, no credit card required. Cancel anytime. 30-day money-back guarantee.`,
    cta: `Ready to transform how ${target_audience} work? Start your free trial of ${input.product_name} today.`,
  };
};

export type SectionKey =
  | "headline"
  | "subheadline"
  | "description"
  | "benefits"
  | "features"
  | "social_proof"
  | "pricing"
  | "cta";

type RegenInput = {
  product_name: string;
  description: string;
  features: string[];
  target_audience: string;
  price: string;
  usp: string;
};

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function regenerateSection(
  section: SectionKey,
  input: RegenInput,
): GeneratedContent[SectionKey] {
  const name = input.product_name || "Our product";
  const target_audience = input.target_audience || "modern teams";
  const priceLabel = input.price
    ? `$${input.price.replace(/[^0-9.]/g, "") || "29"}/mo`
    : "Starts at $29/mo";

  switch (section) {
    case "headline":
      return pick([
        `${name} — the smarter way for ${target_audience} to win.`,
        `Finally, a tool ${target_audience} actually love using.`,
        `Stop guessing. Start shipping with ${name}.`,
        `${name}: built for ${target_audience} who refuse to settle.`,
        `The unfair advantage for ambitious ${target_audience}.`,
        `Less busywork. More breakthroughs. Meet ${name}.`,
      ]);
    case "subheadline":
      return pick([
        input.usp ||
          `${name} removes friction so ${target_audience} can focus on what matters.`,
        `Join thousands of ${target_audience} who replaced 5 tools with one.`,
        `Powerful by default. Simple by design. Loved by ${target_audience}.`,
        `From first click to first win in under 60 seconds.`,
        `Everything ${target_audience} need. Nothing they don't.`,
      ]);
    case "description":
      return pick([
        input.description ||
          `${name} is designed from the ground up for ${target_audience} who refuse to settle.`,
        `We built ${name} after watching ${target_audience} waste hours on tools that should "just work." Now they do.`,
        `${name} combines a beautiful interface with serious power — purpose-built for the way ${target_audience} actually work.`,
        `Born from frustration, refined through 1,000+ conversations with ${target_audience}. ${name} is the tool you wish you'd had years ago.`,
      ]);
    case "benefits": {
      const pool = [
        `Reclaim hours every week — ${name} automates the busywork draining your team.`,
        `Make confident decisions faster with insights tailored to ${target_audience}.`,
        `Scale without rewrites — go from first user to millionth on the same foundation.`,
        `Onboard in minutes, not weeks. Your team will actually want to use it.`,
        `Cut tool sprawl — replace your messy stack with one elegant solution.`,
        `Sleep better knowing your data is encrypted, backed up, and SOC2-compliant.`,
        `Move at the speed of thought with keyboard-first navigation everywhere.`,
        `Get answers in seconds with AI that actually understands your context.`,
      ];
      return [...pool].sort(() => Math.random() - 0.5).slice(0, 4);
    }
    case "features": {
      if (input.features.length) return input.features;
      const pool = [
        "Lightning-fast performance with sub-second response times",
        "Beautifully simple interface your team will love",
        "Enterprise-grade security: SOC2, SSO, and audit logs",
        "Powerful integrations with the tools you already use",
        "Real-time collaboration with presence and comments",
        "AI-powered automations that learn your workflow",
        "Mobile-first design that works offline",
        "Granular permissions for teams of any size",
      ];
      return [...pool].sort(() => Math.random() - 0.5).slice(0, 4);
    }
    case "social_proof":
      return pick([
        `Join 12,000+ ${target_audience} already shipping faster with ${name}. Rated 4.9/5 across 800+ verified reviews — "${name} paid for itself in the first week." — Sarah Chen, Head of Growth.`,
        `"${name} replaced four tools and saved us 20 hours a week." — Marcus Lee, VP Operations. Trusted by teams at Stripe, Linear, and Notion.`,
        `4.9 ★ on G2 · 1,200+ reviews · "We tried every alternative. ${name} is the only one that stuck." — Priya Patel, Director.`,
        `From scrappy startups to Fortune 500s, 25,000+ ${target_audience} trust ${name} every day. "Honestly, I can't imagine working without it." — Jordan Kim.`,
      ]);
    case "pricing":
      return pick([
        `${priceLabel} — start free, no credit card required. Cancel anytime. 30-day money-back guarantee.`,
        `${priceLabel}. Unlimited seats. Unlimited projects. One simple price. Try it free for 14 days.`,
        `Starting at ${priceLabel}. Pay monthly or save 20% annually. No hidden fees, no usage limits.`,
        `${priceLabel} — and that's it. No tiers, no upsells, no "contact sales." What you see is what you pay.`,
      ]);
    case "cta":
      return pick([
        `Ready to transform how ${target_audience} work? Start your free trial of ${name} today.`,
        `Stop reading. Start shipping. Try ${name} free for 14 days — no credit card.`,
        `Your future self will thank you. Get started with ${name} in under 60 seconds.`,
        `Join the ${target_audience} already moving faster with ${name}. The first step is free.`,
        `One decision. Zero risk. Try ${name} today and feel the difference.`,
      ]);
  }
}

export const SEED_PAGES: SalesPage[] = [
  {
    id: "demo-1",
    product_name: "Lumen Analytics",
    description:
      "An AI-powered analytics platform that turns raw data into actionable insights for product teams.",
    features: ["Real-time dashboards", "AI insights", "Team collaboration"],
    target_audience: "Product managers",
    price: "49",
    usp: "The only analytics tool that explains *why* your numbers changed — not just what changed.",
    template: "modern",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    generated: buildGenerated({
      product_name: "Lumen Analytics",
      description:
        "An AI-powered analytics platform that turns raw data into actionable insights for product teams.",
      features: ["Real-time dashboards", "AI insights", "Team collaboration"],
      target_audience: "Product managers",
      price: "49",
      usp: "The only analytics tool that explains *why* your numbers changed — not just what changed.",
    }),
  },
];
