export default function Marquee() {
    const row1 = [
        'React', 'Next.js', 'Tailwind', 'Laravel', 'PHP', 'MySQL', 'TypeScript', 'Node', 'Express'
    ]

    const row2 = [
        'Cloud: AWS / GCP / DigitalOcean',
        'CI/CD • IaC • Docker • Kubernetes',
        'AI: embeddings, inference pipelines'
    ]

    return (
        <section className="max-w-full overflow-hidden border-y border-slate-800 bg-[#0d1117]/50 backdrop-blur-sm">
            {/* Header */}
            <div className="py-16 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">OUR TECH STACK</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Technologies we build <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">robust apps</span> with
                    </h2>

                    <p className="text-slate-400 text-lg">
                        Battle-tested tools and frameworks for scalable, production-ready solutions
                    </p>
                </div>
            </div>

            {/* Marquee Content */}
            <div className="flex flex-col gap-8 pb-8">
                {/* Row 1 - Scroll Left */}
                <div className="flex overflow-hidden relative w-full group">
                    <div className="flex shrink-0 animate-banner-scroll-left items-center gap-12 min-w-full pl-12 group-hover:[animation-play-state:paused]">
                        {row1.map((t, i) => (
                            <span key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                                <span className="block w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="flex shrink-0 animate-banner-scroll-left items-center gap-12 min-w-full pl-12 group-hover:[animation-play-state:paused]">
                        {row1.map((t, i) => (
                            <span key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                                <span className="block w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex overflow-hidden relative w-full group">
                    <div className="flex shrink-0 animate-banner-scroll-right items-center gap-12 min-w-full pl-12 group-hover:[animation-play-state:paused]">
                        {row2.map((t, i) => (
                            <span key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                                <span className="block w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                                {t}
                            </span>
                        ))}
                    </div>
                    {/* Duplicate */}
                    <div className="flex shrink-0 animate-banner-scroll-right items-center gap-12 min-w-full pl-12 group-hover:[animation-play-state:paused]">
                        {row2.map((t, i) => (
                            <span key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                                <span className="block w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
