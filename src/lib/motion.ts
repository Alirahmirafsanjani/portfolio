import type { Transition, Variants } from "motion/react";

/* ------------------------------------------------------------------
 * Easings & durations
 * ------------------------------------------------------------------ */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] as const;

export const DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 1.0,
  slower: 1.4,
} as const;

/* ------------------------------------------------------------------
 * Shared transitions
 * ------------------------------------------------------------------ */
export const tween = (
  duration: number = DURATION.base,
  delay = 0,
): Transition => ({
  duration,
  delay,
  ease: EASE_OUT_EXPO,
});

export const spring = (
  config: Partial<Transition & { type: "spring" }> = {},
): Transition => ({
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 1,
  ...config,
});

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};

/* ------------------------------------------------------------------
 * Reusable variants
 * ------------------------------------------------------------------ */

/** Fade + rise, used by most section reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: tween(DURATION.base),
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: tween(DURATION.base) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: tween(DURATION.base),
  },
};

/** Parent wrapper that staggers its children. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Per-character / per-word entrance for split text. */
export const charVariants: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: tween(DURATION.slow),
  },
};

export const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: tween(DURATION.base),
  },
};

/** Scroll-linked timeline line that grows down the page. */
export const timelineVariants: Variants = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: tween(DURATION.slower),
  },
};

/* ------------------------------------------------------------------
 * Viewport defaults
 * ------------------------------------------------------------------ */
export const viewportOnce = { once: true, amount: 0.25 } as const;
export const viewportEarly = { once: true, amount: 0.1 } as const;
