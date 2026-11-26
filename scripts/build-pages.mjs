import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { services, agents, industries, caseStudies, hubPages } from "./page-content.mjs";
import { legalPages } from "./legal-content.mjs";
import { extendedCaseStudies } from "./case-study-extended.mjs";
import { personalFundVisualMain } from "./personal-fund-visual.mjs";
import { playwrightBddVisualMain } from "./playwright-bdd-visual.mjs";
import { leadflowVisualMain } from "./leadflow-visual.mjs";
import { extendedServices } from "./service-extended.mjs";
import {
  emailContactMetaListHtml,
  emailInlineHtml,
  VYRENLO_CONTACT_EMAIL,
  VYRENLO_INFO_EMAIL,
} from "./site-emails.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function assetPrefix(depth) {
  return depth === 0 ? "." : Array(depth).fill("..").join("/");
}

/** Works with file:// (no directory index) and static hosts. */
function pageHref(prefix, ...segments) {
  if (segments.length === 0) {
    return `${prefix}/index.html`.replace(/^\.\//, "");
  }
  const parts = prefix === "." ? segments : [prefix, ...segments];
  return `${parts.join("/")}/index.html`.replace(/^\.\//, "");
}

function navLinks(prefix, active) {
  const s = (slug, label) =>
    `<li><a href="${pageHref(prefix, "service", slug)}"${active === `service-${slug}` ? ' aria-current="page"' : ""}>${esc(label)}</a></li>`;
  const serviceItems = services.map((x) => s(x.slug, x.title)).join("\n          ");
  const agentItems = agents
    .map(
      (a) =>
        `<li><a href="${pageHref(prefix, "agent", a.slug)}"${active === `agent-${a.slug}` ? ' aria-current="page"' : ""}>${esc(a.title)}</a></li>`
    )
    .join("\n            ");
  const industryItems = industries
    .map(
      (i) =>
        `<li><a href="${pageHref(prefix, "industry", i.slug)}"${active === `industry-${i.slug}` ? ' aria-current="page"' : ""}>${esc(i.title)}</a></li>`
    )
    .join("\n            ");
  return `
      <ul class="nav-links">
        <li class="nav-item-has-menu">
          <button type="button" class="nav-parent" aria-expanded="false" aria-haspopup="true">Services</button>
          <ul class="nav-dropdown nav-dropdown-wide">
          ${serviceItems}
          </ul>
        </li>
        <!-- Nav: Agents dropdown hidden while pages are being updated
        <li class="nav-item-has-menu">
          <button type="button" class="nav-parent" aria-expanded="false" aria-haspopup="true">Agents</button>
          <ul class="nav-dropdown">
            ${agentItems}
          </ul>
        </li>
        -->
        <!-- Nav: Industries dropdown hidden while pages are being updated
        <li class="nav-item-has-menu">
          <button type="button" class="nav-parent" aria-expanded="false" aria-haspopup="true">Industries</button>
          <ul class="nav-dropdown nav-dropdown-wide">
            ${industryItems}
          </ul>
        </li>
        -->
        <li><a href="${pageHref(prefix)}#work">Work</a></li>
        <li><a href="${pageHref(prefix)}#pilot">Pilot</a></li>
        <li><a href="${pageHref(prefix)}#process">Process</a></li>
        <li><a href="${pageHref(prefix)}#faq">FAQ</a></li>
        <li><a href="${pageHref(prefix, "contact")}"${active === "contact" ? ' aria-current="page"' : ""}>Contact</a></li>
      </ul>`;
}

function navActions(prefix) {
  return `
      <div class="nav-actions">
        <a class="btn btn-ghost btn-sm nav-audit" href="${pageHref(prefix, "tools", "website-audit")}">Free audit</a>
        <a class="btn btn-primary nav-cta calendly-cta" href="${pageHref(prefix, "contact")}">Book a call</a>
      </div>`;
}

function footer(prefix) {
  const serviceLinks = services
    .slice(0, 6)
    .map((x) => `<li><a href="${pageHref(prefix, "service", x.slug)}">${esc(x.title)}</a></li>`)
    .join("\n          ");
  const industryLinks = industries
    .slice(0, 6)
    .map((x) => `<li><a href="${pageHref(prefix, "industry", x.slug)}">${esc(x.title)}</a></li>`)
    .join("\n          ");
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="logo" href="${pageHref(prefix)}">
          <img class="logo-mark" src="${prefix}/assets/brand/logo-mark.png" alt="" width="40" height="40" />
          <span class="logo-text">Vyrenlo</span>
        </a>
        <p>AI solutions and software engineering for ambitious businesses.</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          ${serviceLinks}
          <li><a href="${pageHref(prefix)}#services">All services</a></li>
        </ul>
      </div>
      <div>
        <h4>Industries</h4>
        <ul>
          ${industryLinks}
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="${pageHref(prefix, "case-studies")}">Case studies</a></li>
          <li><a href="${pageHref(prefix, "contact")}">Contact</a></li>
          <li><a href="${pageHref(prefix)}#about">About</a></li>
        </ul>
      </div>
      <div>
        <h4>Legal</h4>
        <ul>
          <li><a href="${pageHref(prefix, "privacy")}">Privacy Policy</a></li>
          <li><a href="${pageHref(prefix, "terms")}">Terms and Conditions</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>&copy; <span id="year"></span> Vyrenlo. All rights reserved.</p>
    </div>
  </footer>`;
}

function shell({ depth, title, description, active, main }) {
  const prefix = assetPrefix(depth);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${esc(description)}" />
  <title>${esc(title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${prefix}/styles.css" />
  <link rel="stylesheet" href="${prefix}/styles-inner.css" />
  <link rel="icon" href="${prefix}/favicon.svg" type="image/svg+xml" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="top">
    <nav class="nav container">
      <a class="logo" href="${pageHref(prefix)}" aria-label="Vyrenlo home">
        <img class="logo-mark" src="${prefix}/assets/brand/logo-mark.png" alt="" width="40" height="40" />
        <span class="logo-text">Vyrenlo</span>
      </a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      ${navLinks(prefix, active)}
      ${navActions(prefix)}
    </nav>
  </header>
  <main id="main">
    ${main}
  </main>
  <a class="chat-fab" href="${pageHref(prefix, "contact")}">Ask us anything</a>
  ${footer(prefix)}
  <script src="${prefix}/form-config.js"></script>
  <script src="${prefix}/main.js"></script>
</body>
</html>`;
}

function serviceMain(s) {
  return `
    <section class="page-hero">
      <div class="container page-hero-inner">
        <p class="eyebrow">${esc(s.title)}</p>
        <h1>${esc(s.heroTitle)}</h1>
        <p class="page-lead">${esc(s.heroLead)}</p>
        <div class="page-hero-actions">
          <a class="btn btn-primary btn-lg calendly-cta" href="${pageHref("../..", "contact")}">Book a Call</a>
          <a class="btn btn-ghost btn-lg" href="${pageHref("../..")}#services">All services</a>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container inner-split">
        <div>
          <p class="eyebrow">${esc(s.introEyebrow)}</p>
          <h2>${esc(s.introTitle)}</h2>
          <p class="section-desc">${esc(s.introBody)}</p>
        </div>
        <div class="benefits-grid">
          ${s.benefits.map((b) => `<article class="benefit-card"><h3>${esc(b.title)}</h3><p>${esc(b.body)}</p></article>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section section-muted">
      <div class="container">
        <h2 class="centered-title">${esc(s.cycleTitle)}</h2>
        <div class="cycle-grid">
          ${s.cycle.map((c) => `<article class="cycle-card"><span class="cycle-step">${esc(c.step)}</span><p>${esc(c.body)}</p></article>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section cta-band">
      <div class="container cta-band-inner">
        <h2>Ready to revolutionize with ${esc(s.title)}?</h2>
        <a class="btn btn-primary calendly-cta" href="${pageHref("../..", "contact")}">Book a Call</a>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2>${esc(s.activitiesTitle)}</h2>
        <div class="activities-grid">
          ${s.activities.map((a) => `<article class="activity-card"><h3>${esc(a.title)}</h3><p>${esc(a.body)}</p></article>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section contact-strip">
      <div class="container contact-strip-inner">
        <div>
          <h2>Get Vyrenlo updates and book meetings to boost your business.</h2>
          <p class="section-desc">${emailInlineHtml()}</p>
        </div>
        <a class="btn btn-primary btn-lg calendly-cta" href="${pageHref("../..", "contact")}">Book a 30-min call</a>
      </div>
    </section>`;
}

function extendedServiceMain(s, ext) {
  const prefix = "../..";
  const builds = ext.builds
    .map(
      (b) =>
        `<article class="service-type-card"><h3>${esc(b.title)}</h3><p>${esc(b.body)}</p></article>`
    )
    .join("\n          ");
  const benefits = ext.benefits
    .map(
      (b) =>
        `<article class="benefit-card"><h3>${esc(b.title)}</h3><p>${esc(b.body)}</p></article>`
    )
    .join("\n          ");
  const lifecycleOutcomes = (ext.lifecycleOutcomes || [])
    .map((o) => `<span class="lifecycle-outcome-pill">${esc(o)}</span>`)
    .join("\n          ");
  const lifecycle = ext.lifecycle
    .map((c, i) => {
      const tools = (c.tools || [])
        .map(
          (t) =>
            `<li class="lifecycle-tool"><img src="${prefix}/assets/services/tool-icons/${esc(t.slug)}.svg" width="36" height="36" alt="" /><span>${esc(t.label)}</span></li>`
        )
        .join("\n              ");
      const hook = c.hook ? `<h3 class="lifecycle-pitch-hook">${esc(c.hook)}</h3>` : "";
      return `<article class="lifecycle-pitch-card">
            <div class="lifecycle-pitch-head">
              <span class="lifecycle-pitch-num">${String(i + 1).padStart(2, "0")}</span>
              <span class="cycle-step">${esc(c.step)}</span>
            </div>
            ${hook}
            <p class="lifecycle-pitch-body">${esc(c.body)}</p>
            <ul class="lifecycle-tools" aria-label="Tools for ${esc(c.step)}">${tools}</ul>
          </article>`;
    })
    .join("\n          ");
  const activities = ext.activities
    .map(
      (a, i) =>
        `<article class="activity-card activity-card-num"><span class="activity-num">${String(i + 1).padStart(2, "0")}</span><h3>${esc(a.title)}</h3><p>${esc(a.body)}</p></article>`
    )
    .join("\n          ");
  const deliveryList = ext.deliveryPoints
    .map((p) => `<li>${esc(p)}</li>`)
    .join("\n            ");
  const techRows = ext.techTable
    .map(([layer, choice]) => `<tr><th scope="row">${esc(layer)}</th><td>${esc(choice)}</td></tr>`)
    .join("\n            ");
  const qualityList = ext.qualityItems.map((q) => `<li>${esc(q)}</li>`).join("\n            ");
  const relatedCards = ext.relatedCaseSlugs
    .map((slug) => {
      const c = caseStudies.find((x) => x.slug === slug);
      if (!c) return "";
      return `<article class="case-card"><span class="case-tag">${esc(c.tag)}</span><h3><a href="${pageHref(prefix, "case-studies", c.slug)}">${esc(c.title)}</a></h3><p>${esc(c.summary)}</p><a class="text-link" href="${pageHref(prefix, "case-studies", c.slug)}">Read case study</a></article>`;
    })
    .filter(Boolean)
    .join("\n          ");

  const pilotBlock = ext.pilotLink
    ? `<p class="center-link" style="margin-top:1.25rem"><a href="${pageHref(prefix)}#pilot">Start with a one-week pilot</a></p>`
    : "";

  return `
    <section class="page-hero page-hero-service">
      <div class="container service-hero-grid">
        <div class="service-hero-copy">
          <p class="eyebrow">${esc(s.title)}</p>
          <h1>${esc(ext.heroTitle)}</h1>
          <p class="page-lead">${esc(ext.heroLead)}</p>
          <p class="service-definition">${esc(ext.heroDefinition)}</p>
          <div class="page-hero-actions">
            <a class="btn btn-primary btn-lg calendly-cta" href="${pageHref(prefix, "contact")}">Book a scoping call</a>
            <a class="btn btn-ghost btn-lg" href="${pageHref(prefix, "case-studies")}">See our work</a>
          </div>
        </div>
        <figure class="service-hero-media">
          <img src="${prefix}/${ext.heroImage}" width="720" height="480" alt="${esc(ext.heroImageAlt)}" loading="eager" />
        </figure>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-head centered">
          <h2>${esc(ext.buildsTitle)}</h2>
          <p class="section-desc">${esc(ext.buildsLead)}</p>
        </div>
        <div class="service-types-grid">
          ${builds}
        </div>
      </div>
    </section>
    <section class="section section-muted">
      <div class="container">
        <div class="section-head">
          <h2>${esc(ext.benefitsTitle)}</h2>
          <p class="section-desc">${esc(ext.benefitsLead)}</p>
        </div>
        <div class="benefits-grid benefits-grid-3">
          ${benefits}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container service-delivery-grid">
        <div>
          <p class="eyebrow">Delivery</p>
          <h2>${esc(ext.deliveryTitle)}</h2>
          <p class="section-desc">${esc(ext.deliveryLead)}</p>
          <ul class="check-list">${deliveryList}</ul>
          ${pilotBlock}
        </div>
        <figure class="service-lifecycle-figure">
          <img src="${prefix}/${ext.lifecycleImage}" width="800" height="320" alt="${esc(ext.lifecycleImageAlt)}" loading="lazy" />
        </figure>
      </div>
    </section>
    <section class="section section-muted section-lifecycle-pitch">
      <div class="container">
        <div class="section-head centered">
          <h2>${esc(ext.lifecycleTitle)}</h2>
          ${ext.lifecyclePitchLead ? `<p class="section-desc">${esc(ext.lifecyclePitchLead)}</p>` : ""}
        </div>
        ${lifecycleOutcomes ? `<div class="lifecycle-outcomes">${lifecycleOutcomes}</div>` : ""}
        <div class="lifecycle-pitch-grid">
          ${lifecycle}
        </div>
      </div>
    </section>
    <section class="section cta-band">
      <div class="container cta-band-inner">
        <div>
          <h2>${esc(ext.ctaTitle)}</h2>
          <p class="section-desc">${esc(ext.ctaLead)}</p>
        </div>
        <a class="btn btn-primary btn-lg calendly-cta" href="${pageHref(prefix, "contact")}">Talk to an engineer</a>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2>${esc(ext.activitiesTitle)}</h2>
        <div class="activities-grid activities-grid-3">
          ${activities}
        </div>
      </div>
    </section>
    <section class="section section-dark">
      <div class="container service-tech-grid">
        <div>
          <h2>${esc(ext.techTitle)}</h2>
          <p class="section-desc">${esc(ext.techLead)}</p>
          <div class="tech-table-wrap">
            <table class="tech-table">
              <thead><tr><th scope="col">Layer</th><th scope="col">Typical choices</th></tr></thead>
              <tbody>${techRows}</tbody>
            </table>
          </div>
        </div>
        <div class="service-quality-panel">
          <h3>${esc(ext.qualityTitle)}</h3>
          <ul class="check-list">${qualityList}</ul>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2>${esc(ext.relatedTitle)}</h2>
        <div class="cases-grid compact">
          ${relatedCards}
        </div>
      </div>
    </section>
    <section class="section contact-strip">
      <div class="container contact-strip-inner">
        <div>
          <h2>Ready to scope your web application?</h2>
          <p class="section-desc">${emailInlineHtml()} · Response within one business day</p>
        </div>
        <a class="btn btn-primary btn-lg calendly-cta" href="${pageHref(prefix, "contact")}">Book a 30-min call</a>
      </div>
    </section>`;
}

function agentMain(a) {
  return `
    <section class="page-hero">
      <div class="container page-hero-inner">
        <p class="eyebrow">AI Agent</p>
        <h1>${esc(a.heroTitle)}</h1>
        <p class="page-lead">${esc(a.heroLead)}</p>
        <a class="btn btn-primary btn-lg calendly-cta" href="${pageHref("../..", "contact")}">Book a Call</a>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2>${esc(a.introTitle)}</h2>
        <p class="section-desc">${esc(a.introBody)}</p>
        <ul class="check-list">
          ${a.benefits.map((b) => `<li>${esc(b)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    <section class="section section-muted">
      <div class="container">
        <h2>What we deliver</h2>
        <div class="activities-grid">
          ${a.activities.map((t) => `<article class="activity-card"><h3>${esc(t)}</h3><p>Designed, integrated, and monitored with your team&apos;s approval workflows.</p></article>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section cta-band">
      <div class="container cta-band-inner">
        <h2>Deploy your ${esc(a.title)} with Vyrenlo</h2>
        <a class="btn btn-primary calendly-cta" href="${pageHref("../..", "contact")}">Schedule a Consultation</a>
      </div>
    </section>`;
}

function industryMain(i) {
  return `
    <section class="page-hero">
      <div class="container page-hero-inner">
        <p class="eyebrow">Industry</p>
        <h1>${esc(i.heroTitle)}</h1>
        <p class="page-lead">${esc(i.heroLead)}</p>
        <a class="btn btn-primary btn-lg calendly-cta" href="${pageHref("../..", "contact")}">Book a Call</a>
      </div>
    </section>
    <section class="section">
      <div class="container inner-split">
        <div>
          <h2>${esc(i.introTitle)}</h2>
          <p class="section-desc">${esc(i.introBody)}</p>
        </div>
        <div class="benefits-grid">
          ${i.benefits.map((b) => `<article class="benefit-card"><h3>${esc(b)}</h3><p>Practical AI and software tailored to ${esc(i.title.toLowerCase())} constraints.</p></article>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section section-muted">
      <div class="container">
        <h2>Focus areas</h2>
        <div class="tag-grid">
          ${i.focusAreas.map((f) => `<span class="tag-pill">${esc(f)}</span>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2>Related case studies</h2>
        <div class="cases-grid compact">
          ${caseStudies.slice(0, 3).map((c) => `<article class="case-card"><span class="case-tag">${esc(c.tag)}</span><h3><a href="${pageHref("../..", "case-studies", c.slug)}">${esc(c.title)}</a></h3><p>${esc(c.summary)}</p></article>`).join("\n          ")}
        </div>
        <p class="center-link"><a href="${pageHref("../..", "case-studies")}">View all case studies</a></p>
      </div>
    </section>`;
}

function caseStudyMain(c) {
  const ext = extendedCaseStudies[c.slug];
  if (c.slug === "personal-fund-subsystem" && ext) {
    return personalFundVisualMain(c, ext, { esc, pageHref });
  }
  if (c.slug === "enterprise-playwright-bdd" && ext) {
    return playwrightBddVisualMain(c, ext, { esc, pageHref });
  }
  if (c.slug === "vyrenlo-ai-leadflow" && ext) {
    return leadflowVisualMain(c, ext, { esc, pageHref });
  }
  if (ext) return extendedCaseStudyMain(c, ext);

  return `
    <section class="page-hero page-hero-sm">
      <div class="container page-hero-inner">
        <span class="case-tag">${esc(c.tag)}</span>
        <h1>${esc(c.title)}</h1>
        <p class="page-lead">${esc(c.summary)}</p>
      </div>
    </section>
    <section class="section">
      <div class="container prose-block">
        <h2>Challenge</h2>
        <p>${esc(c.challenge)}</p>
        <h2>Solution</h2>
        <p>${esc(c.solution)}</p>
        <h2>Impact</h2>
        <ul class="check-list">
          ${c.impact.map((x) => `<li>${esc(x)}</li>`).join("\n          ")}
        </ul>
        <a class="btn btn-primary calendly-cta" href="${pageHref("../..", "contact")}">Start a similar project</a>
      </div>
    </section>`;
}

function extendedCaseStudyMain(c, ext) {
  const facts = ext.heroFacts
    .map((f) => `<li>${esc(f)}</li>`)
    .join("\n            ");
  const tagPills = (ext.tags || [])
    .map((t) => `<span class="tag-pill">${esc(t)}</span>`)
    .join("\n          ");

  const sections = ext.sections
    .map((s) => {
      let html = `<h2>${esc(s.heading)}</h2>`;
      if (s.paragraphs) {
        html += s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("\n");
      }
      if (s.list) {
        html += `<ul class="check-list">${s.list.map((li) => `<li>${esc(li)}</li>`).join("")}</ul>`;
      }
      if (s.paragraphsAfter) {
        html += s.paragraphsAfter.map((p) => `<p>${esc(p)}</p>`).join("\n");
      }
      if (s.pre) {
        html += `<pre class="arch-diagram">${esc(s.pre)}</pre>`;
      }
      return html;
    })
    .join("\n");

  const techRows = ext.techTable
    .map(([layer, choice]) => `<tr><th scope="row">${esc(layer)}</th><td>${esc(choice)}</td></tr>`)
    .join("\n            ");

  return `
    <section class="page-hero">
      <div class="container page-hero-inner">
        <span class="case-tag">${esc(c.tag)}</span>
        <p class="eyebrow">Healthcare operations software</p>
        <h1>${esc(ext.heroHeadline)}</h1>
        <p class="page-lead">${esc(ext.heroSubhead)}</p>
        <div class="tag-grid case-tags">${tagPills}</div>
      </div>
    </section>
    <section class="section section-muted">
      <div class="container">
        <ul class="hero-facts check-list">${facts}</ul>
      </div>
    </section>
    <section class="section">
      <div class="container prose-block legal-prose case-prose">
        ${sections}
        <h2>Technology</h2>
        <div class="tech-table-wrap">
          <table class="tech-table">
            <thead><tr><th scope="col">Layer</th><th scope="col">Choice</th></tr></thead>
            <tbody>${techRows}</tbody>
          </table>
        </div>
        <p style="margin-top:2rem">
          <a class="btn btn-primary calendly-cta" href="${pageHref("../..", "contact")}">Discuss a similar project</a>
        </p>
      </div>
    </section>`;
}

function caseStudiesHub() {
  return `
    <section class="page-hero">
      <div class="container page-hero-inner">
        <h1>${esc(hubPages["case-studies"].heroTitle)}</h1>
        <p class="page-lead">${esc(hubPages["case-studies"].heroLead)}</p>
      </div>
    </section>
    <section class="section">
      <div class="container cases-grid">
        ${caseStudies.map((c) => `<article class="case-card"><span class="case-tag">${esc(c.tag)}</span><h3><a href="${pageHref(".", c.slug)}">${esc(c.title)}</a></h3><p>${esc(c.summary)}</p><a class="text-link" href="${pageHref(".", c.slug)}">Read more</a></article>`).join("\n        ")}
      </div>
    </section>`;
}

function legalParagraphHtml(text) {
  const privacyPlaceholder = "__VYRENLO_PRIVACY_LINK__";
  let raw = String(text).replace(
    "[[PRIVACY_POLICY_LINK]]",
    privacyPlaceholder
  );
  let html = esc(raw);
  html = html.replace(
    privacyPlaceholder,
    `<a href="${pageHref("..", "privacy")}">Privacy Policy</a>`
  );
  for (const email of [VYRENLO_CONTACT_EMAIL, VYRENLO_INFO_EMAIL]) {
    const safe = esc(email);
    html = html.replaceAll(
      safe,
      `<a href="mailto:${email}">${safe}</a>`
    );
  }
  return `<p>${html}</p>`;
}

function legalList(section) {
  if (section.labeledList?.length) {
    return `<ul class="legal-list">${section.labeledList
      .map(
        (item) =>
          `<li><strong>${esc(item.label)}</strong> ${esc(item.body)}</li>`
      )
      .join("")}</ul>`;
  }
  if (section.listItems?.length) {
    return `<ul class="legal-list">${section.listItems
      .map((item) => `<li>${esc(item)}</li>`)
      .join("")}</ul>`;
  }
  return "";
}

function legalMain(page, activeSlug) {
  const intro = (page.intro ?? [])
    .map((p) => legalParagraphHtml(p).replace("<p>", '<p class="legal-intro">'))
    .join("\n");
  const body = page.sections
    .map((s) => {
      const list = legalList(s);
      return `<h2>${esc(s.heading)}</h2>\n${s.paragraphs.map((p) => legalParagraphHtml(p)).join("\n")}${list ? `\n${list}` : ""}`;
    })
    .join("\n");
  const lead = page.leadLine
    ? esc(page.leadLine)
    : `Last updated: ${esc(page.updated)}`;
  const related =
    page.relatedLabel ??
    (activeSlug === "privacy" ? "Terms and Conditions" : "Privacy Policy");
  return `
    <section class="page-hero page-hero-sm">
      <div class="container page-hero-inner">
        <h1>${esc(page.title)}</h1>
        <p class="page-lead">${lead}</p>
      </div>
    </section>
    <section class="section">
      <div class="container prose-block legal-prose">
        ${intro}
        ${body}
        <p class="legal-note"><a href="${pageHref("..", activeSlug === "privacy" ? "terms" : "privacy")}">${esc(related)}</a></p>
      </div>
    </section>`;
}

function contactPage() {
  return `
    <section class="page-hero page-hero-sm">
      <div class="container page-hero-inner">
        <h1>${esc(hubPages.contact.heroTitle)}</h1>
        <p class="page-lead">${esc(hubPages.contact.heroLead)}</p>
      </div>
    </section>
    <section class="section contact-section">
      <div class="container contact-grid">
        <div class="contact-copy">
          <ul class="contact-meta">
            ${emailContactMetaListHtml()}
            <li>vyrenlo.com</li>
          </ul>
          <p style="margin-top:1.25rem">
            <a class="btn btn-primary calendly-cta" href="#">Book a 30-min discovery call</a>
          </p>
        </div>
        <form class="contact-form" action="#" method="post" id="contact-form">
          <input type="text" name="_gotcha" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <label>Full name<input type="text" name="name" required autocomplete="name" /></label>
          <label>Work email<input type="email" name="email" required autocomplete="email" /></label>
          <label>Company or website<input type="text" name="company" autocomplete="organization" /></label>
          <label>What are you building?<textarea name="message" rows="3" required placeholder="Brief description of your product or workflow"></textarea></label>
          <fieldset class="timeline-fieldset">
            <legend>Timeline</legend>
            <div class="timeline-options">
              <label class="timeline-option"><input type="radio" name="timeline" value="ASAP" required /> ASAP</label>
              <label class="timeline-option"><input type="radio" name="timeline" value="1-3 months" /> 1–3 months</label>
              <label class="timeline-option"><input type="radio" name="timeline" value="Later" /> Later</label>
              <label class="timeline-option"><input type="radio" name="timeline" value="Not sure" /> Not sure yet</label>
            </div>
          </fieldset>
          <button type="submit" class="btn btn-primary btn-lg">Send project details</button>
          <p class="form-status" data-form-status hidden></p>
        </form>
      </div>
    </section>`;
}

function writePage(relDir, filename, html) {
  const dir = path.join(root, relDir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, filename), html, "utf8");
}

for (const s of services) {
  const ext = extendedServices[s.slug];
  const html = shell({
    depth: 2,
    title: s.metaTitle,
    description: ext?.metaDescription ?? s.heroLead,
    active: `service-${s.slug}`,
    main: ext ? extendedServiceMain(s, ext) : serviceMain(s),
  });
  writePage(`service/${s.slug}`, "index.html", html);
}

for (const a of agents) {
  const html = shell({
    depth: 2,
    title: a.metaTitle,
    description: a.heroLead,
    active: `agent-${a.slug}`,
    main: agentMain(a),
  });
  writePage(`agent/${a.slug}`, "index.html", html);
}

for (const i of industries) {
  const html = shell({
    depth: 2,
    title: i.metaTitle,
    description: i.heroLead,
    active: `industry-${i.slug}`,
    main: industryMain(i),
  });
  writePage(`industry/${i.slug}`, "index.html", html);
}

for (const c of caseStudies) {
  const ext = extendedCaseStudies[c.slug];
  const html = shell({
    depth: 2,
    title: ext ? ext.metaTitle : `${c.title} | Vyrenlo Case Study`,
    description: ext ? ext.metaDescription : c.summary,
    active: "case-studies",
    main: caseStudyMain(c),
  });
  writePage(`case-studies/${c.slug}`, "index.html", html);
}

writePage(
  "case-studies",
  "index.html",
  shell({
    depth: 1,
    title: hubPages["case-studies"].metaTitle,
    description: hubPages["case-studies"].heroLead,
    active: "case-studies",
    main: caseStudiesHub(),
  })
);

writePage(
  "contact",
  "index.html",
  shell({
    depth: 1,
    title: hubPages.contact.metaTitle,
    description: hubPages.contact.heroLead,
    active: "contact",
    main: contactPage(),
  })
);

for (const key of ["privacy", "terms"]) {
  const page = legalPages[key];
  writePage(
    page.slug,
    "index.html",
    shell({
      depth: 1,
      title: page.metaTitle,
      description: page.metaDescription,
      active: key,
      main: legalMain(page, page.slug),
    })
  );
}

console.log(
  `Generated ${services.length} services, ${agents.length} agents, ${industries.length} industries, ${caseStudies.length} case studies, legal pages, and hub pages.`
);
