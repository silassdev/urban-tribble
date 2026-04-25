import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '@/app/model/Admin'

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return
    if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined')
    await mongoose.connect(MONGODB_URI)
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const email = body.email?.trim()
        const code = body.code?.trim()
        const newPassword = body.newPassword

        if (!email || !code || !newPassword) {
            return NextResponse.json({ error: 'Email, code, and new password are required' }, { status: 400 })
        }

        const admin = await Admin.findOne({
            email,
            resetCode: code,
            resetCodeExpiry: { $gt: new Date() }
        })

        if (!admin) {
            return NextResponse.json({ error: 'Invalid or expired confirmation code' }, { status: 400 })
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(newPassword, 10)
        
        // Update admin and clear reset code
        admin.passwordHash = passwordHash
        admin.resetCode = undefined
        admin.resetCodeExpiry = undefined
        await admin.save()

        return NextResponse.json({ success: true, message: 'Password has been reset successfully.' })
    } catch (error) {
        console.error('Password reset confirm error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
