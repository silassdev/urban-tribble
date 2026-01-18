import mongoose from 'mongoose'

export interface IAdmin extends mongoose.Document {
    name: string
    email: string
    passwordHash: string
}

const AdminSchema = new mongoose.Schema<IAdmin>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model<IAdmin>('Admin', AdminSchema)