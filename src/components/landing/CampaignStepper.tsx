"use client";

import { motion } from "framer-motion";
import { MapPin, RefreshCw, Activity } from "lucide-react";

const steps = [
    {
        id: "01",
        title: "Node Discovery",
        description: "Choose high-impact locations directly via our interactive map.",
        icon: MapPin,
    },
    {
        id: "02",
        title: "Creative Sync",
        description: "Upload assets and preview them contextually on digital nodes.",
        icon: RefreshCw,
    },
    {
        id: "03",
        title: "Pulse Live",
        description: "Your campaign hits the streets with real-time ROI tracking.",
        icon: Activity,
    },
];

export function CampaignStepper() {
    return (
        <section className="py-24 bg-[#020408] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white font-[family-name:var(--font-space-grotesk)] tracking-tighter uppercase">
                        Service as a <span className="text-[#00FFFF]">Product</span>
                    </h2>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                        Our 3-step programmatic workflow takes your brand from creative to the streets in minutes.
                    </p>
                </motion.div>

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4">
                    {/* Connection Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent -translate-y-1/2 hidden md:block" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative z-10 flex-1 flex flex-col items-center text-center group"
                        >
                            {/* Icon Container */}
                            <div className="w-20 h-20 bg-[#0a0a0a] border-2 border-[#00FFFF] rounded-none flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] group-hover:-translate-y-2">
                                <step.icon className="w-10 h-10 text-[#00FFFF]" />
                            </div>

                            {/* Number Label */}
                            <div className="text-[10px] uppercase tracking-[0.3em] text-[#00FFFF] font-bold mb-2">
                                Step {step.id}
                            </div>

                            {/* Text */}
                            <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)]">
                                {step.title}
                            </h3>
                            <p className="text-slate-400 text-sm max-w-[240px]">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
