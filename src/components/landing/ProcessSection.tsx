"use client";

import { motion } from "framer-motion";
import { Search, MapPin, BarChart3, Rocket } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discovery",
    description: "We analyze your brand goals and identify key high-traffic zones tailored to your audience.",
    icon: Search,
  },
  {
    id: "02",
    title: "Planning",
    description: "Our AI-driven system maps out the optimal screen network for maximum visibility and impact.",
    icon: MapPin,
  },
  {
    id: "03",
    title: "Execution",
    description: "Seamless deployment of your creative assets across hundreds of digital screens instantly.",
    icon: Rocket,
  },
  {
    id: "04",
    title: "Analytics",
    description: "Real-time performance tracking and audience insights to measure your campaign's success.",
    icon: BarChart3,
  },
];

export function ProcessSection() {
  return (
    <section className="relative py-32 bg-[var(--background)] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h3 className="text-base font-bold tracking-[0.2em] text-white mb-2 font-[family-name:var(--font-space-grotesk)]">
            HOW
          </h3>
          <h2 className="text-5xl md:text-7xl font-black text-white font-[family-name:var(--font-space-grotesk)] tracking-tighter">
            WE WORK?
          </h2>
        </motion.div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="group h-full"
            >
              {/* Card */}
              <div className="h-full bg-[#0a0a0a] border border-[#00FFFF] rounded-none p-8 flex flex-col items-start transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:-translate-y-1">

                {/* Number */}
                <div className="text-2xl font-bold text-slate-200 mb-6 font-[family-name:var(--font-space-grotesk)] w-full border-b border-white/10 pb-4">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="mb-5 text-[#00FFFF] transform transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-space-grotesk)] uppercase tracking-wide">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Loom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden pointer-events-none select-none z-0 opacity-60">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          {/* Wave 1 - Slow */}
          <motion.path
            initial={{ x: 0 }}
            animate={{ x: -1440 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            fill="none"
            stroke="#00FFFF"
            strokeWidth="1"
            strokeOpacity="0.3"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          {/* Wave 1 Duplicate for Seamless Loop */}
          <motion.path
            initial={{ x: 1440 }}
            animate={{ x: 0 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            fill="none"
            stroke="#00FFFF"
            strokeWidth="1"
            strokeOpacity="0.3"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />

          {/* Wave 2 - Faster, lower opacity */}
          <motion.path
            initial={{ x: 0 }}
            animate={{ x: 1440 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            fill="url(#gradient)"
            fillOpacity="0.1"
            stroke="#00FFFF"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <motion.path
            initial={{ x: -1440 }}
            animate={{ x: 0 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            fill="url(#gradient)"
            fillOpacity="0.1"
            stroke="#00FFFF"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </section>
  );
}
