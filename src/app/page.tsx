import { HeroSection } from "@/components/landing/HeroSection";
import { PulseNetwork } from "@/components/landing/PulseNetwork";
import { NetworkSection } from "@/components/landing/NetworkSection";
import { PreviewTool } from "@/components/landing/PreviewTool";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { HighIntentLeadPopup } from "@/components/landing/HighIntentLeadPopup";

import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-x-hidden selection:bg-[var(--primary)] selection:text-black">

      {/* Navigation (Simple Overlay) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-2 bg-[var(--background)]/50 backdrop-blur-md border-b border-[var(--card-border)]">
        <div className="flex items-center space-x-4">
          <Image
            src="/Logo.svg"
            alt="Loom OOH Logo"
            width={200}
            height={80}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Network</a>
          <a href="#" className="hover:text-white transition-colors">Case Studies</a>
          <a href="#" className="text-[var(--primary)]">Login</a>
        </div>
      </nav>

      <HeroSection />

      <div className="relative">
        {/* Gradient Separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent"></div>
        <PulseNetwork />
      </div>

      <NetworkSection />

      <ProcessSection />

      <PricingSection />

      <PreviewTool />
      <HighIntentLeadPopup />
      <footer className="py-12 border-t border-[var(--card-border)] mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© 2026 Loom OOH - Built for the Indian Retail Fabric</p>
        </div>
      </footer>

    </main>
  );
}
