"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useHydrated } from "@/lib/use-hydrated";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]';

const FINE_POINTER = "(pointer: fine)";

function subscribeToPointer(onStoreChange: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getFinePointer() {
  return window.matchMedia(FINE_POINTER).matches;
}

function getServerFinePointer() {
  return false;
}

/**
 * Custom pointer: a small dot that tracks the cursor exactly and a ring that
 * follows with spring physics. The ring expands over interactive elements.
 *
 * Only activates for devices with a fine pointer and is skipped entirely when
 * the visitor prefers reduced motion.
 */
export function Cursor() {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  const finePointer = useSyncExternalStore(
    subscribeToPointer,
    getFinePointer,
    getServerFinePointer,
  );
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 });

  // Only activate for devices with a fine pointer and skip entirely when the
  // visitor prefers reduced motion.
  const active = finePointer && hydrated && !prefersReducedMotion;

  useEffect(() => {
    if (!active) return;

    document.documentElement.setAttribute("data-custom-cursor", "on");

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    function handleOver(event: PointerEvent) {
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE)));
    }

    function handleDown() {
      setPressed(true);
    }

    function handleUp() {
      setPressed(false);
    }

    function handleLeave() {
      x.set(-100);
      y.set(-100);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointerleave", handleLeave);
      document.documentElement.removeAttribute("data-custom-cursor");
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      {/* Exact follower */}
      <motion.div
        className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ left: x, top: y }}
      />

      {/* Spring ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60"
        style={{ left: ringX, top: ringY }}
        animate={{
          width: hovering ? 46 : 28,
          height: hovering ? 46 : 28,
          opacity: hovering ? 0.95 : 0.55,
          scale: pressed ? 0.85 : 1,
          borderColor: hovering ? "rgba(34,211,238,0.85)" : "rgba(34,211,238,0.45)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.4 }}
      />
    </div>
  );
}
