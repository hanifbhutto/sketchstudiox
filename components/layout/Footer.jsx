'use client';

import Link from 'next/link';
import { Sparkles, ShieldCheck, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0908] border-t border-[#D4A348]/20 text-[#FAF8F5] pt-24 pb-12 px-6 sm:px-10 relative overflow-hidden">
      
      {/* Subtle Warm Tuscan Gold & Charcoal Ambient Light Spill */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(212,163,72,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(194,155,56,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Top Section: Brand Identity & Live Studio Pulse */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 border-b border-white/10 gap-8">
          <div className="space-y-3.5 max-w-md">
            <Link href="/" className="flex items-center gap-3 group select-none">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C29B38] to-[#E5BF65] flex items-center justify-center font-serif text-sm text-[#0A0908] font-bold group-hover:scale-105 transition-transform shadow-[0_2px_12px_rgba(212,163,72,0.35)]">
                X
              </div>
              <span className="font-serif text-xl tracking-[0.22em] uppercase font-normal text-[#FAF8F5] group-hover:text-[#D4A348] transition-colors">
                Sketch Studio X
              </span>
            </Link>
            <p className="text-xs text-[#A8A196] font-light leading-relaxed">
              An independent fine art atelier creating museum-grade charcoal originals and bespoke hand-drawn portraiture on 300 GSM French cotton paper.
            </p>
          </div>

          {/* Live Studio Status Pill */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#D4A348]/25 text-[#E7E2D9] shadow-inner backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A348] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A348]" />
              </span>
              <span className="tracking-wider">Atelier Open &bull; Accepting Commissions</span>
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
                  Portrait Studies
                </Link>
              </li>
              <li>
                <Link href="/shop?category=couples" className="hover:text-white transition-colors">
                  Couples & Figures
                </Link>
              </li>
              <li>
                <Link href="/shop?category=family" className="hover:text-white transition-colors">
                  Family Heritage
                </Link>
              </li>
              <li>
                <Link href="/shop?category=archives" className="hover:text-white transition-colors">
                  Private Archives
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
                  Price Calculator
                </Link>
              </li>
              <li>
                <Link href="/custom-sketch#framing" className="hover:text-white transition-colors">
                  Hardwood Framing
                </Link>
              </li>
              <li>
                <Link href="/custom-sketch#guidelines" className="hover:text-white transition-colors">
                  Photo Guidelines
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
                  Philosophy & Craft
                </Link>
              </li>
              <li>
                <Link href="/about#materials" className="hover:text-white transition-colors">
                  300 GSM French Cotton
                </Link>
              </li>
              <li>
                <Link href="/about#artist" className="hover:text-white transition-colors">
                  The Lead Artist
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Private Inquiries
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
                  Insured Packaging & Transit
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Proof Approval Guarantee
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Collector Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Dispatch & Trust Card with Gold Accent */}
          <div className="col-span-2 md:col-span-1 space-y-4 bg-white/[0.03] p-5 rounded-2xl border border-[#D4A348]/25 backdrop-blur-md shadow-inner">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FAF8F5]">
              <ShieldCheck className="w-4 h-4 text-[#C29B38]" />
              <span className="font-mono tracking-wider text-[11px] uppercase">Studio Certified</span>
            </div>
            <p className="text-[11px] text-[#A8A196] font-light leading-relaxed">
              Every shipment includes a wax-sealed Certificate of Authenticity signed by the artist.
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#867E74] font-mono">
              <span>Currency</span>
              <span className="font-semibold text-[#FAF8F5]">USD ($)</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#867E74] gap-4 font-light">
          
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} Sketch Studio X. All rights reserved.</span>
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
              Shipping Guidelines
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}