import './globals.css';
import React from 'react';
import Header from './components/Header';
import Link from 'next/link';
import SessionProvider from './components/SessionProvider';
import { Toaster } from 'react-hot-toast';

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

          <Toaster position="top-right" />
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

                  <div className="flex gap-6">
                    {/* Social icons could go here */}
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
