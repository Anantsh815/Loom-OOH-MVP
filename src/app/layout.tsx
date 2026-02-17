import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loom OOH | India's First Programmatic OOH Network",
  description: "Weaving digital threads into the physical fabric of Indian retail. Launch your OOH campaigns instantly with Loom's high-tech programmatic network.",
  openGraph: {
    title: "Loom OOH | Programmatic Out-of-Home Advertising",
    description: "The phygital network for India's modern brands.",
    url: "https://loom-ooh-mvp.vercel.app",
    siteName: "Loom OOH",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loom OOH | Programmatic OOH",
    description: "India's first truly programmatic OOH network.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          spaceGrotesk.variable,
          outfit.variable,
          "antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]"
        )}
      >
        {children}
      </body>
    </html>
  );
}
