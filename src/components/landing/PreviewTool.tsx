"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { IntakeModal } from "./IntakeModal";

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
                setActiveTrigger("sunny"); // Default to sunny when new ad uploaded
            };
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
    });

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setUploadedImage(null);
    };

    // Simulated DCO Logic
    const getTriggeredAd = () => {
        if (uploadedImage) return uploadedImage;

        switch (activeTrigger) {
            case "rainy":
                return "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1000&auto=format&fit=crop"; // Hot Coffee
            case "night":
                return "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1000&auto=format&fit=crop"; // Night Cab/Transit
            default:
                return "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop"; // Normal Loom Brand
        }
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
                        <p className="text-slate-400 text-lg">
                            Demonstrating **DCO (Dynamic Creative Optimization)**. Loom isn't just a screen; it's an intelligent responder to the urban environment.
                        </p>
                    </div>

                    {/* Simulator Controls */}
                    <div className="bg-[#0a0a0a] border border-[#00FFFF]/20 p-6 rounded-none space-y-6">
                        <h4 className="text-[10px] text-white uppercase tracking-[0.4em] font-black">Environmental Triggers</h4>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { id: "sunny", label: "Sunny", icon: "☀️" },
                                { id: "rainy", label: "Rainy", icon: "🌧️" },
                                { id: "night", label: "Night Rush", icon: "🌃" }
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setActiveTrigger(t.id as any);
                                        setUploadedImage(null); // Clear manual upload to show DCO
                                    }}
                                    className={`
                                        flex-1 px-4 py-3 border text-xs font-bold uppercase tracking-widest transition-all
                                        ${activeTrigger === t.id
                                            ? "bg-[#00FFFF] text-black border-[#00FFFF] shadow-[0_0_15px_#00FFFF]"
                                            : "bg-black text-slate-400 border-white/5 hover:border-[#00FFFF]/40"}
                                    `}
                                >
                                    <span className="mr-2">{t.icon}</span> {t.label}
                                </button>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-500 italic">
                            {activeTrigger === "rainy" && "* Switch detected: Showing 'Hot Coffee' creative to matching urban mood."}
                            {activeTrigger === "night" && "* Switch detected: Showing 'Cab Services' for safe transit during Night Rush."}
                            {activeTrigger === "sunny" && "* System Idle: Showing primary brand awareness campaign."}
                        </p>
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

                {/* Right: Visualization */}
                <div className="relative group">
                    <div className={`
                        relative overflow-hidden border transition-all duration-700
                        ${activeTrigger === 'rainy' ? 'border-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.2)]' : 'border-white/10 shadow-2xl'}
                    `}>
                        {/* Base Mockup */}
                        <Image
                            src="/billboard-mockup.png"
                            alt="Billboard Mockup"
                            width={800}
                            height={600}
                            className={`w-full h-auto object-cover transition-all duration-700 ${activeTrigger === 'night' ? 'brightness-50' : 'brightness-90'}`}
                        />

                        {/* Rain/Night Overlays */}
                        {activeTrigger === 'rainy' && (
                            <div className="absolute inset-0 bg-blue-900/10 pointer-events-none mix-blend-overlay"></div>
                        )}

                        {/* Overlay Area */}
                        <div
                            className={`absolute top-[14%] left-[18%] w-[61%] h-[39%] overflow-hidden bg-black transition-all duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]`}
                            style={{
                                transform: "rotateY(-6deg) rotateX(4deg) skewY(-2deg)",
                                transformOrigin: "top left font-black",
                            }}
                        >
                            <img
                                src={getTriggeredAd()}
                                alt="Ad Content"
                                className={`w-full h-full object-cover transition-all duration-1000 ${activeTrigger === 'rainy' ? 'sepia-[0.3]' : ''}`}
                            />

                            {/* Screen Glow */}
                            <div className={`absolute inset-0 mix-blend-screen opacity-30 shadow-[0_0_50px_rgba(0,255,255,0.4)]`}></div>

                            {/* Scanline/Grid effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,255,0.05),rgba(0,255,0,0.01),rgba(0,0,255,0.05))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                        </div>

                        {/* Live Status Badge */}
                        <div className="absolute bottom-6 left-6 p-4 bg-black/90 border border-[#00FFFF]/40 backdrop-blur-xl flex items-center gap-4">
                            <div className="w-3 h-3 bg-[#00FFFF] rounded-full animate-ping"></div>
                            <div>
                                <div className="text-[8px] text-[#00FFFF] font-black tracking-[0.3em] uppercase">Status</div>
                                <div className="text-[10px] text-white font-bold uppercase">Dynamic Playback Active</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
