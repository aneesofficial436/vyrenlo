/** Visual case study layout for Personal Fund Subsystem (not long-form prose). */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const archSvgPath = path.join(
  __dirname,
  "../assets/case-studies/personal-fund-subsystem/architecture.svg"
);
const archSvgInline = fs.readFileSync(archSvgPath, "utf8").trim();

export function personalFundVisualMain(c, ext, { esc, pageHref }) {
  const assets = "../../assets/case-studies/personal-fund-subsystem";
  const tagPills = (ext.tags || [])
    .map((t) => `<span class="tag-pill">${esc(t)}</span>`)
    .join("\n          ");

  const shots = [
    {
      src: "01-welcome.png",
      title: "One sign-in per institution",
      desc: "Staff pick an institution and see only the menus their role allows.",
      step: "Home",
    },
    {
      src: "02-patient-search.png",
      title: "Find any patient account",
      desc: "Search by MRN, name, or SSN across thousands of active accounts.",
      step: "Search",
    },
    {
      src: "03-account-detail.png",
      title: "Balances at a glance",
      desc: "Personal funds, holds, and available balance on one screen.",
      step: "Accounts",
    },
    {
      src: "04-transactions.png",
      title: "Post cash in groups",
      desc: "Deposits, withdrawals, and holds with grouped audit trails.",
      step: "Transactions",
    },
    {
      src: "05-reports.png",
      title: "Statements & control reports",
      desc: "SSRS inquiry reports and operational lists finance already uses.",
      step: "Reports",
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
              <img src="${assets}/${s.src}" alt="${esc(s.title)} — PFS screenshot" width="1200" height="675" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" />
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

  return `
    <section class="page-hero case-hero-visual">
      <div class="container page-hero-inner case-hero-inner-wide">
        <span class="case-tag">${esc(c.tag)}</span>
        <h1>Personal Fund Subsystem</h1>
        <p class="page-lead">A browser workspace for hospitals that hold money on behalf of patients—lookup, post transactions, run reports, and keep NCFS codes in sync.</p>
        <div class="tag-grid case-tags">${tagPills}</div>
        <div class="page-hero-actions">
          <a class="btn btn-primary" href="#product-tour">Explore the product</a>
          <a class="btn btn-ghost" href="#download">Download case study</a>
        </div>
      </div>
    </section>

    <section class="section section-muted case-glance-section">
      <div class="container container-case-wide">
        <div class="hero-stats case-glance-stats">
          <div class="stat">
            <span class="stat-num">3</span>
            <span class="stat-label">.NET projects (client, API, shared)</span>
          </div>
          <div class="stat">
            <span class="stat-num">12+</span>
            <span class="stat-label">SSRS operational reports</span>
          </div>
          <div class="stat">
            <span class="stat-num">1</span>
            <span class="stat-label">Ledger—rules stay in SQL Server</span>
          </div>
        </div>
        <div class="case-glance-grid">
          <article class="case-glance-card">
            <span class="case-glance-label">Challenge</span>
            <h2>Legacy rules, modern UI</h2>
            <p>Every deposit must hit the right MRN and institution. The database already held the rules—staff needed a permissioned web workspace.</p>
          </article>
          <article class="case-glance-card">
            <span class="case-glance-label">Solution</span>
            <h2>Blazor on proven SQL</h2>
            <p>Blazor Server, ASP.NET Core API, and Dapper over stored procedures—with Windows sign-in and SSRS for the reports finance trusts.</p>
          </article>
          <article class="case-glance-card">
            <span class="case-glance-label">Outcome</span>
            <h2>Live operations platform</h2>
            <p>Accounts, grouped posting, inquiry, allowances, bulk interest, and audit-ready reports—without rewriting the ledger.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section case-tour-section" id="product-tour">
      <div class="container container-case-wide">
        <header class="case-section-head case-section-head-split">
          <div>
            <p class="eyebrow">Product tour</p>
            <h2>What staff see every day</h2>
            <p class="section-desc">Walk through five core flows from the live PFS application.</p>
          </div>
          <div class="case-tour-toolbar" aria-hidden="true">
            <span class="work-carousel-counter case-tour-counter" data-carousel-counter>01 / 05</span>
          </div>
        </header>
        <div class="case-tour" data-case-carousel tabindex="0" aria-roledescription="carousel" aria-label="PFS product screenshots">
          <button type="button" class="case-tour-arrow carousel-btn" data-carousel-prev aria-label="Previous screenshot">
            <span aria-hidden="true">←</span>
          </button>
          <div class="case-tour-shell">
            <div class="case-tour-viewport">
              ${slideHtml}
            </div>
          </div>
          <button type="button" class="case-tour-arrow carousel-btn" data-carousel-next aria-label="Next screenshot">
            <span aria-hidden="true">→</span>
          </button>
          <div class="case-tour-dots" role="tablist" aria-label="Product tour steps">${dotsHtml}
          </div>
          <p class="case-tour-hint">Use arrows or tabs to browse screenshots</p>
        </div>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container container-case-wide case-arch-layout">
        <header class="case-section-head">
          <p class="eyebrow">Architecture</p>
          <h2>Web UI on top of a proven data layer</h2>
          <p class="section-desc">New work sits in identity, permissions, and UX; posting and balances remain in SQL Server procedures.</p>
        </header>
        <figure class="case-arch-figure case-arch-figure--inline" aria-label="PFS system architecture">
          ${archSvgInline}
        </figure>
        <ul class="check-list case-arch-points">
          <li>Blazor Server + Radzen for responsive ops screens</li>
          <li>API enforces the same permissions as the menu (403 if bypassed)</li>
          <li>SSRS delivers HTML, PDF, and Excel in a tabbed report workspace</li>
        </ul>
      </div>
    </section>

    <section class="section case-download-section" id="download">
      <div class="container case-download-grid">
        <div class="case-download-copy">
          <p class="eyebrow">Full write-up</p>
          <h2>Download the case study</h2>
          <p class="section-desc">Get the PDF with architecture notes, security model, and report catalog. We will also send occasional product and engineering updates—you can unsubscribe anytime.</p>
        </div>
        <form class="contact-form case-download-form" id="case-study-download-form" action="#" method="post"
          data-download-url="${assets}/pfs-case-study.pdf">
          <input type="text" name="_gotcha" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <input type="hidden" name="_subject" value="PFS case study download" />
          <input type="hidden" name="case_study" value="Personal Fund Subsystem" />
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
        <p>Building healthcare operations or legacy modernization?</p>
        <a class="btn btn-primary calendly-cta" href="${pageHref("../..", "contact")}">Discuss a similar project</a>
      </div>
    </section>`;
}