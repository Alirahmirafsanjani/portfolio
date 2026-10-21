# Portfolio — Raka Wijaya

Single-page, scroll-driven portfolio with a dark cyber aesthetic, built with
Next.js (App Router) and Motion. Bilingual (EN / ID) with a live language
toggle, fully static output, and an intentional reduced-motion mode.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, `cacheComponents`) |
| UI | React 19 + TypeScript (strict) |
| Animation | `motion` 14 (`motion/react`) |
| Styling | Tailwind CSS 4 (`@tailwindcss/turbopack`, no PostCSS config) |
| Smooth scroll | `lenis` (root instance, driven by Motion's frame loop) |
| Icons | `lucide-react` |

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to the real origin
npm run dev                  # http://localhost:3000
```

```bash
npm run build                # production build (all routes prerendered)
npm start                    # serve the production build
npm run lint                 # eslint — must stay clean
```

## Project layout

```
src/
  app/            route entry points, metadata, sitemap/robots, OG image
  components/
    Portfolio.tsx  client root: MotionConfig + LanguageProvider
    fx/            animation primitives (Aurora, Grain, Reveal, SplitText,
                   Marquee, Magnetic, SpotlightCard, TiltCard, Counter,
                   ProgressBar, Cursor)
    layout/        Nav, Footer
    providers/     LanguageProvider, SmoothScroll (Lenis)
    sections/      Hero, About, Skills, Projects, Experience, Contact
    ui/            Button, SectionHeading, ProjectModal
  content/         en.ts / id.ts — all copy, typed by content/types.ts
  lib/             motion tokens, class utils, useHydrated
```

## Conventions

- **Design tokens live in `src/app/globals.css`** under `@theme`. Colours are
  named `void`, `surface*`, `line*`, `fg`, `muted`, `faint`, `ink`, `accent*`.
  Never name a colour token after a Tailwind core scale word — `text-base`
  already means `font-size: 1rem`, so a `--color-base` token would be shadowed
  by the built-in utility.
- **Motion tokens live in `src/lib/motion.ts`** (easing, durations, springs).
  Use those instead of hard-coded curves.
- **All copy is bilingual.** Add a key to `content/types.ts`, then fill it in
  both `content/en.ts` and `content/id.ts` — the types enforce parity.
- **Client-only state must be gated with `useHydrated()`.** Anything that reads
  `useReducedMotion()` or `localStorage` changes the markup, so it may only
  take effect after hydration or React will report a mismatch. The helper uses
  `useSyncExternalStore`, so there is no `setState` inside an effect.
- **Reduced motion is respected everywhere.** `MotionConfig reducedMotion="user"`
  sits at the root, Lenis runs with `respectReducedMotion`, and individual
  effects short-circuit when the preference is set.

## Verification

Before shipping, run all three:

```bash
npm run lint     # no errors, no warnings
npm run build    # succeeds, every route prerendered
npm start        # then audit the running site
```

The site should have: zero console/hydration errors, no horizontal overflow at
360/768/1440, WCAG AA contrast in every text/background pair, and no text left
invisible after a full scroll (scroll-linked opacity must always settle at 1).

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it in Vercel (framework preset: Next.js — everything else is default).
3. Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs, the
   sitemap and the OG image resolve to the right host.
