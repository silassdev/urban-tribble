import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
export { embedTexts } from './embedVertex'

dotenv.config()

const API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY
if (!API_KEY) console.warn('GOOGLE_API_KEY is missing in env')

const genAI = new GoogleGenerativeAI(API_KEY || 'MISSING_KEY')
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-1.5-flash' })

export async function generateAnswer({ systemPrompt, messages, contextDocs }: { systemPrompt: string, messages: any[], contextDocs: any[] }) {
    if (!API_KEY) return { reply: "Setup Error: Missing API Key", structured: null }

    // Construct context string
    const contextText = contextDocs.map(d => `Title: ${d.title}\nContent: ${d.text}`).join('\n\n')

    // Construct full prompt history
    // We'll append context to the system prompt
    const finalSystemPrompt = `${systemPrompt}\n\nCONTEXT:\n${contextText}`

    // Convert 'messages' to Gemini format (user/model)
    // messages: { role: 'user'|'assistant'|'system', content: string }
    // Gemini: role: 'user'|'model'

    const history = messages
        .filter(m => m.role !== 'system') // system prompt is separate in newer API or just prepended
        .map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
        }))

    // We can use startChat for history management
    const chat = model.startChat({
        history: history.slice(0, -1), // all except last
        systemInstruction: { role: 'user', parts: [{ text: finalSystemPrompt }] } // trick: system prompt as first user msg often works better if systemInstruction not fully supported in all tiers, but standard is systemInstruction with proper role.
        // systemInstruction: finalSystemPrompt 
    })

    // Note: Protocol might require systemInstruction to be string or specific object.
    // simpler:
    // model.generateContent if single turn.
    // For chat, user `systemInstruction` in model config if supported, or prepend.
    // We'll fallback to prepending context to the last message if needed, but startChat is cleaner.

    const lastMsg = history[history.length - 1]
    const content = lastMsg ? lastMsg.parts[0].text : ''

    if (!content) return { reply: "I didn't catch that.", structured: null }

    try {
        const result = await chat.sendMessage(content)
        const response = result.response
        const text = response.text()

        // Try to find a recommended package in the text if strictly formatted, 
        // or if we used function calling (advanced). For now, basic regex or text analysis.
        let structured = null
        if (text.toLowerCase().includes('starter')) structured = { recommendedPackage: 'Starter' }
        else if (text.toLowerCase().includes('growth')) structured = { recommendedPackage: 'Growth' }
        else if (text.toLowerCase().includes('custom')) structured = { recommendedPackage: 'Custom' }

        return { reply: text, structured }
    } catch (e) {
        console.error("Gemini generation error:", e)
        return { reply: "I'm having trouble connecting right now.", structured: null }
    }
}
