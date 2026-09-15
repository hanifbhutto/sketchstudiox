'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles, User, LogOut, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [studioLogo, setStudioLogo] = useState('');
  const [logoLoading, setLogoLoading] = useState(true); // <-- Logo loading state added
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setIsCartOpen, totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Real-time Authentication State Checker (Supports cross-tab & same-tab login)
  useEffect(() => {
    const checkAuth = () => {
      const email = localStorage.getItem('patronEmail');
      setIsLoggedIn(!!email);
    };

    // Initial check on mount
    checkAuth();

    // Listen to custom login/logout events and standard storage events
    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-changed', checkAuth);
    window.addEventListener('focus', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-changed', checkAuth);
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  // Fetch studio settings to check if custom logo is uploaded with loader handling
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
    
    // Broadcast auth change event to all listeners
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
              ? 'bg-[#FAF8F5]/90 backdrop-blur-xl border-[#E5DFD7] shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
              : 'bg-[#FAF8F5]/60 backdrop-blur-md border-black/5 shadow-xs'
          }`}
        >
          {/* Brand Identity with Logo Loader */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            {logoLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-stone-200/70 flex items-center justify-center animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C29B38]" />
                </div>
                <span className="font-serif text-base sm:text-lg tracking-[0.22em] uppercase font-normal text-[#1A1A1A]/50 animate-pulse">
                  Sketch Studio X
                </span>
              </div>
            ) : studioLogo ? (
              <div className="h-9 max-w-[150px] overflow-hidden flex items-center group-hover:scale-105 transition-transform">
                <img src={studioLogo} alt="Sketch Studio X" className="h-full w-auto object-contain" />
              </div>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C29B38] to-[#E5BF65] flex items-center justify-center font-serif text-sm text-[#0A0908] font-bold group-hover:scale-105 transition-transform shadow-[0_2px_12px_rgba(212,163,72,0.35)]">
                  X
                </div>
                <span className="font-serif text-base sm:text-lg tracking-[0.22em] uppercase font-normal text-[#1A1A1A] group-hover:text-[#C29B38] transition-colors duration-300">
                  Sketch Studio X
                </span>
              </>
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
                    ? 'text-[#C29B38] font-semibold flex items-center gap-1.5'
                    : 'text-[#1A1A1A]/75 hover:text-[#1A1A1A]'
                }`}
              >
                {link.isHighlight && <Sparkles className="w-3 h-3 text-[#C29B38]" />}
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 ease-out group-hover:w-full ${
                    link.isHighlight ? 'bg-[#C29B38]' : 'bg-[#1A1A1A]'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 text-[#1A1A1A]">
            
            {/* Prominent Login / Dashboard & Logout Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
               <Link
                 href="/account"
                 className="group px-3.5 py-2 rounded-full border border-[#C29B38]/40 bg-[#FAF8F3] text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A] hover:bg-[#C29B38] hover:text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                 title="Customer Dashboard"
               >
                 <User className="w-3.5 h-3.5 text-[#C29B38] group-hover:text-white transition-colors" />
                 <span className="hidden sm:inline font-semibold">Dashboard</span>
               </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full cursor-pointer border border-stone-200 bg-white text-stone-500 hover:text-rose-600 hover:border-rose-200 transition-colors shadow-xs"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 rounded-full bg-[#1A1A1A] cursor-pointer text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all duration-300 shadow-xs"
              >
                Sign In
              </Link>
            )}

            {/* Bag Button Connected to Drawer State */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full cursor-pointer hover:bg-black/5 hover:text-[#C29B38] transition-colors group"
              title="Acquisition Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#1A1A1A] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-semibold group-hover:bg-[#C29B38] transition-colors animate-in zoom-in-50 font-mono">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 rounded-full hover:bg-black/5 focus:outline-none"
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
          <div className="bg-[#FAF8F5]/98 backdrop-blur-2xl border border-[#E5DFD7] rounded-3xl p-6 space-y-4 shadow-xl text-xs uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className={`block py-2 border-b border-[#E5DFD7]/50 ${
                  link.isHighlight
                    ? 'text-[#C29B38] font-semibold flex items-center justify-between'
                    : 'text-[#1A1A1A]'
                }`}
              >
                <span>{link.name}</span>
                {link.isHighlight && <Sparkles className="w-3.5 h-3.5" />}
              </Link>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  onClick={() => setMobileMenu(false)}
                  className="w-full py-3 rounded-xl bg-[#1A1A1A] text-white text-center text-xs uppercase tracking-[0.2em] font-medium"
                >
                  Sign In to Portal
                </Link>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/account"
                    onClick={() => setMobileMenu(false)}
                    className="w-full py-3 rounded-xl border border-[#C29B38]/40 text-[#C29B38] text-center text-xs uppercase tracking-[0.2em] font-medium bg-white flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Collector Dashboard</span>
                  </Link>

                  <button
                    onClick={() => {
                      setMobileMenu(false);
                      handleLogout();
                    }}
                    className="w-full py-3 rounded-xl border border-rose-200 text-rose-600 text-center text-xs uppercase tracking-[0.2em] font-medium bg-rose-50 flex items-center justify-center gap-2"
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