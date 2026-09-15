'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, MapPin, Mail, ArrowUpRight, Loader2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [studioInfo, setStudioInfo] = useState({
    studioEmail: 'info@sketchstudiox.com',
    companyName: 'SKETCH X STUDIO LTD',
    companyNumber: '17429707',
    acceptingCommissions: true,
    logoUrl: '',
  });
  const [loadingFooter, setLoadingFooter] = useState(true);

  // Fetch live studio settings and logo from database API with loader
  useEffect(() => {
    async function fetchStudioSettings() {
      try {
        setLoadingFooter(true);
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data && !data.error) {
          setStudioInfo({
            studioEmail: data.studioEmail || 'info@sketchstudiox.com',
            companyName: data.companyName || 'SKETCH X STUDIO LTD',
            companyNumber: data.companyNumber || '17429707',
            acceptingCommissions: data.acceptingCommissions ?? true,
            logoUrl: data.logoUrl || '',
          });
        }
      } catch (err) {
        console.error('Failed to load footer studio settings', err);
      } finally {
        setLoadingFooter(false);
      }
    }
    fetchStudioSettings();
  }, []);

  return (
    <footer className="bg-[#0A0908] border-t border-[#D4A348]/20 text-[#FAF8F5] pt-20 pb-12 px-6 sm:px-10 relative overflow-hidden selection:bg-[#D4A348] selection:text-black">
      
      {/* Tuscan Gold & Charcoal Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(212,163,72,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(194,155,56,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Top Section: Brand Identity & Live Studio Pulse */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 border-b border-white/10 gap-8">
          <div className="space-y-3.5 max-w-lg">
            <Link href="/" className="flex items-center gap-3 group select-none">
              {loadingFooter ? (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4A348]" />
                  </div>
                  <span className="font-serif text-xl tracking-[0.22em] uppercase font-normal text-white/40 animate-pulse">
                    Loading Studio...
                  </span>
                </div>
              ) : studioInfo.logoUrl ? (
                <div className="h-9 max-w-[150px] overflow-hidden flex items-center group-hover:scale-105 transition-transform">
                  <img src={studioInfo.logoUrl} alt={studioInfo.companyName} className="h-full w-auto object-contain" />
                </div>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C29B38] to-[#E5BF65] flex items-center justify-center font-serif text-sm text-[#0A0908] font-bold group-hover:scale-105 transition-transform shadow-[0_2px_12px_rgba(212,163,72,0.35)]">
                    X
                  </div>
                  <span className="font-serif text-xl tracking-[0.22em] uppercase font-normal text-[#FAF8F5] group-hover:text-[#D4A348] transition-colors">
                    {studioInfo.companyName}
                  </span>
                </>
              )}
            </Link>
            <p className="text-xs text-[#A8A196] font-light leading-relaxed">
              An independent fine art atelier creating bespoke hand-drawn portraits of loved ones and cherished pets. Crafted in pure charcoal, fine graphite, and vibrant colored pencil on 300 GSM French cotton paper.
            </p>
          </div>

          {/* Live Studio Status & Official Direct Mail with Loader */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            {loadingFooter ? (
              <div className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white/40 animate-pulse flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4A348]" />
                <span>Connecting to Studio Desk...</span>
              </div>
            ) : (
              <a 
                href={`mailto:${studioInfo.studioEmail}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#D4A348]/50 text-[#E7E2D9] hover:text-[#D4A348] transition-colors shadow-inner backdrop-blur-md"
              >
                <Mail className="w-3.5 h-3.5 text-[#C29B38]" />
                <span>{studioInfo.studioEmail}</span>
              </a>
            )}

            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#D4A348]/25 text-[#E7E2D9] shadow-inner backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A348] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A348]" />
              </span>
              <span className="tracking-wider">
                {studioInfo.acceptingCommissions ? 'Atelier Open • Accepting Commissions' : 'Atelier Queue • Commissions Paused'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[#867E74] text-[11px] font-mono tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#C29B38]" />
              <span>Worldwide Tracked Shipping</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Categorized Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-xs">
          
          {/* Column 1: Exhibitions */}
          <div className="space-y-4">
            <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#C29B38] font-semibold">
              Exhibitions
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A196]">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Artworks
                </Link>
              </li>
              <li>
                <Link href="/shop?category=portraits" className="hover:text-white transition-colors">
                  Human Portraits
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pets" className="hover:text-white transition-colors flex items-center gap-1 text-[#FAF8F5]">
                  <span>Pet & Animal Studies</span>
                  <span className="text-[9px] font-mono text-[#D4A348]">&bull; Core</span>
                </Link>
              </li>
              <li>
                <Link href="/shop?category=couples" className="hover:text-white transition-colors">
                  Couples & Family
                </Link>
              </li>
              <li>
                <Link href="/shop?category=color" className="hover:text-white transition-colors">
                  Colored Pencil Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Commissions */}
          <div className="space-y-4">
            <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#C29B38] font-semibold">
              Bespoke Service
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A196]">
              <li>
                <Link href="/custom-sketch" className="text-[#D4A348] font-medium flex items-center gap-1 hover:text-[#E5BF65] transition-colors">
                  <Sparkles className="w-3 h-3" /> Commission a Piece
                </Link>
              </li>
              <li>
                <Link href="/custom-sketch#pricing" className="hover:text-white transition-colors">
                  Price Schedule Matrix
                </Link>
              </li>
              <li>
                <Link href="/custom-sketch#guidelines" className="hover:text-white transition-colors">
                  Subject Photo Guidelines
                </Link>
              </li>
              <li>
                <Link href="/custom-sketch#framing" className="hover:text-white transition-colors">
                  Hardwood & Glass Framing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Studio */}
          <div className="space-y-4">
            <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#C29B38] font-semibold">
              The Atelier
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A196]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Philosophy & Heritage
                </Link>
              </li>
              <li>
                <Link href="/about#materials" className="hover:text-white transition-colors">
                  Arches 300 GSM Cotton
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Private Inquiries Desk
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/40 hover:text-white transition-colors flex items-center gap-1 font-mono text-[10px]">
                  <span>Studio Console</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Care */}
          <div className="space-y-4">
            <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#C29B38] font-semibold">
              Collector Care
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A196]">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Commission FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Insured Global Freight
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Approval Guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Statutory Registration Card with Loader */}
          <div className="col-span-2 md:col-span-1 space-y-3.5 bg-white/[0.03] p-5 rounded-2xl border border-[#D4A348]/25 backdrop-blur-md shadow-inner">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FAF8F5]">
              <ShieldCheck className="w-4 h-4 text-[#C29B38]" />
              <span className="font-mono tracking-wider text-[11px] uppercase">UK Incorporation</span>
            </div>
            <p className="text-[11px] text-[#A8A196] font-light leading-relaxed">
              {loadingFooter ? 'Loading corporate entity...' : `${studioInfo.companyName} is a registered entity in England & Wales.`}
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#867E74]">
              <span>Company No.</span>
              {loadingFooter ? (
                <span className="animate-pulse text-white/40">Loading...</span>
              ) : (
                <span className="font-bold text-[#D4A348]">{studioInfo.companyNumber}</span>
              )}
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#867E74]">
              <span>Currency</span>
              <span className="font-semibold text-[#FAF8F5]">USD ($) Base</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Corporate Disclosure & Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#867E74] gap-4 font-light">
          
          <div className="flex flex-wrap items-center gap-2">
            {loadingFooter ? (
              <span className="animate-pulse">Loading corporate disclosures...</span>
            ) : (
              <span>&copy; {currentYear} {studioInfo.companyName} (Company No: {studioInfo.companyNumber}). All rights reserved.</span>
            )}
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <span className="text-[#A8A196] font-mono">sketchstudiox.com</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-[#A8A196]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Sale
            </Link>
            <Link href="/shipping" className="hover:text-white transition-colors">
              Shipping & Customs
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}