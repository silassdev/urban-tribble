import React from 'react';

export default function SVGDrawing() {
    return (
        <section className="py-20 bg-[#0d1117]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-slate-800 p-8 md:p-12 bg-gradient-to-br from-slate-900 via-[#0d1117] to-slate-900 shadow-2xl">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h3 className="text-2xl font-bold text-white">Architecture drawings</h3>
                            <p className="text-base text-slate-400 leading-relaxed">High-level diagrams, sequence flows, data models, and deployment diagrams — exportable as SVG/PDF for clients.</p>

                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    System context diagrams
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                    Component & service maps
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                                    Data flow and storage schematics
                                </li>
                            </ul>
                        </div>

                        <div className="w-full lg:w-[480px]">
                            <svg viewBox="0 0 360 220" className="w-full h-auto drop-shadow-2xl" aria-hidden>
                                <defs>
                                    <linearGradient id="g1" x1="0" x2="1">
                                        <stop offset="0" stopColor="#6366f1" />
                                        <stop offset="1" stopColor="#06b6d4" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Background Card */}
                                <rect x="12" y="20" width="120" height="80" rx="12" fill="url(#g1)" opacity="0.1" />
                                <rect x="12" y="20" width="120" height="80" rx="12" stroke="url(#g1)" strokeWidth="1" strokeOpacity="0.2" />

                                {/* Right Card */}
                                <rect x="228" y="20" width="120" height="80" rx="12" fill="#1e293b" stroke="#334155" />
                                <circle cx="288" cy="60" r="12" fill="#334155" opacity="0.5" />
                                <rect x="250" y="56" width="24" height="8" rx="4" fill="#475569" />

                                {/* Bottom Card */}
                                <rect x="120" y="120" width="120" height="64" rx="12" fill="#0f172a" stroke="#334155" />
                                <rect x="140" y="140" width="80" height="6" rx="3" fill="#334155" />
                                <rect x="140" y="154" width="50" height="6" rx="3" fill="#475569" />

                                {/* Connection Lines */}
                                <path id="connLine" d="M132 100 C170 80, 200 80, 228 100" stroke="#64748b" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="200">
                                    <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" fill="freeze" />
                                </path>
                                {/* Moving dot along the line */}
                                <circle r="4" fill="#06b6d4">
                                    <animateMotion dur="2s" repeatCount="indefinite">
                                        <mpath xlinkHref="#connLine" />
                                    </animateMotion>
                                </circle>
                                <circle cx="180" cy="86" r="4" fill="#06b6d4" filter="url(#glow)" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
