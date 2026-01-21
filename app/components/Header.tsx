'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, User, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pathname = usePathname();

  const MAIN_SITE_ROUTES = ['/', '/about', '/contact', '/privacy', '/terms', '/login'];

  const isHidden = pathname.startsWith('/admin') || !MAIN_SITE_ROUTES.includes(pathname);

  if (isHidden) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#0d1117]/80 backdrop-blur-md border-b border-slate-800 py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-black/10 text-white group-hover:bg-white/10 transition-colors">
              <Image
                src="/allpilar.png"
                alt="Allpilar logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white block leading-none">
                Allpilar
              </span>
              <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">
                Solutions
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {session && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-8 h-8 rounded-full ring-2 ring-slate-800"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-slate-200">
                      {session.user?.name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="md:hidden bg-[#0d1117] border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6 mt-6 border-t border-slate-800"
              >
                {session && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 px-4">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt=""
                          className="w-10 h-10 rounded-full ring-2 ring-slate-800"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-white">{session.user?.name || 'User'}</div>
                        <div className="text-xs text-slate-500">{session.user?.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
