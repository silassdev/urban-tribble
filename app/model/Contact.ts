import mongoose from 'mongoose'

export interface IContact extends mongoose.Document {
    email?: string
    preferredContact?: string
    subject?: string
    description?: string
    ip?: string
    userAgent?: string
    anonymous?: boolean
    resolved?: boolean
    country?: string
}

const ContactSchema = new mongoose.Schema<IContact>({
    email: { type: String },
    preferredContact: { type: String },
    subject: { type: String },
    description: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    anonymous: { type: Boolean, default: false },
    resolved: { type: Boolean, default: false },
    country: { type: String }
}, { timestamps: true })

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema)