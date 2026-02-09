import { GoogleGenerativeAI, TaskType } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY
if (!API_KEY) throw new Error('GOOGLE_API_KEY or GEMINI_API_KEY is required in env')

const MODEL_NAME = process.env.GEMINI_EMBED_MODEL || 'text-embedding-004'

const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: MODEL_NAME })


export async function embedTexts(texts: string[]): Promise<number[][]> {
    if (!Array.isArray(texts)) throw new TypeError('texts must be an array of strings')
    if (texts.length === 0) return []

    const results: number[][] = []

    // Sequential for now to avoid complexity, or Promise.all if needed
    // The embeddings API typically takes one content at a time or supports batching depending on version.
    // embedContent accepts a single string or complex object.

    // Note: text-embedding-004 supports batchEmbedContents
    try {
        // Attempt batch embedding if model supports it, otherwise loop.
        // For simplicity and broad compatibility, we'll loop or use batchEmbedContents if available.
        // The SDK method is model.batchEmbedContents({ requests: ... })

        const requests = texts.map(t => ({
            content: { role: 'user', parts: [{ text: t }] },
            taskType: TaskType.RETRIEVAL_DOCUMENT
        }))

        // batchEmbedContents is available on the client, not the model instance directly in some versions?
        // Actually it's model.batchEmbedContents
        const result = await model.batchEmbedContents({ requests })

        if (result.embeddings) {
            return result.embeddings.map(e => e.values || [])
        }

    } catch (err) {
        console.warn('Batch embedding failed or not supported, falling back to serial:', err)
        // Fallback to serial
        for (const text of texts) {
            const result = await model.embedContent(text)
            results.push(result.embedding.values)
        }
        return results
    }

    return results
}

export default embedTexts
