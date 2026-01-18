import { useEffect, useState } from 'react'
import api from '@/app/lib/api'
import { FiUsers, FiEye, FiMapPin, FiCheckCircle, FiActivity } from 'react-icons/fi'
import ViewsPeek from './ViewsPeek'
import GeographicChart from './GeographicChart'

type AnalyticsData = {
    totals: {
        totalContacts: number
        unresolvedContacts: number
        totalViews: number
        uniqueIps: number
    }
    contactsByCountry: Array<{ _id: string; count: number }>
    viewsByCountry: Array<{ _id: string; count: number }>
    dailyViews: Array<{ _id: string; count: number }>
}

export default function AnalyticsDoughnut() {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAnalytics()
    }, [])

    async function fetchAnalytics() {
        try {
            const res = await api.get('/admin/analytics')
            setData(res.data)
        } catch (err) {
            console.error('Analytics error:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-slate-800/50 animate-pulse rounded-2xl border border-white/5" />
                ))}
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="space-y-8 mb-12">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Contacts"
                    value={data.totals.totalContacts}
                    icon={<FiUsers size={20} />}
                    color="purple"
                />
                <StatCard
                    title="Unresolved"
                    value={data.totals.unresolvedContacts}
                    icon={<FiCheckCircle size={20} />}
                    color="orange"
                />
                <StatCard
                    title="Total Views"
                    value={data.totals.totalViews}
                    icon={<FiEye size={20} />}
                    color="blue"
                />
                <StatCard
                    title="Unique Visitors"
                    value={data.totals.uniqueIps}
                    icon={<FiMapPin size={20} />}
                    color="emerald"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ViewsPeek dailyViews={data.dailyViews || []} />
                <GeographicChart viewsByCountry={data.viewsByCountry || []} />
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) {
    const colorClasses: Record<string, string> = {
        purple: 'from-purple-600/20 to-purple-900/20 text-purple-400 border-purple-500/20',
        orange: 'from-orange-600/20 to-orange-900/20 text-orange-400 border-orange-500/20',
        blue: 'from-blue-600/20 to-blue-900/20 text-blue-400 border-blue-500/20',
        emerald: 'from-emerald-600/20 to-emerald-900/20 text-emerald-400 border-emerald-500/20',
    }

    return (
        <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-[2rem] p-6 backdrop-blur-xl`}>
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                    {icon}
                </div>
                <FiActivity size={16} className="opacity-20" />
            </div>
            <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">{title}</p>
                <p className="text-3xl font-black text-white tracking-tighter">{value.toLocaleString()}</p>
            </div>
        </div>
    )
}

