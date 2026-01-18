export default function AnimatedLines() {
    const leftText = 'We speak your stack — multiple options'
    const rightText = 'Design, DevOps, AI, Cloud, Architecture'

    return (
        <div className="relative py-20 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 gap-8 relative z-10">
                <div className="relative overflow-visible">
                    <div className="bg-gradient-to-r from-slate-900 to-[#0d1117] p-8 rounded-2xl border border-slate-800 shadow-2xl">
                        <div className="flex items-center">
                            <div className="flex-1">
                                <div className="text-xs font-mono text-sky-500 mb-2">01 — float.right</div>
                                <div className="text-xl md:text-2xl font-bold text-slate-200 animate-floatLR">{rightText}</div>
                            </div>

                            <div className="w-px h-20 bg-gradient-to-b from-transparent via-slate-700 to-transparent mx-8 md:mx-12" />

                            <div className="flex-1 text-right">
                                <div className="text-xs font-mono text-purple-500 mb-2">02 — float.left</div>
                                <div className="text-xl md:text-2xl font-bold text-slate-200 animate-floatRL">{leftText}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl p-8 border border-slate-800 bg-[#0d1117]/80 hover:bg-slate-800/30 transition-colors">
                        <h3 className="text-base font-bold text-white mb-2">Custom stacks</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Mix-and-match stacks per project. We deploy TypeScript-first APIs or PHP microservices depending on constraints.
                        </p>
                    </div>
                    <div className="rounded-xl p-8 border border-slate-800 bg-[#0d1117]/80 hover:bg-slate-800/30 transition-colors">
                        <h3 className="text-base font-bold text-white mb-2">Performance</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Memory optimization, server-side rendering strategies, and edge caching patterns included by default.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
