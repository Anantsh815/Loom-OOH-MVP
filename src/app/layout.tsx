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
  title: "Loom OOH | The Phygital Network",
  description: "Weaving digital threads into physical billboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
