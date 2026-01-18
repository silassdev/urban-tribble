'use client'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
)

interface ViewsPeekProps {
    dailyViews: Array<{ _id: string; count: number }>
}

export default function ViewsPeek({ dailyViews }: ViewsPeekProps) {
    // Fill in missing days for the last 7 days if any
    const labels: string[] = []
    const data: number[] = []

    const now = new Date()
    for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(now.getDate() - i)
        const dateStr = d.toISOString().split('T')[0]

        labels.push(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
        const found = dailyViews.find(v => v._id === dateStr)
        data.push(found ? found.count : 0)
    }

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Daily Views',
                data,
                backgroundColor: 'rgba(147, 51, 234, 0.5)',
                borderColor: 'rgba(147, 51, 234, 1)',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(147, 51, 234, 0.8)',
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' as const },
                bodyFont: { size: 13 },
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#94a3b8',
                    font: { size: 11 },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                },
                ticks: {
                    color: '#94a3b8',
                    font: { size: 11 },
                    stepSize: 1,
                },
            },
        },
    }

    return (
        <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight">Traffic Peak</h3>
                <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md uppercase tracking-wider">
                    Last 7 Days
                </span>
            </div>
            <div className="h-[250px]">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}
