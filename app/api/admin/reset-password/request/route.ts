import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Admin from '@/app/model/Admin'
import { sendEmail } from '@/app/utils/mailer'

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return
    if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined')
    await mongoose.connect(MONGODB_URI)
}

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const { email } = await request.json()
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        const admin = await Admin.findOne({ email })
        if (!admin) {
            // Return 200 even if not found to prevent email enumeration,
            // or just 404. Let's return 404 for admin logic simplicity.
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 })
        }

        const code = generateCode()
        admin.resetCode = code
        admin.resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000) // 15 mins
        await admin.save()

        const html = `
            <h2>Admin Password Reset</h2>
            <p>You requested a password reset for your AllPilar admin account.</p>
            <p>Your 6-digit confirmation code is: <strong>${code}</strong></p>
            <p>If you did not request this, please ignore this email.</p>
        `

        await sendEmail(email, 'AllPilar Admin - Password Reset Code', html)

        return NextResponse.json({ success: true, message: 'Reset code sent to your email.' })
    } catch (error) {
        console.error('Password reset request error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
