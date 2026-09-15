'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, ArrowUpRight, LogOut, Package, User as UserIcon, Palette } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function AccountLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logoutCart } = useCart();
  
  const [patronEmail, setPatronEmail] = useState('');
  const [patronName, setPatronName] = useState('Valued Patron');

  useEffect(() => {
    const savedEmail = localStorage.getItem('patronEmail');
    if (!savedEmail) {
      router.push('/login');
      return;
    }
    setPatronEmail(savedEmail);

    async function fetchPatronName() {
      try {
        const res = await fetch(`/api/auth/profile?email=${encodeURIComponent(savedEmail)}`);
        const data = await res.json();
        if (res.ok && data.user) {
          setPatronName(data.user.name || 'Valued Patron');
        }
      } catch (err) {
        console.error('Failed to load patron name:', err);
      }
    }
    fetchPatronName();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('patronEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('active_cart_id');
    logoutCart();
    window.location.replace('/login');
  };

  // Active path checks for separate navigation tabs
  const isGalleryOrdersActive = pathname === '/account/orders';
  const isCommissionsActive = pathname === '/account/commissions';
  const isProfileActive = pathname === '/account/profile';

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Header & Patron Welcome Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5DFD7]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A348]/30 bg-[#D4A348]/10 text-[10px] uppercase tracking-[0.25em] text-[#5C4514] font-mono font-semibold">
              <Sparkles className="w-3 h-3 text-[#C29B38]" />
              <span>Verified Patron Ledger</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">
              {patronName}
            </h1>
            <p className="text-xs text-[#867E74] font-mono">
              {patronEmail}
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-30">
            <Link
              href="/custom-sketch"
              className="px-6 py-3 rounded-full bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all shadow-sm flex items-center gap-2"
            >
              <span>New Commission</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="p-3 rounded-full bg-white border border-[#E5DFD7] text-[#867E74] hover:text-rose-600 hover:border-rose-300 transition-colors cursor-pointer relative z-40 shadow-xs"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Dashboard Layout: Left Sidebar Menu + Right Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Sidebar Menu with Separate Modules */}
          <aside className="lg:col-span-1 bg-white rounded-[28px] border border-[#E5DFD7] p-4 sm:p-6 shadow-xs space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#867E74] px-4 pb-2">
              Navigation Menu
            </div>

            {/* Module 1: Gallery Orders */}
            <Link
              href="/account/orders"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                isGalleryOrdersActive
                  ? 'bg-[#1A1A1A] text-[#FAF8F5] font-bold shadow-xs'
                  : 'text-[#867E74] hover:bg-[#FAF8F3] hover:text-[#1A1A1A]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Gallery Orders</span>
            </Link>

            {/* Module 2: Custom Commissions */}
            <Link
              href="/account/commissions"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                isCommissionsActive
                  ? 'bg-[#1A1A1A] text-[#FAF8F5] font-bold shadow-xs'
                  : 'text-[#867E74] hover:bg-[#FAF8F3] hover:text-[#1A1A1A]'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Custom Commissions</span>
            </Link>

            {/* Module 3: Patron Profile */}
            <Link
              href="/account/profile"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                isProfileActive
                  ? 'bg-[#1A1A1A] text-[#FAF8F5] font-bold shadow-xs'
                  : 'text-[#867E74] hover:bg-[#FAF8F3] hover:text-[#1A1A1A]'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Patron Profile</span>
            </Link>
          </aside>

          {/* Right Side Content Panel */}
          <div className="lg:col-span-3">
            {children}
          </div>

        </div>

      </div>
    </main>
  );
}