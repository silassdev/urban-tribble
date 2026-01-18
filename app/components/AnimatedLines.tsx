export default function AnimatedLines() {
    const leftText = 'We speak your stack — multiple options'
    const rightText = 'Design, DevOps, AI, Cloud, Architecture'

    return (
        <div className="relative py-16">
            <div className="grid grid-cols-1 gap-6">
                <div className="relative overflow-visible">
                    <div className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-xl border border-slate-100">
                        <div className="flex items-center">
                            <div className="flex-1">
                                <div className="text-sm text-slate-500">Line 1 — floats right</div>
                                <div className="mt-2 text-xl font-semibold animate-floatLR">{rightText}</div>
                            </div>

                            <div className="w-0.5 h-16 bg-slate-100 mx-6" />

                            <div className="flex-1 text-right">
                                <div className="text-sm text-slate-500">Line 2 — floats left</div>
                                <div className="mt-2 text-xl font-semibold animate-floatRL">{leftText}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1 rounded-lg p-6 border border-slate-100 bg-white/60">
                        <h3 className="text-sm font-medium text-slate-600">Custom stacks</h3>
                        <p className="mt-2 text-sm text-slate-700">Mix-and-match stacks per project. We deploy TypeScript-first APIs or PHP microservices depending on constraints.</p>
                    </div>
                    <div className="w-80 rounded-lg p-6 border border-slate-100 bg-white/60">
                        <h3 className="text-sm font-medium text-slate-600">Performance</h3>
                        <p className="mt-2 text-sm text-slate-700">Memory optimization, server-side rendering strategies, and edge caching patterns included by default.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
