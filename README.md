# Vyrenlo — Marketing Site

Static website for **vyrenlo.com** (AI solutions & software house). Ready for Cloudflare Pages.

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
4. **Custom domain:** Pages → your project → **Custom domains** → add `vyrenlo.com` and `www.vyrenlo.com`.
5. In **DNS** (same Cloudflare account), ensure records point to Pages (usually automatic when you attach the domain).

## Contact form (Formspree)

1. Create a free form at [Formspree](https://formspree.io/) and set notifications to **contact@vyrenlo.com** (confirm that address).
2. Copy the form URL (e.g. `https://formspree.io/f/abcdefgh`).
3. Paste it in **`form-config.js`**:

   ```js
   window.VYRENLO_FORMSPREE_ENDPOINT = "https://formspree.io/f/your-id";
   ```

4. Commit, push, and test the form on the live site.

Submissions go to Formspree, which emails your inbox (same Gmail that receives `contact@` / `info@` if you use that address in Formspree).

## Calendly

Set **`VYRENLO_CALENDLY_URL`** in `form-config.js`. Elements with class **`calendly-cta`** open that link in a new tab (header, hero, service pages, contact page).

## Inner pages

Cyberify-style detail pages live under:

- `service/<slug>/` — 12 services (e.g. `service/quality-assurance/`)
- `agent/<slug>/` — 12 AI agents
- `industry/<slug>/` — 12 industries
- `case-studies/` — hub plus individual case studies
- `contact/` — contact form

Content is defined in `scripts/page-content.mjs`. Regenerate HTML after edits:

```bash
node scripts/build-pages.mjs
```

## Customize

- Replace placeholder client names, testimonials, and case studies with real content.
- Edit legal copy in `scripts/legal-content.mjs`, then run `node scripts/build-pages.mjs`.
- Optional: add real logo assets in an `assets/` folder.
