import { MongoClient, Db } from 'mongodb'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

let client: MongoClient | null = null
let cachedDb: Db | null = null

export async function getDb(): Promise<Db> {
    const uri = process.env.MONGODB_URI
    if (!uri) throw new Error('MONGODB_URI missing in env')

    // Ensure Mongoose is connected for Models
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(uri)
    }

    if (cachedDb) return cachedDb

    if (!client) {
        client = new MongoClient(uri, {})
        await client.connect()
    }

    cachedDb = client.db(process.env.MONGODB_DB || 'allpilar')
    return cachedDb
}

export default client
