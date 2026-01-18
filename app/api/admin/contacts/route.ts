import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Contact from '@/app/model/Contact'
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

        // Get pagination params
        const { searchParams } = new URL(request.url)
        const page = Number(searchParams.get('page') || 1)
        const limit = Math.min(Number(searchParams.get('limit') || 20), 200)
        const skip = (page - 1) * limit

        // Get filter params
        const filterResolved = searchParams.get('resolved')
        const filterCountry = searchParams.get('country')

        // Build query
        const query: any = {}
        if (filterResolved !== null && filterResolved !== '') {
            query.resolved = filterResolved === 'true'
        }
        if (filterCountry) {
            query.country = filterCountry
        }

        // Fetch contacts
        const [items, total] = await Promise.all([
            Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Contact.countDocuments(query)
        ])

        return NextResponse.json({ items, total, page, limit })
    } catch (error) {
        console.error('List contacts error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
