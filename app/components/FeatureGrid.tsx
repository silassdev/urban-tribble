'use client'
import { motion } from 'framer-motion'
import { FiLayers, FiCpu, FiCode, FiCloud, FiZap, FiLayout } from 'react-icons/fi'

type Feature = {
    title: string
    desc: string
    icon: React.ElementType
}

const FEATURES: Feature[] = [
    {
        title: 'End-to-end web applications',
        desc: 'From requirements to deployment: frontend, API, DB, monitoring.',
        icon: FiLayers
    },
    {
        title: 'Scalable architecture',
        desc: 'Event-driven services, queues, horizontal scaling, autoscaling.',
        icon: FiCpu
    },
    {
        title: 'Type-safe engineering',
        desc: 'TypeScript and typed contracts to reduce runtime defects.',
        icon: FiCode
    },
    {
        title: 'Cloud & infra',
        desc: 'IaC templates, CI/CD pipelines, managed services optimisation.',
        icon: FiCloud
    },
    {
        title: 'AI integration',
        desc: 'Embeddings search, LLM pipelines, inference at scale.',
        icon: FiZap
    },
    {
        title: 'Design systems',
        desc: 'Reusable component libraries, accessibility and tokens.',
        icon: FiLayout
    }
]

export default function FeatureGrid() {
    return (
        <section className="py-20 bg-[#0d1117]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">What we deliver</h2>
                    <p className="text-slate-400 text-lg">
                        A set of production patterns and custom solutions. Pick a stack or ask for a tailored plan.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {FEATURES.map((f, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-800/40 border border-slate-800 hover:border-slate-600 p-8 rounded-2xl hover:bg-slate-800/60 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 group-hover:border-slate-500 group-hover:scale-110 transition-all duration-300">
                                <f.icon className="w-6 h-6 text-slate-300 group-hover:text-sky-400 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-100 mb-3">{f.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm mb-4">{f.desc}</p>
                            <div className="flex items-center text-sky-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                Learn more <span className="ml-1">→</span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
