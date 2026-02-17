"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Sun, Moon, Zap } from "lucide-react";

const SLOTS = [
    {
        id: "morning",
        name: "Morning Rush (Work)",
        time: "08:00 - 11:00",
        icon: Sun,
        description: "Target high-intent corporate commuters during peak transit hours.",
        benefit: "W.E.S.T - Work Pulse",
    },
    {
        id: "evening",
        name: "Evening Pulse (Entertainment)",
        time: "18:00 - 22:00",
        icon: Moon,
        description: "Capture attention during leisure, shopping, and social peaks.",
        benefit: "W.E.S.T - Social Pulse",
    },
];

export function PulseScheduling() {
    const [selectedSlot, setSelectedSlot] = useState(SLOTS[0].id);

    return (
        <section className="py-24 bg-[#020408] relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white font-[family-name:var(--font-space-grotesk)] tracking-tighter uppercase mb-4">
                        Pulse <span className="text-[#00FFFF]">Scheduling</span>
                    </h2>
                    <p className="text-slate-400">
                        Fully conceptualized W.E.S.T philosophy. Pay only for the slots that matter to your brand.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SLOTS.map((slot) => (
                        <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`
                p-8 text-left border-2 transition-all duration-300 relative group
                ${selectedSlot === slot.id
                                    ? "bg-[#00FFFF]/5 border-[#00FFFF] shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                                    : "bg-[#0a0a0a] border-white/5 hover:border-white/20"}
              `}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`
                  p-3 rounded-none border transition-colors
                  ${selectedSlot === slot.id ? "border-[#00FFFF] bg-[#00FFFF]/20 text-[#00FFFF]" : "border-white/10 text-slate-500"}
                `}>
                                    <slot.icon className="w-6 h-6" />
                                </div>
                                {selectedSlot === slot.id && (
                                    <div className="flex items-center gap-1 text-[10px] font-black text-[#00FFFF] tracking-widest uppercase">
                                        <Zap className="w-3 h-3 fill-[#00FFFF]" /> Active Slot
                                    </div>
                                )}
                            </div>

                            <h3 className={`text-xl font-bold mb-1 font-[family-name:var(--font-space-grotesk)] ${selectedSlot === slot.id ? "text-white" : "text-slate-400"}`}>
                                {slot.name}
                            </h3>
                            <div className="text-[#00FFFF] text-xs font-bold mb-4 flex items-center gap-2">
                                <Clock className="w-3 h-3" /> {slot.time}
                            </div>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                {slot.description}
                            </p>

                            <div className={`text-[10px] font-black tracking-[0.2em] uppercase py-2 px-3 border inline-block ${selectedSlot === slot.id ? "border-[#00FFFF]/30 text-[#00FFFF]" : "border-white/5 text-slate-700"}`}>
                                {slot.benefit}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
