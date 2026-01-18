'use client';
import { motion } from 'framer-motion';

export default function AnimatedLines() {
    const leftText = 'We speak your stack — multiple options';
    const rightText = 'Design, DevOps, AI, Cloud, Architecture';

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Soft glowing backdrop */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-5xl mx-auto grid gap-12">
                {/* Animated text rows */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#0d1117]/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Right‑side floating text */}
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-xs font-mono text-sky-500 mb-2">01 — float.right</p>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-200 animate-floatLR">
                                {rightText}
                            </h2>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-slate-700 to-transparent" />

                        {/* Left‑side floating text */}
                        <div className="flex-1 text-center md:text-right">
                            <p className="text-xs font-mono text-purple-500 mb-2">02 — float.left</p>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-200 animate-floatRL">
                                {leftText}
                            </h2>
                        </div>
                    </div>
                </motion.div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-xl border border-slate-800 bg-[#0d1117]/80 hover:bg-slate-800/30 transition-colors p-8"
                    >
                        <h3 className="text-base font-bold text-white mb-2">Custom Stacks</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Mix‑and‑match stacks per project. Deploy TypeScript‑first APIs or PHP
                            micro‑services depending on constraints.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-xl border border-slate-800 bg-[#0d1117]/80 hover:bg-slate-800/30 transition-colors p-8"
                    >
                        <h3 className="text-base font-bold text-white mb-2">Performance</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Memory optimisation, server‑side rendering strategies, and edge‑caching
                            patterns included by default.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}