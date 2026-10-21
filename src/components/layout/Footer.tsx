"use client";

import { ArrowUp } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScrollTo } from "@/components/providers/SmoothScroll";
import { Marquee } from "@/components/fx/Marquee";
import { Reveal } from "@/components/fx/Reveal";

export function Footer({ year }: { year: ReactNode }) {
  const { t } = useLanguage();
  const scrollTo = useSmoothScrollTo();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Giant marquee */}
      <div className="border-b border-line py-6">
        <Marquee
          duration={34}
          gap="gap-10"
          className="font-display text-[clamp(2.6rem,9vw,7rem)] font-medium leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.16)]"
        >
          <span className="shrink-0">{t.footer.marquee}</span>
        </Marquee>
      </div>

      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          {/* Left */}
          <div>
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,3.4vw,2.4rem)] font-medium leading-tight tracking-[-0.03em] text-fg">
                {t.footer.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                {t.footer.builtWith}
              </p>
            </Reveal>
          </div>

          {/* Right */}
          <Reveal delay={0.12}>
            <ul className="flex flex-col gap-3">
              {t.contact.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-4 border-b border-line pb-3 text-sm text-muted transition-colors duration-300 hover:border-accent/40 hover:text-fg"
                  >
                    <span className="font-medium text-fg/80 transition-colors group-hover:text-accent">
                      {social.label}
                    </span>
                    <span className="font-mono text-xs text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Oversized wordmark */}
        <Reveal delay={0.16} y={40}>
          <div
            aria-hidden="true"
            className="mt-16 select-none font-display text-[clamp(3rem,15vw,13rem)] font-semibold leading-[0.85] tracking-[-0.055em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.09)]"
          >
            RAKA WIJAYA
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-5 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.6875rem] tracking-wider text-faint">
            © {year} {t.footer.copyright}
          </p>

          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-[0.8125rem] text-muted transition-colors duration-300 hover:border-accent/50 hover:text-fg"
          >
            {t.footer.backToTop}
            <ArrowUp
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
