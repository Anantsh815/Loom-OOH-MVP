"use client";

import dynamic from "next/dynamic";

// Dynamically import the map component with ssr: false
const LeafletMap = dynamic(
    () => import("./LeafletMapInternal"),
    {
        loading: () => (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#050a14] text-slate-500 animate-pulse">
                <span className="text-sm">Loading Network...</span>
            </div>
        ),
        ssr: false
    }
);

export function LoomMap() {
    return (
        <div className="w-full h-[500px] rounded-3xl overflow-hidden border border-[var(--card-border)] relative z-0 shadow-2xl">
            <LeafletMap />

            {/* Overlay Controls (Kept from previous version) */}
            <div className="absolute top-4 left-4 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-[var(--card-border)] text-white z-[1000]">
                <h4 className="font-bold text-[var(--primary)] mb-1">Live Network</h4>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
                    Running perfectly
                </div>
            </div>
        </div>
    );
}
