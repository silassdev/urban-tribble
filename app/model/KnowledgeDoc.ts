// server/src/models/KnowledgeDoc.ts
import mongoose from 'mongoose'

export interface IKnowledgeDoc extends mongoose.Document {
    title: string
    text: string
    tags?: string[]
    source?: string
    createdAt?: Date
}

const KnowledgeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: [String],
    source: String
}, { timestamps: true })

export default mongoose.model('KnowledgeDoc', KnowledgeSchema)
