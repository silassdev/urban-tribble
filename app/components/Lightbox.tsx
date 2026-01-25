'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface LightboxProps {
    images: Array<{
        src: string
        alt?: string
        blurDataURL?: string
    }>
    index: number
    onClose: () => void
    onChange: (index: number) => void
}

export default function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') return onClose()
            if (e.key === 'ArrowLeft') onChange(Math.max(0, index - 1))
            if (e.key === 'ArrowRight') onChange(Math.min(images.length - 1, index + 1))
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [index, images.length, onClose, onChange])


    if (!images || images.length === 0) return null


    const item = images[index]


    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur p-4"
            onClick={onClose}
        >
            <div className="relative max-w-4xl w-full h-[70vh] bg-black rounded" onClick={(e) => e.stopPropagation()}>
                <button
                    aria-label="Close"
                    onClick={onClose}
                    className="absolute right-3 top-3 z-30 px-3 py-1 bg-white/10 text-white rounded hover:bg-white/20"
                >
                    ✕
                </button>


                <button
                    aria-label="Previous"
                    onClick={() => onChange(Math.max(0, index - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20"
                >
                    ‹
                </button>


                <button
                    aria-label="Next"
                    onClick={() => onChange(Math.min(images.length - 1, index + 1))}
                    className="absolute right-12 top-1/2 -translate-y-1/2 z-30 px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20"
                >
                    ›
                </button>


                <div className="w-full h-full relative flex items-center justify-center">
                    <Image
                        src={item.src}
                        alt={item.alt || `image-${index + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        style={{ objectFit: 'contain' }}
                        placeholder={item.blurDataURL ? 'blur' : undefined}
                        blurDataURL={item.blurDataURL}
                        priority
                    />
                </div>


                <div className="absolute left-0 right-0 bottom-2 text-center text-xs text-white/80">
                    {index + 1} / {images.length}
                </div>
            </div>
        </div>
    )
}