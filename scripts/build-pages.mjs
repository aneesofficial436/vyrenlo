import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { services, agents, industries, caseStudies, hubPages } from "./page-content.mjs";

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
  return `
      <ul class="nav-links">
        <li class="nav-item-has-menu">
          <button type="button" class="nav-parent" aria-expanded="false" aria-haspopup="true">Services</button>
          <ul class="nav-dropdown nav-dropdown-wide">
          ${serviceItems}
          </ul>
        </li>
        <li class="nav-item-has-menu">
          <button type="button" class="nav-parent" aria-expanded="false" aria-haspopup="true">Agents</button>
          <ul class="nav-dropdown">
            ${agents.map((a) => `<li><a href="${pageHref(prefix, "agent", a.slug)}"${active === `agent-${a.slug}` ? ' aria-current="page"' : ""}>${esc(a.title)}</a></li>`).join("\n            ")}
          </ul>
        </li>
        <li class="nav-item-has-menu">
          <button type="button" class="nav-parent" aria-expanded="false" aria-haspopup="true">Industries</button>
          <ul class="nav-dropdown nav-dropdown-wide">
            ${industries.map((i) => `<li><a href="${pageHref(prefix, "industry", i.slug)}"${active === `industry-${i.slug}` ? ' aria-current="page"' : ""}>${esc(i.title)}</a></li>`).join("\n            ")}
          </ul>
        </li>
        <li><a href="${pageHref(prefix, "case-studies")}"${active === "case-studies" ? ' aria-current="page"' : ""}>Case Studies</a></li>
        <li><a href="${pageHref(prefix, "contact")}"${active === "contact" ? ' aria-current="page"' : ""}>Contact</a></li>
        <li><a href="${pageHref(prefix)}#insights">Insights</a></li>
      </ul>`;
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
          <span class="logo-mark">V</span>
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
  <header class="site-header" id="top">
    <nav class="nav container">
      <a class="logo" href="${pageHref(prefix)}" aria-label="Vyrenlo home">
        <span class="logo-mark">V</span>
        <span class="logo-text">Vyrenlo</span>
      </a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      ${navLinks(prefix, active)}
      <a class="btn btn-primary nav-cta" href="${pageHref(prefix, "contact")}">Schedule a Consultation</a>
    </nav>
  </header>
  <main>
    ${main}
  </main>
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
          <a class="btn btn-primary btn-lg" href="${pageHref("../..", "contact")}">Book a Call</a>
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
        <a class="btn btn-primary" href="${pageHref("../..", "contact")}">Book a Call</a>
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
          <p class="section-desc"><a href="mailto:contact@vyrenlo.com">contact@vyrenlo.com</a> · <a href="mailto:info@vyrenlo.com">info@vyrenlo.com</a></p>
        </div>
        <a class="btn btn-primary btn-lg" href="${pageHref("../..", "contact")}">Connect now</a>
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
        <a class="btn btn-primary btn-lg" href="${pageHref("../..", "contact")}">Book a Call</a>
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
        <a class="btn btn-primary" href="${pageHref("../..", "contact")}">Schedule a Consultation</a>
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
        <a class="btn btn-primary btn-lg" href="${pageHref("../..", "contact")}">Book a Call</a>
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
        <a class="btn btn-primary" href="${pageHref("../..", "contact")}">Start a similar project</a>
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
            <li><a href="mailto:contact@vyrenlo.com">contact@vyrenlo.com</a></li>
            <li><a href="mailto:info@vyrenlo.com">info@vyrenlo.com</a></li>
            <li>vyrenlo.com</li>
          </ul>
        </div>
        <form class="contact-form" action="#" method="post" id="contact-form">
          <input type="text" name="_gotcha" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <label>Full name<input type="text" name="name" required autocomplete="name" /></label>
          <label>Work email<input type="email" name="email" required autocomplete="email" /></label>
          <label>Company<input type="text" name="company" autocomplete="organization" /></label>
          <label>How can we help?<textarea name="message" rows="4" required></textarea></label>
          <button type="submit" class="btn btn-primary btn-lg">Send message</button>
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
  const html = shell({
    depth: 2,
    title: s.metaTitle,
    description: s.heroLead,
    active: `service-${s.slug}`,
    main: serviceMain(s),
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
  const html = shell({
    depth: 2,
    title: `${c.title} | Vyrenlo Case Study`,
    description: c.summary,
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

console.log(
  `Generated ${services.length} services, ${agents.length} agents, ${industries.length} industries, ${caseStudies.length} case studies, plus hub pages.`
);
