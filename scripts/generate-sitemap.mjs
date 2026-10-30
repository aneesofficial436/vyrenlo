import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { services, agents, industries, caseStudies } from "./page-content.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const SITE = "https://vyrenlo.com";

const paths = [
  "/",
  "/contact/",
  "/case-studies/",
  "/privacy/",
  "/terms/",
  ...services.map((s) => `/service/${s.slug}/`),
  ...agents.map((a) => `/agent/${a.slug}/`),
  ...industries.map((i) => `/industry/${i.slug}/`),
  ...caseStudies.map((c) => `/case-studies/${c.slug}/`),
];

const today = new Date().toISOString().slice(0, 10);

const urls = paths
  .map(
    (p) => `  <url>
    <loc>${SITE}${p === "/" ? "/" : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p === "/" ? "1.0" : p.startsWith("/case-studies/") && p !== "/case-studies/" ? "0.8" : "0.7"}</priority>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(root, "robots.txt"), robots, "utf8");
console.log(`Wrote sitemap.xml and robots.txt (${paths.length} URLs).`);
