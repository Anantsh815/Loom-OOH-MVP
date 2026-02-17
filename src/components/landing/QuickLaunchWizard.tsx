"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Upload, CreditCard, Rocket, Check } from "lucide-react";

export function QuickLaunchWizard() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        city: "",
        budget: "149000",
    });

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    return (
        <section className="py-24 bg-[#050a14] relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white font-[family-name:var(--font-space-grotesk)] tracking-tighter uppercase mb-4">
                        Instant <span className="text-[#00FFFF]">Campaign</span> Wizard
                    </h2>
                    <p className="text-slate-400">
                        The **Service as a Product** flow. Launch your programmatic OOH campaign in under 60 seconds.
                    </p>
                </motion.div>

                <div className="bg-[#0a0a0a] border border-[#00FFFF]/30 p-1 md:p-12 relative">
                    {/* Step Progress */}
                    <div className="flex justify-between mb-12 px-4 md:px-0">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step >= s ? 'border-[#00FFFF] bg-[#00FFFF] text-black' : 'border-white/10 text-slate-500'}`}>
                                    {step > s ? <Check className="w-4 h-4" /> : s}
                                </div>
                                <div className={`text-[8px] uppercase tracking-widest font-black ${step >= s ? 'text-[#00FFFF]' : 'text-slate-600'}`}>
                                    {s === 1 && "Target"}
                                    {s === 2 && "Creative"}
                                    {s === 3 && "Budget"}
                                    {s === 4 && "Launch"}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="min-h-[300px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Target City</label>
                                        <select
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full bg-black border border-white/10 p-4 text-white hover:border-[#00FFFF]/50 transition-colors cursor-pointer outline-none"
                                        >
                                            <option value="">Choose a market...</option>
                                            <option value="Bangalore">Bangalore (Tech Hub)</option>
                                            <option value="Mumbai">Mumbai (Financial District)</option>
                                            <option value="Delhi">Delhi NCR (Corporate)</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 border border-white/5 bg-white/[0.02]">
                                            <div className="text-[10px] text-slate-500 uppercase mb-1">Active Nodes</div>
                                            <div className="text-xl font-bold text-white">120+</div>
                                        </div>
                                        <div className="p-4 border border-white/5 bg-white/[0.02]">
                                            <div className="text-[10px] text-slate-500 uppercase mb-1">Daily Impressions</div>
                                            <div className="text-xl font-bold text-white">4.2M</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6 text-center"
                                >
                                    <div className="border-2 border-dashed border-white/10 p-12 hover:border-[#00FFFF]/50 transition-colors cursor-pointer bg-black/40">
                                        <Upload className="w-10 h-10 text-[#00FFFF] mx-auto mb-4" />
                                        <div className="text-sm font-bold text-white uppercase tracking-tighter">Upload Ad Creative</div>
                                        <div className="text-[10px] text-slate-500 mt-2 uppercase">Recommended: 1920x1080 (HD)</div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                                            <span>Set Monthly Budget</span>
                                            <span className="text-[#00FFFF]">₹{Number(formData.budget).toLocaleString()}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="50000"
                                            max="1000000"
                                            step="10000"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            className="w-full h-1 bg-white/10 appearance-none rounded-full accent-[#00FFFF]"
                                        />
                                        <div className="text-[10px] text-slate-500 italic block text-center">
                                            * Expected reach: {(Number(formData.budget) * 12).toLocaleString()} verified impressions.
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-8"
                                >
                                    <div className="w-20 h-20 bg-[#00FFFF]/10 border border-[#00FFFF] rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                                        <Rocket className="w-10 h-10 text-[#00FFFF]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-white uppercase">Ready for Takeoff</h3>
                                        <p className="text-slate-400 text-sm max-w-xs mx-auto">Your campaign is configured for {formData.city || 'selected cities'}. Press launch to start the Pulse.</p>
                                    </div>
                                    <button className="px-12 py-4 bg-[#00FFFF] text-black font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:scale-105 transition-all">
                                        LAUNCH PULSE LIVE
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    {step < 4 && (
                        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between">
                            <button
                                onClick={prevStep}
                                disabled={step === 1}
                                className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white disabled:opacity-0 transition-all"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="px-8 py-3 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-[#00FFFF] hover:text-black hover:border-[#00FFFF] transition-all"
                            >
                                Continue
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
