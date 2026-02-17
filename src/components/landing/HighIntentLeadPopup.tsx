"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const CITIES = ["Bangalore", "Mumbai", "Delhi", "National"];
const INTERESTS = [
    "Pilot Campaign",
    "Loom Analytics Demo",
    "Inventory Partnership",
];

export function HighIntentLeadPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        brandName: "",
        city: "",
        contact: "",
        interests: [] as string[],
    });

    const triggerPopup = useCallback(() => {
        if (!hasTriggered) {
            setIsOpen(true);
            setHasTriggered(true);
            // Store in session storage to avoid annoying users in the same session
            sessionStorage.setItem("loom_high_intent_triggered", "true");
        }
    }, [hasTriggered]);

    useEffect(() => {
        // Check if already triggered in this session
        const stored = sessionStorage.getItem("loom_high_intent_triggered");
        if (stored === "true") {
            setHasTriggered(true);
            return;
        }

        // Timer Trigger (30 seconds)
        const timer = setTimeout(() => {
            triggerPopup();
        }, 30000);

        // Scroll Trigger (Observation of 'How We Work' section)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Give it a small delay after seeing the section
                        setTimeout(triggerPopup, 2000);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const processSection = document.getElementById("process-section");
        if (processSection) {
            observer.observe(processSection);
        }

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [triggerPopup]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate data collection
        console.log("High Intent Lead Collected:", formData);

        // In a real app, we'd send this to an API
        // For now, we'll store it in localStorage to "demonstrate data collection"
        const existingLeads = JSON.parse(localStorage.getItem("loom_demo_leads") || "[]");
        localStorage.setItem("loom_demo_leads", JSON.stringify([...existingLeads, { ...formData, timestamp: new Date().toISOString() }]));

        setIsSubmitted(true);
    };

    const toggleInterest = (interest: string) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                    />

                    {/* Popup Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0a0a0a]/80 backdrop-blur-xl border-2 border-[#00FFFF] p-8 pointer-events-auto overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {!isSubmitted ? (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-black text-white tracking-tight uppercase mb-2 font-[family-name:var(--font-space-grotesk)]">
                                        Join the Loom Network
                                    </h2>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Interested in a transparent, data-driven OOH campaign? Provide your details for a custom pilot quote.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-[#00FFFF] font-bold">Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm outline-none focus:border-[#00FFFF] transition-colors"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-[#00FFFF] font-bold">Brand Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm outline-none focus:border-[#00FFFF] transition-colors"
                                                placeholder="Your Company"
                                                value={formData.brandName}
                                                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-[#00FFFF] font-bold">Target City</label>
                                            <select
                                                required
                                                className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm outline-none focus:border-[#00FFFF] transition-colors appearance-none"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            >
                                                <option value="" disabled className="bg-[#0a0a0a]">Select City</option>
                                                {CITIES.map((city) => (
                                                    <option key={city} value={city} className="bg-[#0a0a0a]">{city}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-[#00FFFF] font-bold">WhatsApp / Email</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm outline-none focus:border-[#00FFFF] transition-colors"
                                                placeholder="Contact Info"
                                                value={formData.contact}
                                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-[#00FFFF] font-bold">Interested In?</label>
                                        <div className="grid grid-cols-1 gap-2">
                                            {INTERESTS.map((interest) => (
                                                <button
                                                    key={interest}
                                                    type="button"
                                                    onClick={() => toggleInterest(interest)}
                                                    className={cn(
                                                        "flex items-center space-x-3 p-3 border transition-all text-left",
                                                        formData.interests.includes(interest)
                                                            ? "bg-[#00FFFF]/10 border-[#00FFFF] text-white"
                                                            : "bg-white/5 border-white/10 text-slate-400"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-4 h-4 border flex items-center justify-center transition-colors",
                                                        formData.interests.includes(interest) ? "border-[#00FFFF] bg-[#00FFFF]" : "border-white/20"
                                                    )}>
                                                        {formData.interests.includes(interest) && <Check className="w-3 h-3 text-black font-black" />}
                                                    </div>
                                                    <span className="text-xs">{interest}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#00FFFF] text-black font-black text-sm py-4 tracking-widest hover:bg-white transition-colors uppercase mt-4"
                                    >
                                        GET PILOT QUOTE
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 text-center space-y-6"
                            >
                                <div className="w-20 h-20 bg-[#00FFFF]/10 border-2 border-[#00FFFF] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check className="w-10 h-10 text-[#00FFFF]" />
                                </div>
                                <h2 className="text-3xl font-black text-white tracking-tight uppercase font-[family-name:var(--font-space-grotesk)]">
                                    Thank you!
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                                    The Loom Analytics team will contact you shortly to weave your brand into the metro pulse.
                                </p>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-[#00FFFF] text-xs font-bold uppercase tracking-widest hover:underline"
                                >
                                    Close Window
                                </button>
                            </motion.div>
                        )}

                        {/* Glowing Accent */}
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#00FFFF]/10 blur-[80px]" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
