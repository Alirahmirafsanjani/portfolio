import { en } from "./en";
import { id } from "./id";
import type { Locale, PortfolioContent } from "./types";

export const content: Record<Locale, PortfolioContent> = { en, id };

export const locales: Locale[] = ["en", "id"];

export const localeMeta: Record<
  Locale,
  { label: string; short: string; htmlLang: string }
> = {
  en: { label: "English", short: "EN", htmlLang: "en" },
  id: { label: "Bahasa Indonesia", short: "ID", htmlLang: "id" },
};

export type { Locale, PortfolioContent } from "./types";
