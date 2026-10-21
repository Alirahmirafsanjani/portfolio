"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/fx/Reveal";
import { Counter } from "@/components/fx/Counter";
import { SpotlightCard } from "@/components/fx/SpotlightCard";

export function About() {
  const { t } = useLanguage();
  const visualRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="01"
          label={t.about.label}
          title={t.about.title}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Visual panel */}
          <Reveal y={40}>
            <div ref={visualRef}>
              <motion.div style={{ y: visualY }}>
                <SpotlightCard
                  accent="#8b5cf6"
                  className="aspect-[4/5] rounded-2xl sm:aspect-[5/6]"
                >
                  {/* Abstract composition — swap for a real portrait if available */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(139,92,246,0.35),transparent_58%),radial-gradient(circle_at_75%_80%,rgba(34,211,238,0.28),transparent_55%)]" />
                    <div className="grid-bg absolute inset-0 opacity-40" />

                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <span className="font-display text-[clamp(4rem,12vw,7rem)] font-semibold leading-none tracking-[-0.06em] text-fg/90">
                        RW
                      </span>
                      <span className="label-mono text-faint">Jakarta · ID</span>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 border-t border-line bg-void/60 p-5 backdrop-blur-md">
                    <p className="text-[0.8125rem] leading-relaxed text-muted">
                      {t.about.portraitCaption}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <div className="space-y-5">
              {t.about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p className="text-[0.975rem] leading-[1.75] text-muted md:text-base">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {t.about.stats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.1 + index * 0.08}>
                  <div>
                    <span className="font-display text-[clamp(2rem,5vw,3rem)] font-medium leading-none tracking-[-0.04em] text-fg">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="mt-2 block font-mono text-[0.6875rem] uppercase tracking-wider text-faint">
                      {stat.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Badges */}
            <Reveal delay={0.3}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {t.about.badges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-full border border-line-strong bg-surface/60 px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-wider text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
