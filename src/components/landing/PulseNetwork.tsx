"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Radio, Users, Wifi } from "lucide-react";

export function PulseNetwork() {
    return (
        <section className="py-24 px-4 relative">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-[var(--primary)]"
                    >
                        <Activity className="w-5 h-5" />
                        <span className="text-sm font-semibold uppercase tracking-wider">The Pulse Network</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)]"
                    >
                        Real-time Reach <br /> Across 400+ Cities
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg"
                    >
                        Our proprietary &quot;Weave&quot; technology synchronizes content across thousands of screens instantly.
                        From bustling metros to tier-2 hubs, capture attention where it matters.
                    </motion.p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <StatCard label="Active Screens" value="45k+" delay={0.3} />
                        <StatCard label="Daily Impressions" value="120M" delay={0.4} />
                        <StatCard label="Cities Covered" value="412" delay={0.5} />
                        <StatCard label="Latency" value="<200ms" delay={0.6} />
                    </div>
                </div>

                {/* Right Visualization (Abstract Map) */}
                <div className="relative h-[500px] w-full glass-panel rounded-3xl overflow-hidden flex items-center justify-center bg-[#050a14]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)]"></div>

                    {/* Animated Rings */}
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute border border-[var(--primary)] rounded-full opacity-20"
                            style={{ width: `${i * 30}%`, height: `${i * 30}%` }}
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                            }}
                        />
                    ))}

                    {/* Central Hub */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-[var(--primary)] shadow-[0_0_20px_var(--primary)] animate-pulse"></div>
                        <div className="w-16 h-16 rounded-full border border-[var(--primary)] opacity-50 absolute animate-spin-slow"></div>
                    </div>

                    {/* Connected Nodes */}
                    <ConnectionNode top="20%" left="30%" delay={0} />
                    <ConnectionNode top="70%" left="20%" delay={1} />
                    <ConnectionNode top="40%" left="80%" delay={2} />
                    <ConnectionNode top="80%" left="70%" delay={1.5} />
                    <ConnectionNode top="15%" left="75%" delay={0.5} />

                </div>
            </div>
        </section>
    )
}

function StatCard({ label, value, delay }: { label: string, value: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]"
        >
            <div className="text-2xl font-bold text-white mb-1 font-[family-name:var(--font-space-grotesk)]">{value}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
        </motion.div>
    )
}

function ConnectionNode({ top, left, delay }: { top: string, left: string, delay: number }) {
    // Use a deterministic rotation based on position strings or a fixed value for SSR consistency
    // Ideally use a prop, but for this demo, we'll hash the coordinates to get a stable number
    const rotation = (top.length + left.length + delay) * 45;

    return (
        <motion.div
            className="absolute flex items-center justify-center w-2 h-2 rounded-full bg-[var(--secondary)] shadow-[0_0_10px_var(--secondary)]"
            style={{ top, left }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            <motion.div
                className="absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent origin-left"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 0.2 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3, duration: 0.8 }}
                style={{ transformOrigin: "center left", rotate: rotation }}
            />
        </motion.div>
    )
}
