import mongoose from 'mongoose'

export interface ISiteView extends mongoose.Document {
    ip?: string
    userAgent?: string
    path?: string
    country?: string
    createdAt?: Date
    updatedAt?: Date
}

const SiteViewSchema = new mongoose.Schema<ISiteView>({
    ip: { type: String },
    userAgent: { type: String },
    path: { type: String },
    country: { type: String }
}, { timestamps: true })

export default mongoose.models.SiteView || mongoose.model<ISiteView>('SiteView', SiteViewSchema)
