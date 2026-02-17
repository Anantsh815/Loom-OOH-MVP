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
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setUploadedImage(null);
    };

    return (
        <section className="py-24 px-4 bg-[#050a14] relative overflow-hidden">
            <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Controls */}
                <div className="space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold font-[family-name:var(--font-space-grotesk)]"
                    >
                        See Your Brand <br /> <span className="text-[var(--primary)]">In The Wild</span>
                    </motion.h2>
                    <p className="text-slate-400 text-lg">
                        Upload your creative to see how it looks on a prime Indiranagar billboard instantly.
                    </p>

                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragActive ? "border-[var(--primary)] bg-[var(--primary)]/10" : "border-[var(--card-border)] hover:border-[var(--primary)]/50"
                            }`}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 rounded-full bg-[var(--card)] flex items-center justify-center">
                                <Upload className="w-6 h-6 text-[var(--primary)]" />
                            </div>
                            <div className="text-sm text-slate-300">
                                {isDragActive ? "Drop it here..." : "Drag & drop your ad creative, or click to select"}
                            </div>
                            <div className="text-xs text-slate-500">Supports JPG, PNG, WEBP</div>
                        </div>
                    </div>

                    {uploadedImage && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-4"
                        >
                            <Button size="lg" onClick={() => setIsModalOpen(true)} className="w-full text-md font-bold h-12">
                                Go Live with this Creative
                            </Button>
                            <button onClick={clearImage} className="w-full text-center text-xs text-slate-500 mt-3 hover:text-white">
                                Remove image
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Right: Visualization */}
                <div className="relative perspective-[1000px]">
                    <div className="relative rounded-lg overflow-hidden shadow-2xl border border-[var(--card-border)]">
                        {/* Base Mockup */}
                        <Image
                            src="/billboard-mockup.png"
                            alt="Billboard Mockup"
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                        />

                        {/* Overlay Area - Calibrated to the specific generated image 
                  These values (top, left, width, height, rotate, skew) need manual tuning 
                  based on the generated image perspective. 
                  Based on the prompt "slightly angled", we will apply a generic perspective transform.
              */}
                        {uploadedImage && (
                            <div
                                className="absolute top-[14%] left-[18%] w-[61%] h-[39%] overflow-hidden bg-black"
                                style={{
                                    transform: "rotateY(-6deg) rotateX(4deg) skewY(-2deg)",
                                    transformOrigin: "top left",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.5) inset"
                                }}
                            >
                                <img src={uploadedImage} alt="Ad Content" className="w-full h-full object-cover opacity-90" />
                                {/* Scanline/Grid effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                            </div>
                        )}

                        {/* Reflection/Glow if needed */}
                        {uploadedImage && (
                            <div className="absolute top-[14%] left-[18%] w-[61%] h-[39%] bg-[var(--primary)] opacity-10 blur-xl pointer-events-none mix-blend-screen"
                                style={{
                                    transform: "rotateY(-6deg) rotateX(4deg) skewY(-2deg)",
                                    transformOrigin: "top left",
                                }}
                            ></div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
