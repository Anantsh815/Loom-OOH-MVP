"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Zap } from "lucide-react";

export function ROICalculator() {
    const [budget, setBudget] = useState(149000);
    const IMPRESSION_MULTIPLIER = 12.5; // Average across tiers

    const impressions = Math.round(budget * IMPRESSION_MULTIPLIER);

    return (
        <section className="py-24 bg-[#020408] relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#0a0a0a] border-2 border-[#00FFFF] p-12 rounded-none relative"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-white font-[family-name:var(--font-space-grotesk)] tracking-tighter uppercase mb-4">
                            Estimate Your <span className="text-[#00FFFF]">Impact</span>
                        </h2>
                        <p className="text-slate-400">
                            Calculate the verified reach your brand achieves through the Loom network.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Slider */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] uppercase tracking-[0.4em] text-[#00FFFF] font-bold">
                                    Campaign Budget
                                </label>
                                <div className="text-4xl font-black text-white font-[family-name:var(--font-space-grotesk)]">
                                    ₹{budget.toLocaleString("en-IN")}
                                </div>
                            </div>

                            <div className="relative h-2 w-full bg-white/10 rounded-full">
                                <div
                                    className="absolute top-0 left-0 h-full bg-[#00FFFF] shadow-[0_0_10px_#00FFFF]"
                                    style={{ width: `${((budget - 50000) / (500000 - 50000)) * 100}%` }}
                                />
                                <input
                                    type="range"
                                    min="50000"
                                    max="500000"
                                    step="1000"
                                    value={budget}
                                    onChange={(e) => setBudget(Number(e.target.value))}
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer appearance-none"
                                />
                            </div>

                            <div className="flex justify-between text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                                <span>Min: ₹50k</span>
                                <span>Max: ₹500k</span>
                            </div>
                        </div>

                        {/* Result Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-white/5">
                            <div className="flex items-center space-x-6">
                                <div className="w-16 h-16 bg-[#00FFFF]/10 border border-[#00FFFF]/30 flex items-center justify-center">
                                    <Users className="w-8 h-8 text-[#00FFFF]" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Verified Reach</div>
                                    <div className="text-3xl font-black text-white font-[family-name:var(--font-space-grotesk)]">
                                        {impressions.toLocaleString("en-IN")}
                                    </div>
                                    <div className="text-[10px] text-[#00FFFF]">POTENTIAL VIEWERS</div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6">
                                <div className="w-16 h-16 bg-[#00FFFF]/10 border border-[#00FFFF]/30 flex items-center justify-center">
                                    <Zap className="w-8 h-8 text-[#00FFFF]" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Estimated ROI</div>
                                    <div className="text-3xl font-black text-white font-[family-name:var(--font-space-grotesk)]">
                                        12.5x
                                    </div>
                                    <div className="text-[10px] text-[#00FFFF]">ATTENTION MULTIPLIER</div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-slate-400 text-sm italic">
                                "With a budget of <span className="text-white font-bold">₹{budget.toLocaleString("en-IN")}</span>,
                                Loom Analytics estimates a reach of <span className="text-[#00FFFF] font-bold">{impressions.toLocaleString("en-IN")}</span> verified viewers."
                            </p>
                        </div>
                    </div>

                    {/* Glowing Accents */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#00FFFF]/20 blur-3xl rounded-full" />
                    <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-[#00FFFF]/20 blur-3xl rounded-full" />
                </motion.div>
            </div>
        </section>
    );
}
