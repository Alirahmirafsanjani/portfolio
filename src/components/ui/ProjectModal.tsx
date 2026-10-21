"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useLenis } from "lenis/react";
import type { Project } from "@/content/types";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Lock the page behind the modal */
  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [project, onClose, lenis]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto overscroll-contain p-4 py-10 sm:p-6 md:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label={t.projects.closeProject}
            onClick={onClose}
            className="fixed inset-0 cursor-default bg-void/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
          >
            {/* Accent header */}
            <div
              className="relative h-40 overflow-hidden border-b border-line sm:h-52"
              style={{
                background: `radial-gradient(120% 140% at 15% 0%, ${project.accent}38 0%, transparent 62%), radial-gradient(100% 120% at 85% 100%, ${project.accent}22 0%, transparent 58%), var(--color-surface-2)`,
              }}
            >
              <div className="grid-bg absolute inset-0 opacity-40" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <span className="label-mono text-fg/60">{project.category}</span>
                  <h3 className="mt-1.5 font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-medium leading-none tracking-[-0.035em] text-fg">
                    {project.title}
                  </h3>
                </div>
                <span className="font-mono text-sm text-fg/50">{project.year}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              <div className="grid gap-8 md:grid-cols-[1.6fr_1fr]">
                <div className="space-y-4">
                  {project.description.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[0.9375rem] leading-[1.75] text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}

                  <ul className="mt-6 space-y-2.5">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm text-muted">
                        <span
                          className="mt-[0.45rem] size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: project.accent }}
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                  <div className="rounded-2xl border border-line bg-void/60 p-5">
                    <span className="label-mono text-faint">Impact</span>
                    <p
                      className="mt-2 font-display text-3xl font-medium tracking-[-0.03em]"
                      style={{ color: project.accent }}
                    >
                      {project.metric.value}
                    </p>
                    <p className="mt-1 text-[0.8125rem] text-muted">
                      {project.metric.label}
                    </p>
                  </div>

                  <div>
                    <span className="label-mono text-faint">Stack</span>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project.links.length > 0 ? (
                    <div className="space-y-2">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.href !== "#" ? "_blank" : undefined}
                          rel={link.href !== "#" ? "noreferrer noopener" : undefined}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-[0.8125rem] text-fg transition-colors duration-300 hover:border-accent/50 hover:bg-accent/5"
                        >
                          {link.label}
                          <ArrowUpRight
                            className="size-3.5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                            strokeWidth={1.75}
                          />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </aside>
              </div>
            </div>
          </motion.article>

          {/* Close button */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.projects.closeProject}
            className="fixed right-5 top-5 z-20 grid size-10 place-items-center rounded-full border border-line-strong bg-surface/90 text-muted backdrop-blur-md transition-colors duration-300 hover:border-accent/50 hover:text-accent"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
