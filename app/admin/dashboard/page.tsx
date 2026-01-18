'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'
import toast from 'react-hot-toast'
import ContactModal from '@/app/components/ContactModal'
import AnalyticsDoughnut from '@/app/components/AnalyticsDoughnut'
import { FiLogOut, FiSearch, FiEye, FiCheck, FiX } from 'react-icons/fi'

type Contact = {
    _id: string
    email?: string
    preferredContact?: string
    subject?: string
    description?: string
    ip?: string
    userAgent?: string
    anonymous?: boolean
    resolved?: boolean
    country?: string
    createdAt: string
}

export default function AdminDashboardPage() {
    const router = useRouter()
    const [items, setItems] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [selected, setSelected] = useState<Contact | null>(null)
    const [filter, setFilter] = useState('')
    const [filterResolved, setFilterResolved] = useState<string>('')

    function getToken() {
        return localStorage.getItem('ap:admin_token')
    }

    useEffect(() => {
        if (!getToken()) {
            router.push('/admin/login')
            return
        }
        fetchPage(1)
    }, [filterResolved])

    async function fetchPage(p: number) {
        setLoading(true)
        try {
            const params: any = { page: p }
            if (filterResolved !== '') {
                params.resolved = filterResolved
            }

            const res = await api.get('/admin/contacts', { params })
            setItems(res.data.items)
            setTotal(res.data.total)
            setPage(res.data.page || 1)
        } catch (err: any) {
            console.error(err)
            if (err?.response?.status === 401) {
                localStorage.removeItem('ap:admin_token')
                router.push('/admin/login')
            } else {
                toast.error('Failed to load contacts')
            }
        } finally {
            setLoading(false)
        }
    }

    async function markResolved(id: string, resolve: boolean) {
        try {
            await api.patch(`/admin/contacts/${id}/resolve`, { resolve })
            toast.success(resolve ? 'Marked as resolved' : 'Marked as unresolved')
            fetchPage(page)
        } catch (err) {
            toast.error('Failed to update status')
        }
    }

    function handleLogout() {
        localStorage.removeItem('ap:admin_token')
        router.push('/admin/login')
    }

    const filtered = items.filter(i => {
        if (!filter) return true
        const f = filter.toLowerCase()
        return (
            (i.email || '').toLowerCase().includes(f) ||
            (i.subject || '').toLowerCase().includes(f) ||
            (i.description || '').toLowerCase().includes(f) ||
            (i.country || '').toLowerCase().includes(f)
        )
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Admin Dashboard</h1>
                        <p className="text-slate-400">Manage contacts and view analytics</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                    >
                        <FiLogOut />
                        Sign Out
                    </button>
                </div>

                {/* Analytics */}
                <AnalyticsDoughnut />

                {/* Filters */}
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6 mb-6">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[250px]">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                <FiSearch className="inline mr-2" />
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search email, subject, description, country..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                            <select
                                value={filterResolved}
                                onChange={(e) => setFilterResolved(e.target.value)}
                                className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">All</option>
                                <option value="false">Unresolved</option>
                                <option value="true">Resolved</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Contact Table */}
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50 border-b border-slate-700">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-slate-300">Received</th>
                                    <th className="p-4 text-sm font-semibold text-slate-300">Email</th>
                                    <th className="p-4 text-sm font-semibold text-slate-300">Subject</th>
                                    <th className="p-4 text-sm font-semibold text-slate-300">Location</th>
                                    <th className="p-4 text-sm font-semibold text-slate-300">Status</th>
                                    <th className="p-4 text-sm font-semibold text-slate-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-slate-400">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-slate-400">
                                            No contacts found
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((contact) => (
                                        <tr
                                            key={contact._id}
                                            className="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
                                        >
                                            <td className="p-4 text-sm text-slate-300">
                                                {new Date(contact.createdAt).toLocaleString()}
                                            </td>
                                            <td className="p-4 text-sm text-slate-300">
                                                {contact.anonymous ? (
                                                    <span className="text-slate-500 italic">Anonymous</span>
                                                ) : (
                                                    contact.email || '—'
                                                )}
                                            </td>
                                            <td className="p-4 text-sm text-slate-300">{contact.subject || '—'}</td>
                                            <td className="p-4 text-sm text-slate-300">{contact.country || 'Unknown'}</td>
                                            <td className="p-4 text-sm">
                                                {contact.resolved ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-md text-xs">
                                                        <FiCheck /> Resolved
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 rounded-md text-xs">
                                                        <FiX /> Unresolved
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setSelected(contact)}
                                                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
                                                    >
                                                        <FiEye /> View
                                                    </button>
                                                    <button
                                                        onClick={() => markResolved(contact._id, !contact.resolved)}
                                                        className={`px-3 py-1 rounded-lg transition text-sm ${contact.resolved
                                                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                                                : 'bg-green-600 text-white hover:bg-green-700'
                                                            }`}
                                                    >
                                                        {contact.resolved ? 'Unresolve' : 'Resolve'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between p-4 bg-slate-900/50 border-t border-slate-700">
                        <div className="text-sm text-slate-400">
                            Page {page} • Total {total} contacts
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => fetchPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => fetchPage(page + 1)}
                                disabled={items.length < 20}
                                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Modal */}
            {selected && <ContactModal contact={selected} onClose={() => setSelected(null)} onResolve={markResolved} />}
        </div>
    )
}
