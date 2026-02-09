import { NextRequest, NextResponse } from 'next/server'
import ChatSession from '@/app/model/ChatSession'
import { getDb } from '@/app/lib/mongoClient'
import crypto from 'crypto'

function genSessionId() { return crypto.randomBytes(10).toString('hex') }

export async function POST(req: NextRequest) {
    try {
        await getDb() // ensure (native) and mongoose connection
        const body = await req.json()
        const ip = req.headers.get('x-forwarded-for') || 'unknown'
        const deviceFingerprint = body.deviceFingerprint || req.headers.get('x-device-fp') || ''

        let session = null
        if (deviceFingerprint) {
            session = await ChatSession.findOne({ deviceFingerprint, ip, closed: false }).sort({ updatedAt: -1 })
        }

        if (!session) {
            const sessionId = genSessionId()
            session = await ChatSession.create({
                sessionId,
                ip,
                deviceFingerprint,
                messages: [{ role: 'system', content: 'Assistant initialized' }]
            })
        }

        return NextResponse.json({ sessionId: session.sessionId, messages: session.messages })
    } catch (error) {
        console.error('Chat init error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
