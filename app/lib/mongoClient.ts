import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

let client: MongoClient | null = null
let cachedDb: Db | null = null

export async function getDb(): Promise<Db> {
    if (cachedDb) return cachedDb

    const uri = process.env.MONGODB_URI
    if (!uri) throw new Error('MONGODB_URI missing in env')

    if (!client) {
        client = new MongoClient(uri, {})
        await client.connect()
    }

    cachedDb = client.db(process.env.MONGODB_DB || 'allpilar')
    return cachedDb
}

export default client
