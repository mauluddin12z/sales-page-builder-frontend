import { TemplateId } from "@/app/(protected)/preview/[slug]/page";
import { SalesPage } from "./types/salesPage";

const escapeHtml = (s: string): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const toText = (v: unknown): string => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    const parts = [
      o.title,
      o.body,
      o.description,
      o.text,
      o.label,
      o.name,
    ].filter((x) => typeof x === "string" && x.length > 0);
    if (parts.length) return parts.join(" — ");
    try {
      return JSON.stringify(v);
    } catch {
      return "";
    }
  }
  return String(v);
};

type G = {
  headline: string;
  subheadline: string;
  description: string;
  benefits: string[];
  features: string[];
  social_proof: string;
  pricing: string;
  cta: string;
};

function normalize(page: SalesPage): G {
  const raw = page.generated_content ? JSON.parse(page.generated_content) : {};
  return {
    headline: toText(raw.headline),
    subheadline: toText(raw.subheadline),
    description: toText(raw.description),
    benefits: Array.isArray(raw.benefits)
      ? raw.benefits.map(toText).filter(Boolean)
      : [],
    features: Array.isArray(raw.features)
      ? raw.features.map(toText).filter(Boolean)
      : [],
    social_proof: toText(raw.social_proof ?? raw.socialProof),
    pricing: toText(raw.pricing),
    cta: toText(raw.cta),
  };
}

/* ---------- MODERN ---------- */
function modernHtml(page: SalesPage, g: G): string {
  const benefits = g.benefits
    .map(
      (b, i) =>
        `<div class="card"><div class="badge">${i + 1}</div><p>${escapeHtml(b)}</p></div>`,
    )
    .join("");
  const features = g.features
    .map(
      (f) =>
        `<div class="feature"><div class="check">✓</div><p>${escapeHtml(f)}</p></div>`,
    )
    .join("");
  return `<style>
    *,*::before,*::after{box-sizing:border-box}
    :root{--bg:#fff;--fg:#0b0b14;--muted:#5b5b6e;--border:#e7e7ef;--card:#fff;--soft:#f6f5fb;--primary:#6d4cff;--primary-2:#a78bfa;--accent:#efeaff;--shadow:0 10px 30px -10px rgba(109,76,255,.25);--shadow-md:0 8px 24px -12px rgba(20,20,40,.12);--gradient-primary:linear-gradient(135deg,var(--primary),var(--primary-2));--gradient-soft:radial-gradient(1200px 500px at 50% -10%,#ece6ff 0%,transparent 60%),#fff;--gradient-hero:linear-gradient(135deg,#5b3df5,#9b7bff)}
    body{margin:0;background:var(--bg);color:var(--fg);font-family:ui-sans-serif,system-ui,-apple-system,Inter,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
    .container{max-width:1120px;margin:0 auto;padding:0 24px}.narrow{max-width:760px;margin:0 auto;padding:0 24px}
    .btn{display:inline-flex;align-items:center;gap:8px;border-radius:10px;padding:14px 24px;font-weight:600;font-size:15px;cursor:pointer;border:1px solid transparent;text-decoration:none}
    .btn-primary{background:var(--gradient-primary);color:#fff;box-shadow:var(--shadow)}.btn-outline{border-color:var(--border);color:var(--fg);background:transparent}
    .eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--primary)}
    h1,h2{letter-spacing:-.02em;margin:0}.center{text-align:center}
    .pill{display:inline-flex;gap:6px;border:1px solid var(--border);background:#fff;border-radius:999px;padding:6px 12px;font-size:12px;color:var(--muted)}
    .hero{background:var(--gradient-soft);text-align:center;padding:96px 0 112px}.hero h1{font-size:clamp(36px,6vw,72px);line-height:1.05;font-weight:800;margin-top:24px}
    .hero p{margin:24px auto 0;max-width:640px;font-size:18px;color:var(--muted)}.hero .cta{margin-top:36px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    section.block{padding:96px 0}section.block h2{font-size:clamp(28px,3.5vw,40px);font-weight:700;margin-top:12px}
    .lead{margin-top:24px;color:var(--muted);font-size:18px;line-height:1.7}.soft{background:var(--soft)}
    .grid-2{display:grid;gap:24px;grid-template-columns:1fr;margin-top:56px}@media(min-width:768px){.grid-2{grid-template-columns:1fr 1fr}}
    .card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:32px;box-shadow:var(--shadow-md)}.card p{margin:20px 0 0}
    .badge{display:inline-flex;align-items:center;justify-content:center;height:40px;width:40px;border-radius:12px;background:var(--gradient-primary);color:#fff;font-weight:700}
    .features{display:grid;gap:32px;grid-template-columns:1fr;margin-top:56px}@media(min-width:768px){.features{grid-template-columns:1fr 1fr;column-gap:48px}}
    .feature{display:flex;gap:16px}.check{flex:0 0 40px;height:40px;width:40px;border-radius:12px;background:var(--accent);color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700}
    .quote{margin-top:24px;font-size:clamp(20px,2.4vw,28px);font-weight:500;line-height:1.4}
    .price-card{margin-top:48px;border:1px solid var(--primary);border-radius:24px;padding:40px;box-shadow:var(--shadow);text-align:center}.price-card p{font-size:20px;margin:0}
    .final-inner{max-width:1040px;margin:0 auto 96px;border-radius:28px;background:var(--gradient-hero);color:#fff;padding:80px 32px;text-align:center;box-shadow:var(--shadow)}
    .final-inner h2{font-size:clamp(28px,4vw,48px);font-weight:800;line-height:1.15}
    footer{border-top:1px solid var(--border);padding:32px 24px;text-align:center;color:var(--muted);font-size:14px}
  </style>
  <section class="hero"><div class="container"><span class="pill">✦ Now available</span><h1>${escapeHtml(g.headline)}</h1><p>${escapeHtml(g.subheadline)}</p><div class="cta"><a href="#pricing" class="btn btn-primary">Get started</a><a href="#features" class="btn btn-outline">See it in action</a></div></div></section>
  <section class="block"><div class="narrow center"><span class="eyebrow">About</span><h2>Built with intention.</h2><p class="lead">${escapeHtml(g.description)}</p></div></section>
  <section class="block soft"><div class="container"><div class="center"><span class="eyebrow">Benefits</span><h2>Why teams choose us</h2></div><div class="grid-2">${benefits}</div></div></section>
  <section id="features" class="block"><div class="container"><div class="center"><span class="eyebrow">Features</span><h2>Everything you need.</h2></div><div class="features">${features}</div></div></section>
  <section class="block soft"><div class="narrow center"><span class="eyebrow">Loved by teams</span><div style="margin-top:24px;color:var(--primary);font-size:22px">★★★★★</div><p class="quote">${escapeHtml(g.social_proof)}</p></div></section>
  <section id="pricing" class="block"><div class="narrow center"><span class="eyebrow">Pricing</span><h2>Simple, transparent pricing</h2><div class="price-card"><p>${escapeHtml(g.pricing)}</p><a href="#" class="btn btn-primary" style="margin-top:24px">Start free trial</a></div></div></section>
  <section style="padding:0 24px"><div class="final-inner"><h2>${escapeHtml(g.cta)}</h2><a href="#" class="btn" style="background:#fff;color:var(--fg);margin-top:28px">Get started now</a></div></section>
  <footer>© ${new Date().getFullYear()} ${escapeHtml(page.product_name)}. Generated with SalesAI.</footer>`;
}

