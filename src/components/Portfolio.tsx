"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Aurora } from "@/components/fx/Aurora";
import { Grain } from "@/components/fx/Grain";
import { Cursor } from "@/components/fx/Cursor";
import { ProgressBar } from "@/components/fx/ProgressBar";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

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
