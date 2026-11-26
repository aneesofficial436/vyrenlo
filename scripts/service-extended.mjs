/** Rich service page layouts (beyond the default service template). */

export const extendedServices = {
  "web-applications": {
    metaDescription:
      "Custom web app development: premium UI, fast architecture, SEO and Core Web Vitals, secure APIs, and cloud deploy. Weekly previews, code in your repo.",
    heroTitle: "Web apps that look premium, load fast, and rank",
    heroLead:
      "Your product in the browser—beautiful UI, SEO-ready pages, and architecture that scales when traffic spikes. No app-store gatekeepers.",
    heroDefinition:
      "We build customer portals, internal tools, and SaaS-style products end to end: UX you are proud to demo, APIs your team can extend, and deploys you control. You get weekly preview links and code in your repo—not slide decks.",
    heroImage: "assets/services/web-applications-hero.svg",
    heroImageAlt: "Illustration of a web app with navigation, main workspace, API layer, and data store",
    buildsTitle: "What we build",
    buildsLead: "Engagements range from greenfield products to modernizing legacy web UIs—always with clear acceptance criteria.",
    builds: [
      {
        title: "Customer & partner portals",
        body: "Self-service signup, billing visibility, document upload, and status tracking tied to your CRM or ERP.",
      },
      {
        title: "Internal operations tools",
        body: "Role-based workflows for finance, support, logistics, and compliance—replacing spreadsheets and manual handoffs.",
      },
      {
        title: "B2B SaaS & admin consoles",
        body: "Multi-tenant patterns, usage dashboards, and configuration UIs your CS and implementation teams rely on.",
      },
      {
        title: "AI-augmented web experiences",
        body: "Copilots, smart search, and agent-assisted flows embedded in the product—not bolted on as a separate chat widget.",
      },
    ],
    benefitsTitle: "What you get when the build is done right",
    benefitsLead:
      "Buyers judge you in seconds. We design for trust, engineer for speed, and ship with SEO and security baked in—not bolted on at the end.",
    benefits: [
      {
        title: "Design that converts",
        body: "Clear hierarchy, mobile-first layouts, and flows that guide users to signup, checkout, or “done”—without confusion.",
      },
      {
        title: "Architecture that stays fast",
        body: "Caching, lean APIs, and smart data loading so pages stay snappy as users and features grow.",
      },
      {
        title: "SEO built in",
        body: "Semantic HTML, meta and Open Graph, sitemaps, Core Web Vitals targets, and SSR where Google needs to see content.",
      },
      {
        title: "Ship on your schedule",
        body: "CI/CD, staging links, and releases you approve—push improvements weekly, not once a quarter.",
      },
      {
        title: "Integrations that just work",
        body: "Payments, CRM, auth, email, and webhooks wired cleanly so ops is not copying data by hand.",
      },
      {
        title: "Own it outright",
        body: "Your repo, your cloud accounts, your IP—no lock-in, full handover when you are ready to run solo.",
      },
    ],
    deliveryTitle: "How Vyrenlo delivers web projects",
    deliveryLead:
      "We use the same rhythm as our homepage: short intro call, one-page written scope, then build in weekly cycles with working preview links.",
    deliveryPoints: [
      "Acceptance criteria and integrations listed before development starts",
      "Staging environment you can share with stakeholders early",
      "Security review for auth, secrets, and PII handling",
      "Handover note plus optional retainer for monitoring and improvements",
    ],
    lifecycleImage: "assets/services/web-applications-lifecycle.svg",
    lifecycleImageAlt: "Five-step lifecycle: discover, design, build, ship, improve",
    lifecycleTitle: "From idea to production",
    lifecyclePitchLead:
      "Five phases. Real tools. Outcomes your stakeholders care about—design quality, speed, SEO, and reliable launches.",
    lifecycleOutcomes: [
      "Premium UI",
      "Fast architecture",
      "SEO & Core Web Vitals",
      "Secure by default",
      "Weekly previews",
    ],
    lifecycle: [
      {
        step: "Discover",
        hook: "Win the brief before the first pixel",
        body: "We map users, competitors, and revenue paths—plus performance and SEO baselines so nothing important is an afterthought.",
        tools: [
          { slug: "figma", label: "Figma" },
          { slug: "lighthouse", label: "Lighthouse" },
          { slug: "typescript", label: "TypeScript" },
        ],
      },
      {
        step: "Design",
        hook: "Interfaces people actually finish",
        body: "Design systems, responsive breakpoints, and conversion-focused screens—accessible, on-brand, and ready for dev handoff.",
        tools: [
          { slug: "figma", label: "Figma" },
          { slug: "tailwind", label: "Tailwind CSS" },
          { slug: "react", label: "React" },
        ],
      },
      {
        step: "Build",
        hook: "Fast stack. Real data every week",
        body: "Modern frontend + APIs in vertical slices—working preview links with auth, integrations, and production-grade patterns.",
        tools: [
          { slug: "nextjs", label: "Next.js" },
          { slug: "react", label: "React" },
          { slug: "node", label: "Node.js" },
          { slug: "postgresql", label: "PostgreSQL" },
        ],
      },
      {
        step: "Ship",
        hook: "Launch without the 3 a.m. panic",
        body: "Automated tests, containers, and pipelines to your cloud—monitoring on so you know issues before customers do.",
        tools: [
          { slug: "docker", label: "Docker" },
          { slug: "github", label: "GitHub Actions" },
          { slug: "aws", label: "AWS" },
          { slug: "playwright", label: "Playwright" },
        ],
      },
      {
        step: "Improve",
        hook: "Rank higher. Convert more.",
        body: "Search tuning, speed wins, and analytics loops—iterate on what moves signups, retention, and support volume.",
        tools: [
          { slug: "lighthouse", label: "Lighthouse" },
          { slug: "vercel", label: "Edge / Vercel" },
          { slug: "nextjs", label: "Next.js SSR" },
        ],
      },
    ],
    activitiesTitle: "What our web application service includes",
    activities: [
      {
        title: "Planning & product definition",
        body: "User stories, wireframes, and technical spikes. We align scope with budget and timeline before code lands in your repo.",
      },
      {
        title: "Frontend engineering",
        body: "React or Next.js SPAs and SSR where SEO and time-to-first-byte matter. Component libraries, forms, and accessible patterns (WCAG-aware).",
      },
      {
        title: "Backend & APIs",
        body: "REST or GraphQL services in Node/NestJS, Python/FastAPI, or .NET when your stack requires it. Migrations, background jobs, and webhooks.",
      },
      {
        title: "Integrations",
        body: "Stripe, Auth0/OIDC, Salesforce, HubSpot, Twilio, and custom ERP connectors—with idempotency and retry policies.",
      },
      {
        title: "Quality & deployment",
        body: "Automated tests, staging parity, load checks on critical paths, and zero-downtime deploy patterns where the platform allows.",
      },
      {
        title: "Support & evolution",
        body: "Dependency updates, incident response playbooks, and feature work on retainer or milestone basis—you own the code either way.",
      },
    ],
    techTitle: "Typical technology choices",
    techLead: "We match the stack to your team and constraints—not the other way around.",
    techTable: [
      ["Frontend", "React, Next.js, TypeScript, Tailwind or your design system"],
      ["Backend", "Node.js, NestJS, Python, FastAPI, ASP.NET Core"],
      ["Data", "PostgreSQL, Redis, object storage, event queues"],
      ["Auth", "OIDC / SAML SSO, RBAC, row-level rules where required"],
      ["Hosting", "AWS, Azure, GCP, or Vercel for edge-friendly frontends"],
      ["Delivery", "GitHub Actions, Terraform or Pulumi, structured logging and metrics"],
    ],
    qualityTitle: "Built-in quality bar",
    qualityItems: [
      "Performance budgets on key routes (LCP, interaction latency)",
      "Secrets in vaults or env managers—never committed to git",
      "Role checks on UI and API for every sensitive action",
      "Documentation for setup, env vars, and on-call basics",
    ],
    relatedTitle: "Recent web & platform work",
    relatedCaseSlugs: ["personal-fund-subsystem", "support-knowledge-copilot"],
    ctaTitle: "Planning a web application?",
    ctaLead: "Share your timeline and constraints—we will reply within one business day with an honest view on scope and next steps.",
    pilotLink: true,
  },
};
