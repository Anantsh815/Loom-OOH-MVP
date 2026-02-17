"use client";

import { useState, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/app/actions";
import { cn } from "@/lib/utils";

const initialState: {
    success: boolean;
    message: string;
    errors: { [key: string]: string[] };
} = {
    success: false,
    message: "",
    errors: {},
};

export function IntakeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: "",
        city: "",
        whatsapp: "",
        budget: "",
    });

    // Use useActionState (new hook in React 19/Next 15) for form handling
    const [state, formAction, isPending] = useActionState(submitLead, initialState);

    const handleNext = () => {
        if (step === 1) {
            if (!formData.businessName || !formData.city) {
                return;
            }
            setStep(2);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-[#0a0f1c] border border-[var(--card-border)] rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--card-border)]">
                    <h2 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">
                        {state?.success ? "Success" : `Step ${step} of 2`}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <AnimatePresence mode="wait">
                        {state?.success ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-8 space-y-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Application Received</h3>
                                <p className="text-slate-400">{state.message}</p>
                                <Button onClick={onClose} className="mt-4 w-full">Close</Button>
                            </motion.div>
                        ) : (
                            <form action={formAction}>
                                {/* Hidden inputs to pass state from step 1 to action */}
                                <input type="hidden" name="businessName" value={formData.businessName} />
                                <input type="hidden" name="city" value={formData.city} />
                                <input type="hidden" name="whatsapp" value={formData.whatsapp} />
                                <input type="hidden" name="budget" value={formData.budget} />

                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Business Name</label>
                                            <input
                                                name="businessName_visible"
                                                value={formData.businessName}
                                                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                                className="w-full bg-[var(--card)] border border-[var(--card-border)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                                                placeholder="e.g. Acme Corp"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Target City</label>
                                            <select
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                className="w-full bg-[var(--card)] border border-[var(--card-border)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--primary)] appearance-none"
                                            >
                                                <option value="">Select a city...</option>
                                                <option value="Bangalore">Bangalore</option>
                                                <option value="Mumbai">Mumbai</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={handleNext}
                                            className="w-full mt-4"
                                            disabled={!formData.businessName || !formData.city}
                                        >
                                            Next Step <ChevronRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">WhatsApp Number</label>
                                            <input
                                                value={formData.whatsapp}
                                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                                className="w-full bg-[var(--card)] border border-[var(--card-border)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                                                placeholder="+91 99999 99999"
                                                required
                                            />
                                            {state?.errors?.whatsapp && <p className="text-red-500 text-xs">{state.errors.whatsapp[0]}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Monthly Budget Range</label>
                                            <select
                                                value={formData.budget}
                                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                className="w-full bg-[var(--card)] border border-[var(--card-border)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--primary)] appearance-none"
                                            >
                                                <option value="">Select range...</option>
                                                <option value="<1L">Under ₹1 Lakh</option>
                                                <option value="1L-5L">₹1L - ₹5L</option>
                                                <option value="5L-20L">₹5L - ₹20L</option>
                                                <option value="20L+">₹20L+</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-3 mt-4">
                                            <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                                            <Button type="submit" disabled={isPending} className="flex-1">
                                                {isPending ? "Submitting..." : "Get Whitelisted"}
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        )}
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                {!state?.success && (
                    <div className="absolute bottom-0 left-0 h-1 bg-[var(--card-border)] w-full">
                        <motion.div
                            className="h-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]"
                            initial={{ width: "50%" }}
                            animate={{ width: step === 1 ? "50%" : "100%" }}
                        />
                    </div>
                )}
            </motion.div>
        </div>
    );
}
