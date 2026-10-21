"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Seconds for one full cycle. Lower is faster. */
  duration?: number;
  /** Direction the content travels. */
  reverse?: boolean;
  /** Pause the animation while the pointer is over the strip. */
  pauseOnHover?: boolean;
  gap?: string;
  /** Extra classes for the moving track. */
  trackClassName?: string;
}

/**
 * Infinite marquee driven by a CSS keyframe animation so it runs off the main
 * thread and never competes with scroll-linked animations.
 */
export function Marquee({
  children,
  className,
  duration = 28,
  reverse = false,
  pauseOnHover = true,
  gap = "gap-10",
  trackClassName,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        pauseOnHover && "hover:[&_.marquee-track]:[animation-play-state:paused]",
        className,
      )}
    >
      <div
        className={cn(
          "marquee-track flex w-max shrink-0 items-center",
          reverse && "marquee-track-reverse",
          gap,
          trackClassName,
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className={cn("flex shrink-0 items-center", gap)}>{children}</div>
        <div className={cn("flex shrink-0 items-center", gap)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
