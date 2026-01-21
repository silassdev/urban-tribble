'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiMail, FiChevronLeft, FiChevronRight, FiLinkedin } from 'react-icons/fi'
import Image from 'next/image'

const team = [
    {
        name: 'Okon Peter',
        title: 'Co Founder',
        photo: '/dummy.png',
        email: 'allpilarsolutions@gmail.com',
        linkedin: 'https://www.linkedin.com/in/okonpeter',
        bio: 'Co-founder and technical lead who defines product vision, architecture, and developer workflows for scalable cloud systems.'
    },
    {
        name: 'Singh Priya',
        title: 'Project Manager',
        photo: '/dummy.png',
        github: 'https://github.com/sarah',
        email: 'allpilarsolutions@gmail.com',
        linkedin: 'https://www.linkedin.com/in/singhpriya',
        bio: 'Project manager driving Agile delivery: roadmaps, stakeholder alignment, sprints, and on-time, on-budget launches.'
    },
    {
        name: 'Aisha Bello',
        title: 'DevOps Engineer',
        photo: '/dummy.png',
        github: 'https://github.com/aishabello',
        email: 'allpilarsolutions@gmail.com',
        linkedin: 'https://www.linkedin.com/in/aishabello',
        bio: 'DevOps engineer building reliable CI/CD pipelines, cloud infrastructure, monitoring, and automated deployment workflows.'
    },
    {
        name: 'Nathaniel Juan',
        title: 'Software Engineer',
        photo: '/dummy.png',
        github: 'https://github.com/nathanjuan',
        email: 'allpilarsolutions@gmail.com',
        linkedin: 'https://www.linkedin.com/in/nathanjuan',
        bio: 'Software engineer focused on reliable APIs, system design, performance optimization, and test-driven development.'
    },
    {
        name: 'Jose Rizal',
        title: 'Backend Engineer',
        photo: '/dummy.png',
        github: 'https://github.com/joserizal',
        email: 'allpilarsolutions@gmail.com',
        linkedin: 'https://www.linkedin.com/in/joserizal',
        bio: 'Backend engineer specializing in scalable APIs, data modeling, performance tuning, and secure server-side systems.'
    },
    {
        name: 'Silas Tyokaha',
        title: 'Software Developer',
        photo: '/dummy.png',
        github: 'https://github.com/silassdev',
        email: '9shila@gmail.com',
        linkedin: 'https://www.linkedin.com/in/silassdev',
        bio: 'Full-stack developer building production-ready web apps with React, Next.js, and pragmatic, maintainable tooling.'
    },
    {
        name: 'Khari Reyansh',
        title: 'Frontend Developer',
        photo: '/dummy.png',
        github: 'https://github.com/khari',
        email: 'allpilarsolution@gmail.com',
        linkedin: 'https://www.linkedin.com/in/khari',
        bio: 'Frontend developer crafting accessible, responsive UIs and reusable component systems for fast user experiences.'
    }
];


export default function Team() {
    const [index, setIndex] = useState(0)

    const next = () => setIndex((prev) => (prev + 1) % team.length)
    const prev = () => setIndex((prev) => (prev - 1 + team.length) % team.length)

    return (
        <section className="py-24 relative overflow-hidden">
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
                                        <a
                                            href={team[index].linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            <FiLinkedin size={28} />
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
