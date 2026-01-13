"use client";

import { motion } from "framer-motion";
import { LoomMap } from "./LoomMap";

export function NetworkSection() {
    return (
        <section className="py-24 px-4 bg-[#020408] relative">
            <div className="max-w-6xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)]">
                        The Network
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Precision-targeted screens in high-traffic zones. Explore our live nodes in key metropolitan hubs.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <LoomMap />
                </motion.div>
            </div>
        </section>
    );
}
