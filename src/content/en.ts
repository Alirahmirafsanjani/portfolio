import type { PortfolioContent } from "./types";

export const en: PortfolioContent = {
  meta: {
    title: "Raka Wijaya — Full-stack Developer & Motion Engineer",
    description:
      "Full-stack developer and motion engineer building fast, accessible interfaces where engineering rigor meets visual delight.",
    ogTitle: "Raka Wijaya — Portfolio",
  },

  nav: {
    links: [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "work", label: "Work" },
      { id: "experience", label: "Experience" },
      { id: "contact", label: "Contact" },
    ],
    langAriaLabel: "Switch language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
  },

  hero: {
    eyebrow: "Portfolio / 2026",
    status: "Available for freelance & full-time",
    titleLines: ["I design & build", "digital experiences", "that feel alive."],
    highlightIndex: 2,
    tagline:
      "Full-stack developer and motion engineer. I turn ambitious ideas into fast, accessible interfaces — with obsession for detail in every layer.",
    primaryCta: "View my work",
    secondaryCta: "Get in touch",
    scrollHint: "Scroll to explore",
  },

  about: {
    label: "About",
    title: "Craft in every layer — from database to pixel.",
    paragraphs: [
      "I'm a full-stack developer with six years of experience building products for startups and scale-ups across Southeast Asia and Europe. My work sits where engineering rigor meets visual delight: type-safe APIs, resilient data models, and interfaces that respond with intent.",
      "Most of my time goes into the invisible parts — query tuning, state machines, accessibility semantics, animation choreography that never fights the user. The result is software that feels fast because it is, and looks alive because every transition had a reason.",
      "Away from the editor I write about rendering performance, contribute to a handful of open-source libraries, and spend an unreasonable amount of time tuning easing curves until they feel right.",
    ],
    stats: [
      { value: 6, suffix: "+", label: "Years shipping" },
      { value: 40, suffix: "+", label: "Projects delivered" },
      { value: 12, suffix: "", label: "Open-source libs" },
    ],
    badges: ["Available for work", "Based in Jakarta", "Remote friendly"],
    portraitCaption: "Currently in Jakarta — open to remote work worldwide.",
  },

  skills: {
    label: "Skills",
    title: "The toolkit",
    subtitle:
      "A pragmatic stack I reach for daily, chosen for longevity over novelty.",
    groups: [
      {
        name: "Frontend",
        items: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Accessibility",
          "Design systems",
        ],
      },
      {
        name: "Backend",
        items: [
          "Node.js",
          "PostgreSQL",
          "Prisma",
          "Redis",
          "tRPC",
          "REST & GraphQL",
        ],
      },
      {
        name: "Motion & 3D",
        items: [
          "Motion",
          "GSAP",
          "Three.js",
          "GLSL shaders",
          "Lenis",
          "WebGL",
        ],
      },
      {
        name: "Tooling",
        items: [
          "Vite",
          "Turbopack",
          "Vitest",
          "Playwright",
          "Docker",
          "GitHub Actions",
        ],
      },
    ],
    marquee: [
      "TypeScript",
      "React",
      "Next.js",
      "Motion",
      "Three.js",
      "PostgreSQL",
      "Node.js",
      "Tailwind CSS",
      "GraphQL",
      "WebGL",
      "Docker",
      "Figma",
    ],
  },

  projects: {
    label: "Selected work",
    title: "Things I've built",
    subtitle:
      "A cross-section of products, experiments and open-source tools from the last few years.",
    items: [
      {
        slug: "aurora-analytics",
        title: "Aurora Analytics",
        category: "SaaS Platform",
        year: "2025",
        summary:
          "Real-time product analytics dashboard handling millions of events per minute.",
        description: [
          "Aurora is a product analytics platform built for teams that need answers in seconds, not hours. It ingests clickstream data, resolves it through a streaming pipeline, and surfaces it in dashboards that stay interactive under load.",
          "The hard part was making a live dashboard feel instant while the numbers behind it were still settling. We solved it with incremental aggregation, optimistic rendering, and a virtualised chart layer that only paints what is on screen.",
        ],
        highlights: [
          "Streaming ingestion pipeline handling 2M+ events/minute",
          "Virtualised chart layer with sub-16ms interaction budget",
          "Query builder shared across 4 internal teams",
          "SOC 2 Type II aligned infrastructure",
        ],
        tags: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "D3"],
        accent: "#22d3ee",
        metric: { value: "2M+", label: "events / minute" },
        links: [
          { label: "Live site", href: "#" },
          { label: "Source code", href: "#" },
        ],
      },
      {
        slug: "lumen-commerce",
        title: "Lumen Commerce",
        category: "Headless Storefront",
        year: "2024",
        summary:
          "Headless storefront for a fashion label, from design system to checkout.",
        description: [
          "Lumen replaced a slow theme-based store with a fully headless storefront. The brief was simple: make browsing feel editorial and make checkout feel instant.",
          "We built a composable design system that marketing could extend without a developer, paired with a checkout that renders from cache and validates progressively — so the customer never waits on the network to move forward.",
        ],
        highlights: [
          "Composable design system with 60+ commerce primitives",
          "Progressive checkout validation, 41% fewer abandoned carts",
          "Edge-rendered catalog pages, 380ms median TTFB",
          "Editorial storytelling modules built on scroll choreography",
        ],
        tags: ["React", "Stripe", "Sanity", "Vercel", "Tailwind"],
        accent: "#8b5cf6",
        metric: { value: "+41%", label: "conversion uplift" },
        links: [
          { label: "Live site", href: "#" },
          { label: "Source code", href: "#" },
        ],
      },
      {
        slug: "orbit-motion",
        title: "Orbit",
        category: "Open-source",
        year: "2024",
        summary:
          "Tiny scroll-choreography engine — 3.4kB, zero dependencies, full a11y.",
        description: [
          "Orbit is a scroll-animation library I built because every project was installing a different, heavier one. It exposes a small declarative API for pinning, scrubbing and staggering while keeping the accessibility contract intact.",
          "It respects reduced-motion preferences out of the box, ships a 3.4kB minified build, and has been used in production by a handful of teams I know.",
        ],
        highlights: [
          "3.4kB minified, zero runtime dependencies",
          "First-class prefers-reduced-motion support",
          "Deterministic timeline scrubbing with no layout thrash",
          "MIT licensed, 3.4k GitHub stars",
        ],
        tags: ["TypeScript", "Web API", "Vite"],
        accent: "#f472b6",
        metric: { value: "3.4kB", label: "minified size" },
        links: [
          { label: "Live site", href: "#" },
          { label: "Source code", href: "#" },
        ],
      },
      {
        slug: "nordic-fitness",
        title: "Nordic Fitness",
        category: "Mobile-first App",
        year: "2023",
        summary:
          "Training planner with offline-first sync and a motion language of its own.",
        description: [
          "Nordic is a workout planner for people who train without signal. Every set, every note and every plan change syncs when connectivity returns, with conflict resolution that favours the user rather than the server.",
          "The interface leans on motion as wayfinding: shared-element transitions carry you from plan to session, and haptic-timed counters make the app usable mid-workout without looking at it.",
        ],
        highlights: [
          "Offline-first local database with deterministic conflict resolution",
          "Shared-element transitions from plan builder to active session",
          "Haptic-timed rest counters for eyes-free use",
          "WCAG 2.2 AA audited across the core flows",
        ],
        tags: ["React Native", "Expo", "SQLite", "Reanimated"],
        accent: "#a3e635",
        metric: { value: "AA", label: "WCAG 2.2" },
        links: [{ label: "Live site", href: "#" }],
      },
      {
        slug: "halo-brand",
        title: "Halo",
        category: "Brand & Web",
        year: "2023",
        summary:
          "Identity system and animated launch site for a climate-tech startup.",
        description: [
          "Halo needed a launch that could carry a serious technical story without losing energy. We built an identity around a single continuous gradient — a motif that appears in the logo, the site and the product itself.",
          "The site is a single scroll narrative where the gradient migrates between sections, tying the brand together with a single continuous motion idea.",
        ],
        highlights: [
          "Identity, art direction and motion language in one system",
          "Single-scroll narrative with a migrating gradient motif",
          "Reduced-motion fallback preserves every message",
          "Launch drove 12k sign-ups in the first week",
        ],
        tags: ["Motion", "GSAP", "Three.js", "Brand"],
        accent: "#fb923c",
        metric: { value: "12k", label: "sign-ups in week one" },
        links: [{ label: "Live site", href: "#" }],
      },
      {
        slug: "signal-cli",
        title: "Signal CLI",
        category: "Developer Tool",
        year: "2022",
        summary:
          "A terminal toolkit for shipping design tokens from Figma to code.",
        description: [
          "Signal reads a Figma library, resolves tokens into a single source of truth and emits typed output for web, iOS and Android — with a diff mode that shows exactly what changed before you commit.",
          "It exists because token drift is invisible until it isn't. Making the drift loud and reviewable changed how the teams I worked with shipped UI.",
        ],
        highlights: [
          "Typed token output for web, iOS and Android",
          "Diff mode reviews token changes before commit",
          "Figma REST API sync with conflict-safe caching",
          "Adopted by 5 product teams internally",
        ],
        tags: ["Node.js", "TypeScript", "CLI", "Figma API"],
        accent: "#38bdf8",
        metric: { value: "5", label: "teams adopted" },
        links: [
          { label: "Live site", href: "#" },
          { label: "Source code", href: "#" },
        ],
      },
    ],
    openProject: "Open case study",
    closeProject: "Close",
    liveSite: "Live site",
    sourceCode: "Source code",
  },

  experience: {
    label: "Experience",
    title: "The path so far",
    subtitle:
      "Where I've worked, what I owned, and what I learned along the way.",
    items: [
      {
        period: "2024 — Present",
        role: "Lead Frontend Engineer",
        company: "Aurora Labs",
        location: "Jakarta · Remote",
        points: [
          "Own the frontend architecture for a real-time analytics platform used by 30k+ daily active users.",
          "Introduced a motion design system that cut bespoke animation work across three squads by roughly 70%.",
          "Mentor four engineers; run the internal guild on rendering performance.",
        ],
        current: true,
      },
      {
        period: "2022 — 2024",
        role: "Senior Full-stack Engineer",
        company: "Lumen Commerce",
        location: "Singapore · Remote",
        points: [
          "Rebuilt a headless storefront from the ground up, lifting conversion 41% in the first quarter.",
          "Designed the offline-first sync layer still used by the mobile team today.",
          "Set up the performance budget that every release is now measured against.",
        ],
      },
      {
        period: "2020 — 2022",
        role: "Frontend Engineer",
        company: "Nordic Digital",
        location: "Jakarta",
        points: [
          "Shipped 20+ client projects spanning fintech, health and mobility.",
          "Built the studio's shared component library and accessibility checklist.",
          "Led the migration from CRA to a Vite-based monorepo.",
        ],
      },
      {
        period: "2019 — 2020",
        role: "Web Developer",
        company: "Studio Kembar",
        location: "Bandung",
        points: [
          "Built marketing sites and campaign microsites for national brands.",
          "Wrote the studio's first internal animation playbook.",
        ],
      },
    ],
    current: "Now",
  },

  contact: {
    label: "Contact",
    title: "Let's build something worth shipping.",
    subtitle:
      "Have a product idea that needs real craft, or a team that needs a senior frontend pair of hands? My inbox is open.",
    cta: "hello@raka.dev",
    ctaHint: "Usually reply within 24 hours",
    socials: [
      { label: "GitHub", handle: "@rakawijaya", href: "https://github.com" },
      { label: "LinkedIn", handle: "in/rakawijaya", href: "https://linkedin.com" },
      { label: "X", handle: "@rakawijaya", href: "https://x.com" },
      { label: "Instagram", handle: "@raka.codes", href: "https://instagram.com" },
    ],
  },

  footer: {
    marquee: "LET'S WORK TOGETHER — ",
    tagline: "Designed & built with intent.",
    backToTop: "Back to top",
    copyright: "Raka Wijaya. All rights reserved.",
    builtWith: "Built with Next.js, Motion and a lot of easing curves.",
  },
};
