"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  /** Distance in px the element travels up into place. */
  y?: number;
  /** Stagger children instead of revealing the wrapper as one block. */
  stagger?: number;
  as?: ElementType;
  amount?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  stagger,
  as = "div",
  amount = 0.25,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();

  // Honour the preference only after hydration so the first client render
  // matches the server output exactly.
  const reduced = hydrated && prefersReducedMotion;

  const variants: Variants = stagger
    ? {
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }
    : {
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.base, delay, ease: EASE_OUT_EXPO },
        },
      };

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}
