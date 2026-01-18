'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface GeographicChartProps {
    viewsByCountry: Array<{ _id: string; count: number }>
}

export default function GeographicChart({ viewsByCountry }: GeographicChartProps) {
    const chartLabels = viewsByCountry.map((item) => item._id)
    const chartValues = viewsByCountry.map((item) => item.count)

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Views',
                data: chartValues,
                backgroundColor: [
                    'rgba(147, 51, 234, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(236, 72, 153, 0.7)',
                ],
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 2,
                hoverOffset: 15,
                cutout: '70%',
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#94a3b8',
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 11,
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                padding: 12,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
            },
        },
    }

    return (
        <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight">Geo Distribution</h3>
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md uppercase tracking-wider">
                    Total Views
                </span>
            </div>
            <div className="h-[250px]">
                <Doughnut data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}
