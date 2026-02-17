"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AcademicAffiliation() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="fixed bottom-5 right-5 z-[100] flex flex-col items-end space-y-2 pointer-events-none"
        >
            <div className="flex flex-col items-end">
                <div className="relative h-8 w-auto">
                    <img
                        src="/iimvlogo.svg"
                        alt="IIM Visakhapatnam Logo"
                        className="h-8 w-auto object-contain"
                    />
                </div>
                <div className="mt-2 text-right">
                    <p className="text-[13px] font-bold text-white/50 tracking-wide uppercase">
                        NPDC Group 22
                    </p>
                    <p className="text-[11px] text-white/40 font-medium">
                        (Prof. Sushil Kumar)
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
