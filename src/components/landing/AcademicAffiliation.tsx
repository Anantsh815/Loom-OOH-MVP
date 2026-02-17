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
                <div className="relative h-10 w-auto">
                    <img
                        src="/iimvlogo.svg"
                        alt="IIM Visakhapatnam Logo"
                        className="h-10 w-auto object-contain"
                    />
                </div>
                <div className="mt-1 text-right">
                    <p className="text-[11px] font-medium text-white/40 tracking-tight uppercase">
                        NPDC Group 22
                    </p>
                    <p className="text-[10px] text-white/30 font-light">
                        (Prof. Sushil Kumar)
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
