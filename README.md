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

The same run against the deployed URL scores the same (Performance 91,
Accessibility 100). One of three runs against the live site recorded a
cumulative layout shift of 0.0018 — the moment Space Grotesk swaps in, the
baseline of the headline moves by a fraction of a pixel. The keyframes only
touch `opacity` and `transform`, so nothing else can shift; the threshold for
a "good" score is 0.1.

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

| | |
| --- | --- |
| Production URL | <https://portfolio-tau-teal-27.vercel.app> |
| Alternate alias | <https://portfolio-alirahmirafsanjani.vercel.app> |
| Custom domain | `rafsanjaniali.web.id` |
| Vercel project | `portfolio` (team `alirahmirafsanjani`, hobby) |

`NEXT_PUBLIC_SITE_URL` is set for both the Production and Preview environments
to `https://rafsanjaniali.web.id`, so the canonical URL, the sitemap,
`robots.txt` and the Open Graph image all resolve to the custom domain.

Every route is prerendered except `/sitemap.xml`, which is rendered on demand.

### Pointing the custom domain at Vercel

The domain is registered on the Vercel project, but its DNS still points at the
old GitHub Pages site. Replace the record at the `web.id` DNS panel:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `rafsanjaniali.web.id` | `cname.vercel-dns.com` |

(The current record is an A record to `185.199.108.153`, which is GitHub
Pages — remove it.) Vercel issues the TLS certificate automatically once the
domain resolves to it.

### Deploying from the command line

```bash
VERCEL_TOKEN=<token> npx vercel@latest --yes --prod --scope alirahmirafsanjani
```

`--archive=tgz` is worth adding for this project: the upload is a single
compressed archive, which keeps the transfer small.

### Enabling automatic deploys

Push-to-deploy is not wired up yet. The Vercel GitHub App has to be installed
on the GitHub account first — Vercel refuses the connection otherwise:

> To link a GitHub repository, you need to install the GitHub integration first.

Install it at <https://github.com/apps/vercel> (grant it access to the
`portfolio` repository), then run:

```bash
npx vercel@latest git connect https://github.com/Alirahmirafsanjani/portfolio \
  --token=<token> --scope alirahmirafsanjani
```

After that, every push to `main` deploys on its own and the build reads
`NEXT_PUBLIC_SITE_URL` from the project settings.


