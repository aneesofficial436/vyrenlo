/** Visual case study: Enterprise Playwright-BDD regression (concept diagrams, no tenant data). */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const archSvgPath = path.join(
  __dirname,
  "../assets/case-studies/enterprise-playwright-bdd/architecture.svg"
);
const archSvgInline = fs.readFileSync(archSvgPath, "utf8").trim();

export function playwrightBddVisualMain(c, ext, { esc, pageHref }) {
  const assets = "../../assets/case-studies/enterprise-playwright-bdd";
  const tagPills = (ext.tags || [])
    .map((t) => `<span class="tag-pill">${esc(t)}</span>`)
    .join("\n          ");

  const shots = [
    {
      src: "01-traceability.svg",
      title: "Traceability by design",
      desc: "Each Gherkin file maps to a managed test case—folders follow the test plan so coverage and reporting stay honest.",
      step: "Traceability",
    },
    {
      src: "02-two-repos.svg",
      title: "Split what from how",
      desc: "Scenarios and data in the parent repo; steps, page objects, and configs in a versioned framework submodule.",
      step: "Architecture",
    },
    {
      src: "03-bdd-pipeline.svg",
      title: "Generate, then run",
      desc: "Shared-scenario expansion and bddgen produce Playwright specs—never hand-edit generated output.",
      step: "Pipeline",
    },
    {
      src: "04-ci-gates.svg",
      title: "Gates that respect merge reality",
      desc: "PR pipelines separate new failures from baseline noise, with a clear four-step triage SOP.",
      step: "CI / CD",
    },
    {
      src: "05-agent-ops.svg",
      title: "Built for humans and agents",
      desc: "Skills, indexes, and AI-README navigation so debug and review use one playbook across the team.",
      step: "Agent-ready",
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
        <h1>Enterprise Playwright-BDD Regression</h1>
        <p class="page-lead">Hundreds of Gherkin scenarios wired to test plans, executed with Playwright—two-repo architecture, merge-smart CI, and agent-ready ops for enterprise web apps.</p>
        <div class="tag-grid case-tags">${tagPills}</div>
        <div class="page-hero-actions">
          <a class="btn btn-primary" href="#program-tour">How the program works</a>
          <a class="btn btn-ghost" href="#download">Download case study</a>
        </div>
      </div>
    </section>

    <section class="section section-muted case-glance-section">
      <div class="container container-case-wide">
        <div class="hero-stats case-glance-stats">
          <div class="stat">
            <span class="stat-num">100s+</span>
            <span class="stat-label">Gherkin scenarios tied to work items</span>
          </div>
          <div class="stat">
            <span class="stat-num">2</span>
            <span class="stat-label">Repositories — scenarios vs framework</span>
          </div>
          <div class="stat">
            <span class="stat-num">4</span>
            <span class="stat-label">Failure classes in the triage SOP</span>
          </div>
        </div>
        <div class="case-glance-grid">
          <article class="case-glance-card">
            <span class="case-glance-label">Challenge</span>
            <h2>Regression that cannot keep up</h2>
            <p>A sprawling enterprise web app outgrew manual regression. Teams needed traceability, reuse, and parallel runs without constant locator thrash.</p>
          </article>
          <article class="case-glance-card">
            <span class="case-glance-label">Solution</span>
            <h2>Playwright-BDD at scale</h2>
            <p>playwright-bdd, a pinned framework submodule, ElementResolver vocabulary, and Azure DevOps publishing—owned by QA, automation, and platform together.</p>
          </article>
          <article class="case-glance-card">
            <span class="case-glance-label">Outcome</span>
            <h2>Confidence to merge</h2>
            <p>PR validation that highlights new failures, rich traces for triage, and a repo-shaped runbook for humans and coding agents.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section case-tour-section" id="program-tour">
      <div class="container container-case-wide">
        <header class="case-section-head case-section-head-split">
          <div>
            <p class="eyebrow">Program tour</p>
            <h2>From scenario to signal</h2>
            <p class="section-desc">Five design pillars of a large-scale BDD program—patterns only, no customer or tenant identifiers.</p>
          </div>
          <div class="case-tour-toolbar" aria-hidden="true">
            <span class="work-carousel-counter case-tour-counter" data-carousel-counter>01 / 05</span>
          </div>
        </header>
        <div class="case-tour" data-case-carousel tabindex="0" aria-roledescription="carousel" aria-label="Playwright BDD program diagrams">
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
          <div class="case-tour-dots" role="tablist" aria-label="Program tour steps">${dotsHtml}
          </div>
          <p class="case-tour-hint">Use arrows or tabs to browse the flow</p>
        </div>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container container-case-wide case-arch-layout">
        <header class="case-section-head">
          <p class="eyebrow">Architecture</p>
          <h2>Separate “what to test” from “how to drive the UI”</h2>
          <p class="section-desc">QA ships scenarios; test automation ships vocabulary. CI checks out the framework branch that matches the application release line.</p>
        </header>
        <figure class="case-arch-figure case-arch-figure--inline" aria-label="Two-repository Playwright BDD architecture">
          ${archSvgInline}
        </figure>
        <ul class="check-list case-arch-points">
          <li>Generated <code>.features-gen/</code> specs treated as build output—never edited by hand</li>
          <li>Logical element names via ElementResolver—not scattered selectors in features</li>
          <li>Allure, JUnit XML, traces, and step-timing reports for fast triage</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container container-case-wide">
        <header class="case-section-head">
          <p class="eyebrow">Design lessons</p>
          <h2>What we would repeat on the next program</h2>
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
          <p class="section-desc">PDF with architecture, governance, stack, and shareable design lessons. We will also send occasional product and engineering updates—you can unsubscribe anytime.</p>
        </div>
        <form class="contact-form case-download-form" id="case-study-download-form" action="#" method="post"
          data-download-url="${assets}/enterprise-playwright-bdd-case-study.pdf">
          <input type="text" name="_gotcha" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <input type="hidden" name="_subject" value="Playwright BDD case study download" />
          <input type="hidden" name="case_study" value="Enterprise Playwright-BDD Regression" />
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
        <p>Scaling test automation or standing up agent-assisted QA?</p>
        <a class="btn btn-primary calendly-cta" href="${pageHref("../..", "contact")}">Discuss a similar program</a>
      </div>
    </section>`;
}