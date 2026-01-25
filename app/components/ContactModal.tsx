'use client'

import { FiX, FiCheck } from 'react-icons/fi'

type Contact = {
    _id: string
    email?: string
    preferredContact?: string
    subject?: string
    description?: string
    ip?: string
    userAgent?: string
    anonymous?: boolean
    resolved?: boolean
    country?: string
    contactInfo?: string
    createdAt: string
}

type Props = {
    contact: Contact
    onClose: () => void
    onResolve: (id: string, resolve: boolean) => void
}

export default function ContactModal({ contact, onClose, onResolve }: Props) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-slate-800 rounded-2xl max-w-3xl w-full border border-slate-700 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    <h2 className="text-2xl font-bold text-white">Contact Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-1">Received</label>
                            <p className="text-white">{new Date(contact.createdAt).toLocaleString()}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-1">Status</label>
                            {contact.resolved ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                                    <FiCheck /> Resolved
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium">
                                    <FiX /> Unresolved
                                </span>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-1">Email</label>
                            <p className="text-white">
                                {contact.anonymous ? (
                                    <span className="text-slate-500 italic">Anonymous</span>
                                ) : (
                                    contact.email || '—'
                                )}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-1">Preferred Contact</label>
                            <p className="text-white">{contact.preferredContact || '—'}</p>
                        </div>

                        {contact.contactInfo && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-400 mb-1">Contact Details</label>
                                <p className="text-blue-400 font-medium bg-blue-500/5 p-3 rounded-xl border border-blue-500/10 inline-block w-full">
                                    {contact.contactInfo}
                                </p>
                            </div>
                        )}

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-400 mb-1">Subject</label>
                            <p className="text-white">{contact.subject || '—'}</p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-400 mb-1">Description</label>
                            <div className="bg-slate-900/50 rounded-lg p-4 text-white whitespace-pre-wrap">
                                {contact.description || '—'}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-1">Location</label>
                            <p className="text-white">{contact.country || 'Unknown'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-1">IP Address</label>
                            <p className="text-white font-mono text-sm">{contact.ip || '—'}</p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-400 mb-1">User Agent</label>
                            <p className="text-white text-sm font-mono bg-slate-900/50 p-3 rounded-lg">
                                {contact.userAgent || '—'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700 bg-slate-900/30">
                    <button
                        onClick={() => {
                            onResolve(contact._id, !contact.resolved)
                            onClose()
                        }}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${contact.resolved
                            ? 'bg-slate-700 text-white hover:bg-slate-600'
                            : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                    >
                        {contact.resolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition font-semibold"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
