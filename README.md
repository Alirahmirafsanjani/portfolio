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

### Measured results

Lighthouse, mobile preset, Chrome, median of three runs against the
production build:

| Category | Score |
| --- | --- |
| Performance | **91** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |
| Cumulative Layout Shift | **0** |

Supporting metrics: FCP 913 ms, LCP 3.35 s, Speed Index 1.55 s, TBT 147 ms,
TTFB 457 ms.

## Performance notes

The largest contentful element is the hero headline, and it is painted with the
display face — so the font swap is what timestamps the LCP. Two rules keep
that swap early:

- **The hero entrance runs on CSS, not Motion.** A Motion `initial` state stays
  invisible until the bundle has downloaded and hydrated, which delays the
  paint. `SplitText` takes a `strategy` prop: `css` for anything in the first
  viewport, `motion` for content that appears on scroll.
- **The font budget is small.** All three faces are preloaded and the preloaded
  set is ~89 kB. The mono face is pinned to a single static weight because the
  variable file that also carried 500 was 47 kB of a ~100 kB budget.

Everything below the fold is code-split with `next/dynamic` (`ssr` stays on,
so the markup is still complete and nothing shifts), which keeps the hero's
dependencies small.

The ambient background uses soft radial gradients instead of blurred circles:
a `filter: blur(130px)` over a 46rem circle has to rasterise and blur a
viewport-sized layer on every paint.

## Deploying to Vercel

Repository: <https://github.com/Alirahmirafsanjani/portfolio>

1. Import the repository in Vercel (framework preset: Next.js — everything else
   is default).
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs, the
   sitemap and the OG image resolve to the right host.
3. Deploy. Every route is prerendered except `/sitemap.xml`, which is rendered
   on demand.

