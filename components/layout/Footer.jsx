'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sparkles, MapPin, Mail, Phone, User, Loader2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [studioInfo, setStudioInfo] = useState({
    studioEmail: 'pencilxstudio@gmail.com',
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
            studioEmail: data.studioEmail || 'pencilxstudio@gmail.com',
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
    <footer className="bg-[#0A0908] border-t border-[#e4c577]/20 text-[#FAF8F5] pt-20 pb-12 px-4 sm:px-8 lg:px-12 relative overflow-hidden selection:bg-[#e4c577] selection:text-black">
      
      {/* Animated Breathing Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[300px] sm:w-[600px] h-[250px] sm:h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(228,197,119,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[250px] sm:w-[450px] h-[200px] sm:h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(228,197,119,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Top Section: Brand Identity & Live Studio Pulse */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 border-b border-white/10 gap-8">
          <div className="space-y-3.5 max-w-lg">
            <Link href="/" className="flex items-center gap-3 group select-none">
              {loadingFooter ? (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#e4c577]" />
                  </div>
                  <span className="font-serif text-xl tracking-[0.22em] uppercase font-normal text-white/40 animate-pulse" style={{ fontFamily: 'Georgia, serif' }}>
                    Loading Studio...
                  </span>
                </div>
              ) : studioInfo.logoUrl ? (
                <div className="h-9 max-w-[150px] overflow-hidden flex items-center group-hover:scale-105 transition-transform">
                  <img src={studioInfo.logoUrl} alt="Studio Logo" className="h-full w-auto object-contain" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#e4c577] to-[#cfae59] flex items-center justify-center font-serif text-sm text-[#0A0908] font-bold group-hover:scale-105 transition-transform shadow-[0_2px_12px_rgba(228,197,119,0.35)]" style={{ fontFamily: 'Georgia, serif' }}>
                  X
                </div>
              )}
            </Link>
            <p className="text-xs text-[#A8A196] font-light leading-relaxed">
              An independent fine art atelier creating bespoke hand-drawn portraits of loved ones and cherished pets. Crafted in pure charcoal, fine graphite, and vibrant colored pencil on 300 GSM French cotton paper.
            </p>
          </div>

          {/* Live Studio Status & Official Direct Mail with Loader */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a 
              href="mailto:pencilxstudio@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#171513] border border-white/10 hover:border-[#e4c577]/50 text-[#FAF8F5] hover:text-[#e4c577] transition-colors shadow-inner backdrop-blur-md"
            >
              <Mail className="w-3.5 h-3.5 text-[#e4c577]" />
              <span>pencilxstudio@gmail.com</span>
            </a>

            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#171513] border border-[#e4c577]/30 text-[#FAF8F5] shadow-inner backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e4c577] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e4c577]" />
              </span>
              <span className="tracking-wider">
                {studioInfo.acceptingCommissions ? 'Atelier Open • Accepting Commissions' : 'Atelier Queue • Commissions Paused'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[#A8A196] text-[11px] font-mono tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#e4c577]" />
              <span>Worldwide Tracked Shipping</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Categorized Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-xs">
          
          {/* Column 1: Exhibitions */}
          <div className="space-y-4">
            <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#e4c577] font-semibold">
              Exhibitions & Gallery
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A196]">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Gallery Exhibition
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Human Portraits
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors flex items-center gap-1 text-[#FAF8F5]">
                  <span>Pet & Animal Studies</span>
                  <span className="text-[9px] font-mono text-[#e4c577]">&bull; Core</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Commissions */}
          <div className="space-y-4">
            <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#e4c577] font-semibold">
              Bespoke Service
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A196]">
              <li>
                <Link href="/custom-sketch" className="text-[#e4c577] font-medium flex items-center gap-1 hover:text-[#cfae59] transition-colors">
                  <Sparkles className="w-3 h-3" /> Commission Custom
                </Link>
              </li>
              <li>
                <Link href="/custom-sketch" className="hover:text-white transition-colors">
                  Price Schedule Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Studio */}
          <div className="space-y-4">
            <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#e4c577] font-semibold">
              The Atelier
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A196]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Philosophy & Heritage
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Private Inquiries Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Proprietor & Address Details */}
          <div className="col-span-2 md:col-span-1 space-y-3.5 bg-[#171513] p-5 rounded-2xl border border-[#e4c577]/30 backdrop-blur-md shadow-inner">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FAF8F5] border-b border-white/10 pb-2">
              <User className="w-4 h-4 text-[#e4c577]" />
              <span className="font-mono tracking-wider text-[11px] uppercase">Muhammad Arslan</span>
            </div>
            <ul className="space-y-2 font-light text-[#A8A196] text-[11px]">
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-[#e4c577] shrink-0" />
                <a href="mailto:pencilxstudio@gmail.com" className="hover:text-white transition-colors truncate">pencilxstudio@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-[#e4c577] shrink-0" />
                <span>03433628507</span>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-3 h-3 text-[#e4c577] shrink-0 mt-0.5" />
                <span>Street 6, Haroonabad, 62300, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Corporate Disclosure */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A8A196] gap-4 font-light">
          
          <div className="flex flex-wrap items-center gap-2">
            <span>&copy; {currentYear} Sketch Studio X. All rights reserved.</span>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <span className="text-[#A8A196] font-mono">sketchstudiox.com</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-[#A8A196]">
            <Link href="/shop" className="hover:text-white transition-colors">
              Gallery
            </Link>
            <Link href="/custom-sketch" className="hover:text-white transition-colors">
              Commissions
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}