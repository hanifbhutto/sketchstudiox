'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles, User, LogOut, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [studioLogo, setStudioLogo] = useState('');
  const [logoLoading, setLogoLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setIsCartOpen, totalItems } = useCart();

  useEffect(() => {
    let frameId = null;

    const onScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        setScrolled((current) => {
          const next = window.scrollY > 20;
          return current === next ? current : next;
        });
        frameId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  // Real-time Authentication State Checker
  useEffect(() => {
    const checkAuth = () => {
      const email = localStorage.getItem('patronEmail');
      setIsLoggedIn(!!email);
    };

    checkAuth();

    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-changed', checkAuth);
    window.addEventListener('focus', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-changed', checkAuth);
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  // Fetch studio settings to check if custom logo is uploaded
  useEffect(() => {
    async function fetchLogo() {
      try {
        setLogoLoading(true);
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data && data.logoUrl) {
          setStudioLogo(data.logoUrl);
        }
      } catch (err) {
        console.error('Failed to load studio logo config', err);
      } finally {
        setLogoLoading(false);
      }
    }
    fetchLogo();
  }, []);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('patronEmail');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    
    window.dispatchEvent(new Event('auth-changed'));
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/shop' },
    { name: 'Custom Sketch', href: '/custom-sketch', isHighlight: true },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-none">
      {/* Top Floating Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-0 pt-4 sm:pt-6">
        <div
          className={`pointer-events-auto rounded-full border transition-all duration-500 px-6 sm:px-8 py-3.5 flex items-center justify-between ${
            scrolled
              ? 'bg-[#0A0908]/90 backdrop-blur-xl border-[#e4c577]/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]'
              : 'bg-[#0A0908]/70 backdrop-blur-md border-white/10 shadow-sm'
          }`}
        >
          {/* Brand Identity with Logo Loader (Text removed) */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            {logoLoading ? (
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#e4c577]" />
              </div>
            ) : studioLogo ? (
              <div className="h-9 max-w-[150px] overflow-hidden flex items-center group-hover:scale-105 transition-transform">
                <img src={studioLogo} alt="Sketch Studio X" className="h-full w-auto object-contain" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#e4c577] to-[#cfae59] flex items-center justify-center font-serif text-sm text-[#0A0908] font-bold group-hover:scale-105 transition-transform shadow-[0_2px_12px_rgba(228,197,119,0.35)]">
                X
              </div>
            )}
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8 text-[11px] uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 group transition-colors duration-300 ${
                  link.isHighlight
                    ? 'text-[#e4c577] font-semibold flex items-center gap-1.5'
                    : 'text-[#FAF8F5]/75 hover:text-[#FAF8F5]'
                }`}
              >
                {link.isHighlight && <Sparkles className="w-3 h-3 text-[#e4c577]" />}
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 ease-out group-hover:w-full ${
                    link.isHighlight ? 'bg-[#e4c577]' : 'bg-[#FAF8F5]'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 text-[#FAF8F5]">
            
            {/* Prominent Login / Dashboard & Logout Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
               <Link
                 href="/account"
                 className="group px-3.5 py-2 rounded-full border border-[#e4c577]/40 bg-white/5 text-[10px] font-mono uppercase tracking-wider text-[#FAF8F5] hover:bg-[#e4c577] hover:text-[#0A0908] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                 title="Customer Dashboard"
               >
                 <User className="w-3.5 h-3.5 text-[#e4c577] group-hover:text-[#0A0908] transition-colors" />
                 <span className="hidden sm:inline font-semibold">Dashboard</span>
               </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full cursor-pointer border border-white/10 bg-white/5 text-stone-300 hover:text-rose-400 hover:border-rose-400/30 transition-colors shadow-xs"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] cursor-pointer text-[#0A0908] text-[10px] uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all duration-300 shadow-xs"
              >
                Sign In
              </Link>
            )}

            {/* Bag Button Connected to Drawer State */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full cursor-pointer hover:bg-white/10 hover:text-[#e4c577] transition-colors group text-[#FAF8F5]"
              title="Acquisition Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#e4c577] text-[#0A0908] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform font-mono">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 focus:outline-none text-[#FAF8F5]"
              aria-label="Toggle Navigation"
            >
              {mobileMenu ? (
                <X className="w-5 h-5 stroke-[1.75]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.75]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="pointer-events-auto md:hidden px-4 pt-2">
          <div className="bg-[#0A0908]/98 backdrop-blur-2xl border border-[#e4c577]/20 rounded-3xl p-6 space-y-4 shadow-2xl text-xs uppercase tracking-[0.2em] text-[#FAF8F5]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className={`block py-2 border-b border-white/10 ${
                  link.isHighlight
                    ? 'text-[#e4c577] font-semibold flex items-center justify-between'
                    : 'text-[#FAF8F5]'
                }`}
              >
                <span>{link.name}</span>
                {link.isHighlight && <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />}
              </Link>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  onClick={() => setMobileMenu(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-center text-xs uppercase tracking-[0.2em] font-semibold"
                >
                  Sign In to Portal
                </Link>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/account"
                    onClick={() => setMobileMenu(false)}
                    className="w-full py-3 rounded-xl border border-[#e4c577]/40 text-[#e4c577] text-center text-xs uppercase tracking-[0.2em] font-medium bg-white/5 flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Collector Dashboard</span>
                  </Link>

                  <button
                    onClick={() => {
                      setMobileMenu(false);
                      handleLogout();
                    }}
                    className="w-full py-3 rounded-xl border border-rose-500/30 text-rose-400 text-center text-xs uppercase tracking-[0.2em] font-medium bg-rose-500/10 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}