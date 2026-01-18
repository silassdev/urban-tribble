'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import WebAppArchitecture from './WebAppArchitecture'

const TAGLINES = [
    'One solution for web applications',
    'Building scalable, robust architectures',
    'Type-safe stacks and memory optimization',
    'Cloud-native deployments and IaC',
    'AI integration for product acceleration'
]

export default function Hero() {
    const [idx, setIdx] = useState(0)

    useEffect(() => {
        const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return
        const t = setInterval(() => setIdx(i => (i + 1) % TAGLINES.length), 3500)
        return () => clearInterval(t)
    }, [])

    return (
        <section className="pt-20 pb-12 lg:pt-32 lg:pb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium text-sky-400 mb-6 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                            Production-ready patterns
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-8">
                            Build faster with <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600">
                                Allpilar Solutions
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-400 max-w-lg leading-relaxed mb-10">
                            We design web systems: frontends, backends, cloud platforms, and pragmatic AI integrations that scale.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transform hover:-translate-y-0.5"
                            >
                                Start Building
                                <FiArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="/#pricing"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition-all backdrop-blur-sm"
                            >
                                Our Pricing
                            </Link>
                        </div>

                        <div className="border-t border-slate-800/60 pt-8">
                            <div className="flex items-center gap-3 text-slate-500 text-sm mb-2">
                                <span className="font-semibold text-slate-400">Focus:</span>
                                <div>
                                    <motion.span
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="inline-block text-sky-400 font-medium"
                                    >
                                        {TAGLINES[idx]}
                                    </motion.span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl p-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent" />
                            <div className="relative">
                                <WebAppArchitecture />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
