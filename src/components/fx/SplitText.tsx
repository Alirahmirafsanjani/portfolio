"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { useHydrated } from "@/lib/use-hydrated";
import { cn, type StyleVars } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Delay before the first character animates. */
  delay?: number;
  /** Seconds between each character/word. */
  stagger?: number;
  mode?: "chars" | "words";
  /** Applies the gradient text treatment to every fragment. */
  gradient?: boolean;
  /**
   * How the entrance is driven.
   *
   * `motion` animates with the Motion library and is the right choice for
   * content that appears on scroll. `css` uses a plain CSS keyframe so the
   * animation starts the moment the stylesheet is parsed — required for
   * anything in the first viewport, because a Motion `initial` state stays
   * invisible until the bundle has downloaded and hydrated, which delays LCP.
   */
  strategy?: "motion" | "css";
}

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.024,
  mode = "chars",
  gradient = false,
  strategy = "motion",
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();

  // Only honour the preference after hydration so the first client render
  // matches the server output exactly.
  const reduced = hydrated && prefersReducedMotion;

  const tokens = mode === "chars" ? Array.from(text) : text.split(/(\s+)/);

  const isWhitespace = (token: string) => /^\s+$/.test(token);

  // Stagger order per token: whitespace keeps its place but does not count,
  // visible tokens are numbered from zero.
  const staggerOrder = tokens.map((token, index) =>
    isWhitespace(token)
      ? -1
      : tokens.slice(0, index).filter((entry) => !isWhitespace(entry)).length,
  );

  const useCss = strategy === "css";

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {tokens.map((token, i) => {
        if (isWhitespace(token)) {
          return <Fragment key={`sp-${i}`}>{token}</Fragment>;
        }

        const outerClassName = cn(
          "inline-block",
          useCss ? undefined : "will-change-transform",
          gradient && "text-gradient",
        );

        if (useCss) {
          return (
            <span key={`${token}-${i}`} aria-hidden="true" className={outerClassName}>
              <span
                className="word-in inline-block"
                style={
                  {
                    "--word-delay": `${delay + staggerOrder[i] * stagger}s`,
                  } as StyleVars
                }
              >
                {token}
              </span>
            </span>
          );
        }

        return (
          <span key={`${token}-${i}`} aria-hidden="true" className={outerClassName}>
            <motion.span
              className="inline-block will-change-transform"
              initial={{
                opacity: 0,
                y: reduced ? "0em" : "0.55em",
                filter: reduced ? "blur(0px)" : "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: "0em",
                filter: "blur(0px)",
              }}
              transition={{
                duration: reduced ? 0.2 : 0.85,
                delay: reduced ? 0 : delay + staggerOrder[i] * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {token}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
