'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const curatedExhibits = [
  {
    id: '01',
    title: 'The Silent Reverie',
    medium: 'Raw Charcoal & 8B Graphite',
    year: '2026',
    edition: 'Master Portrait Study',
    image: 'images/home-frames/fr-1.jpeg',
  },
  {
    id: '02',
    title: 'Loyal Companion Study',
    medium: 'Fine Vine Charcoal on Arches',
    year: '2026',
    edition: 'Custom Pet Commission',
    image: 'images/home-frames/fr-2.jpg',
  },
  {
    id: '03',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-3.jpeg',
  },
  {
    id: '04',
    title: 'Ethereal Gaze Study',
    medium: 'Fine Graphite on Fabriano Paper',
    year: '2026',
    edition: 'Master Portrait Study',
    image: 'images/home-frames/fr-4.jpeg',
  },
  {
    id: '05',
    title: 'Majestic Canine Portrait',
    medium: 'Raw Charcoal & White Chalk Accent',
    year: '2026',
    edition: 'Custom Pet Commission',
    image: 'images/home-frames/fr-5.jpeg',
  },
  {
    id: '06',
    title: 'Generational Bond',
    medium: 'Graphite & Charcoal Hybrid',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-6.jpeg',
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExhibit = curatedExhibits[activeIndex];
  const scrollContainerRef = useRef(null);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % curatedExhibits.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleScrollDock = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelectExhibit = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#0A0908] text-[#FAF8F5]">
      
      {/* Animated Ambient Glows */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.18, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[650px] h-[300px] sm:h-[400px] lg:h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.15)_0%,transparent_70%)] blur-[100px] sm:blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.07, 0.12, 0.07] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-5 sm:right-10 w-[250px] sm:w-[400px] lg:w-[550px] h-[250px] sm:h-[350px] lg:h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.08)_0%,transparent_70%)] blur-[110px] sm:blur-[130px] pointer-events-none" 
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Right Column (Sketches Frame - Interactive Museum Wall Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 lg:order-2 flex flex-col items-center justify-center relative w-full group"
        >
          <div className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[430px] select-none relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
            <div className="relative p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-[#171513] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-[#e4c577]/30 transition-all duration-500 group-hover:border-[#e4c577]/60">
              
              {/* Museum White Mat Board Container */}
              <div className="bg-[#FAF8F3] p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-[inset_0_2px_12px_rgba(0,0,0,0.12)] relative border border-[#EBE5DA]">
                
                {/* Gold Seal Badge */}
                <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-black/80 border border-[#e4c577]/50 shadow-xs backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e4c577] animate-pulse" />
                  <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#FAF8F5] font-bold">
                    STUDIO AUTHENTIC
                  </span>
                </div>

                {/* Artwork Viewport with Smooth Image Crossfade */}
                <div className="aspect-[4/5] relative overflow-hidden rounded-lg sm:rounded-xl bg-stone-200 shadow-inner border border-stone-300">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeExhibit.id}
                      src={activeExhibit.image}
                      alt={activeExhibit.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="w-full h-full object-cover contrast-110"
                    />
                  </AnimatePresence>

                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 text-[9px] uppercase tracking-[0.22em] text-[#e4c577] bg-black/75 border border-[#e4c577]/30 px-2 sm:px-2.5 py-1 rounded-md backdrop-blur-xs font-mono">
                    {activeExhibit.id} &mdash; {String(curatedExhibits.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exhibition Plaque Description */}
          <motion.div 
            key={activeExhibit.id + '-text'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 sm:mt-5 text-center space-y-1 relative z-10 px-4"
          >
            <p className="font-serif italic text-base sm:text-lg text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
              &ldquo;{activeExhibit.title}&rdquo; &mdash; <span className="text-[#e4c577] font-medium">{activeExhibit.year}</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#A8A196] font-mono">
              {activeExhibit.medium} &bull; <span className="text-[#e4c577] font-semibold">{activeExhibit.edition}</span>
            </p>
          </motion.div>

          {/* Switcher Dock with Scroll Arrows */}
          <div className="mt-3 sm:mt-4 flex items-center gap-2 bg-[#171513]/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 shadow-lg relative z-10 max-w-[320px] sm:max-w-[400px] w-full justify-center">
            <button
              type="button"
              onClick={() => handleScrollDock('left')}
              className="p-1.5 rounded-full bg-white/5 text-[#A8A196] hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto scroll-smooth py-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {curatedExhibits.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectExhibit(index)}
                  className={`relative w-9 h-11 sm:w-10 sm:h-12 rounded-lg overflow-hidden border shrink-0 transition-all duration-300 cursor-pointer ${
                    activeIndex === index
                      ? 'border-[#e4c577] ring-2 ring-[#e4c577]/50 scale-105 shadow-md'
                      : 'border-white/10 opacity-50 hover:opacity-100 hover:border-[#e4c577]/50'
                  }`}
                  title={item.title}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleScrollDock('right')}
              className="p-1.5 rounded-full bg-white/5 text-[#A8A196] hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Left Column (Typography with Staggered Motion Entry) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-6 lg:order-1 space-y-6 text-center lg:text-left"
        >
          
          {/* Top Small Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block text-[11px] uppercase tracking-[0.28em] font-mono text-[#e4c577] font-semibold px-3 py-1 rounded-full bg-[#e4c577]/10 border border-[#e4c577]/20"
          >
            HAND-DRAWN &bull; PERSONAL &bull; TIMELESS
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[67px] font-normal leading-[1.15] lg:leading-[1.08] tracking-tight text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
            Turn your photos <br className="hidden sm:inline" />
            into <br className="hidden sm:inline" />
            <span className="italic font-light text-[#e4c577]">
              timeless art by hand.
            </span>
          </h1>

          <p className="text-[#A8A196] text-sm sm:text-base lg:text-base max-w-lg mx-auto lg:mx-0 font-light leading-relaxed px-2 sm:px-0">
            Master hand-drawn portraits of people and cherished pets. Crafted stroke by stroke in pure charcoal, fine graphite, or vibrant colored pencil on 300 GSM cotton sheets.
          </p>

          {/* Action CTAs with Hover Lift Effect */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 px-4 sm:px-0">
            <Link
              href="/custom-sketch"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(228,197,119,0.35)] group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0A0908]" />
              <span>Order Custom Sketch</span>
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xs text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#e4c577] hover:bg-white/[0.08] hover:scale-[1.02] transition-all duration-300 shadow-2xs group"
            >
              <span>Explore Gallery Vault</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#e4c577] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Museum Guarantee Bar */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3 sm:gap-6 text-center lg:text-left">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#e4c577]/40 transition-colors">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#e4c577] flex items-center justify-center lg:justify-start gap-1 font-mono font-medium">
                <Award className="w-3.5 h-3.5 text-[#e4c577] shrink-0" /> <span className="truncate">Subject</span>
              </p>
              <p className="text-xs sm:text-sm text-[#FAF8F5] mt-1 font-medium truncate" style={{ fontFamily: 'Georgia, serif' }}>Person OR Pet</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#e4c577]/40 transition-colors">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#e4c577] font-mono font-medium truncate">Paper</p>
              <p className="text-xs sm:text-sm text-[#FAF8F5] mt-1 font-medium truncate" style={{ fontFamily: 'Georgia, serif' }}>300 GSM Cotton</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#e4c577]/40 transition-colors">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#e4c577] flex items-center justify-center lg:justify-start gap-1 font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e4c577] shrink-0" /> <span className="truncate">Delivery</span>
              </p>
              <p className="text-xs sm:text-sm text-[#FAF8F5] mt-1 font-medium truncate" style={{ fontFamily: 'Georgia, serif' }}>Worldwide Tracked</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}