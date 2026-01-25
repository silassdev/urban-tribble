'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

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

    const openLightboxFor = (item: ProjectItem, startIdx: number) => {
        setLightboxImages([item.imgA, item.imgB])
        setLightboxIndex(startIdx)
        setLightboxOpen(true)
    }

    return (
        <section>
            <div className="space-y-12">
                {items.map((item, idx) => (
                    <article key={item.id || idx} className="flip-card group h-[320px] w-full perspective">
                        <div className="flip-card-inner w-full h-full relative duration-700">
                            {/* FRONT face */}
                            <div className="flip-face front bg-white border rounded-xl p-6 shadow-sm overflow-hidden flex flex-col">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                                    <p className="mt-3 text-sm text-slate-600 line-clamp-3">{item.description}</p>
                                </div>

                                <div className="mt-6 flex items-center justify-between gap-4">
                                    <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 underline">
                                        Open demo
                                    </a>
                                    <div className="text-xs text-slate-500">Scroll or hover to preview</div>
                                </div>
                            </div>

                            {/* BACK face */}
                            <div className="flip-face back bg-slate-900 text-white p-4 rounded-xl flex flex-col">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
                                    {/* thumb A */}
                                    <div className="relative rounded-md overflow-hidden border border-slate-700 h-full">
                                        <Image
                                            src={item.imgA.src}
                                            alt={item.imgA.alt || `${item.title} 1`}
                                            fill
                                            className="object-cover"
                                            placeholder={item.imgA.blurDataURL ? 'blur' : undefined}
                                            blurDataURL={item.imgA.blurDataURL}
                                        />
                                        <button onClick={(e) => { e.stopPropagation(); openLightboxFor(item, 0); }} aria-label="Open preview 1" className="absolute right-2 top-2 bg-white/10 text-white px-2 py-1 rounded text-xs backdrop-blur hover:bg-white/20 transition-colors">
                                            Preview
                                        </button>
                                    </div>

                                    {/* thumb B */}
                                    <div className="relative rounded-md overflow-hidden border border-slate-700 h-full">
                                        <Image
                                            src={item.imgB.src}
                                            alt={item.imgB.alt || `${item.title} 2`}
                                            fill
                                            className="object-cover"
                                            placeholder={item.imgB.blurDataURL ? 'blur' : undefined}
                                            blurDataURL={item.imgB.blurDataURL}
                                        />
                                        <button onClick={(e) => { e.stopPropagation(); openLightboxFor(item, 1); }} aria-label="Open preview 2" className="absolute right-2 top-2 bg-white/10 text-white px-2 py-1 rounded text-xs backdrop-blur hover:bg-white/20 transition-colors">
                                            Preview
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm font-medium transition-colors">Open live demo</a>
                                    <span className="text-xs text-slate-300">Interactive preview</span>
                                </div>
                            </div>
                        </div>
                    </article>
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