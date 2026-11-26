# Vyrenlo — Marketing Site

Static website for **vyrenlo.com** (AI solutions & software house). Ready for Cloudflare Pages.

**Vyrenlo AI LeadFlow** (lead management demo app) lives in a separate repository: `vyrenlo-leadflow` on this machine at `../vyrenlo-leadflow`.

## Local preview

**Recommended:** run a small web server (folder URLs like `/service/generative-ai/` need this):

```bash
npx serve .
```

On Windows, double-click `preview.bat` and open **http://localhost:3000**.

Opening folders directly in Chrome (`file:///.../service/generative-ai/`) shows a **directory listing**, not the site. Either open the file **`service/generative-ai/index.html`**, or use the server above. Inner links use explicit `index.html` paths so file-based browsing works when you start from the homepage file.

## Deploy on Cloudflare Pages

1. Push this folder to GitHub/GitLab, or use **Direct Upload** in the Cloudflare dashboard.
2. **Pages** → **Create project** → connect repo or upload files.
3. Build settings (static site):
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (project root)
   - **Production branch:** `main` (must match the branch you push)
4. **Custom domain:** Pages → your project → **Custom domains** → add `vyrenlo.com` and `www.vyrenlo.com`.
5. In **DNS** (same Cloudflare account), ensure records point to Pages (usually automatic when you attach the domain).

### If production looks older than localhost

This site is **static**—Cloudflare does not run `build-pages` for you. Before pushing, generate HTML and commit the outputs:

```bash
node scripts/build-pages.mjs
node scripts/generate-sitemap.mjs
git add -A && git commit && git push
```

**Pre-push checklist:** `case-studies/**/index.html`, `assets/case-studies/**`, **`styles.css`** (visual case-study layout), `styles-inner.css`, `main.js`, `index.html`, and `sitemap.xml` should be in the commit (not only files under `scripts/`).

**Live vs GitHub:** Opening files on github.com shows markdown/plain HTML, not the styled site. Preview at **https://vyrenlo.com/** (or `npx serve .` locally).

**Cache:** After a deploy, hard-refresh (**Ctrl+Shift+R** / **Cmd+Shift+R**) or use an incognito window. CSS/JS are cached for several hours—in Cloudflare: **Caching** → **Configuration** → **Purge Everything** (or purge the URLs you changed).

**Confirm deploy:** Cloudflare **Workers & Pages** → your project → **Deployments** → latest build should match your Git commit SHA and show **Success**. Open **https://vyrenlo.com/case-studies/vyrenlo-ai-leadflow/** and **https://vyrenlo.com/case-studies/personal-fund-subsystem/** to verify case-study layouts.

## Contact form (Formspree)

1. Create a free form at [Formspree](https://formspree.io/) — **contact@vyrenlo.com** and **info@vyrenlo.com** are both active; point Formspree at one and CC the other if you want both to receive submissions.
2. Copy the form URL (e.g. `https://formspree.io/f/abcdefgh`).
3. Paste it in **`form-config.js`**:

   ```js
   window.VYRENLO_FORMSPREE_ENDPOINT = "https://formspree.io/f/your-id";
   ```

4. Commit, push, and test the form on the live site.

Submissions go to Formspree, which emails your inbox (same Gmail that receives `contact@` / `info@` if you use that address in Formspree).

## Calendly

Set **`VYRENLO_CALENDLY_URL`** in `form-config.js`. Elements with class **`calendly-cta`** open that link in a new tab (header, hero, service pages, contact page).

## Free website audit

The audit tool lives at **`tools/website-audit/`**. It fetches public HTML through a third-party CORS proxy (`api.allorigins.win`) and scores basic SEO checks. Some sites block automated fetchers—in that case users see a link to [PageSpeed Insights](https://pagespeed.web.dev/).

For a production-grade audit (no third-party proxy), deploy a small serverless function on Cloudflare Workers that fetches the URL server-side and returns the HTML to your audit page.

## Homepage assets

Case study carousel images are SVG previews in **`assets/case-studies/`**. Replace them with real screenshots (PNG or WebP, ~1600×1000) and update the `<img src="...">` paths in **`index.html`** for stronger social proof.

## Contact form fields

The contact form includes **`timeline`** (radio). In Formspree, enable the field or map it in the Formspree dashboard so submissions show the selected timeline.

## SEO (Google Search Console)

After updating pages, regenerate the sitemap:

```bash
node scripts/build-pages.mjs
node scripts/generate-sitemap.mjs
```

Then in [Google Search Console](https://search.google.com/search-console): add property **vyrenlo.com**, verify via DNS or Cloudflare, submit **https://vyrenlo.com/sitemap.xml**, and request indexing for the homepage and key case studies.

## Inner pages

Cyberify-style detail pages live under:

- `service/<slug>/` — 12 services (e.g. `service/quality-assurance/`)
- `agent/<slug>/` — 12 AI agents
- `industry/<slug>/` — 12 industries
- `case-studies/` — hub plus individual case studies (long-form copy in `scripts/case-study-extended.mjs`)
- `contact/` — contact form

Content is defined in `scripts/page-content.mjs`. Regenerate HTML after edits:

```bash
node scripts/build-pages.mjs
```

## Customize

- Replace placeholder client names, testimonials, and case studies with real content.
- Edit legal copy in `scripts/legal-content.mjs`, then run `node scripts/build-pages.mjs`.
- Optional: add real logo assets in an `assets/` folder.
