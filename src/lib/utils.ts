import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CSSProperties } from "react";

/** Inline style that also accepts CSS custom properties. */
export type StyleVars = CSSProperties & Record<`--${string}`, string | number>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats an index to a zero-padded label, e.g. `01`. */
export function pad(n: number, length = 2) {
  return String(n).padStart(length, "0");
}

/**
 * Splits a string into words while preserving the whitespace between them,
 * so a per-word or per-character animation does not collapse the layout.
 */
export function splitWords(text: string) {
  return text.split(/(\s+)/).filter((chunk) => chunk.length > 0);
}

/** Splits a string into characters, keeping spaces as their own tokens. */
export function splitChars(text: string) {
  return Array.from(text);
}
