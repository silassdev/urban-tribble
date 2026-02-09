'use client'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageSquare, FiX, FiSend, FiMinimize2, FiMaximize2 } from 'react-icons/fi'

type Message = { role: 'user' | 'assistant' | 'system', content: string, meta?: any }

export default function ChatWidget() {
    const [open, setOpen] = useState(false)
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const deviceFingerprint = useMemoFingerprint()

    // show welcome popup only first-time (client)
    useEffect(() => {
        const seen = localStorage.getItem('ap_bot_seen_v1')
        if (!seen) {
            setTimeout(() => setOpen(true), 2000) // slight delay for effect
            localStorage.setItem('ap_bot_seen_v1', '1')
        }
    }, [])

    useEffect(() => {
        if (!open) return
        initSession()
    }, [open])

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping, open])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    async function initSession() {
        if (sessionId) return
        try {
            const res = await axios.post('/api/chat/init', { deviceFingerprint })
            setSessionId(res.data.sessionId)
            if (res.data.messages) setMessages(res.data.messages)
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
        setIsTyping(true)

        try {
            const res = await axios.post('/api/chat/message', { sessionId, content })

            // Artificial delay for "thinking" feel if response is too fast
            await new Promise(r => setTimeout(r, 600))

            setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply, meta: res.data.recommended ? { recommended: res.data.recommended } : undefined }])

            if (res.data.recommended) {
                setMessages(prev => [...prev, { role: 'system', content: `Recommendation: ${res.data.recommended} Package` }])
            }
        } catch (err: any) {
            console.error(err)
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
        } finally {
            setLoading(false)
            setIsTyping(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            send()
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-[#0d1117]/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/50 to-slate-800/50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/20">
                                        AP
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0d1117] rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-sm">Allpilar AI</h3>
                                    <p className="text-[10px] text-slate-400">Always online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`
                                            max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                                            ${m.role === 'user'
                                                ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-tr-sm'
                                                : m.role === 'system'
                                                    ? 'bg-slate-800/80 border border-indigo-500/30 text-indigo-200 w-full text-center text-xs py-2'
                                                    : 'bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-tl-sm'
                                            }
                                        `}
                                    >
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-800/80 border border-slate-700/50 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center h-[38px]">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-700/50 bg-[#0d1117]/50">
                            <div className="relative flex items-center gap-2">
                                <input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                                    disabled={loading}
                                />
                                <button
                                    onClick={send}
                                    disabled={!text.trim() || loading}
                                    className="absolute right-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-900/20"
                                >
                                    <FiSend className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-[10px] text-slate-500 bg-clip-text text-transparent bg-gradient-to-r from-slate-500 to-slate-400">
                                    Powered by Allpilar Gemini AI
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!open && (
                <motion.button
                    onClick={() => setOpen(true)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-xl shadow-indigo-900/30 hover:shadow-indigo-600/40 transition-shadow"
                >
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-75 transition-opacity duration-1000"></span>
                    <FiMessageSquare className="w-6 h-6 relative z-10" />

                    {/* Notification badge if needed */}
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-[#0d1117] rounded-full z-20"></span>
                </motion.button>
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
        const nav = typeof navigator !== 'undefined' ? `${navigator.userAgent}-${navigator.platform}` : 'unknown'
        const hash = btoa(nav).slice(0, 20) + '-' + Math.random().toString(36).slice(2, 8)
        localStorage.setItem('ap_device_fp', hash)
        setFp(hash)
    }, [])
    return fp
}
