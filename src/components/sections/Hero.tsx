"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScrollTo } from "@/components/providers/SmoothScroll";
import { SplitText } from "@/components/fx/SplitText";
import { Button } from "@/components/ui/Button";
import { useHydrated } from "@/lib/use-hydrated";
import { type StyleVars } from "@/lib/utils";

export function Hero() {
  const { t } = useLanguage();
  const scrollTo = useSmoothScrollTo();
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  const heroRef = useRef<HTMLElement>(null);

  // Only drop the parallax after hydration so the first client render matches
  // the server output exactly.
  const reduced = hydrated && prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 md:pt-32"
    >
      {/* Corner brackets */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-5 top-24 hidden h-10 w-10 border-l border-t border-line-strong lg:block" />
        <span className="absolute right-5 top-24 hidden h-10 w-10 border-r border-t border-line-strong lg:block" />
        <span className="absolute bottom-10 left-5 hidden h-10 w-10 border-b border-l border-line-strong lg:block" />
        <span className="absolute bottom-10 right-5 hidden h-10 w-10 border-b border-r border-line-strong lg:block" />
      </div>

      <motion.div
        className="container-page w-full"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity, scale: contentScale }}
      >
        {/* Eyebrow row */}
        <div
          className="rise-in flex flex-wrap items-center gap-x-5 gap-y-3"
          style={{ "--rise-delay": "0.1s", "--rise-duration": "0.7s" } as StyleVars}
        >
          <span className="label-mono text-accent">{t.hero.eyebrow}</span>
          <span className="h-px w-10 bg-line-strong" />
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/60 px-3 py-1.5 backdrop-blur-sm">
            <span
              className="size-1.5 rounded-full bg-accent"
              style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
            />
            <span className="font-mono text-[0.6875rem] tracking-wider text-muted">
              {t.hero.status}
            </span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 max-w-[19ch] font-display text-[clamp(2.6rem,8.2vw,6.6rem)] font-medium leading-[0.94] tracking-[-0.045em] text-fg">
          {t.hero.titleLines.map((line, index) => (
            <span key={line} className="block">
              <SplitText
                text={line}
                mode="words"
                stagger={0.055}
                delay={0.22 + index * 0.11}
                gradient={index === t.hero.highlightIndex}
                strategy="css"
              />
            </span>
          ))}
        </h1>

        {/* Tagline + actions */}
        <div
          className="rise-in mt-9 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          style={{ "--rise-delay": "0.62s", "--rise-duration": "0.8s" } as StyleVars}
        >
          <p className="max-w-md text-[0.975rem] leading-relaxed text-muted md:text-base">
            {t.hero.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              magnetic
              onClick={() => scrollTo("#work")}
              className="group"
            >
              {t.hero.primaryCta}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollTo("#contact")}>
              {t.hero.secondaryCta}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        type="button"
        onClick={() => scrollTo("#about")}
        style={reduced ? undefined : { opacity: hintOpacity }}
        className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5"
        aria-label={t.hero.scrollHint}
      >
        <span className="label-mono text-[0.625rem] text-faint transition-colors duration-300 group-hover:text-accent">
          {t.hero.scrollHint}
        </span>
        <span className="relative grid h-10 w-6 place-items-start overflow-hidden rounded-full border border-line-strong p-1.5">
          <span
            className="size-1 rounded-full bg-accent"
            style={{ animation: "scroll-hint 1.9s ease-in-out infinite" }}
          />
        </span>
        <ArrowDown
          className="size-3 text-faint transition-transform duration-300 group-hover:translate-y-0.5"
          strokeWidth={1.5}
        />
      </motion.button>
    </section>
  );
}
