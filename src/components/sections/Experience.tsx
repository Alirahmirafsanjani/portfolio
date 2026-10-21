"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/fx/Reveal";

export function Experience() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.6"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  const nodeOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const nodeScale = useTransform(scrollYProgress, [0, 0.08], [0.4, 1]);

  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="04"
          label={t.experience.label}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div ref={trackRef} className="relative mt-14 pl-8 md:pl-14">
          {/* Rail — offset matches the dot position at every breakpoint */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-line" />
          {/* Growing rail */}
          <motion.div
            className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3"
            style={{ scaleY }}
          />

          <ol className="space-y-12 md:space-y-16">
            {t.experience.items.map((item) => (
              <li key={`${item.company}-${item.period}`} className="relative">
                {/* Node */}
                <motion.span
                  className="absolute -left-8 top-[0.45rem] grid size-[15px] place-items-center rounded-full border border-line-strong bg-void md:-left-14"
                  style={{ opacity: nodeOpacity, scale: nodeScale }}
                >
                  <span className="size-1.5 rounded-full bg-accent" />
                </motion.span>

                <Reveal delay={0.05} y={24}>
                  <div className="group">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-mono text-[0.6875rem] tracking-widest text-accent">
                        {item.period}
                      </span>
                      {item.current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.625rem] tracking-wider text-accent">
                          <span
                            className="size-1 rounded-full bg-accent"
                            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                          />
                          {t.experience.current}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-2.5 font-display text-[clamp(1.25rem,3vw,1.75rem)] font-medium leading-tight tracking-[-0.025em] text-fg">
                      {item.role}
                    </h3>

                    <p className="mt-1 text-sm text-muted">
                      {item.company}
                      <span className="mx-2 text-faint">·</span>
                      <span className="font-mono text-xs text-faint">
                        {item.location}
                      </span>
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[0.875rem] leading-relaxed text-muted"
                        >
                          <span className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-accent/60" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
