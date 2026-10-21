"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/fx/Magnetic";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Renders an anchor instead of a button. */
  href?: string;
  /** Wrap the button in a magnetic field that chases the pointer. */
  magnetic?: boolean;
  className?: string;
  /** Opens the link in a new tab with safe rel attributes. */
  external?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-ink hover:bg-accent hover:text-ink shadow-[0_0_0_rgba(34,211,238,0)] hover:shadow-[0_8px_40px_-8px_rgba(34,211,238,0.55)]",
  outline:
    "border border-line-strong bg-transparent text-fg hover:border-accent hover:text-accent hover:bg-accent/5",
  ghost: "bg-transparent text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-sm",
  lg: "h-[3.25rem] px-8 text-[0.9375rem]",
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 select-none";

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  magnetic = false,
  className,
  external,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const inner =
    variant === "primary" ? (
      <>
        <span className="relative z-10">{children}</span>
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </span>
      </>
    ) : (
      children
    );

  const content = href ? (
    <a
      href={href}
      className={classes}
      {...(external
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
    >
      {inner}
    </a>
  ) : (
    <button className={classes} {...props}>
      {inner}
    </button>
  );

  if (magnetic) {
    return (
      <Magnetic strength={0.28} className="inline-block">
        {content}
      </Magnetic>
    );
  }

  return content;
}
