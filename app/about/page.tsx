'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiLayers, FiCpu, FiTrendingUp, FiUsers, FiAward, FiActivity } from 'react-icons/fi';
import Team from '@/app/components/Team';

const stats = [
    { label: 'Successful Projects', value: '120+', icon: FiCheckCircle },
    { label: 'Happy Clients', value: '45+', icon: FiUsers },
    { label: 'Awards Won', value: '12', icon: FiAward },
    { label: 'Uptime', value: '99.9%', icon: FiActivity },
];

const values = [
    {
        title: 'Bold Ambition',
        description: 'We don\'t just follow trends; we set them. Our goal is to build the future of the web.',
        icon: FiTrendingUp,
        color: 'from-blue-500 to-indigo-600',
        size: 'md:col-span-2'
    },
    {
        title: 'Technical Precision',
        description: 'Every line of code is crafted with care and performance in mind.',
        icon: FiCpu,
        color: 'from-purple-500 to-pink-600',
        size: 'md:col-span-1'
    },
    {
        title: 'User-Centric',
        description: 'Design that speaks to the soul and logic that simplifies the complex.',
        icon: FiLayers,
        color: 'from-orange-500 to-red-600',
        size: 'md:col-span-1'
    },
    {
        title: 'Scalable Growth',
        description: 'Our architectures are built to grow with your business, today and tomorrow.',
        icon: FiArrowRight,
        color: 'from-emerald-500 to-teal-600',
        size: 'md:col-span-2'
    }
];

export default function AboutPage() {
    return (
        <main className="bg-[#0d1117] min-h-screen overflow-x-hidden">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full" />
            </div>

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 uppercase tracking-widest"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        Our Story
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight"
                    >
                        Building the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                            Digital Frontier
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        Welcome to Allpilar. We are a collective of designers, engineers, and visionaries
                        dedicated to crafting software that doesn't just work—it inspires.
                        We blend high-end aesthetics with industrial-grade performance.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-4 pt-8"
                    >
                        <Link
                            href="/projects"
                            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_30px_rgba(79,70,229,0.3)]"
                        >
                            View Portfolio
                            <FiArrowRight />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                        >
                            Contact Us
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center lg:items-start space-y-2"
                            >
                                <div className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-black text-slate-500 uppercase tracking-widest text-center lg:text-left">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CORE VALUES - BENTO GRID */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Core <span className="text-indigo-500">Principles</span>
                    </h2>
                    <p className="text-slate-400 font-medium max-w-xl">
                        Our philosophy is built on four pillars that guide every decision we make.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((v, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`${v.size} group relative p-8 rounded-[2rem] bg-[#161b22]/40 backdrop-blur-xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-500`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-500`} />

                            <div className="relative z-10 space-y-4">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white text-2xl shadow-xl`}>
                                    <v.icon />
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-tight">{v.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">{v.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TEAM SECTION (Existing Component) */}
            <div className="pt-20">
                <Team />
            </div>

            {/* CALL TO ACTION */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto relative rounded-[3rem] bg-gradient-to-br from-indigo-600 to-purple-800 p-12 md:p-24 overflow-hidden text-center shadow-2xl">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                            Ready to build something <br /> extraordinary?
                        </h2>
                        <p className="text-indigo-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Let's collaborate on your next project and turn your vision
                            into a digital reality that stands out.
                        </p>
                        <div className="pt-4 flex justify-center">
                            <Link
                                href="/contact"
                                className="px-10 py-5 bg-white text-indigo-950 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl"
                            >
                                Start a Conversation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

