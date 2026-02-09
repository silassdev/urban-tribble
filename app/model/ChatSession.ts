// server/src/models/ChatSession.ts
import mongoose from 'mongoose'

export interface IMessage {
    role: 'user' | 'assistant' | 'system'
    content: string
    createdAt?: Date
    meta?: any
}

export interface IChatSession extends mongoose.Document {
    sessionId: string
    ip?: string
    deviceFingerprint?: string
    closed?: boolean
    abuseCount?: number
    messages: IMessage[]
    createdAt?: Date
    updatedAt?: Date
}

const MessageSchema = new mongoose.Schema({
    role: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
    meta: { type: mongoose.SchemaTypes.Mixed }
})

const ChatSessionSchema = new mongoose.Schema<IChatSession>({
    sessionId: { type: String, required: true, unique: true },
    ip: { type: String },
    deviceFingerprint: { type: String },
    closed: { type: Boolean, default: false },
    abuseCount: { type: Number, default: 0 },
    messages: { type: [MessageSchema], default: [] }
}, { timestamps: true })

export default mongoose.model<IChatSession>('ChatSession', ChatSessionSchema)
