"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ComponentRef,
  type ReactNode,
} from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import "lenis/dist/lenis.css";

/** Shared easing for programmatic scrolls — matches the Motion easing curve. */
const scrollEasing = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Smooth scrolling powered by Lenis, driven by Motion's frame loop so that
 * scroll-linked animations stay in sync with the same rAF ticker.
 *
 * Lenis handles the reduced-motion preference itself (`respectReducedMotion`
 * is on by default), which keeps the DOM structure identical between the
 * server render and the client — no hydration mismatch.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<ComponentRef<typeof ReactLenis>>(null);

  useEffect(() => {
    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp);
    }

    frame.setup(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        lerp: 0.1,
        respectReducedMotion: true,
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}

/**
 * Scrolls to a target (CSS selector or pixel offset) using Lenis when it is
 * available, and falls back to the native scrolling API otherwise.
 */
export function useSmoothScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (target: string | number, offset = -72) => {
      if (lenis) {
        lenis.scrollTo(target, {
          offset,
          duration: 1.4,
          easing: scrollEasing,
        });
        return;
      }

      if (typeof target === "number") {
        window.scrollTo({ top: target + offset, behavior: "smooth" });
        return;
      }

      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [lenis],
  );
}
