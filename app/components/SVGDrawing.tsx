import React from 'react';

export default function SVGDrawing() {
    return (
        <section className="py-20 bg-[#0d1117]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-slate-800 p-8 md:p-12 bg-gradient-to-br from-slate-900 via-[#0d1117] to-slate-900 shadow-2xl">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h3 className="text-2xl font-bold text-white">Cloud & DevOps Architecture</h3>
                            <p className="text-base text-slate-400 leading-relaxed">Comprehensive infrastructure diagrams showing CI/CD pipelines, container orchestration, microservices, and cloud-native architectures — exportable as SVG/PDF for technical documentation.</p>

                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    CI/CD pipeline flows & deployment strategies
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                    Container orchestration & microservices mesh
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                                    Cloud infrastructure & observability layers
                                </li>
                            </ul>
                        </div>

                        <div className="w-full lg:w-[520px]">
                            <svg viewBox="0 0 400 280" className="w-full h-auto drop-shadow-2xl" aria-hidden="true">
                                <defs>
                                    <linearGradient id="cicdGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#6366f1" />
                                    </linearGradient>
                                    <linearGradient id="containerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#06b6d4" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                    <linearGradient id="dbGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#10b981" />
                                        <stop offset="100%" stopColor="#059669" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <filter id="softGlow">
                                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* CI/CD Pipeline (Top) */}
                                <g>
                                    <rect x="20" y="15" width="50" height="35" rx="6" fill="url(#cicdGradient)" opacity="0.15" stroke="url(#cicdGradient)" strokeWidth="1.5" />
                                    <text x="45" y="28" fontSize="8" fill="#a78bfa" textAnchor="middle" fontWeight="600">CODE</text>
                                    <text x="45" y="38" fontSize="7" fill="#8b5cf6" textAnchor="middle">commit</text>

                                    <rect x="90" y="15" width="50" height="35" rx="6" fill="url(#cicdGradient)" opacity="0.15" stroke="url(#cicdGradient)" strokeWidth="1.5" />
                                    <text x="115" y="28" fontSize="8" fill="#a78bfa" textAnchor="middle" fontWeight="600">BUILD</text>
                                    <text x="115" y="38" fontSize="7" fill="#8b5cf6" textAnchor="middle">compile</text>

                                    <rect x="160" y="15" width="50" height="35" rx="6" fill="url(#cicdGradient)" opacity="0.15" stroke="url(#cicdGradient)" strokeWidth="1.5" />
                                    <text x="185" y="28" fontSize="8" fill="#a78bfa" textAnchor="middle" fontWeight="600">TEST</text>
                                    <text x="185" y="38" fontSize="7" fill="#8b5cf6" textAnchor="middle">verify</text>

                                    <rect x="230" y="15" width="50" height="35" rx="6" fill="url(#cicdGradient)" opacity="0.15" stroke="url(#cicdGradient)" strokeWidth="1.5" />
                                    <text x="255" y="28" fontSize="8" fill="#a78bfa" textAnchor="middle" fontWeight="600">DEPLOY</text>
                                    <text x="255" y="38" fontSize="7" fill="#8b5cf6" textAnchor="middle">release</text>

                                    {/* Pipeline flow arrows */}
                                    <path d="M70 32.5 L90 32.5" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" opacity="0.6" />
                                    <path d="M140 32.5 L160 32.5" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" opacity="0.6" />
                                    <path d="M210 32.5 L230 32.5" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" opacity="0.6" />

                                    {/* Animated data flow through pipeline */}
                                    <circle r="3" fill="#a78bfa" filter="url(#softGlow)">
                                        <animate attributeName="cx" values="45;115;185;255" dur="4s" repeatCount="indefinite" />
                                        <animate attributeName="cy" values="32.5;32.5;32.5;32.5" dur="4s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0;1;1;1;0" dur="4s" repeatCount="indefinite" />
                                    </circle>
                                </g>

                                {/* Load Balancer */}
                                <g>
                                    <rect x="160" y="75" width="80" height="30" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                                    <text x="200" y="93" fontSize="9" fill="#06b6d4" textAnchor="middle" fontWeight="700">LOAD BALANCER</text>
                                    {/* Pulsing effect */}
                                    <circle cx="200" cy="90" r="50" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0">
                                        <animate attributeName="r" values="30;50" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                </g>

                                {/* Container Cluster (3 Microservices) */}
                                <g>
                                    {/* Service 1 */}
                                    <rect x="30" y="130" width="70" height="55" rx="8" fill="url(#containerGradient)" opacity="0.12" stroke="url(#containerGradient)" strokeWidth="1.5" />
                                    <circle cx="50" cy="147" r="6" fill="#06b6d4" opacity="0.4" />
                                    <circle cx="65" cy="147" r="6" fill="#3b82f6" opacity="0.4" />
                                    <circle cx="80" cy="147" r="6" fill="#0ea5e9" opacity="0.4" />
                                    <text x="65" y="167" fontSize="8" fill="#06b6d4" textAnchor="middle" fontWeight="600">Service A</text>
                                    <text x="65" y="177" fontSize="6" fill="#64748b" textAnchor="middle">API Gateway</text>

                                    {/* Service 2 */}
                                    <rect x="120" y="130" width="70" height="55" rx="8" fill="url(#containerGradient)" opacity="0.12" stroke="url(#containerGradient)" strokeWidth="1.5" />
                                    <circle cx="140" cy="147" r="6" fill="#06b6d4" opacity="0.4" />
                                    <circle cx="155" cy="147" r="6" fill="#3b82f6" opacity="0.4" />
                                    <circle cx="170" cy="147" r="6" fill="#0ea5e9" opacity="0.4" />
                                    <text x="155" y="167" fontSize="8" fill="#06b6d4" textAnchor="middle" fontWeight="600">Service B</text>
                                    <text x="155" y="177" fontSize="6" fill="#64748b" textAnchor="middle">Auth Service</text>

                                    {/* Service 3 */}
                                    <rect x="210" y="130" width="70" height="55" rx="8" fill="url(#containerGradient)" opacity="0.12" stroke="url(#containerGradient)" strokeWidth="1.5" />
                                    <circle cx="230" cy="147" r="6" fill="#06b6d4" opacity="0.4" />
                                    <circle cx="245" cy="147" r="6" fill="#3b82f6" opacity="0.4" />
                                    <circle cx="260" cy="147" r="6" fill="#0ea5e9" opacity="0.4" />
                                    <text x="245" y="167" fontSize="8" fill="#06b6d4" textAnchor="middle" fontWeight="600">Service C</text>
                                    <text x="245" y="177" fontSize="6" fill="#64748b" textAnchor="middle">Data Service</text>

                                    {/* Container pulse animations */}
                                    <circle cx="65" cy="147" r="4" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0">
                                        <animate attributeName="r" values="8;16" dur="2s" repeatCount="indefinite" begin="0s" />
                                        <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" begin="0s" />
                                    </circle>
                                    <circle cx="155" cy="147" r="4" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0">
                                        <animate attributeName="r" values="8;16" dur="2s" repeatCount="indefinite" begin="0.7s" />
                                        <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" begin="0.7s" />
                                    </circle>
                                    <circle cx="245" cy="147" r="4" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0">
                                        <animate attributeName="r" values="8;16" dur="2s" repeatCount="indefinite" begin="1.4s" />
                                        <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" begin="1.4s" />
                                    </circle>
                                </g>

                                {/* Database Layer */}
                                <g>
                                    <ellipse cx="95" cy="225" rx="35" ry="15" fill="url(#dbGradient)" opacity="0.2" stroke="url(#dbGradient)" strokeWidth="1.5" />
                                    <ellipse cx="95" cy="225" rx="35" ry="15" fill="none" stroke="url(#dbGradient)" strokeWidth="1" transform="translate(0, -8)" />
                                    <path d="M60 225 L60 235 Q60 245 95 245 Q130 245 130 235 L130 225" fill="url(#dbGradient)" opacity="0.3" stroke="url(#dbGradient)" strokeWidth="1" />
                                    <text x="95" y="250" fontSize="7" fill="#10b981" textAnchor="middle" fontWeight="600">Primary DB</text>

                                    <ellipse cx="215" cy="225" rx="35" ry="15" fill="url(#dbGradient)" opacity="0.2" stroke="url(#dbGradient)" strokeWidth="1.5" />
                                    <ellipse cx="215" cy="225" rx="35" ry="15" fill="none" stroke="url(#dbGradient)" strokeWidth="1" transform="translate(0, -8)" />
                                    <path d="M180 225 L180 235 Q180 245 215 245 Q250 245 250 235 L250 225" fill="url(#dbGradient)" opacity="0.3" stroke="url(#dbGradient)" strokeWidth="1" />
                                    <text x="215" y="250" fontSize="7" fill="#10b981" textAnchor="middle" fontWeight="600">Cache Layer</text>
                                </g>

                                {/* Monitoring/Observability */}
                                <g>
                                    <rect x="310" y="130" width="70" height="55" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2" />
                                    <circle cx="345" cy="147" r="8" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                                    <path d="M337 147 L341 153 L349 143" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round" />
                                    <text x="345" y="167" fontSize="8" fill="#f59e0b" textAnchor="middle" fontWeight="600">Monitoring</text>
                                    <text x="345" y="177" fontSize="6" fill="#78716c" textAnchor="middle">Logs & Metrics</text>

                                    {/* Monitoring pulse */}
                                    <circle cx="345" cy="147" r="10" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0">
                                        <animate attributeName="r" values="10;20" dur="1.5s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.5;0" dur="1.5s" repeatCount="indefinite" />
                                    </circle>
                                </g>

                                {/* Connection Lines */}
                                {/* Deploy to Load Balancer */}
                                <path d="M255 50 L200 75" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,2" />

                                {/* Load Balancer to Services */}
                                <path d="M180 105 L80 130" stroke="#06b6d4" strokeWidth="2" opacity="0.5" />
                                <path d="M200 105 L155 130" stroke="#06b6d4" strokeWidth="2" opacity="0.5" />
                                <path d="M220 105 L245 130" stroke="#06b6d4" strokeWidth="2" opacity="0.5" />

                                {/* Services to Databases */}
                                <path d="M65 185 L85 210" stroke="#64748b" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />
                                <path d="M155 185 L110 210" stroke="#64748b" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />
                                <path d="M245 185 L215 210" stroke="#64748b" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />

                                {/* Services to Monitoring */}
                                <path d="M280 157 L310 157" stroke="#f59e0b" strokeWidth="1" opacity="0.3" strokeDasharray="3,2" />
                                <path d="M190 157 L310 157" stroke="#f59e0b" strokeWidth="1" opacity="0.3" strokeDasharray="3,2" />
                                <path d="M100 157 L310 157" stroke="#f59e0b" strokeWidth="1" opacity="0.3" strokeDasharray="3,2" />

                                {/* Data flow particles */}
                                <circle r="2.5" fill="#06b6d4" filter="url(#softGlow)">
                                    <animateMotion dur="3s" repeatCount="indefinite" path="M200 105 L155 130" />
                                    <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <circle r="2.5" fill="#10b981" filter="url(#softGlow)">
                                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M155 185 L110 210" begin="0.5s" />
                                    <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                                </circle>

                                {/* Arrow marker definition */}
                                <defs>
                                    <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                                        <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
