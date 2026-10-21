"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { localeMeta, locales } from "@/content";
import type { Locale } from "@/content/types";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScrollTo } from "@/components/providers/SmoothScroll";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export function Nav() {
  const { t, locale, setLocale } = useLanguage();
  const scrollTo = useSmoothScrollTo();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  /* ---- Scroll state: adds the frosted backdrop once past the fold ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Active section tracking ---- */
  useEffect(() => {
    const sections = t.nav.links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [t.nav.links]);

  /* ---- Close the mobile menu on resize ---- */
  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  /* ---- Prevent body scroll while the mobile menu is open ---- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function goTo(id: string) {
    setMenuOpen(false);
    scrollTo(`#${id}`);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[65] transition-all duration-500",
          scrolled && "border-b border-line bg-void/70 backdrop-blur-xl",
        )}
      >
        <nav
          aria-label="Primary"
          className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]"
        >
          {/* Monogram */}
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-lg border border-line-strong bg-surface font-display text-[0.8rem] font-semibold tracking-tight text-fg">
              <span className="relative z-10">RW</span>
              <span className="absolute inset-0 bg-gradient-to-br from-accent/25 via-transparent to-accent-2/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <span className="hidden font-display text-[0.9rem] font-medium tracking-tight text-fg sm:block">
              Raka Wijaya
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {t.nav.links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => goTo(link.id)}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.8125rem] transition-colors duration-300",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-fg/[0.07]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <LanguageToggle
              locale={locale}
              onChange={setLocale}
              ariaLabel={t.nav.langAriaLabel}
            />

            <button
              type="button"
              onClick={() => goTo("contact")}
              className="hidden h-9 items-center rounded-full bg-fg px-4 text-[0.8125rem] font-medium text-ink transition-colors duration-300 hover:bg-accent md:inline-flex"
            >
              {t.nav.links.find((l) => l.id === "contact")?.label}
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="grid size-9 place-items-center rounded-lg border border-line-strong bg-surface md:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute left-0 block h-[1.5px] w-full bg-fg"
                  animate={menuOpen ? { rotate: 45, y: 5.25 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 block h-[1.5px] w-full bg-fg"
                  animate={menuOpen ? { rotate: -45, y: 5.25 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-void/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              className="container-page flex h-full flex-col justify-center gap-2 pt-16"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
              }}
            >
              {t.nav.links.map((link, index) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <button
                    type="button"
                    onClick={() => goTo(link.id)}
                    className="group flex w-full items-baseline gap-4 border-b border-line py-4 text-left"
                  >
                    <span className="label-mono text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
                      {link.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */

function LanguageToggle({
  locale,
  onChange,
  ariaLabel,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
  ariaLabel: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  const reduced = hydrated && prefersReducedMotion;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="relative flex items-center rounded-full border border-line-strong bg-surface/70 p-0.5"
    >
      {locales.map((code) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            aria-pressed={isActive}
            className={cn(
              "relative z-10 grid min-h-8 min-w-10 place-items-center rounded-full px-2.5 font-mono text-[0.6875rem] tracking-widest transition-colors duration-300",
              isActive ? "text-fg" : "text-faint hover:text-muted",
            )}
          >
            {isActive && !reduced ? (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-fg/10 ring-1 ring-line-strong"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            {localeMeta[code].short}
          </button>
        );
      })}
    </div>
  );
}
