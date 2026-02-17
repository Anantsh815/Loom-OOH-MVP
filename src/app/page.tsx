import { HeroSection } from "@/components/landing/HeroSection";
import { PulseNetwork } from "@/components/landing/PulseNetwork";
import { NetworkSection } from "@/components/landing/NetworkSection";
import { PreviewTool } from "@/components/landing/PreviewTool";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { HighIntentLeadPopup } from "@/components/landing/HighIntentLeadPopup";
import { AcademicAffiliation } from "@/components/landing/AcademicAffiliation";
import { LoomAnalyticsPreview } from "@/components/landing/LoomAnalyticsPreview";
import { ROICalculator } from "@/components/landing/ROICalculator";
import { MarketValidation } from "@/components/landing/MarketValidation";
import { CampaignStepper } from "@/components/landing/CampaignStepper";
import { LoomAdvantage } from "@/components/landing/LoomAdvantage";
import { PulseScheduling } from "@/components/landing/PulseScheduling";
import { ProofOfPlayLog } from "@/components/landing/ProofOfPlayLog";
import { QuickLaunchWizard } from "@/components/landing/QuickLaunchWizard";

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

      {/* Network + Analytics Intelligence Layer */}
      <NetworkSection />
      <LoomAnalyticsPreview />

      {/* Proof of Play — Live Verification Log (Transparency) */}
      <section className="py-16 bg-[#050a14] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-white font-[family-name:var(--font-space-grotesk)] tracking-tighter uppercase">
              Proof of <span className="text-[#00FFFF]">Play</span> Protocol
            </h2>
            <p className="text-slate-400 max-w-lg">
              Every single ad playback is cryptographically logged and verified in real-time. No more guesswork — this is auditable, transparent OOH.
            </p>
          </div>
          <ProofOfPlayLog />
        </div>
      </section>

      {/* How It Works + Comparison */}
      <CampaignStepper />
      <LoomAdvantage />
      <ProcessSection />

      {/* Pricing + Scheduling + ROI */}
      <PricingSection />
      <PulseScheduling />
      <ROICalculator />

      {/* Quick Launch Wizard — Service as a Product */}
      <QuickLaunchWizard />

      {/* Social Proof + DCO Simulator */}
      <MarketValidation />
      <PreviewTool />

      <HighIntentLeadPopup />
      <AcademicAffiliation />
      <footer className="py-12 border-t border-[var(--card-border)] mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© 2026 Loom OOH - Built for the Indian Retail Fabric</p>
        </div>
      </footer>

    </main>
  );
}
