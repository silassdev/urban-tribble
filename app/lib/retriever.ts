import KnowledgeDoc from '../model/KnowledgeDoc'
import { embedTexts } from './llmAdapter'

// compute cosine similarity
function cosine(a: number[], b: number[]) {
    let dot = 0, na = 0, nb = 0
    for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i] }
    return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-12)
}

export async function retrieveRelevantDocs(query: string, topK = 5) {
    // 1. fetch all knowledge docs (small scale). For large sets use a vector DB.
    const docs = await KnowledgeDoc.find().lean()
    // 2. embed
    const [qVec] = await embedTexts([query])
    const texts = docs.map(d => d.text)
    const vecs = await embedTexts(texts)
    const scored = docs.map((d, i) => ({ doc: d, score: cosine(qVec, vecs[i]) }))
    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, topK).map(s => ({ title: s.doc.title, excerpt: s.doc.text.slice(0, 200), score: s.score }))
}
