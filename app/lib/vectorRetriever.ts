import { getDb } from './mongoClient'
import { embedTexts } from './embedVertex'

type RetrievedDoc = {
    _id: string
    title: string
    text: string
    score: number
}


export async function indexKnowledgeDocs(batchSize = Number(process.env.BATCH_SIZE || 50)) {
    const db = await getDb()
    const coll = db.collection('knowledgedocs') // adjust if you used a different collection name

    // find docs missing embedding
    const cursor = coll.find({ $or: [{ embedding: { $exists: false } }, { embedding: null }] }).sort({ _id: 1 }).batchSize(batchSize)

    while (await cursor.hasNext()) {
        const batch = []
        for (let i = 0; i < batchSize; i++) {
            const doc = await cursor.next()
            if (!doc) break
            batch.push(doc)
        }
        if (batch.length === 0) break

        const texts = batch.map(d => (d.text || '').slice(0, 20000)) // trim if huge
        const vecs = await embedTexts(texts)
        const ops = batch.map((d, i) => {
            return {
                updateOne: {
                    filter: { _id: d._id },
                    update: { $set: { embedding: vecs[i] } }
                }
            }
        })
        if (ops.length) {
            await coll.bulkWrite(ops)
        }
        // small pause to respect rate limits
        await new Promise(r => setTimeout(r, 200))
    }
}

/**
 * Retrieve top-K docs using Atlas Vector Search (knn / knnBeta)
 * Returns array of { _id, title, text, score }
 */
export async function retrieveRelevantDocs(query: string, topK = 5): Promise<RetrievedDoc[]> {
    const db = await getDb()
    const coll = db.collection('knowledgedocs')

    // embed the query
    const [qVec] = await embedTexts([query])
    if (!qVec) return []

    // run Atlas Search KNN aggregate
    // Note: index name used by Atlas; if you used a custom name change index: 'knowledge_vector_index'
    const pipeline = [
        {
            $search: {
                knnBeta: {
                    vector: qVec,
                    path: 'embedding', // field in your docs
                    k: topK
                },
                // index: 'knowledge_vector_index' // optionally specify the index name
            }
        },
        {
            $project: {
                title: 1,
                text: 1,
                score: { $meta: 'searchScore' }
            }
        }
    ]

    const cursor = coll.aggregate(pipeline, { allowDiskUse: false })
    const results = await cursor.toArray()
    return results.map(r => ({ _id: String(r._id), title: r.title, text: r.text, score: Number(r.score || 0) }))
}
