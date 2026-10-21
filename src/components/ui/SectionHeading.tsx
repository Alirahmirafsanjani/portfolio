"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/fx/Reveal";
import { SplitText } from "@/components/fx/SplitText";

interface SectionHeadingProps {
  /** Small monospace eyebrow, e.g. "Selected work". */
  label: string;
  /** Two-digit section index. */
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
  /** Renders the title as a gradient. */
  accent?: boolean;
}

export function SectionHeading({
  label,
  index,
  title,
  subtitle,
  className,
  accent = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("w-full", className)}>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="label-mono text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
          <span className="label-mono text-muted">{label}</span>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.9rem,5vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.03em] text-fg">
          <SplitText text={title} mode="words" stagger={0.05} />
        </h2>
      </Reveal>

      {subtitle ? (
        <Reveal delay={0.14}>
          <p
            className={cn(
              "mt-5 max-w-xl text-[0.975rem] leading-relaxed text-muted",
              accent && "text-fg/70",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
