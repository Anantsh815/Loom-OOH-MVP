"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisonData = [
    {
        feature: "Deployment",
        traditional: "3-5 Days (Physical)",
        loom: "Instant (Digital)",
    },
    {
        feature: "Transparency",
        traditional: "Estimated Traffic",
        loom: "Verified Loom Analytics",
    },
    {
        feature: "Flexibility",
        traditional: "Fixed 30-day Rent",
        loom: "Programmatic (Pay-per-Hour)",
    },
    {
        feature: "Reporting",
        traditional: "Manual Photos",
        loom: "Real-time Performance Dashboard",
    },
];

export function LoomAdvantage() {
    return (
        <section className="py-24 bg-[#050a14] relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white font-[family-name:var(--font-space-grotesk)] tracking-tighter uppercase mb-4">
                        Why Loom? <span className="text-[#00FFFF]">Redefining OOH</span>
                    </h2>
                    <p className="text-slate-400">
                        A high-contrast look at how we're dismantling the inefficiencies of traditional billboard advertising.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#0a0a0a] border border-white/5 overflow-hidden"
                >
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="p-6 text-xs uppercase tracking-widest text-slate-500 font-bold">Feature</th>
                                <th className="p-6 text-xs uppercase tracking-widest text-slate-500 font-bold">Traditional OOH</th>
                                <th className="p-6 text-xs uppercase tracking-widest text-[#00FFFF] font-bold bg-[#00FFFF]/5">Loom OOH</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((item, index) => (
                                <tr key={index} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-6 text-sm font-bold text-white uppercase tracking-tight">
                                        {item.feature}
                                    </td>
                                    <td className="p-6 text-sm text-slate-500 italic">
                                        <div className="flex items-center gap-3">
                                            <X className="w-4 h-4 text-red-900/40" />
                                            {item.traditional}
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm font-black text-white bg-[#00FFFF]/5">
                                        <div className="flex items-center gap-3 text-[#00FFFF]">
                                            <Check className="w-4 h-4 shadow-[0_0_10px_#00FFFF]" />
                                            {item.loom}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>

            {/* Background Accent */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00FFFF]/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