/* ---------- BOLD ---------- */
function boldHtml(page: SalesPage, g: G): string {
  const benefits = g.benefits
    .map(
      (b, i) =>
        `<div class="bcard"><div class="bnum">${String(i + 1).padStart(2, "0")}</div><p>${escapeHtml(b)}</p></div>`,
    )
    .join("");
  const features = g.features
    .map(
      (f, i) =>
        `<li><span class="fnum">${String(i + 1).padStart(2, "0")}</span><span class="fcheck">✓</span><span>${escapeHtml(f)}</span></li>`,
    )
    .join("");
  return `<style>
    *,*::before,*::after{box-sizing:border-box}
    body{margin:0;background:#09090b;color:#fafafa;font-family:ui-sans-serif,system-ui,Inter,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
    .wrap{max-width:1200px;margin:0 auto;padding:0 24px}
    .tag{display:inline-block;border:2px solid #a3e635;color:#a3e635;padding:6px 12px;font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase}
    h1,h2{margin:0;letter-spacing:-.03em;text-transform:uppercase;font-weight:900;line-height:.95}
    .hero{border-bottom:4px solid #a3e635;padding:96px 0 128px}.hero h1{font-size:clamp(40px,9vw,128px);margin-top:32px}
    .hero p{margin-top:32px;max-width:640px;color:#a1a1aa;font-size:20px;line-height:1.6}
    .btns{margin-top:40px;display:flex;flex-wrap:wrap;gap:12px}
    .btn{height:56px;padding:0 32px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;border:none;cursor:pointer;font-size:14px;display:inline-flex;align-items:center}
    .btn-primary{background:#a3e635;color:#09090b}.btn-outline{background:transparent;color:#fafafa;border:2px solid #fafafa}
    section{border-bottom:1px solid #27272a;padding:96px 0}
    .eyebrow{font-size:11px;font-weight:900;letter-spacing:.3em;color:#a3e635;text-transform:uppercase}
    .lead{margin-top:24px;font-size:clamp(20px,2.4vw,28px);font-weight:500;line-height:1.4;max-width:800px}
    .grid{display:grid;gap:0;grid-template-columns:1fr;margin-top:48px;border-top:1px solid #27272a;border-left:1px solid #27272a}@media(min-width:768px){.grid{grid-template-columns:1fr 1fr}}
    .bcard{border-bottom:1px solid #27272a;border-right:1px solid #27272a;padding:32px}.bnum{font-size:48px;font-weight:900;color:#a3e635}.bcard p{margin-top:24px;color:#d4d4d8;font-size:18px;line-height:1.6}
    ul.feats{list-style:none;padding:0;margin:48px 0 0;border-top:1px solid #27272a}ul.feats li{display:flex;align-items:center;gap:24px;padding:24px 0;border-bottom:1px solid #27272a;font-size:18px}
    .fnum{color:#a3e635;font-family:ui-monospace,monospace;font-size:13px}.fcheck{color:#a3e635;font-weight:900}
    .proof{background:#a3e635;color:#09090b;border-bottom:4px solid #09090b}.proof .eyebrow{color:#09090b}
    .proof p{margin-top:24px;font-size:clamp(28px,4vw,48px);font-weight:900;line-height:1.1}
    .price{text-align:center}.price h2{font-size:clamp(36px,6vw,72px)}
    .price-box{margin-top:48px;border:2px solid #a3e635;background:#18181b;padding:40px;max-width:600px;margin-left:auto;margin-right:auto}
    .price-box p{font-size:22px;margin:0}
    .cta-final{background:#fafafa;color:#09090b;text-align:center;border:none}.cta-final h2{font-size:clamp(40px,8vw,112px)}
    .cta-final .btn-primary{background:#09090b;color:#a3e635;margin-top:40px}
    footer{padding:32px 24px;text-align:center;color:#71717a;font-size:11px;letter-spacing:.3em;text-transform:uppercase;border:none}
  </style>
  <section class="hero"><div class="wrap"><div class="tag">▲ New Drop</div><h1>${escapeHtml(g.headline)}</h1><p>${escapeHtml(g.subheadline)}</p><div class="btns"><button class="btn btn-primary">Get started →</button><button class="btn btn-outline">Watch demo</button></div></div></section>
  <section><div class="wrap"><div class="eyebrow">// About</div><p class="lead">${escapeHtml(g.description)}</p></div></section>
  <section><div class="wrap"><h2 style="font-size:clamp(36px,6vw,72px)">Benefits.</h2><div class="grid">${benefits}</div></div></section>
  <section><div class="wrap"><h2 style="font-size:clamp(36px,6vw,72px)">Features.</h2><ul class="feats">${features}</ul></div></section>
  <section class="proof"><div class="wrap"><div class="eyebrow">// Proof</div><p>"${escapeHtml(g.social_proof)}"</p></div></section>
  <section class="price"><div class="wrap"><h2>Pricing.</h2><div class="price-box"><p>${escapeHtml(g.pricing)}</p><button class="btn btn-primary" style="margin-top:32px">Claim it now</button></div></div></section>
  <section class="cta-final"><div class="wrap"><h2>${escapeHtml(g.cta)}</h2><button class="btn btn-primary">Start now →</button></div></section>
  <footer>© ${new Date().getFullYear()} ${escapeHtml(page.product_name)}</footer>`;
}

