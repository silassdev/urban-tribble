'use client'
import { useEffect, useState } from 'react'

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
        const t = setInterval(() => setIdx(i => (i + 1) % TAGLINES.length), 2800)
        return () => clearInterval(t)
    }, [])

    return (
        <section className="pt-8 lg:pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                        ALLPILAR SOLUTIONS
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-xl">
                        We design web systems: frontends, backends, cloud platforms, and pragmatic AI integrations that scale.
                        Domain acquired — full stack delivery, consulting, and product engineering.
                    </p>

                    <div className="mt-6 inline-flex items-center gap-4">
                        <div className="px-3 py-2 rounded-md bg-slate-100 text-slate-800 text-sm">Launch: today</div>
                        <div className="px-3 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm">Production-ready patterns</div>
                    </div>

                    <div className="mt-8">
                        <span className="text-sm text-slate-500 mr-3">We say:</span>
                        <span className="font-medium headline-underline">{TAGLINES[idx]}</span>
                    </div>
                </div>

                <div className="relative w-full h-72 bg-gradient-to-tr from-slate-50 to-white rounded-xl border border-slate-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="320" height="220" viewBox="0 0 320 220" fill="none" aria-hidden>
                            <rect x="8" y="30" width="120" height="120" rx="12" stroke="#e6e9ee" />
                            <rect x="192" y="30" width="120" height="120" rx="12" stroke="#e6e9ee" />
                            <path d="M64 160 L160 60 L256 160" stroke="#cbd5e1" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="absolute bottom-4 left-6 text-xs text-slate-500">Design + Architecture snapshot</div>
                </div>
            </div>
        </section>
    )
}
