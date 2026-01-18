import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'yGEESOJVcvhswpkzdeYUmmcxwgf8ujhuhhour'

export interface AdminJWTPayload {
    id: string
}

export function verifyAdminToken(token: string): AdminJWTPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AdminJWTPayload
        return decoded
    } catch (err) {
        return null
    }
}

export function requireAdminAuth(request: NextRequest): AdminJWTPayload | null {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null
    }

    const token = authHeader.substring(7)
    return verifyAdminToken(token)
}

export function signAdminToken(adminId: string): string {
    return jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: '7d' })
}
