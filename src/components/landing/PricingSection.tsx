"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function PricingSection() {
    const plans = [
        {
            name: "The Pilot",
            price: "₹49,000",
            period: "/month",
            description: "Single metro cluster focus (e.g., Indiranagar)",
            features: [
                "250,000 Impressions",
                "₹196 CPM",
                "1 Metro Cluster",
                "Standard Analytics",
                "Email Support"
            ],
            cta: "Start Pilot",
            glow: false
        },
        {
            name: "The Loom",
            price: "₹1,49,000",
            period: "/month",
            description: "Multi-metro access for scaling brands",
            features: [
                "1,000,000 Impressions",
                "₹149 CPM (Best Value)",
                "Bangalore + Mumbai",
                "Advanced Real-time Analytics",
                "Priority Support",
                "Creative A/B Testing"
            ],
            cta: "Get Loom Access",
            glow: true,
            badge: "Most Popular"
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "National coverage with unlimited scale",
            features: [
                "Unlimited CPM Bidding",
                "All Metro Cities",
                "Direct CAPTURA Dashboard",
                "API Access",
                "Dedicated Account Manager",
                "Custom Integrations"
            ],
            cta: "Contact Sales",
            glow: false
        }
    ];

    return (
        <section className="py-24 px-4 bg-[#050a14] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--primary)]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4"
                    >
                        Programmatic <span className="text-[var(--primary)]">Pricing</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        Transparent, data-driven pricing. Pay only for verified attention.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-2xl p-8 border ${plan.glow ? 'border-[var(--primary)] bg-[var(--primary)]/5 shadow-[0_0_30px_rgba(0,240,255,0.15)]' : 'border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--primary)]/30'} transition-all duration-300 group`}
                        >
                            {plan.badge && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--primary)] text-black font-bold px-4 py-1 rounded-full text-sm shadow-[0_0_15px_var(--primary)]">
                                    {plan.badge}
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className={`text-4xl font-bold ${plan.glow ? 'text-[var(--primary)] glow-text' : 'text-white'}`}>{plan.price}</span>
                                    <span className="text-slate-500">{plan.period}</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-4">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.glow ? 'bg-[var(--primary)]/20 text-[var(--primary)]' : 'bg-slate-800 text-slate-400 group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-colors'}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-lg font-bold transition-all ${plan.glow ? 'bg-[var(--primary)] text-black hover:shadow-[0_0_20px_var(--primary)]' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Transparency Logic Block */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 max-w-4xl mx-auto bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-8 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-transparent pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h4 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] mb-2">
                                The <span className="text-[var(--primary)]">Transparency</span> Engine
                            </h4>
                            <p className="text-slate-400 leading-relaxed">
                                Traditional OOH changes for time; <span className="text-white font-medium">Loom charges for attention</span>.
                                By connecting with real-time footfall data, our programmatic engine ensures you only pay for verified impressions
                                during peak hours. If the crowd isn't there, neither is your ad spend.
                            </p>
                        </div>
                        <div className="shrink-0 flex gap-4 text-center">
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                                <div className="text-[var(--primary)] text-sm font-bold mb-1">ZERO</div>
                                <div className="text-xs text-slate-500">Production Cost</div>
                            </div>
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                                <div className="text-[var(--primary)] text-sm font-bold mb-1">100%</div>
                                <div className="text-xs text-slate-500">Verified Views</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Sustainability Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 flex justify-center"
                >
                    <div className="inline-flex items-center gap-4 px-6 py-4 bg-green-500/5 border border-green-500/20 rounded-2xl max-w-2xl text-center">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h4 className="text-green-500 font-bold text-sm tracking-widest uppercase mb-1">Sustainable Ad-Tech</h4>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                By eliminating physical vinyl printing and logistics, <span className="text-green-400 font-medium">Loom OOH reduces the carbon footprint</span> of your campaign by 90% compared to traditional boards.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
