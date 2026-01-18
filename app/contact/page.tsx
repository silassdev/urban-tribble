"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMail, FiSend, FiMessageSquare, FiUser, FiArrowLeft, FiInfo, FiSmartphone, FiShield, FiLock } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-hot-toast";
import StatusModal from "@/app/components/StatusModal";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{
        isOpen: boolean;
        type: 'success' | 'error';
        title: string;
        message: string;
    }>({
        isOpen: false,
        type: 'success',
        title: '',
        message: ''
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        preferredContact: "Email",
        subject: "",
        message: "",
        anonymous: false
    });

    const [clientGeo, setClientGeo] = useState<{ ip?: string; country?: string }>({});

    useEffect(() => {
        // Optional client-side geo lookup for improved accuracy/localhost testing
        const fetchGeo = async () => {
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                if (data && data.country_name) {
                    setClientGeo({ ip: data.ip, country: data.country_name });
                }
            } catch (err) {
                console.warn("Client-side geo lookup failed, using server-side only.");
            }
        };
        fetchGeo();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    description: formData.message, // Aligning field name for API
                    clientCountry: clientGeo.country,
                    clientIp: clientGeo.ip
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({
                    isOpen: true,
                    type: 'success',
                    title: 'Transmission Successful',
                    message: "Your requirements have been securely logged. Our technical team will analyze your request and reach out shortly."
                });
                setFormData({
                    name: "",
                    email: "",
                    preferredContact: "Email",
                    subject: "",
                    message: "",
                    anonymous: false
                });
            } else {
                setStatus({
                    isOpen: true,
                    type: 'error',
                    title: 'Mission Interrupted',
                    message: data.error || "We encountered a structural anomaly while processing your request. Please try again or contact us directly."
                });
            }
        } catch (error) {
            setStatus({
                isOpen: true,
                type: 'error',
                title: 'Network Disruption',
                message: "A communication error occurred. Please verify your connection and try re-initializing contact."
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#0a0a0b]">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full" />
            </div>

            <div className="container py-24 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10"
                        >
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">Direct Communication</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white"
                        >
                            Let's Build Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400">
                                Digital Future
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
                        >
                            Ready to transform your ideas into reality? Reach out to <strong>AllPilar Solutions</strong> and our experts will help you navigate the next steps.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Info Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-4 space-y-12"
                        >
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                            <FiInfo className="text-purple-400" />
                                        </div>
                                        Connect With Us
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Whether it's a small query or a large-scale project, we're here to listen and provide technical excellence.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-5 group p-4 rounded-2xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/5">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                                            <FiMail className="text-blue-400 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Inquiries</p>
                                            <p className="text-white font-medium">hello@allpilar.xyz</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 group p-4 rounded-2xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/5">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
                                            <FiMessageSquare className="text-indigo-400 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Collaboration</p>
                                            <p className="text-white font-medium">partners@allpilar.xyz</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link href="/" className="inline-flex items-center gap-3 text-slate-500 hover:text-white transition-all font-bold group text-sm uppercase tracking-widest">
                                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform bg-white/5 p-2 rounded-full w-8 h-8" />
                                Back to Homepage
                            </Link>
                        </motion.div>

                        {/* Form Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-8 shadow-2xl relative"
                        >
                            <div className="bg-[#111113] rounded-[2.5rem] p-10 md:p-12 border border-white/5 relative overflow-hidden">
                                {/* Form subtle accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-2xl rounded-full" />

                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                                <FiUser size={12} className="text-purple-400" /> Full Name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your name"
                                                className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:bg-white/[0.07] outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                                <FiMail size={12} className="text-blue-400" /> Professional Email
                                            </label>
                                            <input
                                                required={!formData.anonymous}
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                                className={`w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.07] outline-none transition-all ${formData.anonymous ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={formData.anonymous}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                                <FiSmartphone size={12} className="text-indigo-400" /> Preferred Contact
                                            </label>
                                            <select
                                                name="preferredContact"
                                                value={formData.preferredContact}
                                                onChange={handleChange}
                                                className="w-full px-6 py-5 rounded-2xl bg-[#0a0a0b] border border-white/10 text-white focus:border-indigo-500/50 outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="Email">Email</option>
                                                <option value="Phone">Phone Call</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="LinkedIn">LinkedIn</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                                <FiShield size={12} className="text-emerald-400" /> Identity
                                            </label>
                                            <div className="flex items-center gap-3 px-6 py-5 bg-[#0a0a0b] border border-white/10 rounded-2xl">
                                                <input
                                                    type="checkbox"
                                                    id="anonymous"
                                                    name="anonymous"
                                                    checked={formData.anonymous}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 rounded h6 bg-purple-500 cursor-pointer"
                                                />
                                                <label htmlFor="anonymous" className="text-slate-300 text-sm cursor-pointer select-none">
                                                    Submit Anonymously
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                            <FiMessageSquare size={12} className="text-pink-400" /> Brief Subject
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="What can we help you with?"
                                            className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-pink-500/50 focus:bg-white/[0.07] outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                            <FiMessageSquare size={12} className="text-brand-primary" /> Requirement Details
                                        </label>
                                        <textarea
                                            required
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Describe your project, timeline, or query..."
                                            className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-brand-primary/50 focus:bg-white/[0.07] outline-none transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-lg shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {loading ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                                            />
                                        ) : (
                                            <>
                                                Send
                                                <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    <div className="flex justify-center items-center gap-6 mt-6">
                                        <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest">
                                            <FiLock className="text-emerald-500" /> 256-bit Encryption
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest">
                                            <FiShield className="text-blue-500" /> Secure Storage
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <StatusModal
                isOpen={status.isOpen}
                onClose={() => setStatus(prev => ({ ...prev, isOpen: false }))}
                type={status.type}
                title={status.title}
                message={status.message}
            />
        </main>
    );
}
