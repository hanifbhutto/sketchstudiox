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
    <section className="relative py-24 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] border-t border-white/10 overflow-hidden">
      
      {/* Animated Breathing Ambient Glows */}
      <motion.div 
        animate={{ scale: [1, 1.06, 1], opacity: [0.1, 0.16, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-10 w-[300px] sm:w-[600px] h-[300px] sm:h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(228,197,119,0.14)_0%,transparent_70%)] blur-[100px] sm:blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-10 w-[250px] sm:w-[550px] h-[250px] sm:h-[400px] bg-[radial-gradient(ellipse_at_bottom,rgba(228,197,119,0.08)_0%,transparent_70%)] blur-[110px] sm:blur-[130px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="rounded-[28px] sm:rounded-[32px] bg-[#171513] border border-[#e4c577]/30 p-6 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
          
          {/* Left: Value Proposition & Official Atelier Standards */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Atelier Commission Pill & UK Registration */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e4c577]/40 bg-[#e4c577]/10 backdrop-blur-md text-[#e4c577] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
                <span>Bespoke Commission Service</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#A8A196]">
                <Building2 className="w-3 h-3 text-[#e4c577]" />
                <span>UK No: 17429707</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-normal text-[#FAF8F5] tracking-tight leading-[1.12] sm:leading-[1.08]" style={{ fontFamily: 'Georgia, serif' }}>
              Turn your personal photo into <br />
              <span className="italic font-light text-[#e4c577]">
                timeless charcoal art.
              </span>
            </h2>

            <p className="text-[#A8A196] font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Zero automated printing or digital filters. Every portrait is 100% hand-rendered stroke by stroke onto 300 GSM French acid-free cotton paper with guaranteed digital proof review before dispatch.
            </p>

            {/* Official Benefit Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-left">
              {[
                'Digital proof approval before shipping',
                'People & pet portraits (up to 10 subjects)',
                'Formats from A4 (8×12") to 30×40" Master',
                'Complimentary insured worldwide transit',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#FAF8F5]/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-light">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Price Preview & CTA (Completely cleaned up without vertical border line) */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <Link
                href="/custom-sketch"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(228,197,119,0.35)] group cursor-pointer"
              >
                <span>Commission Your Sketch</span>
                <ArrowRight className="w-4 h-4 text-[#0A0908] group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="text-center sm:text-left pt-2 sm:pt-0">
                <span className="text-[10px] text-[#A8A196] block uppercase tracking-widest font-mono">Official Rate From</span>
                <span className="text-2xl font-mono font-bold text-[#FAF8F5]">$200 <span className="text-xs text-[#A8A196] font-normal font-sans">USD</span></span>
              </div>
            </div>

          </div>

          {/* Right: Interactive Before/After Physical Frame Comparison */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Museum Mat Frame Wrapper */}
            <div className="relative p-4 rounded-3xl bg-[#141210] border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] max-w-md w-full">
              
              <div
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-stone-900 border border-white/10 shadow-inner"
                onMouseMove={handleMove}
                onTouchMove={handleTouchMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* After: Handcrafted Charcoal Portrait (Base Layer) */}
                <img
                  src="images/after.jpg"
                  alt="Finished Handcrafted Charcoal Portrait"
                  className="absolute inset-0 w-full h-full object-cover contrast-110 pointer-events-none"
                />
                
                {/* After Pill */}
                <div className="absolute top-4 right-4 bg-black/80 border border-[#e4c577]/40 text-[#e4c577] text-[9px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md font-mono z-10 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e4c577] animate-pulse" />
                  <span>100% Hand-Drawn</span>
                </div>

                {/* Before: Original Photo (Clipped Overlay Layer) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src="images/before.jpg"
                    alt="Original Reference Photograph"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Before Pill */}
                  <div className="absolute top-4 left-4 bg-black/80 border border-white/20 text-[#FAF8F5] text-[9px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md font-mono z-10 shadow-xs">
                    Client Reference Photo
                  </div>
                </div>

                {/* Vertical Divider Line with Gold Accents */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e4c577] via-white to-[#e4c577] shadow-[0_0_12px_rgba(228,197,119,0.7)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Circular Tactile Handle */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0A0908] text-[#e4c577] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.8)] border-2 border-[#e4c577]">
                    <div className="flex items-center -space-x-1">
                      <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Interaction Instruction Subtext */}
            <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#A8A196] font-mono">
              <Sliders className="w-3 h-3 text-[#e4c577]" />
              <span>Drag slider left / right to inspect hand transformation</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}