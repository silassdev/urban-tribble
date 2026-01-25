'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'
import { FiExternalLink, FiMaximize2 } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface ProjectImage {
    src: string
    alt?: string
    blurDataURL?: string
}

interface ProjectItem {
    id: string | number
    title: string
    description: string
    demoUrl: string
    imgA: ProjectImage
    imgB: ProjectImage
}

export default function ShowcaseProjectImage({ items }: { items: ProjectItem[] }) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)
    const [lightboxImages, setLightboxImages] = useState<ProjectImage[]>([])
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    const openLightboxFor = (item: ProjectItem, startIdx: number) => {
        setLightboxImages([item.imgA, item.imgB])
        setLightboxIndex(startIdx)
        setLightboxOpen(true)
    }

    useEffect(() => {
        const handleScroll = () => {
            const viewportCenter = window.innerHeight / 2;
            let closestIndex = -1;
            let minDistance = Infinity;

            cardsRef.current.forEach((card, idx) => {
                if (!card) return;
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const distance = Math.abs(viewportCenter - cardCenter);

                // Only consider cards that are actually in view
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = idx;
                    }
                }
            });

            // Threshold: Only flip if the card is relatively central (distance < 30% of viewport height)
            if (closestIndex !== -1 && minDistance < window.innerHeight * 0.3) {
                setActiveIndex(closestIndex);
            } else {
                setActiveIndex(null);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [items]); // items is a dependency because cardsRef.current is populated based on items

    return (
        <section className="w-full space-y-16">
            <div className="flex flex-col gap-12">
                {items.map((item, idx) => (
                    <motion.article
                        key={item.id || idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="group relative flex flex-col bg-[#161b22]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/10 transition-all duration-700 hover:shadow-[0_0_50px_-12px_rgba(79,70,229,0.2)]"
                    >
                        {/* HEADER: APP NAME */}
                        <div className="p-8 pb-4">
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter group-hover:text-indigo-400 transition-colors duration-300">
                                {item.title}
                            </h3>
                        </div>

                        {/* MIDDLE: FLIPPING IMAGE AREA (Taller & Proportional) */}
                        <div className="relative h-[400px] md:h-[500px] px-8 mb-6">
                            <div
                                ref={(el: HTMLDivElement | null) => { cardsRef.current[idx] = el }}
                                className={`flip-card w-full h-full perspective cursor-pointer transition-transform duration-700 ${activeIndex === idx ? 'is-visible scale-[1.02]' : 'scale-100'}`}
                                onClick={() => openLightboxFor(item, 0)}
                            >
                                <div className="flip-card-inner w-full h-full relative transition-transform duration-700">
                                    {/* FRONT FACE */}
                                    <div className="flip-face front bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                                        <Image
                                            src={item.imgA.src}
                                            alt={item.imgA.alt || `${item.title} dashboard`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            placeholder={item.imgA.blurDataURL ? 'blur' : undefined}
                                            blurDataURL={item.imgA.blurDataURL}
                                            sizes="(max-width: 1024px) 100vw, 1024px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                                            <div className="flex items-center gap-3">
                                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                                <span className="text-xs font-black text-white/50 uppercase tracking-[0.3em]">Module Overview</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BACK FACE */}
                                    <div className="flip-face back bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                                        <Image
                                            src={item.imgB.src}
                                            alt={item.imgB.alt || `${item.title} details`}
                                            fill
                                            className="object-cover"
                                            placeholder={item.imgB.blurDataURL ? 'blur' : undefined}
                                            blurDataURL={item.imgB.blurDataURL}
                                            sizes="(max-width: 1024px) 100vw, 1024px"
                                        />
                                        <div className="absolute inset-0 bg-indigo-600/10 backdrop-blur-[1px]" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                                <FiMaximize2 className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent flex items-end p-8">
                                            <div className="flex items-center gap-3">
                                                <span className="w-2 h-2 rounded-full bg-white animate-bounce" />
                                                <span className="text-xs font-black text-indigo-200 uppercase tracking-[0.3em]">Deep Dive Preview</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM: DESCRIPTION & CTA */}
                        <div className="p-8 pt-2 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-medium">
                                {item.description}
                            </p>

                            <div className="flex items-center gap-6 shrink-0">
                                <a
                                    href={item.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:translate-y-[-2px] active:translate-y-0"
                                >
                                    Live Demo
                                    <FiExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                </a>
                                <button
                                    onClick={() => openLightboxFor(item, 0)}
                                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-colors"
                                    title="View Gallery"
                                >
                                    <FiMaximize2 className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            {lightboxOpen && (
                <Lightbox
                    images={lightboxImages}
                    index={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                    onChange={(i) => setLightboxIndex(i)}
                />
            )}
        </section>
    )
}
