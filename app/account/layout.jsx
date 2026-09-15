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
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Studio Ambient Glows */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Top Header & Patron Welcome Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/15 text-[10px] uppercase tracking-[0.25em] text-[#e4c577] font-mono font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
              <span>Verified Patron Ledger</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
              {patronName}
            </h1>
            <p className="text-xs text-[#A8A196] font-mono">
              {patronEmail}
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-30">
            <Link
              href="/custom-sketch"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>New Commission</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0A0908]" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="p-3.5 rounded-full bg-[#171513] border border-white/10 text-[#A8A196] hover:text-rose-400 hover:border-rose-400/50 transition-colors cursor-pointer relative z-40 shadow-xs"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Dashboard Layout: Left Sidebar Menu + Right Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Sidebar Menu with Separate Modules */}
          <aside className="lg:col-span-1 bg-[#171513] rounded-[28px] border border-white/10 p-4 sm:p-6 shadow-xl space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A8A196] px-4 pb-2">
              Navigation Menu
            </div>

            {/* Module 1: Gallery Orders */}
            <Link
              href="/account/orders"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                isGalleryOrdersActive
                  ? 'bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] font-bold shadow-xs'
                  : 'text-[#A8A196] hover:bg-white/5 hover:text-[#FAF8F5]'
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
                  ? 'bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] font-bold shadow-xs'
                  : 'text-[#A8A196] hover:bg-white/5 hover:text-[#FAF8F5]'
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
                  ? 'bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] font-bold shadow-xs'
                  : 'text-[#A8A196] hover:bg-white/5 hover:text-[#FAF8F5]'
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