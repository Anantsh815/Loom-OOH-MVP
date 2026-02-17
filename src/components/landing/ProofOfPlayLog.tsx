"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Terminal } from "lucide-react";

interface LogEntry {
    id: string;
    timestamp: string;
    node: string;
    message: string;
}

const NODES = ["BLR_IND_04", "MUM_AND_12", "DEL_CYB_08", "BLR_KOR_22", "MUM_BAN_15", "HYD_HIT_10"];

export function ProofOfPlayLog() {
    const [logs, setLogs] = useState<LogEntry[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timestamp = now.toLocaleTimeString('en-GB', { hour12: false });
            const node = NODES[Math.floor(Math.random() * NODES.length)];

            const newLog: LogEntry = {
                id: Math.random().toString(36).substr(2, 9),
                timestamp,
                node,
                message: "Ad Played (Verified by Loom Analytics)"
            };

            setLogs(prev => [newLog, ...prev].slice(0, 5));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#0a0a0a] border border-[#00FFFF]/20 rounded-none p-4 w-full max-w-sm font-mono overflow-hidden">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <Terminal className="w-4 h-4 text-[#00FFFF]" />
                <h3 className="text-[10px] text-white uppercase tracking-[0.3em] font-black">Live Verification Log</h3>
                <div className="ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full animate-pulse"></span>
                    <span className="text-[8px] text-[#00FFFF]">LIVE_POP</span>
                </div>
            </div>

            <div className="space-y-3 h-[180px] overflow-hidden">
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col gap-1 border-l-2 border-[#00FFFF]/30 pl-3 py-1"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] text-slate-500 font-bold">{log.timestamp}</span>
                                <ShieldCheck className="w-3 h-3 text-[#00FFFF]" />
                            </div>
                            <div className="text-[10px] text-white">
                                Node <span className="text-[#00FFFF]">{log.node}</span>: {log.message}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                <div className="text-[8px] text-slate-600 uppercase tracking-widest">Audited by Loom PoP Protocol</div>
                <CheckCircle2 className="w-3 h-3 text-green-500" />
            </div>
        </div>
    );
}
