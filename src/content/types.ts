export type Locale = "en" | "id";

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string[];
  highlights: string[];
  tags: string[];
  accent: string;
  metric: { value: string; label: string };
  links: ProjectLink[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  points: string[];
  current?: boolean;
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
}

export interface PortfolioContent {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
  };
  nav: {
    links: { id: string; label: string }[];
    langAriaLabel: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
  };
  hero: {
    eyebrow: string;
    status: string;
    titleLines: string[];
    highlightIndex: number;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
  };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    stats: Stat[];
    badges: string[];
    portraitCaption: string;
  };
  skills: {
    label: string;
    title: string;
    subtitle: string;
    groups: SkillGroup[];
    marquee: string[];
  };
  projects: {
    label: string;
    title: string;
    subtitle: string;
    items: Project[];
    openProject: string;
    closeProject: string;
    liveSite: string;
    sourceCode: string;
  };
  experience: {
    label: string;
    title: string;
    subtitle: string;
    items: ExperienceItem[];
    current: string;
  };
  contact: {
    label: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaHint: string;
    socials: SocialLink[];
  };
  footer: {
    marquee: string;
    tagline: string;
    backToTop: string;
    copyright: string;
    builtWith: string;
  };
}
