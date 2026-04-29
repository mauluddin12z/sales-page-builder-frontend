import { SalesPage } from "../mock-data";
import { escapeHtml } from "../sales-page/escapeHtml";
import { G } from "../sales-page/types";
import { renderList } from "../utils/renderList";

/* ---------- ELEGANT ---------- */
export function elegantTemplate(page: SalesPage, g: G): string {
  const benefits = renderList(
    g.benefits,
    (b, i) =>
      `<div class="brow"><div class="bnum">${String(i + 1).padStart(2, "0")}</div><p>${escapeHtml(b)}</p></div>`,
  );

  const features = renderList(
    g.features,
    (f, i) => `
        <div class="feat"><p class="fno">No. ${String(i + 1).padStart(2, "0")}</p><p>${escapeHtml(f)}</p></div>
      `,
  );

  return `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet"><style>
    *,*::before,*::after{box-sizing:border-box}
    html{scroll-behavior: smooth;}
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
