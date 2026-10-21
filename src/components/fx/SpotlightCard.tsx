"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Accent colour used for the radial highlight. */
  accent?: string;
  /** Radius of the radial highlight in px. */
  radius?: number;
}

/**
 * A card that lights up under the cursor. The pointer position is written to
 * CSS custom properties directly on the DOM node so no React render is
 * triggered while the mouse moves.
 */
export function SpotlightCard({
  children,
  className,
  accent = "#22d3ee",
  radius = 340,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative overflow-hidden border border-line bg-surface",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500",
        "before:bg-[radial-gradient(var(--spot-radius,340px)_circle_at_var(--spot-x,50%)_var(--spot-y,50%),var(--spot-color,#22d3ee22),transparent_72%)]",
        "hover:before:opacity-100",
        className,
      )}
      style={
        {
          "--spot-color": `${accent}26`,
          "--spot-radius": `${radius}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
