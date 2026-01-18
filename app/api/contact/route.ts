import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Contact from '@/app/model/Contact'
import { sendAdminNotification } from '@/app/utils/mailer'
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
        const { email, preferredContact, subject, description, message, anonymous } = body

        const finalSubject = subject || 'Contact Form'
        const finalDescription = description || message || ''

        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
        const userAgent = request.headers.get('user-agent') || ''

        const geoData = await lookupIp(ip)
        const country = geoData?.country || undefined

        const contact = await Contact.create({
            email: anonymous ? undefined : email,
            preferredContact,
            subject: finalSubject,
            description: finalDescription,
            ip,
            userAgent,
            anonymous: !!anonymous,
            country
        })

        const html = `<p><strong>New contact form received</strong></p>
        <ul>
            <li><strong>Email:</strong> ${email || '(Anonymous)'}</li>
            <li><strong>Preferred Contact:</strong> ${preferredContact || '—'}</li>
            <li><strong>Subject:</strong> ${finalSubject || '—'}</li>
            <li><strong>Description:</strong> ${finalDescription ? finalDescription.replace(/</g, '&lt;') : '—'}</li>
            <li><strong>Location:</strong> ${country || 'Unknown'}</li>
            <li><strong>IP:</strong> ${ip}</li>
        </ul>
        <p><a href="${process.env.NEXT_PUBLIC_URL}/admin/login">Open Admin Dashboard</a></p>`

        try {
            await sendAdminNotification('🔔 New Contact Form - AllPilar', html)
        } catch (err) {
            console.error('Failed to send admin notification:', err)
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully', id: contact._id }, { status: 201 })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
