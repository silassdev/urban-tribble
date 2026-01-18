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
        <section className="max-w-full overflow-hidden border-y border-slate-800 py-8 bg-[#0d1117]/50 backdrop-blur-sm flex flex-col gap-8">
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
        </section>
    )
}
