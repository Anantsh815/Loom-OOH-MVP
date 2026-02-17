"use client";

import { motion } from "framer-motion";
import { MessageSquare, Quote } from "lucide-react";

const testimonials = [
    {
        quote: "The transparency of Loom Analytics solves the trust gap we face in Bangalore OOH spend.",
        author: "Marketing Head",
        brand: "Top Logistics D2C",
    },
    {
        quote: "A self-service dashboard for physical screens is exactly what D2C brands need to scale.",
        author: "Founder",
        brand: "Emerging FoodTech",
    },
    {
        quote: "The W.E.S.T philosophy is brilliant for targeting corporate commuters.",
        author: "Growth Lead",
        brand: "FinTech Scaleup",
    },
];

export function MarketValidation() {
    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-[#00FFFF]/10 border border-[#00FFFF]/30 flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-[#00FFFF]" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white font-[family-name:var(--font-space-grotesk)] tracking-tighter uppercase mb-4">
                        Market <span className="text-[#00FFFF]">Validation</span> & Primary Research
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Direct insights gathered from Loom's WhatsApp validation phase with brand decision-makers.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-[#050a14] border border-white/5 p-8 relative flex flex-col group hover:border-[#00FFFF]/30 transition-colors"
                        >
                            <Quote className="w-10 h-10 text-[#00FFFF]/20 mb-6 group-hover:text-[#00FFFF]/40 transition-colors" />

                            <p className="text-lg text-slate-300 font-medium italic mb-8 leading-relaxed">
                                "{t.quote}"
                            </p>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <div className="text-white font-bold text-sm uppercase tracking-wider">{t.author}</div>
                                <div className="text-[#00FFFF] text-[10px] font-black tracking-widest uppercase mt-1">
                                    {t.brand}
                                </div>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-8 h-8 group-hover:border-t-2 group-hover:border-r-2 border-[#00FFFF]/0 group-hover:border-[#00FFFF]/20 transition-all" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
