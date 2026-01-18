import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Contact from '@/app/model/Contact'
import SiteView from '@/app/model/SiteView'
import { requireAdminAuth } from '@/app/utils/auth'

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return
    await mongoose.connect(MONGODB_URI as string)
}

export async function GET(request: NextRequest) {
    try {
        // Verify authentication
        const admin = requireAdminAuth(request)
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await connectDB()

        // Basic totals
        const totalContacts = await Contact.countDocuments()
        const unresolvedContacts = await Contact.countDocuments({ resolved: false })

        const totalViews = await SiteView.countDocuments()
        const uniqueIps = await SiteView.distinct('ip').then((ips: string[]) => ips.filter(Boolean).length)

        // Aggregate by country (contacts)
        const contactsByCountry = await Contact.aggregate([
            { $match: {} },
            { $group: { _id: { $ifNull: ['$country', 'Unknown'] }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 20 }
        ])

        // Aggregate by country (views)
        const viewsByCountry = await SiteView.aggregate([
            { $group: { _id: { $ifNull: ['$country', 'Unknown'] }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 20 }
        ])

        // Recent views (last 24h)
        const since24h = new Date(Date.now() - 1000 * 60 * 60 * 24)
        const recentViews = await SiteView.find({ createdAt: { $gte: since24h } })
            .sort({ createdAt: -1 })
            .limit(50)
            .lean()

        // Daily views (last 7 days)
        const since7d = new Date()
        since7d.setDate(since7d.getDate() - 7)
        since7d.setHours(0, 0, 0, 0)

        const dailyViews = await SiteView.aggregate([
            { $match: { createdAt: { $gte: since7d } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ])

        return NextResponse.json({
            totals: { totalContacts, unresolvedContacts, totalViews, uniqueIps },
            contactsByCountry,
            viewsByCountry,
            recentViews,
            dailyViews
        })
    } catch (error) {
        console.error('Analytics error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
