import { NextRequest, NextResponse } from 'next/server'
import ChatSession from '@/app/model/ChatSession'
import { getDb } from '@/app/lib/mongoClient'
import { retrieveRelevantDocs } from '@/app/lib/vectorRetriever'
import { generateAnswer } from '@/app/lib/llmAdapter'

export async function POST(req: NextRequest) {
    try {
        await getDb()
        const { sessionId, content } = await req.json()

        if (!sessionId || !content) {
            return NextResponse.json({ error: 'sessionId and content required' }, { status: 400 })
        }

        const session = await ChatSession.findOne({ sessionId })
        if (!session) return NextResponse.json({ error: 'session not found' }, { status: 404 })
        if (session.closed) return NextResponse.json({ error: 'session closed' }, { status: 403 })

        // 1. Abuse Check
        const lower = content.toLowerCase()
        const abuseKeywords = ['fuck', 'shit', 'kill', 'rape', 'bomb', 'suicide', 'porn', 'sex', 'nigger', 'bitch']
        const isAbusive = abuseKeywords.some(k => lower.includes(k))

        if (isAbusive) {
            session.abuseCount = (session.abuseCount || 0) + 1
            await session.save()
            if ((session.abuseCount || 0) >= 3) {
                session.closed = true
                await session.save()
                return NextResponse.json({ reply: "Session forcibly closed due to repeated abusive/off-scope behavior." })
            } else {
                return NextResponse.json({ reply: "I can't assist with that. Please keep questions professional and on-topic." })
            }
        }

        // 2. Save User Message
        session.messages.push({ role: 'user', content } as any)
        await session.save()

        // 3. Retrieval
        // If vectorRetriever fails or is empty, we handle gracefully? 
        // It returns [] if no index/docs.
        let docs: any[] = []
        try {
            docs = await retrieveRelevantDocs(content, 3)
        } catch (e) {
            console.warn(' retrieval failed:', e)
        }

        const systemPrompt = `
You are AllPilar's official assistant. Use company docs provided. Be concise and professional.
If user asks for a recommended package, classify into exactly one of: Starter, Growth, Custom.
Rules:
- If user describes <=10 pages, small business, basic features => Starter ($500 up).
- If user describes >10 pages, e-commerce, multiple integrations => Growth ($1000 up).
- If user requests large customization, integrations, enterprise SLA => Custom (contact sales).
- Return package recommendation only when you have enough info; ask concise clarifying Qs if needed.
- Never hallucinate contact details or policies.
- If request is out-of-scope (harmful, sexual, violent) refuse and try to steer back.
`

        // 4. Generate Answer
        const answer = await generateAnswer({
            systemPrompt,
            messages: session.messages,
            contextDocs: docs
        })

        // 5. Save Assistant Message
        session.messages.push({
            role: 'assistant',
            content: answer.reply,
            meta: answer.structured
        } as any)
        await session.save()

        const recommended = answer.structured?.recommendedPackage ?? null

        return NextResponse.json({ reply: answer.reply, recommended })

    } catch (error) {
        console.error('Chat message error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
