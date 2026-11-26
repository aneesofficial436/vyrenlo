/** Visual case study: Vyrenlo AI LeadFlow (concept diagrams, portfolio MVP). */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const archSvgPath = path.join(
  __dirname,
  "../assets/case-studies/vyrenlo-ai-leadflow/architecture.svg"
);
const archSvgInline = fs.readFileSync(archSvgPath, "utf8").trim();

export function leadflowVisualMain(c, ext, { esc, pageHref }) {
  const assets = "../../assets/case-studies/vyrenlo-ai-leadflow";
  const tagPills = (ext.tags || [])
    .map((t) => `<span class="tag-pill">${esc(t)}</span>`)
    .join("\n          ");

  const shots = [
    {
      src: "01-capture.svg",
      title: "Capture from every channel",
      desc: "Public API ingest with API keys, deduplication, and consent—plus Meta and LinkedIn routed through n8n without secrets in git.",
      step: "Capture",
    },
    {
      src: "02-qualify.svg",
      title: "AI scores intent in seconds",
      desc: "Structured OpenAI output: hot, warm, or cold priority, requirements JSON, and a recommended next action—with a dev heuristic for CI demos.",
      step: "Qualify",
    },
    {
      src: "03-notify.svg",
      title: "Hot leads wake the team",
      desc: "HMAC-signed webhooks trigger n8n: staff email the moment a lead crosses your hot threshold.",
      step: "Alert",
    },
    {
      src: "04-followup.svg",
      title: "Follow-ups on your clock",
      desc: "24h, 72h, 168h sequences with template or AI copy—optional human approval before anything leaves SMTP.",
      step: "Follow-up",
    },
    {
      src: "05-crm.svg",
      title: "One CRM for the pipeline",
      desc: "Next.js dashboard: overview metrics, lead detail, notes, communications, tenant settings, and light/dark theming.",
      step: "CRM",
    },
  ];

  const slideHtml = shots
    .map(
      (s, i) => `
        <article class="case-tour-slide${i === 0 ? " active" : ""}" data-slide="${i}"${i === 0 ? "" : " hidden"}>
          <div class="case-tour-grid">
            <div class="case-tour-copy">
              <span class="case-tour-step">${esc(s.step)}</span>
              <h3 class="case-tour-title">${esc(s.title)}</h3>
              <p class="case-tour-desc">${esc(s.desc)}</p>
            </div>
            <figure class="case-tour-media">
              <img src="${assets}/${s.src}" alt="${esc(s.title)} — diagram" width="1200" height="675" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" />
            </figure>
          </div>
        </article>`
    )
    .join("\n");

  const dotsHtml = shots
    .map(
      (s, i) => `
        <button type="button" class="case-tour-dot${i === 0 ? " active" : ""}" role="tab" aria-selected="${i === 0 ? "true" : "false"}" data-carousel-goto="${i}" aria-label="${esc(s.title)}">
          <span class="case-tour-dot-label">${esc(s.step)}</span>
        </button>`
    )
    .join("\n");

  const lessons = (ext.designLessons || [])
    .map((li) => `<li>${esc(li)}</li>`)
    .join("\n          ");

  return `
    <section class="page-hero case-hero-visual">
      <div class="container page-hero-inner case-hero-inner-wide">
        <span class="case-tag">${esc(c.tag)}</span>
        <h1>Vyrenlo AI LeadFlow</h1>
        <p class="page-lead">Multi-tenant lead automation built end-to-end—capture and qualify with AI, alert sales on hot intent, run timed follow-ups with approval gates, and run the pipeline from a modern CRM.</p>
        <div class="tag-grid case-tags">${tagPills}</div>
        <div class="page-hero-actions">
          <a class="btn btn-primary" href="#product-tour">See the platform flow</a>
          <a class="btn btn-ghost" href="#download">Download case study</a>
        </div>
      </div>
    </section>

    <section class="section section-muted case-glance-section">
      <div class="container container-case-wide">
        <div class="hero-stats case-glance-stats">
          <div class="stat">
            <span class="stat-num">9</span>
            <span class="stat-label">Delivery phases — schema to production demo</span>
          </div>
          <div class="stat">
            <span class="stat-num">10</span>
            <span class="stat-label">Importable n8n workflows</span>
          </div>
          <div class="stat">
            <span class="stat-num">3</span>
            <span class="stat-label">Vertical onboarding templates</span>
          </div>
        </div>
        <div class="case-glance-grid">
          <article class="case-glance-card">
            <span class="case-glance-label">Challenge</span>
            <h2>Leads arrive everywhere</h2>
            <p>Inbound sits in inboxes and forms. Follow-ups slip. Teams lack one prioritized view—and hot opportunities go cold waiting for a first reply.</p>
          </article>
          <article class="case-glance-card">
            <span class="case-glance-label">Solution</span>
            <h2>API as brain, n8n as hands</h2>
            <p>FastAPI owns tenants, qualification, dedup, and approvals. n8n schedules follow-ups and connects social ingest—without redeploying application code.</p>
          </article>
          <article class="case-glance-card">
            <span class="case-glance-label">Outcome</span>
            <h2>Sales-demo-ready MVP</h2>
            <p>Docker stack, CI tests, seed data, and a twelve-minute demo: web form → AI score → staff alert → follow-up → engaged reply—with humans in the loop.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section case-tour-section" id="product-tour">
      <div class="container container-case-wide">
        <header class="case-section-head case-section-head-split">
          <div>
            <p class="eyebrow">Platform tour</p>
            <h2>Capture → qualify → close the loop</h2>
            <p class="section-desc">Five moments from the LeadFlow architecture—patterns you can deploy for real estate, B2B, or agency clients.</p>
          </div>
          <div class="case-tour-toolbar" aria-hidden="true">
            <span class="work-carousel-counter case-tour-counter" data-carousel-counter>01 / 05</span>
          </div>
        </header>
        <div class="case-tour" data-case-carousel tabindex="0" aria-roledescription="carousel" aria-label="LeadFlow platform diagrams">
          <button type="button" class="case-tour-arrow carousel-btn" data-carousel-prev aria-label="Previous diagram">
            <span aria-hidden="true">←</span>
          </button>
          <div class="case-tour-shell">
            <div class="case-tour-viewport">
              ${slideHtml}
            </div>
          </div>
          <button type="button" class="case-tour-arrow carousel-btn" data-carousel-next aria-label="Next diagram">
            <span aria-hidden="true">→</span>
          </button>
          <div class="case-tour-dots" role="tablist" aria-label="Platform tour steps">${dotsHtml}
          </div>
          <p class="case-tour-hint">Use arrows or tabs to browse the flow</p>
        </div>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container container-case-wide case-arch-layout">
        <header class="case-section-head">
          <p class="eyebrow">Architecture</p>
          <h2>One API, many tenants, orchestration outside the monolith</h2>
          <p class="section-desc">PostgreSQL is source of truth; Redis rate-limits public ingest; OpenAI returns validated JSON; n8n handles cron, webhooks, and channel glue.</p>
        </header>
        <figure class="case-arch-figure case-arch-figure--inline" aria-label="LeadFlow system architecture">
          ${archSvgInline}
        </figure>
        <ul class="check-list case-arch-points">
          <li>Row-level <code>tenant_id</code> isolation on every owned record—cross-tenant IDs return 404 in tests</li>
          <li>HMAC webhooks to n8n; service-token auth on internal automation calls</li>
          <li>Vertical templates seed prompts, follow-up intervals, and channel defaults at provision time</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container container-case-wide">
        <header class="case-section-head">
          <p class="eyebrow">Design lessons</p>
          <h2>What we would ship again on the next automation product</h2>
        </header>
        <ul class="check-list case-arch-points">
          ${lessons}
        </ul>
      </div>
    </section>

    <section class="section case-download-section" id="download">
      <div class="container case-download-grid">
        <div class="case-download-copy">
          <p class="eyebrow">Full write-up</p>
          <h2>Download the case study</h2>
          <p class="section-desc">PDF with stack, security controls, n8n workflow map, and demo narrative. We will also send occasional product and engineering updates—you can unsubscribe anytime.</p>
        </div>
        <form class="contact-form case-download-form" id="case-study-download-form" action="#" method="post"
          data-download-url="${assets}/vyrenlo-ai-leadflow-case-study.pdf">
          <input type="text" name="_gotcha" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <input type="hidden" name="_subject" value="LeadFlow case study download" />
          <input type="hidden" name="case_study" value="Vyrenlo AI LeadFlow" />
          <div class="case-download-form-row">
            <label>First name<input type="text" name="first_name" required autocomplete="given-name" /></label>
            <label>Last name<input type="text" name="last_name" required autocomplete="family-name" /></label>
          </div>
          <label>Email<input type="email" name="email" required autocomplete="email" /></label>
          <label>Phone<input type="tel" name="phone" required autocomplete="tel" /></label>
          <label class="case-consent">
            <input type="checkbox" name="consent" value="yes" required />
            <span>I agree to the <a href="${pageHref("../..", "terms")}">Terms and Conditions</a> and <a href="${pageHref("../..", "privacy")}">Privacy Policy</a>.</span>
          </label>
          <button type="submit" class="btn btn-primary">Download PDF</button>
          <p class="form-status" data-form-status hidden role="status"></p>
        </form>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container case-cta-bar">
        <p>Need a multi-tenant CRM, AI qualification, or n8n automation package for your clients?</p>
        <a class="btn btn-primary calendly-cta" href="${pageHref("../..", "contact")}">Discuss a similar build</a>
      </div>
    </section>`;
}