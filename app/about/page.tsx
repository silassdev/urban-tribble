'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const metadata = {
    title: 'About Allpilar – Premium Web Solutions',
    description: 'Discover Allpilar’s mission, expertise, and the team delivering high‑performance web applications, AI integrations, and scalable digital solutions.',
};

export default function AboutPage() {
    return (
        <section className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col items-center justify-center py-20 px-4">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl text-center space-y-6"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Crafting Digital Excellence
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                    At Allpilar we blend cutting‑edge technology with meticulous design to deliver solutions that scale, perform, and impress. From bespoke web architectures to AI‑driven platforms, we turn complex challenges into elegant products.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                    <Link
                        href="/#pricing"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                    >
                        Explore Pricing
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors"
                    >
                        Get In Touch
                    </Link>
                </div>
            </motion.div>

            {/* Features */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-16 grid gap-8 md:grid-cols-3 max-w-6xl"
            >
                <div className="p-6 bg-[#0d1117]/50 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Scalable Architecture</h3>
                    <p className="text-sm text-slate-400">
                        Build applications that grow with your business, leveraging micro‑services, serverless, and cloud‑native patterns.
                    </p>
                </div>
                <div className="p-6 bg-[#0d1117]/50 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">AI & Data Integration</h3>
                    <p className="text-sm text-slate-400">
                        Harness the power of machine learning, embeddings, and intelligent pipelines to unlock new capabilities.
                    </p>
                </div>
                <div className="p-6 bg-[#0d1117]/50 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Premium Support</h3>
                    <p className="text-sm text-slate-400">
                        Dedicated onboarding, SLA‑backed support, and continuous monitoring for mission‑critical projects.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}

