import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import SiteView from '@/app/model/SiteView'
import { lookupIp } from '@/app/utils/geoip'

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return
    await mongoose.connect(MONGODB_URI as string)
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const { path, country } = body

        // Get IP and User-Agent
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
        const userAgent = request.headers.get('user-agent') || ''

        // Lookup geo-location if not provided
        let finalCountry = country
        if (!finalCountry) {
            const geoData = await lookupIp(ip)
            finalCountry = geoData?.country || undefined
        }

        // Create site view record
        await SiteView.create({
            ip,
            userAgent,
            path,
            country: finalCountry
        })

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        console.error('Site view error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
