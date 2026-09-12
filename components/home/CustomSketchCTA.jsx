'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Sliders, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';

export default function CustomSketchCTA() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <section className="relative py-28 px-6 sm:px-10 bg-[#FAF8F5] border-t border-[#E5DFD7] overflow-hidden">
      
      {/* Fine Cotton Grain Background */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-multiply pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#C29B38 0.75px, transparent 0.75px), radial-gradient(#1A1A1A 0.5px, #FAF8F5 0.5px)`,
          backgroundSize: '24px 24px, 12px 12px',
          backgroundPosition: '0 0, 6px 6px'
        }}
      />

      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/4 right-10 w-[600px] h-[450px] bg-gradient-to-bl from-[#D4A348]/15 via-amber-300/8 to-transparent blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[400px] bg-gradient-to-tr from-stone-900/10 via-[#D4A348]/10 to-transparent blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="rounded-[32px] bg-white border border-[#E5DFD7] p-8 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center shadow-[0_20px_50px_-15px_rgba(212,163,72,0.12)]">
          
          {/* Left: Value Proposition & Official Atelier Standards */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            
            {/* Atelier Commission Pill & UK Registration */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4A348]/40 bg-[#D4A348]/10 backdrop-blur-md text-[#8C6415] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                <span>Bespoke Commission Service</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E5DFD7] text-[10px] font-mono text-[#867E74]">
                <Building2 className="w-3 h-3 text-[#C29B38]" />
                <span>UK No: 17429707</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-light text-[#1A1A1A] tracking-tight leading-[1.08]">
              Turn your personal photo into <br />
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#8C6415] bg-clip-text text-transparent">
                timeless charcoal art.
              </span>
            </h2>

            <p className="text-[#686057] font-light text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Zero automated printing or digital filters. Every portrait is 100% hand-rendered stroke by stroke onto 300 GSM French acid-free cotton paper with guaranteed digital proof review before dispatch.
            </p>

            {/* Official Benefit Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-left">
              {[
                'Digital proof approval before shipping',
                'People & pet portraits (up to 10 subjects)',
                'Formats from A4 (8×12") to 30×40" Master',
                'Complimentary insured worldwide transit',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#2A2621]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-light">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Price Preview & CTA (Updated to Official $200 Start) */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <Link
                href="/custom-sketch"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)] group cursor-pointer"
              >
                <span>Commission Your Sketch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="text-center sm:text-left border-l sm:border-[#E5DFD7] sm:pl-5">
                <span className="text-[10px] text-[#867E74] block uppercase tracking-widest font-mono">Official Rate From</span>
                <span className="text-2xl font-mono font-bold text-[#1A1A1A]">$200 <span className="text-xs text-[#867E74] font-normal font-sans">USD</span></span>
              </div>
            </div>

          </div>

          {/* Right: Interactive Before/After Physical Frame Comparison */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Museum Mat Frame Wrapper */}
            <div className="relative p-3.5 sm:p-4 rounded-3xl bg-[#FAF8F3] border border-[#E5DFD7] shadow-[0_25px_60px_-15px_rgba(30,20,10,0.18)] max-w-md w-full">
              
              <div
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-stone-200 border border-stone-300/90 shadow-inner"
                onMouseMove={handleMove}
                onTouchMove={handleTouchMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* After: Handcrafted Charcoal Portrait (Base Layer) */}
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=85"
                  alt="Finished Handcrafted Charcoal Portrait"
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 pointer-events-none"
                />
                
                {/* After Pill */}
                <div className="absolute top-4 right-4 bg-black/80 border border-[#D4A348]/40 text-[#D4A348] text-[9px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md font-mono z-10 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A348] animate-pulse" />
                  <span>100% Hand-Drawn</span>
                </div>

                {/* Before: Original Photo (Clipped Overlay Layer) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=85"
                    alt="Original Reference Photograph"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Before Pill */}
                  <div className="absolute top-4 left-4 bg-white/95 border border-[#E5DFD7] text-[#1A1A1A] text-[9px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md font-mono z-10 shadow-xs">
                    Client Reference Photo
                  </div>
                </div>

                {/* Vertical Divider Line with Gold Accents */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4A348] via-white to-[#D4A348] shadow-[0_0_12px_rgba(212,163,72,0.7)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Circular Tactile Handle */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1A1A1A] text-[#D4A348] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-2 border-[#D4A348]">
                    <div className="flex items-center -space-x-1">
                      <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Interaction Instruction Subtext */}
            <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#867E74] font-mono">
              <Sliders className="w-3 h-3 text-[#C29B38]" />
              <span>Drag slider left / right to inspect hand transformation</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}