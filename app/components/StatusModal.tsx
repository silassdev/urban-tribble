'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiXCircle, FiArrowRight, FiHome, FiX } from 'react-icons/fi'
import Link from 'next/link'

interface StatusModalProps {
    isOpen: boolean
    onClose: () => void
    type: 'success' | 'error'
    title: string
    message: string
}

export default function StatusModal({ isOpen, onClose, type, title, message }: StatusModalProps) {
    const isSuccess = type === 'success'

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0d1117]/80 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[#161b22] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] blur-[80px] -z-10 transition-colors ${isSuccess ? 'bg-emerald-500/20' : 'bg-red-500/20'
                            }`} />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                        >
                            <FiX size={24} />
                        </button>

                        <div className="text-center">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                                className="flex justify-center mb-8"
                            >
                                <div className={`p-5 rounded-3xl ${isSuccess ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'
                                    }`}>
                                    {isSuccess ? (
                                        <FiCheckCircle className="text-emerald-500 text-6xl" />
                                    ) : (
                                        <FiXCircle className="text-red-500 text-6xl" />
                                    )}
                                </div>
                            </motion.div>

                            {/* Text */}
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-black text-white mb-4 tracking-tight"
                            >
                                {title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-slate-400 text-lg leading-relaxed mb-10"
                            >
                                {message}
                            </motion.p>

                            {/* Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button
                                    onClick={onClose}
                                    className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isSuccess
                                            ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                            : 'bg-red-600 text-white hover:bg-red-700'
                                        }`}
                                >
                                    {isSuccess ? 'Return to Form' : 'Try Again'}
                                    {!isSuccess && <FiArrowRight />}
                                </button>

                                {isSuccess && (
                                    <Link
                                        href="/"
                                        className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all"
                                    >
                                        <FiHome />
                                        Back to Home
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
