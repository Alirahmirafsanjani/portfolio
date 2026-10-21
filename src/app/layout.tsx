import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { content } from "@/content";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  preload: true,
});

// Body and label faces are not on the critical path — the display face is.
// Skipping their preload keeps the render-blocking font request unblocked.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: content.en.meta.title,
    template: "%s — Raka Wijaya",
  },
  description: content.en.meta.description,
  keywords: [
    "portfolio",
    "frontend developer",
    "motion design",
    "creative developer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Raka Wijaya" }],
  creator: "Raka Wijaya",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "id_ID",
    url: siteUrl,
    siteName: "Raka Wijaya",
    title: content.en.meta.ogTitle,
    description: content.en.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: content.en.meta.ogTitle,
    description: content.en.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-void font-sans text-fg">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
