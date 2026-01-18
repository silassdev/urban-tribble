'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiMail, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'

const team = [
    {
        name: 'Silas',
        title: 'Founder & Software Engineer',
        photo: '/dummy.png',
        github: 'https://github.com/silas',
        email: 'silas@allpilar.xyz',
        bio: 'Lead architect and visionary behind AllPilar Solutions, specializing in robust scalable architectures.'
    },
    {
        name: 'Sarah Chen',
        title: 'Project Manager',
        photo: '/dummy.png',
        github: 'https://github.com/sarah',
        email: 'sarah@allpilar.xyz',
        bio: 'Expert in agile methodologies and client relations, ensuring every project is delivered with excellence.'
    },
    {
        name: 'Marcus Thorne',
        title: 'Senior Developer',
        photo: '/dummy.png',
        github: 'https://github.com/marcus',
        email: 'marcus@allpilar.xyz',
        bio: 'Deep systems expert with 10+ years of experience in backend optimization and security.'
    }
]

export default function Team() {
    const [index, setIndex] = useState(0)

    const next = () => setIndex((prev) => (prev + 1) % team.length)
    const prev = () => setIndex((prev) => (prev - 1 + team.length) % team.length)

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    >
                        Meet our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Expert Team</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        The visionaries and builders behind AllPilar Solutions.
                    </motion.p>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Photo Column */}
                        <div className="relative group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="relative aspect-square rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-purple-500/10"
                                >
                                    <Image
                                        src={team[index].photo}
                                        alt={team[index].name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation overlays for mobile */}
                            <div className="absolute inset-y-0 left-0 w-1/4 md:hidden pointer-events-auto cursor-pointer" onClick={prev} />
                            <div className="absolute inset-y-0 right-0 w-1/4 md:hidden pointer-events-auto cursor-pointer" onClick={next} />
                        </div>

                        {/* Info Column */}
                        <div className="flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-1">{team[index].name}</h3>
                                        <p className="text-xl text-purple-400 font-medium">{team[index].title}</p>
                                    </div>

                                    <p className="text-slate-300 text-lg leading-relaxed">
                                        {team[index].bio}
                                    </p>

                                    <div className="flex items-center gap-6 pt-4">
                                        <a
                                            href={team[index].github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            <FiGithub size={28} />
                                        </a>
                                        <a
                                            href={`mailto:${team[index].email}`}
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            <FiMail size={28} />
                                        </a>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Slider Controls */}
                            <div className="flex items-center gap-4 mt-12">
                                <button
                                    onClick={prev}
                                    className="p-3 rounded-full bg-slate-800/50 border border-white/10 text-white hover:bg-purple-600 transition-all hover:scale-110 active:scale-95 shadow-lg"
                                >
                                    <FiChevronLeft size={24} />
                                </button>

                                <div className="flex gap-2">
                                    {team.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setIndex(i)}
                                            className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-purple-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={next}
                                    className="p-3 rounded-full bg-slate-800/50 border border-white/10 text-white hover:bg-purple-600 transition-all hover:scale-110 active:scale-95 shadow-lg"
                                >
                                    <FiChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
