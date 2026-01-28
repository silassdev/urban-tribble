'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiMail, FiChevronLeft, FiChevronRight, FiLinkedin, FiExternalLink } from 'react-icons/fi'
import Image from 'next/image'

const team = [
    {
        name: 'Silas Tyokaha',
        title: 'Co Founder/ DevOps',
        photo: '/sil.jpg',
        email: 'silas@allpilar.xyz',
        linkedin: 'https://www.linkedin.com/in/silassdev',
        website: 'https://silas.allpilar.xyz',
        bio: 'Co-founder and technical lead who defines product vision, architecture, and developer workflows for scalable cloud systems.'
    },
    {
        name: 'Hopefree Motari',
        title: 'Backend Developer',
        photo: '/hopefree.png',
        github: 'https://github.com/motari2004',
        email: 'hello@allpilar.xyz',
        linkedin: 'https://www.linkedin.com/in/motari',
        bio: 'Backend developer building scalable and performant cloud systems.'
    },
    {
        name: 'Khari Reyansh',
        title: 'Frontend Developer',
        photo: '/dummy.png',
        github: 'https://github.com/khari',
        email: 'hello@allpilar.xyz',
        linkedin: 'https://www.linkedin.com/in/khari',
        bio: 'Frontend developer crafting accessible, responsive UIs and reusable component systems for fast user experiences.'
    }
];

export default function Team() {
    const [index, setIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const next = useCallback(() => {
        setIndex((prev) => (prev + 1) % team.length)
    }, [])

    const prev = useCallback(() => {
        setIndex((prev) => (prev - 1 + team.length) % team.length)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (isVisible && !isHovered) {
            timerRef.current = setInterval(() => {
                next()
            }, 5000)
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isVisible, isHovered, next, index])

    return (
        <section
            id="team"
            ref={sectionRef}
            className="py-24 relative overflow-hidden"
        >
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

                <div
                    className="max-w-5xl mx-auto relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Photo Column */}
                        <div className="relative group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
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

                            <button
                                onClick={(e) => { e.stopPropagation(); prev(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-600 hidden md:block z-20"
                                aria-label="Previous member"
                            >
                                <FiChevronLeft size={24} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); next(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-600 hidden md:block z-20"
                                aria-label="Next member"
                            >
                                <FiChevronRight size={24} />
                            </button>

                            <div className="absolute inset-y-0 left-0 w-1/4 md:hidden pointer-events-auto cursor-pointer z-10" onClick={prev} />
                            <div className="absolute inset-y-0 right-0 w-1/4 md:hidden pointer-events-auto cursor-pointer z-10" onClick={next} />
                        </div>

                        {/* Info Column */}
                        <div className="flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-1">{team[index].name}</h3>
                                        <p className="text-xl text-purple-400 font-medium">{team[index].title}</p>
                                    </div>

                                    <p className="text-slate-300 text-lg leading-relaxed min-h-[100px]">
                                        {team[index].bio}
                                    </p>

                                    <div className="flex items-center gap-6 pt-4">
                                        {(team[index] as any).website && (
                                            <a
                                                href={(team[index] as any).website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-white transition-colors"
                                            >
                                                <FiExternalLink size={28} />
                                            </a>
                                        )}
                                        {team[index].github && (
                                            <a
                                                href={team[index].github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-white transition-colors"
                                            >
                                                <FiGithub size={28} />
                                            </a>
                                        )}
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
                            <div className="flex items-center gap-4 mt-8">
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

                            {/* Team Thumbnails for Quick Switching */}
                            <div className="mt-8 flex flex-wrap gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {team.map((member, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setIndex(i)}
                                        className={`relative w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 shrink-0 ${i === index ? 'border-purple-500 scale-110 shadow-lg shadow-purple-500/20' : 'border-white/10 grayscale hover:grayscale-0 hover:border-white/30'}`}
                                    >
                                        <Image
                                            src={member.photo}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
