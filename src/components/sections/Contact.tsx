"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/fx/Reveal";
import { SplitText } from "@/components/fx/SplitText";
import { Magnetic } from "@/components/fx/Magnetic";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="container-page">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="label-mono text-accent">05</span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="label-mono text-muted">{t.contact.label}</span>
          </div>
        </Reveal>

        <h2 className="mt-7 max-w-[16ch] font-display text-[clamp(2.1rem,6.6vw,5.2rem)] font-medium leading-[0.98] tracking-[-0.04em] text-fg">
          <SplitText text={t.contact.title} mode="words" stagger={0.05} gradient />
        </h2>

        <Reveal delay={0.16}>
          <p className="mt-7 max-w-lg text-[0.975rem] leading-relaxed text-muted">
            {t.contact.subtitle}
          </p>
        </Reveal>

        {/* Primary CTA */}
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-start gap-4">
            <Magnetic strength={0.25}>
              <a
                href={`mailto:${t.contact.cta}`}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-fg px-7 py-4 font-display text-[clamp(1rem,2.4vw,1.35rem)] font-medium tracking-tight text-ink transition-colors duration-500 hover:bg-accent"
              >
                <Mail
                  className="size-4 shrink-0 transition-transform duration-500 group-hover:-rotate-12"
                  strokeWidth={1.75}
                />
                <span className="relative z-10">{t.contact.cta}</span>
                <ArrowUpRight
                  className="size-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.75}
                />
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full" />
              </a>
            </Magnetic>

            <span className="font-mono text-[0.6875rem] tracking-wider text-faint">
              {t.contact.ctaHint}
            </span>
          </div>
        </Reveal>

        {/* Socials */}
        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.contact.socials.map((social, index) => (
            <Reveal key={social.label} delay={0.1 + index * 0.07} y={28}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface/50 px-5 py-4 transition-all duration-400 hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/5"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-fg transition-colors duration-300 group-hover:text-accent">
                    {social.label}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[0.6875rem] text-faint">
                    {social.handle}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-faint transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  strokeWidth={1.75}
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
