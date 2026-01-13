"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Radio, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

import { useState } from "react";
import { IntakeModal } from "./IntakeModal";

export function HeroSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 pt-20">
            <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Background Pulse Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[var(--primary)] opacity-20 blur-[100px]"></div>
            </div>

            <div className="z-10 max-w-5xl mx-auto text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center space-x-2 bg-[var(--card)] border border-[var(--card-border)] rounded-full px-4 py-1.5 mb-4"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
                    </span>
                    <span className="text-xs font-medium text-slate-300">Live: 45,000+ Active Screens</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] leading-[1.1]"
                >
                    Weaving Digital Threads into <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] glow-text">
                        Physical Billboards
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
                >
                    Loom OOH connects your digital campaigns to real-world screens in milliseconds.
                    The first programmatic DOOH platform built for the pulse of India.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" onClick={() => setIsModalOpen(true)} className="rounded-full px-8 text-md font-bold">
                        Upload Your Ad <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setIsModalOpen(true)} className="rounded-full px-8 text-md">
                        Check Available Screens
                    </Button>
                </motion.div>
            </div>

            {/* Decorative Floating Nodes */}
            <FloatingNode icon={MapPin} className="top-1/4 left-10 md:left-20 text-[var(--secondary)]" delay={1} />
            <FloatingNode icon={Radio} className="bottom-1/3 right-10 md:right-24 text-[var(--accent)]" delay={1.5} />
            <FloatingNode icon={Zap} className="top-1/3 right-20 md:right-40 text-[var(--primary)]" delay={2} />

        </section>
    );
}

import { type LucideIcon } from "lucide-react";

function FloatingNode({ icon: Icon, className, delay }: { icon: LucideIcon, className: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1, y: [0, -20, 0] }}
            transition={{
                opacity: { delay, duration: 0.5 },
                scale: { delay, duration: 0.5 },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay }
            }}
            className={cn("absolute hidden md:flex items-center justify-center w-12 h-12 glass-panel rounded-xl", className)}
        >
            <Icon className="w-6 h-6" />
            <div className="absolute -inset-2 bg-inherit opacity-20 blur-lg rounded-xl"></div>
        </motion.div>
    )
}
