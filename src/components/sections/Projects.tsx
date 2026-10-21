"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import type { Project } from "@/content/types";

export function Projects() {
  const { t } = useLanguage();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="03"
          label={t.projects.label}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {t.projects.items.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.08} y={36}>
              <button
                type="button"
                onClick={() => setActive(project)}
                aria-label={`${t.projects.openProject}: ${project.title}`}
                className="group block w-full text-left"
              >
                <SpotlightCard
                  accent={project.accent}
                  radius={380}
                  className="flex h-full flex-col rounded-2xl transition-colors duration-500 hover:border-line-strong"
                >
                  {/* Visual */}
                  <div
                    className="relative aspect-[16/10] overflow-hidden border-b border-line"
                    style={{
                      background: `radial-gradient(130% 150% at 20% 0%, ${project.accent}33 0%, transparent 60%), radial-gradient(110% 130% at 90% 100%, ${project.accent}1f 0%, transparent 58%), var(--color-surface-2)`,
                    }}
                  >
                    <div className="grid-bg absolute inset-0 opacity-45" />

                    {/* Oversized index */}
                    <span className="absolute -bottom-6 -left-3 font-display text-[7rem] font-semibold leading-none tracking-[-0.06em] text-fg/[0.06] transition-transform duration-700 group-hover:-translate-y-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="absolute left-5 top-5 flex items-center gap-2">
                      <span className="rounded-full border border-line-strong bg-void/70 px-3 py-1 font-mono text-[0.625rem] tracking-widest text-muted backdrop-blur-sm">
                        {project.category}
                      </span>
                      <span className="rounded-full border border-line-strong bg-void/70 px-3 py-1 font-mono text-[0.625rem] tracking-widest text-muted backdrop-blur-sm">
                        {project.year}
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <span
                      className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-line-strong bg-void/70 text-muted backdrop-blur-sm transition-all duration-500 group-hover:border-transparent group-hover:bg-accent group-hover:text-ink"
                    >
                      <ArrowUpRight
                        className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.75}
                      />
                    </span>

                    {/* Metric */}
                    <div className="absolute bottom-4 left-5">
                      <span
                        className="font-display text-2xl font-medium tracking-[-0.03em]"
                        style={{ color: project.accent }}
                      >
                        {project.metric.value}
                      </span>
                      <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-widest text-faint">
                        {project.metric.label}
                      </span>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-medium tracking-tight text-fg">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-muted">
                      {project.summary}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-wide text-faint transition-colors duration-300 group-hover:text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
