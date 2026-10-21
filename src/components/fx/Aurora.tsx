"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

/**
 * Ambient aurora background: two slow-drifting gradient fields plus a pointer
 * reactive glow. Rendered behind the whole page.
 *
 * The blobs are soft radial gradients rather than blurred circles on purpose.
 * A `filter: blur(130px)` over a 46rem circle has to rasterise and blur a
 * viewport-sized layer on every paint — measurably expensive on a throttled
 * CPU — while a multi-stop gradient reaches the same look for free.
 */
export function Aurora() {
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const springX = useSpring(pointerX, { stiffness: 40, damping: 22, mass: 1 });
  const springY = useSpring(pointerY, { stiffness: 40, damping: 22, mass: 1 });

  const glowX = useTransform(springX, (v) => `${v * 100}%`);
  const glowY = useTransform(springY, (v) => `${v * 100}%`);

  useEffect(() => {
    if (prefersReducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      pointerX.set(event.clientX / window.innerWidth);
      pointerY.set(event.clientY / window.innerHeight);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY, prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void"
    >
      {/* Drifting colour fields */}
      <div
        className="absolute -left-[18%] top-[-12%] h-[46rem] w-[46rem]"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(34,211,238,0.20) 0%, rgba(34,211,238,0.14) 26%, rgba(34,211,238,0.07) 50%, rgba(34,211,238,0.02) 74%, rgba(34,211,238,0) 100%)",
          animation: "aurora-drift 24s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[14%] top-[24%] h-[38rem] w-[38rem]"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(139,92,246,0.20) 0%, rgba(139,92,246,0.14) 26%, rgba(139,92,246,0.07) 50%, rgba(139,92,246,0.02) 74%, rgba(139,92,246,0) 100%)",
          animation: "aurora-drift 30s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-18%] left-[28%] h-[34rem] w-[34rem]"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(244,114,182,0.13) 0%, rgba(244,114,182,0.09) 28%, rgba(244,114,182,0.04) 54%, rgba(244,114,182,0.01) 78%, rgba(244,114,182,0) 100%)",
          animation: "aurora-drift 36s ease-in-out infinite",
          animationDelay: "-8s",
        }}
      />

      {/* Pointer reactive glow */}
      <motion.div
        className="absolute h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: glowX,
          top: glowY,
          background:
            "radial-gradient(circle closest-side, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.07) 30%, rgba(34,211,238,0.02) 60%, rgba(34,211,238,0) 100%)",
        }}
      />

      {/* Faint technical grid */}
      <div className="grid-bg absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]" />

      {/* Vignette to keep the edges dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_25%,var(--color-void)_100%)]" />
    </div>
  );
}
