import { escapeHtml } from "../sales-page/escapeHtml";
import { safeHref } from "../sales-page/safeHref";
import { GeneratedContent } from "../sales-page/types";
import { renderList } from "../utils/renderList";

export function boldTemplate(page: any, g: GeneratedContent): string {
  const href = safeHref(page?.cta_url as string | undefined) || "#";
  const label = page.cta_label?.trim() || "Get started";
  const benefits = renderList(
    g.benefits,
    (b, i) => `
    <div class="bcard">
      <div class="bnum">${String(i + 1).padStart(2, "0")}</div>
      <p>${escapeHtml(b)}</p>
    </div>
  `,
  );
  const features = renderList(
    g.features,
    (f, i) => `
    <li><span class="fnum">${String(i + 1).padStart(2, "0")}</span><span class="fcheck">✓</span><span>${escapeHtml(f)}</span></li>
  `,
  );

  return `<style>
    *,*::before,*::after{box-sizing:border-box}
    html{scroll-behavior: smooth;}
    body{margin:0;background:#09090b;color:#fafafa;font-family:ui-sans-serif,system-ui,Inter,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
    .wrap{max-width:1200px;margin:0 auto;padding:0 24px}
    .tag{display:inline-block;border:2px solid #a3e635;color:#a3e635;padding:6px 12px;font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase}
    h1,h2{margin:0;letter-spacing:-.03em;text-transform:uppercase;font-weight:900;line-height:.95}
    .hero{border-bottom:4px solid #a3e635;padding:96px 0 128px}.hero h1{font-size:clamp(40px,9vw,128px);margin-top:32px}
    .hero p{margin-top:32px;max-width:640px;color:#a1a1aa;font-size:20px;line-height:1.6}
    .btns{margin-top:40px;display:flex;flex-wrap:wrap;gap:12px}
    .btn{height:56px;padding:0 32px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;border:none;cursor:pointer;font-size:14px;display:inline-flex;align-items:center}
    .btn:hover {
      opacity: 0.8;
      transition-duration: 0.1s;
    }
    .btn-primary{background:#a3e635;color:#09090b}.btn-outline:hover{background:#fafafa;color:black}.btn-outline{background:transparent;color:#fafafa;border:2px solid #fafafa}
    section{border-bottom:1px solid #27272a;padding:96px 0}
    .eyebrow{font-size:11px;font-weight:900;letter-spacing:.3em;color:#a3e635;text-transform:uppercase}
    .lead{margin-top:24px;font-size:clamp(20px,2.4vw,28px);font-weight:500;line-height:1.4;max-width:800px}
    .grid{display:grid;gap:0;grid-template-columns:1fr;margin-top:48px;border-top:1px solid #27272a;border-left:1px solid #27272a}@media(min-width:768px){.grid{grid-template-columns:1fr 1fr}}
    .bcard{border-bottom:1px solid #27272a;border-right:1px solid #27272a;padding:32px} .bcard:hover{background:#18181b}.bnum{font-size:48px;font-weight:900;color:#a3e635}.bcard p{margin-top:24px;color:#d4d4d8;font-size:18px;line-height:1.6}
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
    button {
    cursor: pointer;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
  </style>
  <section class="hero"><div class="wrap"><div class="tag">▲ New Drop</div><h1>${escapeHtml(g.headline)}</h1><p>${escapeHtml(g.subheadline)}</p><div class="btns"><button class="btn btn-primary"><a href="${href}">${label} →</a></button><button class="btn btn-outline"><a href="${href}">Learn more</a></button></div></div></section>
  <section><div class="wrap"><div class="eyebrow">// About</div><p class="lead">${escapeHtml(g.description)}</p></div></section>
  <section><div class="wrap"><h2 style="font-size:clamp(36px,6vw,72px)">Benefits.</h2><div class="grid">${benefits}</div></div></section>
  <section><div class="wrap"><h2 style="font-size:clamp(36px,6vw,72px)">Features.</h2><ul class="feats">${features}</ul></div></section>
  <section class="proof"><div class="wrap"><div class="eyebrow">// Proof</div><p>"${escapeHtml(g.social_proof)}"</p></div></section>
  <section class="price"><div class="wrap"><h2>Pricing.</h2><div class="price-box"><p>${escapeHtml(g.pricing)}</p><button class="btn btn-primary" style="margin-top:32px"><a href="${href}">Claim it now</a></button></div></div></section>
  <section class="cta-final"><div class="wrap"><h2>${escapeHtml(g.cta)}</h2><button class="btn btn-primary"><a href="${href}">${label}</a></button></div></section>
  <footer>© ${new Date().getFullYear()} ${escapeHtml(page.product_name)}</footer>`;
}
