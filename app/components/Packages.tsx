'use client'
import Link from 'next/link'

type Tier = {
    id: string
    title: string
    subtitle: string
    price: string
    features: string[]
    ctaText?: string
    ctaHref?: string
    highlight?: boolean
}

const TIERS: Tier[] = [
    {
        id: 'basic',
        title: 'Starter',
        subtitle: 'Static pages, ≤ 10 pages — portfolios & small sites',
        price: '$500 up',
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
        price: '$1000 up',
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
        <section aria-labelledby="packages-title" className="py-16">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 id="packages-title" className="text-2xl sm:text-3xl font-semibold">Explore our tiers</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Choose a package that fits your needs. Prices shown are starting rates (USD).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {TIERS.map((t) => (
                        <article
                            key={t.id}
                            className={`flex flex-col justify-between border rounded-lg p-6 shadow-sm bg-white ${t.highlight ? 'border-indigo-200 ring-1 ring-indigo-50' : 'border-slate-100'
                                }`}
                            aria-labelledby={`${t.id}-title`}
                        >
                            <header>
                                <div className="flex items-center justify-between">
                                    <h3 id={`${t.id}-title`} className="text-lg font-semibold">{t.title}</h3>
                                    <div className="text-sm font-medium text-slate-700">{t.price}</div>
                                </div>

                                <p className="mt-2 text-sm text-slate-500">{t.subtitle}</p>
                            </header>

                            <ul className="mt-6 space-y-2 text-sm text-slate-700">
                                {t.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="w-4 h-4 mt-1 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden>
                                            <path d="M5 12l4 4L19 6" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6">
                                {t.ctaHref ? (
                                    <Link href={t.ctaHref}>
                                        <a
                                            className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md ${t.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                                }`}
                                        >
                                            {t.ctaText}
                                        </a>
                                    </Link>
                                ) : (
                                    <button
                                        className="w-full px-4 py-2 text-sm font-medium rounded-md bg-slate-100"
                                        aria-disabled
                                    >
                                        {t.ctaText}
                                    </button>
                                )}
                                {t.id === 'custom' && (
                                    <p className="mt-3 text-xs text-slate-500">Custom solutions require scoping — contact sales for a quote.</p>
                                )}
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-6 text-xs text-slate-500 text-center">
                    Prices listed are starting rates. Final quotes depend on scope, integrations, and SLAs.
                </div>
            </div>
        </section>
    )
}