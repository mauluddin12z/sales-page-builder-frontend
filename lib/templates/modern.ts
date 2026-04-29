import { escapeHtml } from "../sales-page/escapeHtml";
import { safeHref } from "../sales-page/safeHref";
import { GeneratedContent } from "../sales-page/types";
import { renderList } from "../utils/renderList";

const renderBenefits = (items: string[]) =>
  renderList(
    items,
    (b, i) => `
      <div class="card">
        <div
          style="
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: left;
          "
        >
          <span class="badge">${i + 1}</span>
        </div>
        <p>${escapeHtml(b)}</p>
      </div>

    `,
  );

const renderFeatures = (items: string[]) =>
  renderList(
    items,
    (f) => `
      <div class="feature">
        <div class="check">✓</div>
        <p>${escapeHtml(f)}</p>
      </div>`,
  );

export function modernTemplate(page: any, g: GeneratedContent): string {
  const href = safeHref(page?.cta_url as string | undefined) || "#";
  const label = page.cta_label?.trim() || "Get started";
  return `

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  :root {
    --radius: 0.75rem;

    /* Base */
    --background: oklch(0.99 0.003 250);
    --foreground: oklch(0.18 0.03 265);

    /* Surfaces */
    --card: oklch(1 0 0);
    --popover: oklch(1 0 0);

    --card-foreground: oklch(0.18 0.03 265);
    --popover-foreground: oklch(0.18 0.03 265);

    /* Brand */
    --primary: oklch(0.55 0.22 280);
    --primary-foreground: oklch(0.99 0.003 250);
    --primary-glow: oklch(0.7 0.2 295);

    --secondary: oklch(0.96 0.01 265);
    --secondary-foreground: oklch(0.25 0.04 265);

    --muted: oklch(0.97 0.008 265);
    --muted-foreground: oklch(0.5 0.03 265);

    --accent: oklch(0.95 0.04 285);
    --accent-foreground: oklch(0.3 0.15 280);

    /* Feedback */
    --destructive: oklch(0.6 0.24 27);
    --destructive-foreground: oklch(0.99 0.003 250);

    /* UI */
    --border: oklch(0.92 0.01 265);
    --input: oklch(0.94 0.01 265);
    --ring: oklch(0.55 0.22 280);

    /* Gradients */
    --gradient-primary: linear-gradient(135deg,
        oklch(0.55 0.22 280),
        oklch(0.7 0.2 295));

    --gradient-hero: linear-gradient(135deg,
        oklch(0.55 0.22 280) 0%,
        oklch(0.65 0.22 320) 50%,
        oklch(0.7 0.2 295) 100%);

    --gradient-soft: linear-gradient(180deg,
        oklch(0.99 0.003 250) 0%,
        oklch(0.96 0.02 280) 100%);

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 oklch(0.18 0.03 265 / 0.05);
    --shadow-md: 0 4px 16px -4px oklch(0.18 0.03 265 / 0.08);
    --shadow-lg: 0 20px 40px -12px oklch(0.18 0.03 265 / 0.12);
    --shadow-glow: 0 10px 40px -10px oklch(0.55 0.22 280 / 0.4);

    --tw-inset-shadow: 0 0 0 #0000;
    /* Inset shadow, transparent */
    --tw-inset-ring-shadow: 0 0 0 #0000;
    /* Inset ring shadow, transparent */
    --tw-ring-offset-shadow: 0 0 0 #0000;
    /* Ring offset shadow, transparent */
    --tw-ring-shadow: 0 0 0 #0000;
    /* Ring shadow, transparent */
    --tw-shadow: 0 10px 40px -10px lab(44.3191% 38.7475 -76.8339 / 0.4);

    /* Charts */
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);

    /* Sidebar */
    --sidebar: oklch(0.984 0.003 247.858);
    --sidebar-foreground: oklch(0.129 0.042 264.695);
    --sidebar-primary: oklch(0.208 0.042 265.755);
    --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
    --sidebar-accent: oklch(0.968 0.007 247.896);
    --sidebar-accent-foreground: oklch(0.208 0.042 265.755);
    --sidebar-border: oklch(0.929 0.013 255.508);
    --sidebar-ring: oklch(0.704 0.04 256.788);
  }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--secondary);
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      Inter,
      sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  .narrow {
    max-width: 760px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .eyebrow {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--primary);
  }

  h1,
  h2 {
    letter-spacing: -0.02em;
    margin: 0;
  }

  .center {
    text-align: center;
  }

  .hero {
    background: var(--gradient-soft);
    text-align: center;
  }

  .hero .cta {
    margin-top: 36px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }


  .grid-2 {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr;
    margin-top: 56px;
  }

  @media (min-width: 48rem) {
    .grid-2 {
      grid-template-columns: 1fr 1fr;
    }
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 32px;
    box-shadow: var(--shadow-md);
  }

  .card p {
    margin: 20px 0 0;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border-radius: 12px;
    background: var(--gradient-primary);
    color: #fff;
    font-weight: 700;
  }

  .features {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    margin-top: 56px;
  }

  @media (min-width: 48rem) {
    .features {
      grid-template-columns: 1fr 1fr;
    }
  }

  .feature {
    display: flex;
    justify-items: center;
    align-items: center;
    gap: 16px;
  }

  .check {
    flex: 0 0 40px;
    height: 40px;
    width: 40px;
    border-radius: 12px;
    background: var(--accent);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .feature .check {
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }

  .quote {
    margin-top: 24px;
    font-size: clamp(20px, 2.4vw, 28px);
    font-weight: 500;
    line-height: 1.4;
  }

  .price-card {
    margin-top: 48px;
    border: 1px solid var(--primary);
    border-radius: 24px;
    padding: 40px;
    box-shadow: var(--shadow);
    text-align: center;
  }

  .price-card p {
    font-size: 20px;
    margin: 0;
  }

  .final-inner {
    max-width: 1040px;
    margin: 0 auto 96px;
    border-radius: 28px;
    background: var(--gradient-hero);
    color: #fff;
    padding: 80px 32px;
    text-align: center;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .final-inner h2 {
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 800;
    line-height: 1.15;
    color: var(--secondary)!important;
  }

  footer {
    border-top: 1px solid var(--border);
    padding-block: calc(0.25 * 8rem);
    text-align: center;
    color: var(--muted);
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
    color: var(--muted-foreground);
  }

  .container {
    position: relative;
    margin-inline: auto;
    padding-inline: calc(0.25 * 4rem);
    padding-block: calc(0.25 * 24rem);
    text-align: center;
  }

  @media (min-width: 48rem) {
    .hero .container {
      padding-block: calc(0.25 * 32rem);
    }
  }

  .hero .container {
    max-width: 64rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .description-section .container,
  .features-section .container,
  .pricing-section .container {
    max-width: 48rem;
  }

  .benefits-section .container,
  social-proof-section .container,
  final-section .container {
    max-width: 80rem;
  }

  .now-available-card {
    display: inline-flex;
    padding-inline:calc(0.25 * 3rem);
    padding-block:calc(0.25 * 1rem);
    gap: 0.5rem;
    align-items: center;
    border-radius: 9999px;
    border-width: 1px;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 500;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-color: var(--border);
    color: var(--muted-foreground);
    background-color: var(--card);
  }

  .sparkles {
    color: var(--primary);
    width: 0.75rem;
    height: 0.75rem;
  }

  .background-decoration1 {
    position: absolute;
    top: -6rem;
    left: 50%;
    transform: translateX(-50%);
    height: 24rem;
    width: 60rem;
    border-radius: 9999px;
    background-color: color-mix(in oklab, var(--primary) 15%, transparent);
    filter: blur(96px);
    pointer-events: none;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 10px;
    padding: 14px 24px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    text-decoration: none;
    width: fit-content;
  }
  .btn:hover {
    opacity:0.8;
    transition-duration: 0.1;
  }


  .btn-outline {
    border: 1px solid transparent;
    border-color: var(--border);
    color: var(--foreground);
    background: transparent;

  }

  .btn-secondary {
    background-color: var(--secondary);
    color: var(--foreground);
  }

  .btn-primary {
    background-image: var(--gradient-primary);
    color: var(--primary-foreground);
    font-weight: 500;
    height: 3rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 0.375rem;
    transition:
      opacity 0.3s ease,
      box-shadow 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    box-shadow:
      var(--tw-inset-shadow),
      /* Inset shadow */
      var(--tw-inset-ring-shadow),
      /* Inset ring shadow */
      var(--tw-ring-offset-shadow),
      /* Ring offset shadow */
      var(--tw-ring-shadow),
      /* Ring shadow */
      var(--tw-shadow);
    /* Custom shadow (LAB color) */
  }

  .container h1 {
    margin-top: 1.5rem;
    font-size: 3rem;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  .container p {
    margin-top: 1.5rem;
    max-width: 42rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: var(--muted-foreground);
  }

  .pricing-section p {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 500;
    line-height: 1.625;
    color: var(--foreground)
  }

  .benefits-section p {
    line-height: 1.625;
    text-align: left;
    color: var(--foreground)
  }

  .features-section p {
    line-height: 1.625;
    text-align: left;
    color: var(--foreground)
  }

  .social-proof-section p {
    margin-top: 1.5rem;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.375;
    color: var(--foreground)
  }

  @media (width >=48rem) {
    .container h1 {
      font-size: 4.5rem;
      line-height: 1;
    }

    .pricing-section p {
      font-size: 1.5rem;
      line-height: 2rem;
    }

    .social-proof-section p {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }

  .container h1 {
    margin-top: 1.5rem;
    font-size: 3rem;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: var(--foreground);
  }

  .container h2 {
    margin-top: 0.75rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--foreground);
  }

  @media (width >=48rem) {
    .container h1 {
      font-size: 4.5rem;
      line-height: 1;
    }

    .container h2 {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
  }
  button {
    cursor: pointer;
  }
</style>
<section style="position: relative" class="hero">
  <div class="background-decoration1"></div>
  <div class="container">
    <div class="now-available-card">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-sparkles sparkles" aria-hidden="true">
        <path
          d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z">
        </path>
        <path d="M20 2v4"></path>
        <path d="M22 4h-4"></path>
        <circle cx="4" cy="20" r="2"></circle>
      </svg>
      Now available
    </div>
    <h1>${escapeHtml(g.headline)}</h1>
    <p style="text-align:center;">${escapeHtml(g.subheadline)}</p>
    <div class="cta">
      <a href="${href}" class="btn btn-primary">${label}</a>
      <a href="${href}" class="btn btn-outline">See it in action</a>
    </div>
  </div>
  </div>
</section>
<section class="description-section">
  <div class="container">
    <div class="narrow center">
      <span class="eyebrow">About</span>
      <h2>Built with intention.</h2>
      <p>${escapeHtml(g.description)}</p>
    </div>
  </div>
</section>
<section class="benefits-section">
  <div class="container">
    <div class="center">
      <span class="eyebrow">Benefits</span>
      <h2>Why teams choose us</h2>
    </div>
    <div class="grid-2">${renderBenefits(g.benefits)}</div>
  </div>
</section>
<section id="features" class="features-section">
  <div class="container">
    <div class="center">
      <span class="eyebrow">Features</span>
      <h2>Everything you need.</h2>
    </div>
    <div class="features">${renderFeatures(g.features)}</div>
  </div>
</section>
<section class="social-proof-section">
  <div class="container">
    <div class="narrow center">
      <span class="eyebrow">Loved by teams</span>
      <div style="
          display: flex;
          margin-top: 1.5rem;
          gap: 0.25rem;
          justify-content: center;
          color: var(--primary);
          font-size: 22px;
        ">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          style="fill:var(--primary);"
          class="lucide lucide-star h-5 w-5" aria-hidden="true">
          <path
            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
          </path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          style="fill:var(--primary);"
          class="lucide lucide-star h-5 w-5" aria-hidden="true">
          <path
            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
          </path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          style="fill:var(--primary);"
          class="lucide lucide-star h-5 w-5" aria-hidden="true">
          <path
            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
          </path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          style="fill:var(--primary);"
          class="lucide lucide-star h-5 w-5" aria-hidden="true">
          <path
            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
          </path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          style="fill:var(--primary);"
          class="lucide lucide-star h-5 w-5" aria-hidden="true">
          <path
            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
          </path>
        </svg>
      </div>
      <p class="quote">${escapeHtml(g.social_proof)}</p>
    </div>
  </div>
</section>
<section id="pricing" class="pricing-section">
  <div class="container">
    <div class="narrow center">
      <span class="eyebrow">Pricing</span>
      <h2>Simple, transparent pricing</h2>
      <div style="display:flex; flex-direction:column; align-items: center; justify-content: center;" class="price-card">
        <p>${escapeHtml(g.pricing)}</p>
        <a href="${label}" class="btn btn-primary" style="margin-top: 24px">Start free trial</a>
      </div>
    </div>
  </div>
</section>
<section style="padding: 0 24px" class="final-section">
  <div class="container">
    <div class="final-inner">
      <h2>${escapeHtml(g.cta)}</h2>
      <a style="margin-top: 2rem;" href="${label}" class="btn btn-secondary">${label}</a>
    </div>
  </div>
</section>
<footer>
  © ${new Date().getFullYear()} ${escapeHtml(page.product_name)}. Generated with AI Sales Page Builder
  AI Sales Page Builder.
</footer>

`;
}
