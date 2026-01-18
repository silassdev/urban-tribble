import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '@/app/model/Admin'
import { signAdminToken } from '@/app/utils/auth'

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return
    await mongoose.connect(MONGODB_URI as string)
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
        }

        // Find admin
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        // Verify password
        const isValid = await bcrypt.compare(password, admin.passwordHash)
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        // Generate token
        const token = signAdminToken(admin._id.toString())

        return NextResponse.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } })
    } catch (error) {
        console.error('Admin login error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
