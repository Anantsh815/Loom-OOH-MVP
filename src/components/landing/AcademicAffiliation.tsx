"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function AcademicAffiliation() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="fixed bottom-5 right-5 z-[100] flex flex-col items-end space-y-2 group"
                >
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 mb-1"
                        aria-label="Close affiliation"
                    >
                        <X className="w-3 h-3" />
                    </button>

                    <div className="flex flex-col items-end select-none pointer-events-none">
                        <div className="relative h-8 w-auto">
                            <img
                                src="/iimvlogo.svg"
                                alt="IIM Visakhapatnam Logo"
                                className="h-8 w-auto object-contain"
                            />
                        </div>
                        <div className="mt-2 text-right">
                            <p className="text-[16px] font-black text-white/60 tracking-wider uppercase">
                                Group 22, NPDC
                            </p>
                            <p className="text-[14px] text-white/50 font-medium">
                                (Prof. Sushil Kumar)
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
