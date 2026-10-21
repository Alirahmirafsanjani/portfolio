"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Aurora } from "@/components/fx/Aurora";
import { Grain } from "@/components/fx/Grain";
import { Cursor } from "@/components/fx/Cursor";
import { ProgressBar } from "@/components/fx/ProgressBar";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

/**
 * Everything below the fold is code-split.
 *
 * The hero is the largest contentful element, and its web font competes for
 * bandwidth with the scripts that hydrate the page. Shipping the lower
 * sections in their own chunks keeps the initial payload small, so the font
 * lands sooner and the main thread is free when the hero paints.
 *
 * `ssr` stays on, so the markup is still complete in the HTML response —
 * splitting the bundle must not shift the layout.
 */
const About = dynamic(() => import("@/components/sections/About").then((m) => m.About));
const Skills = dynamic(() => import("@/components/sections/Skills").then((m) => m.Skills));
const Projects = dynamic(() => import("@/components/sections/Projects").then((m) => m.Projects));
const Experience = dynamic(() =>
  import("@/components/sections/Experience").then((m) => m.Experience),
);
const Contact = dynamic(() => import("@/components/sections/Contact").then((m) => m.Contact));

export function Portfolio({ year }: { year: ReactNode }) {
  return (
    // `reducedMotion="user"` makes Motion drop every transform and layout
    // animation for visitors who ask for reduced motion, while keeping
    // opacity fades.
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <Aurora />
        <Grain />
        <Cursor />
        <ProgressBar />
        <Nav />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer year={year} />
      </LanguageProvider>
    </MotionConfig>
  );
}
