"use client";

import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

const impressionData = [
    { time: "06:00", value: 120 },
    { time: "08:00", value: 680 }, // Work Peak
    { time: "10:00", value: 450 },
    { time: "12:00", value: 380 },
    { time: "14:00", value: 420 },
    { time: "16:00", value: 550 },
    { time: "18:00", value: 890 }, // Transit Peak
    { time: "20:00", value: 610 },
    { time: "22:00", value: 240 },
];

const demographicData = [
    { name: "Tech Professionals", value: 65 },
    { name: "Retail Shoppers", value: 25 },
    { name: "Students & Others", value: 10 },
];

const COLORS = ["#00FFFF", "#0088FE", "#005577"];

export function LoomAnalyticsPreview() {
    return (
        <section className="py-24 bg-[#050a14] border-y border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white font-[family-name:var(--font-space-grotesk)] tracking-tighter uppercase">
                        The <span className="text-[#00FFFF]">Pulse</span> Dashboard
                    </h2>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                        Live analytics tracking the phygital layer. We capture every verified glance.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Impression Pulse Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0a0a0a] border border-[#00FFFF]/30 p-8 rounded-none relative group"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-bold text-white uppercase tracking-widest">
                                Hourly Impression Pulse
                            </h3>
                            <div className="px-3 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/20 rounded-full">
                                <span className="text-[10px] text-[#00FFFF] font-bold">W.E.S.T. OPTIMIZED</span>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={impressionData}>
                                    <XAxis
                                        dataKey="time"
                                        stroke="#475569"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #00FFFF', borderRadius: '0' }}
                                        itemStyle={{ color: '#00FFFF' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#00FFFF"
                                        strokeWidth={3}
                                        dot={{ fill: '#00FFFF', r: 4 }}
                                        activeDot={{ r: 6, stroke: '#00FFFF', strokeWidth: 2, fill: '#0a0a0a' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Demographics Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0a0a0a] border border-[#00FFFF]/30 p-8 rounded-none relative group"
                    >
                        <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-8">
                            Audience Demographics
                        </h3>

                        <div className="h-[300px] w-full flex flex-col md:flex-row items-center">
                            <div className="flex-1 h-full w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={demographicData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {demographicData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #00FFFF', borderRadius: '0' }}
                                            labelStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex-1 space-y-4">
                                {demographicData.map((entry, index) => (
                                    <div key={entry.name} className="flex items-center space-x-3">
                                        <div className="w-3 h-3" style={{ backgroundColor: COLORS[index] }} />
                                        <div>
                                            <div className="text-xs text-slate-400 uppercase tracking-tighter">{entry.name}</div>
                                            <div className="text-xl font-bold text-white">{entry.value}%</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FFFF]/5 blur-[120px] rounded-full pointer-events-none" />
            </div>
        </section>
    );
}
