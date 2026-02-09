Trying to implement germini ai, scope =
    On the home page.lets add a bot that pops up with a friendly welcome first time user launch the site.

Thus this chatbot Uses Gemini and trained data for company documents, terms, policies and others.

Also chat should attempt and provide helpful answer to user queries; E.g 

App Uses a 3 package approach and should be able to give user the exact Package he can use after interaction and understanding user requests.no fluff zone here - If users query does not match, sexually explicit, insult, violence, Harm, danger other to the main scope, Attempt to return user on track or scope with almost professional way.Else if user continue out of scope in a abusive way ? Force close Bot.

If possible, Add a robust logic that returns saved chats, if User device and IP that contained a msg or chats is same

    Other files have been created.
i need fix and attaching chat to client side

// server/src/routes/chat.ts (Express style)
import express from 'express'
import ChatSession from '../models/ChatSession'
import { retrieveRelevantDocs } from '../lib/retriever'
import { generateAnswer } from '../lib/llmAdapter'
import crypto from 'crypto'

const router = express.Router()

// helper to fingerprint device: client should pass deviceFingerprint header/body
function genSessionId() { return crypto.randomBytes(10).toString('hex') }

router.post('/init', async (req, res) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || ''
    const deviceFingerprint = req.body.deviceFingerprint || req.headers['x-device-fp'] || ''
    // find session matching ip + deviceFingerprint and not closed:
    let session = null
    if (deviceFingerprint) {
        session = await ChatSession.findOne({ deviceFingerprint, ip, closed: false }).sort({ updatedAt: -1 })
    }
    if (!session) {
        const sessionId = genSessionId()
        session = await ChatSession.create({ sessionId, ip, deviceFingerprint, messages: [{ role: 'system', content: 'Assistant initialized' }] })
    }
    res.json({ sessionId: session.sessionId, messages: session.messages })
})

router.post('/message', async (req, res) => {
    const { sessionId, content } = req.body
    if (!sessionId || !content) return res.status(400).json({ error: 'sessionId and content required' })
    const session = await ChatSession.findOne({ sessionId })
    if (!session) return res.status(404).json({ error: 'session not found' })
    if (session.closed) return res.status(403).json({ error: 'session closed' })

    // quick server-side moderation (simple blacklist)
    const lower = content.toLowerCase()
    const abuseKeywords = ['fuck', 'shit', 'kill', 'rape', 'bomb', 'suicide', 'porn', 'sex', 'nigger', 'bitch'] // example; extend carefully
    const isAbusive = abuseKeywords.some(k => lower.includes(k))
    if (isAbusive) {
        session.abuseCount = (session.abuseCount || 0) + 1
        await session.save()
        if (session.abuseCount >= 3) {
            session.closed = true
            await session.save()
            return res.json({ reply: "Session forcibly closed due to repeated abusive/off-scope behavior." })
        } else {
            await session.save()
            return res.json({ reply: "I can't assist with that. Please keep questions professional and on-topic." })
        }
    }

    // store user message
    session.messages.push({ role: 'user', content })
    await session.save()

    // Retrieval step
    const docs = await retrieveRelevantDocs(content, 6)

    // System prompt (no fluff, package logic built-in)
    const systemPrompt = `
You are AllPilar's official assistant. Use company docs provided. Be concise and professional.
If user asks for a recommended package, classify into exactly one of: Starter, Growth, Custom.
Rules:
- If user describes <=10 pages, small business, basic features => Starter ($500 up).
- If user describes >10 pages, e-commerce, multiple integrations => Growth ($1000 up).
- If user requests large customization, integrations, enterprise SLA => Custom (contact sales).
- Return package recommendation only when you have enough info; ask concise clarifying Qs if needed.
- Never hallucinate contact details or policies.
- If request is out-of-scope (harmful, sexual, violent) refuse and try to steer back. If abuse continues, close session.
  `

    // Generate reply via adapter
    const { reply, structured } = await generateAnswer({ systemPrompt, messages: session.messages as any, contextDocs: docs })

    // Optionally parse structured JSON for package recommendation (adapter should return structured JSON where possible)
    // Save assistant reply
    session.messages.push({ role: 'assistant', content: reply, meta: structured ?? undefined })
    await session.save()

    // If structured has recommendedPackage, return it as field
    const recommended = structured?.recommendedPackage ?? null

    return res.json({ reply, recommended })
})
