"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/fx/Reveal";
import { Marquee } from "@/components/fx/Marquee";
import { SpotlightCard } from "@/components/fx/SpotlightCard";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="02"
          label={t.skills.label}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        {/* Skill marquee */}
        <Reveal delay={0.1}>
          <div className="mt-12 space-y-3 border-y border-line py-6">
            <Marquee duration={30} gap="gap-8">
              {t.skills.marquee.map((skill) => (
                <span
                  key={skill}
                  className="flex shrink-0 items-center gap-8 font-display text-[clamp(1.1rem,2.4vw,1.7rem)] font-medium tracking-tight text-fg/35 transition-colors duration-300 hover:text-accent"
                >
                  {skill}
                  <span className="size-1 rounded-full bg-accent/50" />
                </span>
              ))}
            </Marquee>
          </div>
        </Reveal>

        {/* Group grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.skills.groups.map((group, groupIndex) => (
            <Reveal key={group.name} delay={groupIndex * 0.08} y={32}>
              <SpotlightCard
                accent="#22d3ee"
                radius={280}
                className="flex h-full flex-col rounded-2xl p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-medium tracking-tight text-fg">
                    {group.name}
                  </h3>
                  <span className="font-mono text-[0.625rem] tracking-widest text-faint">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-void/50 px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
