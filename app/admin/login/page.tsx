'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, ChevronLeft } from 'lucide-react'

type Mode = 'login' | 'forgot' | 'reset'

export default function AdminLoginPage() {
    const router = useRouter()
    const [mode, setMode] = useState<Mode>('login')
    
    // Form States
    const [email, setEmail] = useState('admin@allpilar.com')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // APIs
    async function handleLogin(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.post('/admin/login', { email, password })
            const token = res.data.token
            localStorage.setItem('ap:admin_token', token)
            toast.success('Welcome back!')
            router.push('/admin/dashboard')
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    async function handleForgot(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/admin/reset-password/request', { email })
            toast.success('Reset code sent to your email!')
            setMode('reset')
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Failed to send reset code')
        } finally {
            setLoading(false)
        }
    }

    async function handleReset(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/admin/reset-password/confirm', { email, code, newPassword })
            toast.success('Password reset successful! Please log in.')
            setMode('login')
            setPassword('')
            setNewPassword('')
            setCode('')
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Failed to reset password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full relative z-10"
            >
                {/* Card Container with Glassmorphism */}
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                    
                    <div className="text-center mb-8 relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 mb-6">
                            <ShieldCheck className="w-8 h-8 text-purple-400" />
                        </div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                            {mode === 'login' && 'Admin Portal'}
                            {mode === 'forgot' && 'Reset Password'}
                            {mode === 'reset' && 'Confirm Reset'}
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">
                            {mode === 'login' && 'Sign in to access your dashboard'}
                            {mode === 'forgot' && 'Enter your email to receive a code'}
                            {mode === 'reset' && 'Enter the 6-digit code and new password'}
                        </p>
                    </div>

                    <div className="relative z-10">
                        <AnimatePresence mode="wait">
                            {/* LOGIN MODE */}
                            {mode === 'login' && (
                                <motion.form 
                                    key="login"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleLogin} 
                                    className="space-y-5"
                                >
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition duration-300"
                                                placeholder="admin@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center ml-1">
                                            <label className="text-sm font-medium text-slate-300">Password</label>
                                            <button 
                                                type="button" 
                                                onClick={() => setMode('forgot')}
                                                className="text-xs font-medium text-purple-400 hover:text-purple-300 transition"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition duration-300"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-6 w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] overflow-hidden"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                                        <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                                        {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </motion.form>
                            )}

                            {/* FORGOT PASSWORD MODE */}
                            {mode === 'forgot' && (
                                <motion.form 
                                    key="forgot"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleForgot} 
                                    className="space-y-5"
                                >
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition duration-300"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-6 w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span>{loading ? 'Sending code...' : 'Send Reset Code'}</span>
                                        {!loading && <Mail className="w-4 h-4" />}
                                    </button>

                                    <button 
                                        type="button" 
                                        onClick={() => setMode('login')}
                                        className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition group"
                                    >
                                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        Back to login
                                    </button>
                                </motion.form>
                            )}

                            {/* RESET PASSWORD MODE */}
                            {mode === 'reset' && (
                                <motion.form 
                                    key="reset"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleReset} 
                                    className="space-y-5"
                                >
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-300 ml-1">Confirmation Code</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <KeyRound className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition duration-300 tracking-widest"
                                                placeholder="123456"
                                                maxLength={6}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-300 ml-1">New Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition duration-300"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-6 w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span>{loading ? 'Resetting...' : 'Confirm New Password'}</span>
                                        {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                    
                                    <button 
                                        type="button" 
                                        onClick={() => setMode('login')}
                                        className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition group"
                                    >
                                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        Cancel
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
