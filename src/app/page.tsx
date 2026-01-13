import { HeroSection } from "@/components/landing/HeroSection";
import { PulseNetwork } from "@/components/landing/PulseNetwork";
import { NetworkSection } from "@/components/landing/NetworkSection";
import { PreviewTool } from "@/components/landing/PreviewTool";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-x-hidden selection:bg-[var(--primary)] selection:text-black">

      {/* Navigation (Simple Overlay) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--background)]/50 backdrop-blur-md border-b border-[var(--card-border)]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-black flex items-center justify-center font-bold text-xl">L</div>
          <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">Loom OOH</span>
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

      <PreviewTool />

      <footer className="py-12 border-t border-[var(--card-border)] mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© 2026 Loom OOH - Built for the Indian Retail Fabric</p>
        </div>
      </footer>

    </main>
  );
}
