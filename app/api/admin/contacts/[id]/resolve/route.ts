import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Contact from '@/app/model/Contact'
import { requireAdminAuth } from '@/app/utils/auth'

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return
    await mongoose.connect(MONGODB_URI as string)
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const admin = requireAdminAuth(request)
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await connectDB()

        const body = await request.json()
        const { resolve } = body

        const contact = await Contact.findByIdAndUpdate(
            id,
            { resolved: !!resolve },
            { new: true }
        ).lean()

        if (!contact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
        }

        return NextResponse.json({ item: contact })
    } catch (error) {
        console.error('Resolve contact error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