/* ---------- ELEGANT ---------- */
function elegantHtml(page: SalesPage, g: G): string {
  const benefits = g.benefits
    .map(
      (b, i) =>
        `<div class="brow"><div class="bnum">${String(i + 1).padStart(2, "0")}</div><p>${escapeHtml(b)}</p></div>`,
    )
    .join("");
  const features = g.features
    .map(
      (f, i) =>
        `<div class="feat"><p class="fno">No. ${String(i + 1).padStart(2, "0")}</p><p>${escapeHtml(f)}</p></div>`,
    )
    .join("");
  return `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet"><style>
    *,*::before,*::after{box-sizing:border-box}
    body{margin:0;background:#faf7f2;color:#2a2a28;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
    .serif{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:400;letter-spacing:-.01em}
    .wrap{max-width:960px;margin:0 auto;padding:0 24px}.narrow{max-width:680px;margin:0 auto;padding:0 24px}
    .eyebrow{font-size:11px;letter-spacing:.4em;text-transform:uppercase;color:#8a7d65}
    .rule{margin:32px auto;height:1px;width:96px;background:#8a7d65}
    .hero{padding:128px 0 96px;text-align:center}.hero h1{font-size:clamp(40px,7vw,88px);line-height:1.05;color:#1a1a18;margin:32px 0 0}
    .hero p{margin:0 auto;max-width:560px;font-size:18px;color:#5c554a;line-height:1.7}
    .btn{background:#1a1a18;color:#faf7f2;border:none;height:48px;padding:0 40px;font-size:13px;letter-spacing:.2em;text-transform:uppercase;cursor:pointer}
    .btn-lg{height:56px;padding:0 48px;letter-spacing:.3em}
    section{padding:96px 0}.bordered{border-top:1px solid #e8e0d2;border-bottom:1px solid #e8e0d2}
    .story p{margin-top:32px;font-size:clamp(22px,3vw,32px);line-height:1.5;color:#1a1a18}
    .center{text-align:center}h2.serif{font-size:clamp(32px,5vw,56px);margin:16px 0 0;color:#1a1a18}
    .blist{margin-top:64px;display:flex;flex-direction:column;gap:48px}
    .brow{display:grid;gap:24px;grid-template-columns:80px 1fr;align-items:baseline}
    .bnum{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:48px;color:#8a7d65}
    .brow p{margin:0;font-size:18px;line-height:1.7;color:#3a3530}
    .feats{background:#f0ebde}.fgrid{margin-top:64px;display:grid;gap:32px;grid-template-columns:1fr}@media(min-width:768px){.fgrid{grid-template-columns:1fr 1fr}}
    .feat{border-left:2px solid #8a7d65;padding-left:24px}.fno{margin:0;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#8a7d65}
    .feat p:last-child{margin:12px 0 0;font-size:18px;line-height:1.7;color:#3a3530}
    .quote{margin-top:32px;font-size:clamp(26px,3.5vw,40px);line-height:1.4;color:#1a1a18}
    .invest p{margin:24px 0 0;font-size:22px;line-height:1.7;color:#1a1a18}
    .final{padding:128px 0;text-align:center}.final h2{font-size:clamp(36px,6vw,72px);line-height:1.15;color:#1a1a18}
    footer{border-top:1px solid #e8e0d2;padding:32px 24px;text-align:center;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#8a7d65}
  </style>
  <section class="hero"><div class="wrap"><p class="eyebrow">Introducing</p><h1 class="serif">${escapeHtml(g.headline)}</h1><div class="rule"></div><p>${escapeHtml(g.subheadline)}</p><div style="margin-top:48px"><button class="btn">Discover</button></div></div></section>
  <section class="bordered story center"><div class="narrow"><p class="eyebrow">— The Story —</p><p class="serif">${escapeHtml(g.description)}</p></div></section>
  <section><div class="wrap"><div class="center"><p class="eyebrow">Benefits</p><h2 class="serif">Crafted for those who notice.</h2></div><div class="blist">${benefits}</div></div></section>
  <section class="feats"><div class="wrap"><div class="center"><p class="eyebrow">Features</p><h2 class="serif">Every detail considered.</h2></div><div class="fgrid">${features}</div></div></section>
  <section class="center"><div class="narrow"><p class="eyebrow">— Acclaim —</p><p class="serif quote">"${escapeHtml(g.social_proof)}"</p></div></section>
  <section class="bordered invest center"><div class="narrow"><p class="eyebrow">Investment</p><p class="serif">${escapeHtml(g.pricing)}</p><div style="margin-top:40px"><button class="btn">Begin</button></div></div></section>
  <section class="final"><div class="wrap"><h2 class="serif">${escapeHtml(g.cta)}</h2><div class="rule"></div><button class="btn btn-lg">Reserve yours</button></div></section>
  <footer>${escapeHtml(page.product_name)} · ${new Date().getFullYear()}</footer>`;
}

export function buildStandaloneHtml(page: SalesPage): string {
  const g = normalize(page);
  const template: TemplateId = page.template ?? "modern";
  const body =
    template === "bold"
      ? boldHtml(page, g)
      : template === "elegant"
        ? elegantHtml(page, g)
        : modernHtml(page, g);

  const title = escapeHtml(g.headline || page.product_name);
  const desc = escapeHtml((g.subheadline || g.description || "").slice(0, 160));

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${desc}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
</head>
<body>
${body}
</body>
</html>`;
}

export function downloadHtmlFile(page: SalesPage): void {
  const html = buildStandaloneHtml(page);
  const slug =
    page.product_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "sales-page";
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slug}-${page.template ?? "modern"}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
