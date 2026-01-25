import './globals.css';
import React from 'react';
import Header from './components/Header';
import Link from 'next/link';
import SessionProvider from './components/SessionProvider';
import { Toaster } from 'react-hot-toast';
import { FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export const metadata = {
  title: 'Allpilar | Premium Web Solutions',
  description:
    'Allpilar delivers high-performance web applications, bespoke software architecture, and cutting-edge digital solutions for modern businesses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased text-gray-100 overflow-x-hidden transition-colors duration-300 bg-[#0d1117]">
        <SessionProvider>

          <Toaster
            position="top-right"
            toastOptions={{
              className: 'glass border border-white/10 text-white',
              style: {
                background: 'rgba(22, 27, 34, 0.8)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                padding: '16px 24px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
              {children}
            </main>

            <footer className="mt-12 py-12 bg-[#0d1117]/50 border-t border-slate-800 backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
                  <div className="col-span-1 md:col-span-2 space-y-6">
                    <div className="font-black text-2xl tracking-tighter text-white">
                      Allpilar<span className="text-blue-500">.</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                      We craft high-end digital experiences, from sophisticated web architectures to powerful AI integrations. Your partner in scalable technology.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-slate-200">Solutions</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                      <li>
                        <Link href="/#pricing" className="hover:text-blue-400 transition-colors">
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link href="/about" className="hover:text-blue-400 transition-colors">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="hover:text-blue-400 transition-colors">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <a href="mailto:hello@allpilar.xyz" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                          <FiMail className="w-4 h-4" />
                          <span>hello@allpilar.xyz</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-slate-200">Legal</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                      <li>
                        <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms" className="hover:text-blue-400 transition-colors">
                          Terms of Service
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
                  <div className="text-xs text-slate-500">
                    © {new Date().getFullYear()} Allpilar Web Solutions. All rights reserved.
                  </div>

                  <div className="flex gap-3">

                    <a
                      href="https://twitter.com/allpilar"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Allpilar on Twitter"
                      className="p-2 rounded-md hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      <FiTwitter className="w-5 h-5 text-slate-200" />
                      <span className="sr-only">Twitter</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/company/allpilarsolution"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Allpilar on LinkedIn"
                      className="p-2 rounded-md hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      <FiLinkedin className="w-5 h-5 text-slate-200" />
                      <span className="sr-only">LinkedIn</span>
                    </a>

                    <a
                      href="mailto:hello@allpilar.xyz"
                      aria-label="Email Allpilar"
                      className="p-2 rounded-md hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      <FiMail className="w-5 h-5 text-slate-200" />
                      <span className="sr-only">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>

        </SessionProvider>
      </body>
    </html>
  );
}
