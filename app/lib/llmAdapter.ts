import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
export { embedTexts } from './embedVertex'

dotenv.config()

const API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY
if (!API_KEY) console.warn('⚠️  GOOGLE_API_KEY or GEMINI_API_KEY is missing in env — chatbot will not work!')

const genAI = new GoogleGenerativeAI(API_KEY || 'MISSING_KEY')

export async function generateAnswer({ systemPrompt, messages, contextDocs }: { systemPrompt: string, messages: any[], contextDocs: any[] }) {
    if (!API_KEY) return { reply: "Setup Error: Missing API Key. Please set GOOGLE_API_KEY or GEMINI_API_KEY in your .env.local file.", structured: null }

    // Construct context string
    const contextText = contextDocs.map(d => `Title: ${d.title}\nContent: ${d.text}`).join('\n\n')
    const finalSystemPrompt = `${systemPrompt}\n\nCONTEXT:\n${contextText}`

    // Convert messages to Gemini format (user/model), skip system messages
    const history = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
        }))

    const lastMsg = history[history.length - 1]
    const content = lastMsg ? lastMsg.parts[0].text : ''

    if (!content) return { reply: "I didn't catch that.", structured: null }

    try {
        // Create model with correct systemInstruction format (parts only, no role wrapper)
        const chatModel = genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
            systemInstruction: { parts: [{ text: finalSystemPrompt }] }
        })

        const chat = chatModel.startChat({
            history: history.slice(0, -1), // all except the last message
        })

        const result = await chat.sendMessage(content)
        const text = result.response.text()

        let structured = null
        if (text.toLowerCase().includes('starter')) structured = { recommendedPackage: 'Starter' }
        else if (text.toLowerCase().includes('growth')) structured = { recommendedPackage: 'Growth' }
        else if (text.toLowerCase().includes('custom')) structured = { recommendedPackage: 'Custom' }

        return { reply: text, structured }
    } catch (e: any) {
        console.error("❌ Gemini generation error:", e?.message ?? e)
        return { reply: "I'm having trouble connecting right now. Please try again in a moment.", structured: null }
    }
}
