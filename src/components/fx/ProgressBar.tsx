"use client";

import { motion, useScroll } from "motion/react";

/** Hairline scroll progress bar pinned to the top of the viewport. */
export function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
