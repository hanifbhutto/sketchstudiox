'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const curatedExhibits = [
  {
    id: '01',
    title: 'The Silent Reverie',
    medium: 'Raw Charcoal & 8B Graphite',
    year: '2026',
    edition: 'Master Portrait Study',
    image: 'images/home-frames/fr-1.jpeg',
    grayscale: false,
  },
  {
    id: '02',
    title: 'Loyal Companion Study',
    medium: 'Fine Vine Charcoal on Arches',
    year: '2026',
    edition: 'Custom Pet Commission',
    image: 'images/home-frames/fr-2.jpg',
    grayscale: false,
  },
  {
    id: '03',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-3.jpeg',
    grayscale: false,
  },
  {
    id: '04',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-4.jpeg',
    grayscale: false,
  },
  {
    id: '05',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-5.jpeg',
    grayscale: false,
  },
  {
    id: '06',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-6.jpeg',
    grayscale: false,
  },
  {
    id: '07',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-7.jpeg',
    grayscale: false,
  },
  {
    id: '08',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-8.jpeg',
    grayscale: false,
  },
  {
    id: '09',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-9.jpeg',
    grayscale: false,
  },
  {
    id: '10',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-10.jpeg',
    grayscale: false,
  },
  {
    id: '11',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'images/home-frames/fr-11.jpeg',
    grayscale: false,
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExhibit = curatedExhibits[activeIndex];
  const scrollContainerRef = useRef(null);

  // Auto slide every 5 seconds (stable, no scroll interruption)
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
    <section className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-36 pb-24 px-6 sm:px-10 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FDFBF7] to-[#F5F2EC]">
      
      {/* Dynamic Colorful Studio Lighting Fields */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-amber-400/15 via-rose-400/10 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[450px] bg-gradient-to-bl from-indigo-500/12 via-sky-400/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center relative z-10">
        
        {/* Right Column (Sketches Frame) */}
        <div className="lg:col-span-6 lg:order-2 flex flex-col items-center justify-center relative">
          
          {/* Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-rose-500/10 to-indigo-500/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

          <div className="w-full max-w-[390px] sm:max-w-[430px] select-none relative z-10">
            <div className="relative p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[#241F1B] to-[#1A1715] shadow-[0_35px_85px_-18px_rgba(30,20,10,0.45)] border border-amber-900/30">
              
              {/* Museum White Mat Board */}
              <div className="bg-[#FAF8F3] p-4 sm:p-7 rounded-xl shadow-[inset_0_2px_12px_rgba(0,0,0,0.14)] relative border border-[#EBE5DA]">
                
                {/* Gold Seal */}
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-400/10 border border-amber-500/50 shadow-xs backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[8px] uppercase tracking-[0.2em] font-mono text-amber-900 font-bold">
                    STUDIO AUTHENTIC
                  </span>
                </div>

                {/* Artwork Viewport */}
                <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-stone-200 shadow-inner border border-stone-300">
                  <AnimatePresence mode="wait">
                    <img
                      key={activeExhibit.id}
                      src={activeExhibit.image}
                      alt={activeExhibit.title}
                      className={`w-full h-full object-cover ${activeExhibit.grayscale ? 'grayscale contrast-125' : 'contrast-110'}`}
                    />
                  </AnimatePresence>

                  <div className="absolute bottom-3 right-3 text-[9px] uppercase tracking-[0.22em] text-amber-300 bg-black/75 border border-amber-500/30 px-2.5 py-1 rounded-md backdrop-blur-xs font-mono">
                    {activeExhibit.id} &mdash; {String(curatedExhibits.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exhibition Plaque Description */}
          <div className="mt-4 text-center space-y-1 relative z-10">
            <p className="font-serif italic text-base sm:text-lg text-[#1A1A1A]">
              &ldquo;{activeExhibit.title}&rdquo; &mdash; <span className="text-amber-800 font-medium">{activeExhibit.year}</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#867E74] font-mono">
              {activeExhibit.medium} &bull; <span className="text-amber-700 font-semibold">{activeExhibit.edition}</span>
            </p>
          </div>

          {/* Switcher Dock with Scroll Arrows */}
          <div className="mt-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-amber-900/15 shadow-sm relative z-10 max-w-[340px] sm:max-w-[400px]">
            <button
              type="button"
              onClick={() => handleScrollDock('left')}
              className="p-1 rounded-full bg-stone-100 text-stone-600 hover:text-black hover:bg-amber-100 transition-colors shrink-0 cursor-pointer"
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
                  className={`relative w-10 h-12 rounded-lg overflow-hidden border shrink-0 transition-all duration-300 cursor-pointer ${
                    activeIndex === index
                      ? 'border-amber-500 ring-2 ring-amber-400/50 scale-105 shadow-md'
                      : 'border-zinc-300 opacity-60 hover:opacity-100 hover:border-amber-300'
                  }`}
                  title={item.title}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover ${item.grayscale ? 'grayscale' : ''}`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleScrollDock('right')}
              className="p-1 rounded-full bg-stone-100 text-stone-600 hover:text-black hover:bg-amber-100 transition-colors shrink-0 cursor-pointer"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Left Column (Typography) */}
        <div className="lg:col-span-6 lg:order-1 space-y-8 text-center lg:text-left">
          
          {/* Live Atelier Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-white/80 to-amber-500/5 backdrop-blur-md text-[10px] uppercase tracking-[0.22em] text-amber-900 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="font-semibold">Bespoke Portraits</span>
          </div>

          {/* Luxury Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl xl:text-[70px] font-normal leading-[1.08] tracking-tight text-[#1A1A1A]">
            Turn your photos <br />
            into <span className="italic font-light bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#9A6F1A] bg-clip-text text-transparent">
              timeless art
            </span> <br />
            by hand.
          </h1>

          <p className="text-[#686057] text-sm sm:text-lg max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
            Master hand-drawn portraits of people and cherished pets. Crafted stroke by stroke in pure charcoal, fine graphite, or vibrant colored pencil on 300 GSM cotton sheets.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
            <Link
              href="/custom-sketch"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)] group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:text-white transition-colors" />
              <span>Order Custom Sketch</span>
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-amber-900/20 bg-white/70 backdrop-blur-xs text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium hover:border-amber-600 hover:bg-white hover:text-amber-900 transition-all duration-300 shadow-2xs group"
            >
              <span>Explore Gallery Vault</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-700 opacity-80 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Museum Guarantee Bar */}
          <div className="pt-8 border-t border-amber-900/10 grid grid-cols-3 gap-4 sm:gap-6 text-center lg:text-left">
            <div className="p-2.5 rounded-xl bg-amber-50/40 border border-amber-200/40">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-800 flex items-center justify-center lg:justify-start gap-1 font-mono font-medium">
                <Award className="w-3 h-3 text-amber-600" /> Subject
              </p>
              <p className="font-serif text-xs sm:text-sm text-[#1A1A1A] mt-1 font-medium">Person OR Pet</p>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50/40 border border-indigo-200/40">
              <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-800 font-mono font-medium">Paper</p>
              <p className="font-serif text-xs sm:text-sm text-[#1A1A1A] mt-1 font-medium">300 GSM Cotton</p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-200/40">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-800 flex items-center justify-center lg:justify-start gap-1 font-mono font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Delivery
              </p>
              <p className="font-serif text-xs sm:text-sm text-[#1A1A1A] mt-1 font-medium">Worldwide Tracked</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}