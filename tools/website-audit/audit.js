(function () {
  const form = document.getElementById("audit-form");
  const results = document.getElementById("audit-results");
  const statusEl = document.getElementById("audit-status");

  if (!form || !results) return;

  function normalizeUrl(raw) {
    let u = raw.trim();
    if (!u) return null;
    if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
    try {
      return new URL(u).href;
    } catch {
      return null;
    }
  }

  function scoreFromChecks(checks) {
    const passed = checks.filter((c) => c.pass).length;
    return Math.round((passed / checks.length) * 100);
  }

  function parseHtml(html, pageUrl) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const base = new URL(pageUrl);
    const checks = [];

    const title = doc.querySelector("title")?.textContent?.trim() || "";
    checks.push({
      id: "title",
      label: "Page title",
      pass: title.length >= 10 && title.length <= 70,
      detail: title ? `"${title.slice(0, 80)}" (${title.length} chars)` : "Missing <title>",
    });

    const desc = doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() || "";
    checks.push({
      id: "description",
      label: "Meta description",
      pass: desc.length >= 50 && desc.length <= 160,
      detail: desc ? `${desc.length} characters` : "Missing meta description",
    });

    const viewport = doc.querySelector('meta[name="viewport"]');
    checks.push({
      id: "viewport",
      label: "Mobile viewport",
      pass: !!viewport,
      detail: viewport ? "Viewport meta tag present" : "Add meta viewport for mobile",
    });

    const h1s = doc.querySelectorAll("h1");
    checks.push({
      id: "h1",
      label: "Single clear H1",
      pass: h1s.length === 1,
      detail: h1s.length === 0 ? "No H1 found" : `${h1s.length} H1 element(s)`,
    });

    const imgs = [...doc.querySelectorAll("img")];
    const missingAlt = imgs.filter((img) => !img.getAttribute("alt")?.trim()).length;
    checks.push({
      id: "alt",
      label: "Image alt text",
      pass: imgs.length === 0 || missingAlt === 0,
      detail: imgs.length ? `${missingAlt} of ${imgs.length} images missing alt` : "No images on page",
    });

    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href");
    checks.push({
      id: "canonical",
      label: "Canonical URL",
      pass: !!canonical,
      detail: canonical ? canonical : "Consider adding link rel=canonical",
    });

    const ogTitle = doc.querySelector('meta[property="og:title"]');
    checks.push({
      id: "og",
      label: "Open Graph tags",
      pass: !!ogTitle,
      detail: ogTitle ? "og:title present" : "Add og:title and og:image for sharing",
    });

    const links = [...doc.querySelectorAll("a[href]")];
    let mixedContent = 0;
    links.forEach((a) => {
      try {
        const href = a.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
        const resolved = new URL(href, base).href;
        if (base.protocol === "https:" && resolved.startsWith("http:")) mixedContent += 1;
      } catch {
        /* ignore */
      }
    });
    checks.push({
      id: "https",
      label: "HTTPS link hygiene",
      pass: mixedContent === 0,
      detail: mixedContent ? `${mixedContent} http link(s) on HTTPS page` : "No obvious mixed-content links",
    });

    return checks;
  }

  function renderResults(url, checks) {
    const score = scoreFromChecks(checks);
    const psi = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}`;
    results.hidden = false;
    results.innerHTML = `
      <div class="audit-score-card">
        <div class="audit-score-ring" style="--score: ${score}">
          <span class="audit-score-num">${score}</span>
          <span class="audit-score-label">Quick score</span>
        </div>
        <div class="audit-score-copy">
          <h2>Results for <a href="${url}" target="_blank" rel="noopener noreferrer">${url.replace(/^https?:\/\//, "")}</a></h2>
          <p>This is a fast HTML check from your homepage HTML. For Core Web Vitals and performance, run Google PageSpeed (link below).</p>
          <a class="btn btn-ghost" href="${psi}" target="_blank" rel="noopener noreferrer">Open PageSpeed report</a>
        </div>
      </div>
      <ul class="audit-checklist">
        ${checks
          .map(
            (c) => `
          <li class="audit-check ${c.pass ? "pass" : "fail"}">
            <span class="audit-check-icon" aria-hidden="true">${c.pass ? "✓" : "!"}</span>
            <div>
              <strong>${c.label}</strong>
              <p>${c.detail}</p>
            </div>
          </li>`
          )
          .join("")}
      </ul>
      <div class="audit-cta-band">
        <p>Want a human review of UX, conversion, and AI opportunities?</p>
        <a class="btn btn-primary calendly-cta" href="../../contact/index.html">Book a free consultation</a>
      </div>`;

    if (window.VYRENLO_CALENDLY_URL) {
      results.querySelectorAll(".calendly-cta").forEach((el) => {
        el.href = window.VYRENLO_CALENDLY_URL;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      });
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = normalizeUrl(form.url.value);
    if (!url) {
      statusEl.hidden = false;
      statusEl.textContent = "Enter a valid website URL (e.g. vyrenlo.com).";
      statusEl.classList.add("form-status-error");
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const prev = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Analyzing…";
    statusEl.hidden = true;
    results.hidden = true;

    try {
      const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxy);
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const html = data.contents;
      if (!html || typeof html !== "string") throw new Error("empty");
      const checks = parseHtml(html, url);
      renderResults(url, checks);
    } catch {
      statusEl.hidden = false;
      statusEl.classList.add("form-status-error");
      statusEl.textContent =
        "We could not fetch that URL (blocked or offline). Try PageSpeed instead, or email contact@vyrenlo.com for a manual audit.";
      const psi = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}`;
      results.hidden = false;
      results.innerHTML = `<p class="audit-fallback"><a class="btn btn-primary" href="${psi}" target="_blank" rel="noopener noreferrer">Run PageSpeed for this site</a></p>`;
    } finally {
      btn.textContent = prev;
      btn.disabled = false;
    }
  });
})();
