'use client'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

type Message = { role: 'user' | 'assistant' | 'system', content: string }

export default function ChatWidget() {
    const [open, setOpen] = useState(false)
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const deviceFingerprint = useMemoFingerprint()

    // show welcome popup only first-time (client)
    useEffect(() => {
        const seen = localStorage.getItem('ap_bot_seen_v1')
        if (!seen) {
            setOpen(true)
            localStorage.setItem('ap_bot_seen_v1', '1')
        }
    }, [])

    useEffect(() => {
        if (!open) return
        initSession()
    }, [open])

    async function initSession() {
        if (sessionId) return
        try {
            const ip = '' // server will know IP from request
            const res = await axios.post('/api/chat/init', { deviceFingerprint })
            setSessionId(res.data.sessionId)
            setMessages(res.data.messages || [])
        } catch (err) {
            console.error(err)
        }
    }

    async function send() {
        if (!text.trim() || !sessionId) return
        const content = text.trim()
        setText('')
        const userMsg: Message = { role: 'user', content }
        setMessages(prev => [...prev, userMsg])
        setLoading(true)
        try {
            const res = await axios.post('/api/chat/message', { sessionId, content })
            setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }])
            // if package recommended:
            if (res.data.recommended) {
                // show inline CTA buttons / package tile
                setMessages(prev => [...prev, { role: 'system', content: `Recommended package: ${res.data.recommended}` }])
            }
        } catch (err: any) {
            console.error(err)
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry — an internal error occurred.' }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-96">
            {open ? (
                <div className="bg-white rounded-lg shadow p-3 flex flex-col h-96">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">Hi — I’m AllPilar assistant</div>
                        <button onClick={() => setOpen(false)} className="text-xs">Minimize</button>
                    </div>

                    <div className="flex-1 overflow-auto p-2 space-y-2" id="chat-box">
                        {messages.map((m, i) => (
                            <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                                <div className={`inline-block px-3 py-2 rounded ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-2 flex gap-2">
                        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Ask about packages, pricing, or docs..." />
                        <button onClick={send} disabled={loading} className="px-3 py-2 bg-indigo-600 text-white rounded">{loading ? '...' : 'Send'}</button>
                    </div>
                </div>
            ) : (
                <button onClick={() => setOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded">Chat with us</button>
            )}
        </div>
    )
}

/** small deterministic client fingerprint generator (not cryptographic) */
function useMemoFingerprint() {
    const [fp, setFp] = useState<string | null>(null)
    useEffect(() => {
        const existing = localStorage.getItem('ap_device_fp')
        if (existing) { setFp(existing); return }
        // simple fingerprint from navigator data and random suffix
        const nav = typeof navigator !== 'undefined' ? `${navigator.userAgent}-${navigator.platform}` : 'unknown'
        const hash = btoa(nav).slice(0, 20) + '-' + Math.random().toString(36).slice(2, 8)
        localStorage.setItem('ap_device_fp', hash)
        setFp(hash)
    }, [])
    return fp
}
