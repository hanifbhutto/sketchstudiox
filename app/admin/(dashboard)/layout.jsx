'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Palette, 
  TableProperties,
  Settings, 
  Globe,
  ExternalLink,
  ShieldCheck, 
  LogOut,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  FolderOpen
} from 'lucide-react';

const ADMIN_NAV = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Orders & Commissions', href: '/admin/orders', icon: Package, badge: 'Live' },
  { name: 'Gallery Originals', href: '/admin/artworks', icon: Palette },
  { name: 'Media Library', href: '/admin/media', icon: FolderOpen }, // <--- Yeh naya item add ho gaya
  { name: 'Rate Matrix Schedule', href: '/admin/pricing', icon: TableProperties },
  { name: 'Studio Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [studioLogo, setStudioLogo] = useState('');

  // Fetch live studio settings to check if a custom logo is uploaded
  useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data && data.logoUrl) {
          setStudioLogo(data.logoUrl);
        }
      } catch (err) {
        console.error('Failed to load studio logo for admin layout', err);
      }
    }
    fetchLogo();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="h-screen w-full bg-[#FAF8F5] flex overflow-hidden selection:bg-[#D4A348] selection:text-black">
      
      {/* FIXED COLLAPSIBLE DARK SIDEBAR */}
      <motion.aside 
        animate={{ width: isExpanded ? 280 : 80 }}
        transition={{ type: 'spring', damping: 25, stiffness: 240 }}
        className="h-screen bg-[#0E0C0A] text-[#FAF8F5] border-r border-[#26221D] flex flex-col justify-between p-4 z-30 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.25)] relative overflow-hidden select-none"
      >
        {/* Subtle Ambient Gold Radiance */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-[radial-gradient(circle,rgba(212,163,72,0.14)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-40 h-40 bg-[radial-gradient(circle,rgba(212,163,72,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="space-y-6 relative z-10">
          
          {/* Header Bar */}
          <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} pt-2 min-h-[40px]`}>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <Link href="/admin/dashboard" className="flex items-center gap-3 group overflow-hidden">
                    {studioLogo ? (
                      <div className="h-9 max-w-[140px] overflow-hidden flex items-center group-hover:scale-105 transition-transform">
                        <img src={studioLogo} alt="Studio Logo" className="h-full w-auto object-contain" />
                      </div>
                    ) : (
                      <>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D4A348] via-[#F3DE9A] to-[#A37424] text-[#0A0908] flex items-center justify-center font-serif text-sm font-bold shrink-0 shadow-[0_4px_16px_rgba(212,163,72,0.3)] group-hover:scale-105 transition-transform duration-300">
                          X
                        </div>
                        <div className="leading-tight overflow-hidden whitespace-nowrap">
                          <span className="font-serif text-sm font-medium tracking-wider text-[#FAF8F5] block group-hover:text-[#D4A348] transition-colors">
                            Sketch Studio X
                          </span>
                          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#D4A348] font-semibold flex items-center gap-1 mt-0.5">
                            <Sparkles className="w-2.5 h-2.5 text-[#D4A348]" />
                            Atelier Desk
                          </span>
                        </div>
                      </>
                    )}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand / Collapse Button */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-xl text-[#9E9486] hover:text-[#FAF8F5] hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0"
              title={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              {isExpanded ? (
                <PanelLeftClose className="w-4 h-4 text-[#D4A348]" />
              ) : (
                <PanelLeftOpen className="w-5 h-5 text-[#D4A348]" />
              )}
            </button>
          </div>

          {/* Navigation Bar */}
          <nav className="space-y-1 pt-1">
            {isExpanded && (
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#6D655A] block px-3 mb-2 font-semibold">
                Management Suite
              </span>
            )}

            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={!isExpanded ? item.name : undefined}
                  className={`group relative flex items-center ${
                    isExpanded ? 'justify-between px-3.5' : 'justify-center px-0'
                  } py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-white/[0.08] to-transparent text-[#FAF8F5] font-semibold border-l-2 border-[#D4A348] shadow-inner shadow-black/40'
                      : 'text-[#9E9486] hover:text-[#FAF8F5] hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                        isActive 
                          ? 'text-[#D4A348]' 
                          : 'text-[#6D655A] group-hover:text-[#D4A348]'
                      }`}
                    />
                    {isExpanded && (
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.name}
                      </span>
                    )}
                  </div>

                  {isExpanded && item.badge && (
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#D4A348]/20 border border-[#D4A348]/40 text-[#D4A348] tracking-widest font-semibold shadow-xs shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/5 space-y-2 relative z-10">
          <button
            type="button"
            onClick={handleLogout}
            title={!isExpanded ? 'Sign Out Console' : undefined}
            className={`w-full flex items-center ${
              isExpanded ? 'justify-start gap-2.5 px-3.5' : 'justify-center px-0'
            } py-2 rounded-xl text-[11px] font-mono text-[#D9534F] hover:bg-rose-950/30 hover:text-rose-300 transition-colors cursor-pointer`}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {isExpanded && <span className="whitespace-nowrap">Sign Out Console</span>}
          </button>
        </div>
      </motion.aside>

      {/* RIGHT SIDE MAIN VIEW CONTAINER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* COMPACT TOP ADMIN HEADER (h-14 / 56px) */}
        <header className="h-14 bg-white border-b border-[#E5DFD7] px-6 sm:px-10 flex items-center justify-between shrink-0 z-20 shadow-2xs backdrop-blur-md bg-white/95">
          
          {/* LEFT SIDE: BROWSE WEB BUTTON */}
          <div className="flex items-center">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#C29B38] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-xs group cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4A348] group-hover:text-black transition-colors" />
              <span>Browse Web</span>
              <ExternalLink className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* RIGHT SIDE: STUDIO LIVE STATUS */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E5DFD7] text-[10px] font-mono text-[#686057]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Studio Online &bull; Active Easels</span>
            </div>
          </div>

        </header>

        {/* DEDICATED SCROLLABLE CONTENT BODY */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12 bg-[#FAF8F5] relative">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}