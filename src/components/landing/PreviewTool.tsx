"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Coffee, Car, Glasses } from "lucide-react";
import { IntakeModal } from "./IntakeModal";

/* ─── CSS Ad Creatives ─────────────────────────────────────────────────
   Each trigger renders a self-contained, styled "ad card" inside the
   billboard screen. No external images — zero broken dependencies.  */

function SunnyCreative() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative"
            style={{ background: "linear-gradient(135deg, #FF8C00 0%, #FFD700 40%, #FFF8DC 100%)" }}>
            <div className="absolute inset-0 opacity-20"
                style={{ background: "repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(255,255,255,0.3) 10deg 20deg)" }} />
            <Glasses className="w-10 h-10 md:w-14 md:h-14 text-black/80 mb-2 md:mb-3 drop-shadow-lg" />
            <div className="text-black font-black text-lg md:text-3xl tracking-tighter text-center leading-tight px-4"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                SUN-KISSED
            </div>
            <div className="text-black/60 text-[9px] md:text-xs font-bold uppercase tracking-[0.3em] mt-1">
                Premium Eyewear Co.
            </div>
            <div className="absolute bottom-3 md:bottom-5 left-0 right-0 flex justify-center">
                <div className="bg-black text-yellow-400 text-[8px] md:text-[10px] font-black px-4 py-1.5 md:px-5 md:py-2 uppercase tracking-widest">
                    Shop the Summer Drop →
                </div>
            </div>
        </div>
    );
}

function RainyCreative() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #1a0a00 0%, #3d1c00 30%, #5a2d0a 100%)" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-20 opacity-20 blur-md rounded-full"
                style={{ background: "radial-gradient(ellipse, rgba(255,200,150,0.6), transparent)" }} />
            <div className="absolute inset-0 opacity-10"
                style={{ background: "repeating-linear-gradient(95deg, transparent, transparent 10px, rgba(150,200,255,0.3) 10px, rgba(150,200,255,0.3) 11px)" }} />
            <Coffee className="w-10 h-10 md:w-14 md:h-14 text-amber-400 mb-2 md:mb-3 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            <div className="text-amber-100 font-black text-lg md:text-2xl tracking-tight text-center leading-tight px-4"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                STEAMING HOT COFFEE
            </div>
            <div className="text-amber-400/70 text-[8px] md:text-[11px] font-medium text-center mt-1 md:mt-2 italic px-6 leading-tight">
                Perfect for a rainy Indiranagar evening
            </div>
            <div className="absolute bottom-3 md:bottom-5 left-0 right-0 flex justify-center">
                <div className="bg-amber-500 text-black text-[8px] md:text-[10px] font-black px-4 py-1.5 md:px-5 md:py-2 uppercase tracking-widest">
                    Order on Loom →
                </div>
            </div>
        </div>
    );
}

function NightCreative() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #020818 0%, #0a1628 40%, #111827 100%)" }}>
            <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-yellow-400/30 blur-sm" />
            <div className="absolute top-6 right-8 w-1.5 h-1.5 rounded-full bg-blue-400/20 blur-sm" />
            <div className="absolute bottom-8 left-12 w-1 h-1 rounded-full bg-cyan-400/30 blur-sm" />
            <div className="absolute top-10 left-1/3 w-2 h-2 rounded-full bg-purple-400/20 blur-sm" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-8 opacity-10"
                style={{ background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.4), transparent)" }} />
            <Car className="w-10 h-10 md:w-14 md:h-14 text-[#00FFFF] mb-2 md:mb-3 drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]" />
            <div className="text-white font-black text-lg md:text-2xl tracking-tight text-center leading-tight px-4"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                LOOM CABS
            </div>
            <div className="text-[#00FFFF] text-[9px] md:text-xs font-bold uppercase tracking-[0.25em] mt-1">
                Safe Night Transit
            </div>
            <div className="absolute bottom-3 md:bottom-5 left-0 right-0 flex justify-center">
                <div className="bg-[#00FFFF] text-black text-[8px] md:text-[10px] font-black px-4 py-1.5 md:px-5 md:py-2 uppercase tracking-widest">
                    Book a Ride Now →
                </div>
            </div>
        </div>
    );
}

/* ─── Main Component ──────────────────────────────────────────────── */

