'use client';
import { motion } from 'framer-motion';

export default function AnimatedLines() {
    return (
        <section className="relative py-24 overflow-hidden bg-[#0d1117]">
            {/* Animated gradient orbs */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        We speak <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-600">your stack</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Design, DevOps, AI, Cloud, and Architecture — crafted with battle-tested technologies
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Large Featured Card - Full Stack */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 lg:row-span-2 relative group rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-pink-500/50"
                    >
                        <div className="relative h-full bg-slate-900 rounded-2xl p-8 overflow-hidden">
                            {/* Background pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <svg className="w-full h-full">
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    <span className="text-xs font-semibold text-blue-400">FULL-STACK</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4">Custom Tech Stacks</h3>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    Mix-and-match technologies per project. TypeScript-first APIs, Python ML pipelines, or Rust for performance-critical services.
                                </p>

                                {/* Tech Stack Icons SVG */}
                                <div className="flex items-center gap-3 flex-wrap">
                                    {['TS', 'Py', 'Rs', 'Go'].map((tech, i) => (
                                        <motion.div
                                            key={tech}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + i * 0.1 }}
                                            className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-mono text-xs font-bold hover:border-blue-500 hover:text-blue-400 transition-all cursor-pointer"
                                        >
                                            {tech}
                                        </motion.div>
                                    ))}
                                    <div className="text-slate-600 text-2xl">+20</div>
                                </div>
                            </div>

                            {/* Animated corner accent */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    </motion.div>

                    {/* Performance Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-green-500/50 to-emerald-500/50"
                    >
                        <div className="relative h-full bg-slate-900 rounded-2xl p-6 overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Performance</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    SSR, edge caching, and memory optimization built-in
                                </p>
                            </div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-green-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.div>

                    {/* Cloud Infrastructure */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-sky-500/50 to-cyan-500/50"
                    >
                        <div className="relative h-full bg-slate-900 rounded-2xl p-6 overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Cloud Native</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    K8s, IaC templates, auto-scaling infrastructure
                                </p>
                            </div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-sky-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.div>

                    {/* AI Integration - Wide Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 relative group rounded-2xl p-[1px] bg-gradient-to-br from-orange-500/50 to-amber-500/50"
                    >
                        <div className="relative h-full bg-slate-900 rounded-2xl p-6 overflow-hidden">
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3">
                                        <span className="text-xs font-semibold text-orange-400">AI/ML</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Pragmatic AI Integration</h3>
                                    <p className="text-sm text-slate-400 max-w-md">
                                        LLM pipelines, embeddings search, RAG systems, and inference at scale
                                    </p>
                                </div>

                                {/* AI Neural Network SVG */}
                                <svg className="w-32 h-24 opacity-30 group-hover:opacity-50 transition-opacity" viewBox="0 0 120 80">
                                    <defs>
                                        <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#f59e0b" />
                                            <stop offset="100%" stopColor="#fb923c" />
                                        </linearGradient>
                                    </defs>
                                    {/* Input layer */}
                                    <circle cx="20" cy="20" r="6" fill="url(#aiGrad)" opacity="0.5">
                                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="20" cy="40" r="6" fill="url(#aiGrad)" opacity="0.5">
                                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.3s" />
                                    </circle>
                                    <circle cx="20" cy="60" r="6" fill="url(#aiGrad)" opacity="0.5">
                                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
                                    </circle>
                                    {/* Hidden layer */}
                                    <circle cx="60" cy="15" r="6" fill="url(#aiGrad)" opacity="0.4" />
                                    <circle cx="60" cy="35" r="6" fill="url(#aiGrad)" opacity="0.4" />
                                    <circle cx="60" cy="55" r="6" fill="url(#aiGrad)" opacity="0.4" />
                                    <circle cx="60" cy="65" r="6" fill="url(#aiGrad)" opacity="0.4" />
                                    {/* Output layer */}
                                    <circle cx="100" cy="30" r="6" fill="url(#aiGrad)" opacity="0.5" />
                                    <circle cx="100" cy="50" r="6" fill="url(#aiGrad)" opacity="0.5" />
                                    {/* Connections */}
                                    <line x1="20" y1="20" x2="60" y2="15" stroke="url(#aiGrad)" strokeWidth="0.5" opacity="0.3" />
                                    <line x1="20" y1="40" x2="60" y2="35" stroke="url(#aiGrad)" strokeWidth="0.5" opacity="0.3" />
                                    <line x1="60" y1="35" x2="100" y2="30" stroke="url(#aiGrad)" strokeWidth="0.5" opacity="0.3" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Design Systems */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/50 to-pink-500/50"
                    >
                        <div className="relative h-full bg-slate-900 rounded-2xl p-6 overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Design Systems</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Component libraries with accessibility and design tokens
                                </p>
                            </div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.div>

                    {/* Security */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-red-500/50 to-rose-500/50"
                    >
                        <div className="relative h-full bg-slate-900 rounded-2xl p-6 overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Security First</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    OAuth, JWT, encryption, and compliance standards
                                </p>
                            </div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-red-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="mt-12 text-center"
                >
                    <p className="text-slate-500 text-sm">
                        Ready to build with modern, scalable technologies? Let's discuss your stack.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}