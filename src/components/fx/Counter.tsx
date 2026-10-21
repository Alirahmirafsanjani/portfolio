"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Seconds the count-up takes. */
  duration?: number;
  className?: string;
}

/**
 * Counts up from zero once the element scrolls into view.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  const counter = useMotionValue(0);
  const rounded = useTransform(counter, (latest) => Math.round(latest));
  const display = useTransform(rounded, (latest) => `${latest}`);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(counter, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [isInView, value, duration, counter]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
