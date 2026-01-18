import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Contact from '@/app/model/Contact'
import { requireAdminAuth } from '@/app/utils/auth'

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return
    await mongoose.connect(MONGODB_URI as string)
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Verify authentication
        const admin = requireAdminAuth(request)
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await connectDB()

        const contact = await Contact.findById(params.id).lean()
        if (!contact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
        }

        return NextResponse.json({ item: contact })
    } catch (error) {
        console.error('Get contact error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
