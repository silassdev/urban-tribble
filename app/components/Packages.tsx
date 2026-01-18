'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Tier = {
    id: string
    title: string
    subtitle: string
    price: string
    features: string[]
    ctaText: string
    ctaHref: string
    highlight?: boolean
}

const TIERS: Tier[] = [
    {
        id: 'basic',
        title: 'Starter',
        subtitle: 'Static pages, ≤ 10 pages — portfolios & small sites',
        price: 'from $500',
        features: [
            'Up to 10 pages',
            'Responsive layout',
            'Basic SEO & analytics',
            'Simple contact form'
        ],
        ctaText: 'Order Starter',
        ctaHref: '/contact'
    },
    {
        id: 'advanced',
        title: 'Growth',
        subtitle: 'Advanced sites, > 10 pages — startups & e-commerce',
        price: 'from $1000',
        features: [
            'Unlimited pages',
            'CMS integration',
            'E-commerce or product catalog support',
            'Performance & caching setup'
        ],
        ctaText: 'Order Growth',
        ctaHref: '/contact',
        highlight: true
    },
    {
        id: 'custom',
        title: 'Custom',
        subtitle: 'Full custom solutions — apps, integrations, enterprise',
        price: 'Custom pricing',
        features: [
            'Bespoke architecture',
            'Third-party integrations',
            'SLA & support options',
            'Dedicated project onboarding'
        ],
        ctaText: 'Contact Sales',
        ctaHref: '/contact'
    }
]

export default function Packages() {
    return (
        <section id="pricing" aria-labelledby="packages-title" className="py-20 bg-[#0d1117] relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 id="packages-title" className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Transparent Pricing
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Choose a package that fits your needs. Prices shown are starting rates (USD).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {TIERS.map((t, index) => (
                        <motion.article
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`flex flex-col relative group rounded-2xl p- p-[1px] ${t.highlight
                                ? 'bg-gradient-to-b from-blue-500/50 to-purple-600/50'
                                : 'bg-slate-800'
                                }`}
                        >
                            <div className={`h-full flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 ${t.highlight
                                ? 'bg-[#0d1117] hover:bg-[#161b22]'
                                : 'bg-[#0d1117] border border-slate-800 hover:border-slate-700 hover:bg-[#161b22]'
                                }`}>
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 id={`${t.id}-title`} className={`text-xl font-bold ${t.highlight ? 'text-white' : 'text-slate-200'}`}>
                                            {t.title}
                                        </h3>
                                        {t.highlight && (
                                            <span className="px-3 py-1 text-xs font-semibold text-blue-200 bg-blue-900/40 rounded-full border border-blue-800">
                                                Popular
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className={`text-3xl font-bold ${t.highlight ? 'text-blue-400' : 'text-white'}`}>
                                            {t.price}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400 mb-8 min-h-[40px]">
                                        {t.subtitle}
                                    </p>

                                    <ul className="space-y-4 mb-8">
                                        {t.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                                <svg className={`w-5 h-5 flex-none ${t.highlight ? 'text-blue-400' : 'text-slate-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href={t.ctaHref}
                                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${t.highlight
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transform hover:-translate-y-0.5'
                                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    {t.ctaText}
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500">
                        Prices listed are starting rates. Final quotes depend on scope, integrations, and SLAs.
                    </p>
                </div>
            </div>
        </section>
    )
}