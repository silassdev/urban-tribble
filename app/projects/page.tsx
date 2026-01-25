import Link from 'next/link'
import ShowcaseProjectImage from '@/app/components/ShowcaseProjectImage'
import { PROJECTS } from '@/app/data/projectsData'

type Props = {
    searchParams?: { page?: string }
}

export default function ProjectsPage({ searchParams }: Props) {
    const pageSize = 10
    const rawPage = searchParams?.page
    const pageNum = Math.max(1, Number.isNaN(Number(rawPage)) ? 1 : Math.max(1, parseInt(String(rawPage || '1'), 10)))

    const total = PROJECTS.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const currentPage = Math.min(pageNum, totalPages)

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const pageItems = PROJECTS.slice(start, end)

    // Helper to build page URL
    const pageUrl = (p: number) => `/projects?page=${p}`

    return (
        <main className="py-16">
            <div className="max-w-6xl mx-auto px-6">
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold">All projects</h1>
                    <p className="text-sm text-slate-600 mt-2">Showing {start + 1}–{Math.min(end, total)} of {total} projects.</p>
                </header>

                {/* ShowcaseProjectImage expects an items prop — it will render each passed project */}
                <ShowcaseProjectImage items={pageItems} />

                {/* Pagination */}
                <nav className="mt-8 flex items-center justify-between">
                    <div>
                        <span className="text-sm text-slate-600">Page {currentPage} of {totalPages}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Prev */}
                        <Link
                            href={pageUrl(Math.max(1, currentPage - 1))}
                            className={`px-3 py-1 rounded-md border text-sm ${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'bg-white hover:bg-slate-50'}`}
                        >
                            Prev
                        </Link>

                        {/* Page numbers (show up to 7 numbers around current page) */}
                        <div className="hidden sm:flex items-center gap-1">
                            {(() => {
                                const pages = []
                                const range = 3 // pages before/after
                                const startPage = Math.max(1, currentPage - range)
                                const endPage = Math.min(totalPages, currentPage + range)
                                for (let p = startPage; p <= endPage; p++) {
                                    pages.push(
                                        <Link
                                            key={p}
                                            href={pageUrl(p)}
                                            className={`px-3 py-1 rounded-md text-sm ${p === currentPage ? 'bg-indigo-600 text-white' : 'bg-white border hover:bg-slate-50'}`}
                                        >
                                            {p}
                                        </Link>
                                    )
                                }
                                return pages
                            })()}
                        </div>

                        {/* Next */}
                        <Link
                            href={pageUrl(Math.min(totalPages, currentPage + 1))}
                            className={`px-3 py-1 rounded-md border text-sm ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'bg-white hover:bg-slate-50'}`}
                        >
                            Next
                        </Link>
                    </div>
                </nav>
            </div>
        </main>
    )
}
