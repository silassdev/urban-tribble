export default function Marquee() {
    const items = [
        'React • Next.js • Tailwind',
        'Laravel • PHP • MySQL',
        'TypeScript • Node • Express',
        'Cloud: AWS / GCP / DigitalOcean',
        'CI/CD • IaC • Docker • Kubernetes',
        'AI: embeddings, inference pipelines'
    ]

    // Duplicate list so marquee can scroll continuously
    const track = [...items, ...items]

    return (
        <div className="mt-6 overflow-hidden border-t border-b border-slate-100 py-3">
            <div className="whitespace-nowrap marquee-track animate-marquee">
                {track.map((t, i) => (
                    <span key={i} className="inline-block px-8 text-sm font-medium text-slate-700">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    )
}
