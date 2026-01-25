'use client'

import Link from 'next/link'
import ShowcaseProjectImage from '@/app/components/ShowcaseProjectImage'
import { PROJECTS } from '@/app/data/projectsData'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
    searchParams?: Promise<{ page?: string }>
}

export default function ProjectsPage({ searchParams }: Props) {
    const [pageItems, setPageItems] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    const [total, setTotal] = useState(0)
    const pageSize = 5 // Reduced for single column prominence

    useEffect(() => {
        async function loadParams() {
            const params = await searchParams
            const rawPage = params?.page
            const num = Math.max(1, Number.isNaN(Number(rawPage)) ? 1 : Math.max(1, parseInt(String(rawPage || '1'), 10)))

            const totalCount = PROJECTS.length
            const tPages = Math.max(1, Math.ceil(totalCount / pageSize))
            const cPage = Math.min(num, tPages)

            const s = (cPage - 1) * pageSize
            const e = s + pageSize

            setTotal(totalCount)
            setTotalPages(tPages)
            setCurrentPage(cPage)
            setStart(s)
            setEnd(e)
            setPageItems(PROJECTS.slice(s, e))
        }
        loadParams()
    }, [searchParams])

    // Helper to build page URL
    const pageUrl = (p: number) => `/projects?page=${p}`

    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py-24 bg-[#0d1117] min-h-screen"
        >
            <div className="max-w-4xl mx-auto px-6">
                <header className="mb-16 text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-4xl md:text-5xl font-black text-white tracking-tighter"
                    >
                        Our <span className="text-indigo-500">Portfolio</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-slate-400 max-w-lg mx-auto"
                    >
                        Explore our latest work, featuring cutting-edge web applications and bespoke software solutions.
                    </motion.p>
                    <div className="pt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span className="w-8 h-[1px] bg-slate-800" />
                        Showing {start + 1}–{Math.min(end, total)} of {total} projects
                        <span className="w-8 h-[1px] bg-slate-800" />
                    </div>
                </header>

                <ShowcaseProjectImage items={pageItems} />

                {/* Pagination */}
                <nav className="mt-20 flex items-center justify-between border-t border-white/5 pt-8">
                    <div>
                        <span className="text-sm font-medium text-slate-500 tracking-tight">
                            Page <span className="text-white">{currentPage}</span> of {totalPages}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={pageUrl(Math.max(1, currentPage - 1))}
                            className={`px-4 py-2 rounded-xl border border-white/5 text-sm font-bold transition-all ${currentPage === 1 ? 'opacity-30 pointer-events-none' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20'}`}
                        >
                            Prev
                        </Link>

                        <Link
                            href={pageUrl(Math.min(totalPages, currentPage + 1))}
                            className={`px-4 py-2 rounded-xl border border-white/5 text-sm font-bold transition-all ${currentPage === totalPages ? 'opacity-30 pointer-events-none' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20'}`}
                        >
                            Next
                        </Link>
                    </div>
                </nav>
            </div>
        </motion.main>
    )
}
