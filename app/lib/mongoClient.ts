import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

let client: MongoClient | null = null
let cachedDb: Db | null = null

export async function getDb(): Promise<Db> {
    if (cachedDb) return cachedDb

    const uri = process.env.MONGO_URI
    if (!uri) throw new Error('MONGO_URI missing in env')

    if (!client) {
        client = new MongoClient(uri, {})
        await client.connect()
    }

    cachedDb = client.db(process.env.MONGO_DB || 'allpilar')
    return cachedDb
}

export default client // null initially, but that's okay for most uses as they should use getDb()
