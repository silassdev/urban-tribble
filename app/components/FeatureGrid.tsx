type Feature = {
    title: string
    desc: string
    tag?: string
}

const FEATURES: Feature[] = [
    { title: 'End-to-end web applications', desc: 'From requirements to deployment: frontend, API, DB, monitoring.' },
    { title: 'Scalable architecture', desc: 'Event-driven services, queues, horizontal scaling, autoscaling.' },
    { title: 'Type-safe engineering', desc: 'TypeScript and typed contracts to reduce runtime defects.' },
    { title: 'Cloud & infra', desc: 'IaC templates, CI/CD pipelines, managed services optimisation.' },
    { title: 'AI integration', desc: 'Embeddings search, LLM pipelines, inference at scale.' },
    { title: 'Design systems', desc: 'Reusable component libraries, accessibility and tokens.' }
]

export default function FeatureGrid() {
    return (
        <div>
            <h2 className="text-2xl font-semibold">What we deliver</h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                A set of production patterns and custom solutions. Pick a stack or ask for a tailored plan.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map((f, i) => (
                    <article key={i} className="p-6 border rounded-xl bg-white/50 border-slate-100">
                        <h3 className="text-lg font-semibold">{f.title}</h3>
                        <p className="mt-2 text-sm text-slate-700">{f.desc}</p>
                        <div className="mt-4 text-xs text-slate-500">Learn more →</div>
                    </article>
                ))}
            </div>
        </div>
    )
}
