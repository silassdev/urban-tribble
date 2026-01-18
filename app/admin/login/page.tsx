'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('admin@allpilar.com')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: FormEvent) {
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
                    <p className="text-slate-400">AllPilar Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}