export function PreviewTool() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isIdOpen, setIsIdOpen] = useState(false);
    const [activeTrigger, setActiveTrigger] = useState<"sunny" | "rainy" | "night">("sunny");

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
    });

    const triggerMeta = {
        sunny: { label: "Sunny", icon: "☀️", hint: "Contextual switch detected: Serving vibrant 'Premium Eyewear' campaign for clear skies." },
        rainy: { label: "Rainy", icon: "🌧️", hint: "Contextual switch detected: Updating creative to 'Hot Coffee' — matching the urban rainy mood." },
        night: { label: "Night Rush", icon: "🌃", hint: "Contextual switch detected: Deploying 'Loom Cabs' Safe Transit creative for evening hours." },
    };

    const currentMeta = triggerMeta[activeTrigger];

    /* Trigger-specific glow for the billboard frame */
    const frameGlow = {
        sunny: "0 0 60px rgba(255,200,0,0.15), 0 0 120px rgba(255,140,0,0.08)",
        rainy: "0 0 60px rgba(59,130,246,0.15), 0 0 120px rgba(30,80,180,0.08)",
        night: "0 0 60px rgba(0,255,255,0.2), 0 0 120px rgba(0,255,255,0.1)",
    };

    return (
        <section className="py-24 px-4 bg-[#050a14] relative overflow-hidden" id="trigger-simulator">
            <IntakeModal isOpen={isIdOpen} onClose={() => setIsIdOpen(false)} />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Controls */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black font-[family-name:var(--font-space-grotesk)] tracking-tighter uppercase"
                        >
                            Trigger <span className="text-[var(--primary)]">Simulator</span>
                        </motion.h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Demonstrating <strong className="text-white">DCO (Dynamic Creative Optimization)</strong>. Loom isn&apos;t just a screen — it&apos;s an intelligent responder to the urban environment.
                        </p>
                    </div>

                    {/* Simulator Controls */}
                    <div className="bg-[#0a0a0a] border border-[#00FFFF]/20 p-6 rounded-none space-y-6">
                        <h4 className="text-[10px] text-white uppercase tracking-[0.4em] font-black">Environmental Triggers</h4>
                        <div className="flex flex-wrap gap-3">
                            {(["sunny", "rainy", "night"] as const).map((id) => (
                                <button
                                    key={id}
                                    onClick={() => {
                                        setActiveTrigger(id);
                                        setUploadedImage(null);
                                    }}
                                    className={`
                                        flex-1 px-4 py-3 border text-xs font-bold uppercase tracking-widest transition-all duration-300
                                        ${activeTrigger === id
                                            ? "bg-[#00FFFF] text-black border-[#00FFFF] shadow-[0_0_15px_#00FFFF]"
                                            : "bg-black text-slate-400 border-white/5 hover:border-[#00FFFF]/40"}
                                    `}
                                >
                                    <span className="mr-2">{triggerMeta[id].icon}</span> {triggerMeta[id].label}
                                </button>
                            ))}
                        </div>

                        {/* Dynamic context hint */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={activeTrigger}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="text-[10px] text-[#00FFFF]/60 italic leading-relaxed"
                            >
                                {currentMeta.hint}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <div className="relative">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-4">OR Manual Upload Test</div>
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-none p-10 text-center cursor-pointer transition-all duration-300 ${isDragActive ? "border-[var(--primary)] bg-[var(--primary)]/10" : "border-white/5 bg-black/40 hover:border-[var(--primary)]/50"
                                }`}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <Upload className="w-8 h-8 text-[var(--primary)]" />
                                <div className="text-sm text-slate-300 font-bold uppercase tracking-tighter">
                                    {isDragActive ? "Release Ad..." : "Push Your Creative"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {uploadedImage && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <Button size="lg" onClick={() => setIsIdOpen(true)} className="w-full bg-[#00FFFF] text-black hover:shadow-[0_0_20px_#00FFFF] rounded-none font-black uppercase tracking-widest">
                                GO LIVE (MANUAL PUSH)
                            </Button>
                        </motion.div>
                    )}
                </div>

                {/* ═══════════════════════════════════════════════════════
                    Right: CSS 3D Billboard — Structurally Defined
                    No static image overlay. Frame, screen, glass, pole
                    are all constructed in CSS. Content alignment is
                    guaranteed because the screen IS a child div.
                ═══════════════════════════════════════════════════════ */}
                <div className="relative flex flex-col items-center">
                    {/* Perspective Container */}
                    <div
                        className="w-full relative"
                        style={{ perspective: "1000px" }}
                    >
                        {/* 3D Rotated Billboard Assembly */}
                        <motion.div
                            initial={{ opacity: 0, rotateY: 25 }}
                            whileInView={{ opacity: 1, rotateY: 12 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative transition-all duration-700"
                            style={{
                                transform: "rotateY(12deg) rotateX(3deg)",
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {/* ── Billboard Frame ── */}
                            <div
                                className="relative rounded-sm transition-shadow duration-700"
                                style={{
                                    background: "linear-gradient(135deg, #1a1a2e 0%, #16161a 50%, #0d0d12 100%)",
                                    padding: "16px 18px 20px 18px",
                                    boxShadow: `
                                        inset 0 1px 0 rgba(255,255,255,0.08),
                                        inset 0 -1px 0 rgba(0,0,0,0.5),
                                        ${uploadedImage ? "0 20px 60px rgba(0,0,0,0.6)" : frameGlow[activeTrigger]},
                                        0 30px 80px rgba(0,0,0,0.5)
                                    `,
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                {/* Frame edge highlight (top) */}
                                <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                {/* ── LED Screen Area (16:9) ── */}
                                <div
                                    className="relative w-full overflow-hidden bg-black"
                                    style={{
                                        aspectRatio: "16 / 9",
                                        boxShadow: "inset 0 0 30px rgba(0,0,0,0.8), inset 0 0 4px rgba(0,0,0,0.9)",
                                        border: "2px solid rgba(0,0,0,0.8)",
                                    }}
                                >
                                    {/* DCO Content */}
                                    <AnimatePresence mode="wait">
                                        {uploadedImage ? (
                                            <motion.img
                                                key="user-upload"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                src={uploadedImage}
                                                alt="User Ad"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <motion.div
                                                key={activeTrigger}
                                                initial={{ opacity: 0, scale: 1.05 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.6 }}
                                                className="w-full h-full"
                                            >
                                                {activeTrigger === "sunny" && <SunnyCreative />}
                                                {activeTrigger === "rainy" && <RainyCreative />}
                                                {activeTrigger === "night" && <NightCreative />}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* CRT Scanline overlay */}
                                    <div
                                        className="absolute inset-0 z-10 pointer-events-none opacity-40"
                                        style={{
                                            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                                        }}
                                    />

                                    {/* Glass Reflection overlay */}
                                    <div
                                        className="absolute inset-0 z-20 pointer-events-none"
                                        style={{
                                            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)",
                                        }}
                                    />

                                    {/* LED pixel grid texture */}
                                    <div
                                        className="absolute inset-0 z-10 pointer-events-none opacity-20"
                                        style={{
                                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                                            backgroundSize: "3px 3px",
                                        }}
                                    />

                                    {/* Screen edge glow (inner light bleed) */}
                                    <div className="absolute inset-0 z-10 pointer-events-none"
                                        style={{
                                            boxShadow: "inset 0 0 15px rgba(0,255,255,0.05), inset 0 0 40px rgba(0,0,0,0.3)",
                                        }}
                                    />
                                </div>

                                {/* Loom branding strip below screen */}
                                <div className="flex items-center justify-between mt-2 px-1">
                                    <div className="text-[8px] text-[#00FFFF]/40 font-black tracking-[0.4em] uppercase">
                                        LOOM · OOH
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <div className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full animate-ping absolute inset-0" />
                                            <div className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full relative shadow-[0_0_6px_#00FFFF]" />
                                        </div>
                                        <div className="text-[7px] text-white/50 font-bold uppercase tracking-widest">
                                            LIVE
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Support Column ── */}
                            <div className="flex justify-center">
                                <div
                                    className="relative"
                                    style={{
                                        width: "12px",
                                        height: "60px",
                                        background: "linear-gradient(90deg, #1a1a2e, #2a2a3e, #1a1a2e)",
                                        boxShadow: "2px 0 8px rgba(0,0,0,0.4), -2px 0 8px rgba(0,0,0,0.4)",
                                    }}
                                >
                                    {/* Column highlight */}
                                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/5" />
                                </div>
                            </div>

                            {/* ── Ground Shadow ── */}
                            <div
                                className="mx-auto"
                                style={{
                                    width: "80%",
                                    height: "8px",
                                    background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
                                    filter: "blur(4px)",
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* Live Status Badge */}
                    <div className="mt-6 flex items-center gap-4 p-4 bg-black/80 border border-[#00FFFF]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                        <div className="relative">
                            <div className="w-3 h-3 bg-[#00FFFF] rounded-full animate-ping absolute inset-0" />
                            <div className="w-3 h-3 bg-[#00FFFF] rounded-full relative shadow-[0_0_10px_#00FFFF]" />
                        </div>
                        <div>
                            <div className="text-[8px] text-[#00FFFF] font-black tracking-[0.3em] uppercase" style={{ textShadow: "0 0 8px rgba(0,255,255,0.5)" }}>
                                Status
                            </div>
                            <div className="text-[10px] text-white font-bold uppercase">
                                Dynamic Playback Active
                            </div>
                        </div>
                    </div>

                    {/* Caption */}
                    <motion.div
                        key={activeTrigger}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-center"
                    >
                        <p className="text-[10px] text-[#00FFFF]/50 uppercase tracking-[0.2em] font-bold">
                            Contextual switch detected: Updating creative to match urban environment.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
