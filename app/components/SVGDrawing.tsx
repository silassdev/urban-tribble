export default function SVGDrawing() {
    return (
        <div className="rounded-xl border border-slate-100 p-8 bg-white/50">
            <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold">Architecture drawings</h3>
                    <p className="mt-2 text-sm text-slate-600">High-level diagrams, sequence flows, data models, and deployment diagrams — exportable as SVG/PDF for clients.</p>

                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                        <li>• System context diagrams</li>
                        <li>• Component & service maps</li>
                        <li>• Data flow and storage schematics</li>
                    </ul>
                </div>

                <div className="w-full lg:w-96">
                    <svg viewBox="0 0 360 220" className="w-full h-auto" aria-hidden>
                        <defs>
                            <linearGradient id="g1" x1="0" x2="1">
                                <stop offset="0" stopColor="#6366f1" />
                                <stop offset="1" stopColor="#06b6d4" />
                            </linearGradient>
                        </defs>

                        <rect x="12" y="20" width="120" height="80" rx="8" fill="url(#g1)" opacity="0.12" />
                        <rect x="228" y="20" width="120" height="80" rx="8" fill="#f8fafc" stroke="#e6eef8" />
                        <rect x="120" y="120" width="120" height="64" rx="8" fill="#fff" stroke="#e6eef8" />
                        <path d="M132 100 C170 80, 200 80, 228 100" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <circle cx="180" cy="86" r="6" fill="#06b6d4" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
