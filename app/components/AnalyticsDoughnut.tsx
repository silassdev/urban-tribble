'use client'

import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import api from '@/app/lib/api'
import { FiUsers, FiEye, FiMapPin, FiCheckCircle } from 'react-icons/fi'

ChartJS.register(ArcElement, Tooltip, Legend)

type AnalyticsData = {
    totals: {
        totalContacts: number
        unresolvedContacts: number
        totalViews: number
        uniqueIps: number
    }
    contactsByCountry: Array<{ _id: string; count: number }>
    viewsByCountry: Array<{ _id: string; count: number }>
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
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-8 mb-6">
                <div className="text-center text-slate-400">Loading analytics...</div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-8 mb-6">
                <div className="text-center text-slate-400">No analytics available</div>
            </div>
        )
    }

    const viewsData = data.viewsByCountry.length > 0 ? data.viewsByCountry : data.contactsByCountry
    const chartLabels = viewsData.map((item) => item._id)
    const chartValues = viewsData.map((item) => item.count)

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'By Country',
                data: chartValues,
                backgroundColor: [
                    'rgba(147, 51, 234, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(14, 165, 233, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(251, 146, 60, 0.8)',
                ],
                borderColor: 'rgba(71, 85, 105, 0.5)',
                borderWidth: 2,
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    color: '#cbd5e1',
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#fff',
                bodyColor: '#cbd5e1',
                borderColor: 'rgba(148, 163, 184, 0.3)',
                borderWidth: 1,
            },
        },
    }

    return (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-6">Analytics Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                            <FiUsers className="text-purple-400" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Total Contacts</p>
                            <p className="text-2xl font-bold text-white">{data.totals.totalContacts}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-orange-600/20 to-orange-900/20 border border-orange-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-orange-500/20 rounded-lg">
                            <FiCheckCircle className="text-orange-400" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Unresolved</p>
                            <p className="text-2xl font-bold text-white">{data.totals.unresolvedContacts}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <FiEye className="text-blue-400" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Total Views</p>
                            <p className="text-2xl font-bold text-white">{data.totals.totalViews}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 border border-green-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                            <FiMapPin className="text-green-400" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Unique Visitors</p>
                            <p className="text-2xl font-bold text-white">{data.totals.uniqueIps}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            {viewsData.length > 0 && (
                <div className="bg-slate-900/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Geographic Distribution</h3>
                    <div className="h-[300px]">
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>
                </div>
            )}
        </div>
    )
}
