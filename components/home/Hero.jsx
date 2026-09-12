'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react';

const curatedExhibits = [
  {
    id: '01',
    title: 'The Silent Reverie',
    medium: 'Raw Charcoal & 8B Graphite',
    year: '2026',
    edition: 'Master Portrait Study',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    grayscale: true,
  },
  {
    id: '02',
    title: 'Loyal Companion Study',
    medium: 'Fine Vine Charcoal on Arches',
    year: '2026',
    edition: 'Custom Pet Commission',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80',
    grayscale: true,
  },
  {
    id: '03',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    year: '2026',
    edition: 'Full Color Masterpiece',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    grayscale: false, // Color artwork as shown on flyer
  },
];

export default function Hero() {
  const [activeExhibit, setActiveExhibit] = useState(curatedExhibits[0]);

  // 3D Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 140, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 140, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-36 pb-24 px-6 sm:px-10 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FDFBF7] to-[#F5F2EC]">
      
      {/* Dynamic Colorful Studio Lighting Fields */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-amber-400/15 via-rose-400/10 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[450px] bg-gradient-to-bl from-indigo-500/12 via-sky-400/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Typography with Rich Vibrant Accents */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-8 text-center lg:text-left"
        >
          {/* Live Atelier Badge with UK Registration */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-white/80 to-amber-500/5 backdrop-blur-md text-[10px] uppercase tracking-[0.22em] text-amber-900 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="font-semibold">Bespoke Portraits &bull; UK Reg: 17429707</span>
          </div>

          {/* Luxury Main Title (Graphite, Charcoal & Colored Pencil) */}
          <h1 className="font-serif text-4xl sm:text-6xl xl:text-[70px] font-normal leading-[1.08] tracking-tight text-[#1A1A1A]">
            Turn your photos <br />
            into <span className="italic font-light bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#9A6F1A] bg-clip-text text-transparent">
              timeless art
            </span> <br />
            by hand.
          </h1>

          <p className="text-[#686057] text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
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

          {/* Museum Guarantee Bar matching flyer */}
          <div className="pt-8 border-t border-amber-900/10 grid grid-cols-3 gap-6 text-center lg:text-left">
            <div className="p-2.5 rounded-xl bg-amber-50/40 border border-amber-200/40">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-800 flex items-center justify-center lg:justify-start gap-1 font-mono font-medium">
                <Award className="w-3 h-3 text-amber-600" /> Subject
              </p>
              <p className="font-serif text-sm text-[#1A1A1A] mt-1 font-medium">Person OR Pet</p>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50/40 border border-indigo-200/40">
              <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-800 font-mono font-medium">Paper</p>
              <p className="font-serif text-sm text-[#1A1A1A] mt-1 font-medium">300 GSM Cotton</p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-200/40">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-800 flex items-center justify-center lg:justify-start gap-1 font-mono font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Delivery
              </p>
              <p className="font-serif text-sm text-[#1A1A1A] mt-1 font-medium">Worldwide Tracked</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Physical Museum Frame with 3D Tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="lg:col-span-6 flex flex-col items-center justify-center relative"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-rose-500/10 to-indigo-500/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="perspective-[1400px] w-full max-w-[430px] cursor-pointer select-none relative z-10"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#241F1B] to-[#1A1715] shadow-[0_35px_85px_-18px_rgba(30,20,10,0.45)] border border-amber-900/30 transition-transform duration-200"
            >
              {/* Prismatic Glass Reflection */}
              <motion.div
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255, 235, 180, 0.22) 0%, rgba(180, 200, 255, 0.1) 40%, transparent 70%)',
                  left: glareX,
                  top: glareY,
                }}
                className="absolute inset-0 pointer-events-none z-30 opacity-60 mix-blend-screen rounded-2xl"
              />

              {/* Museum White Mat Board */}
              <div className="bg-[#FAF8F3] p-5 sm:p-7 rounded-xl shadow-[inset_0_2px_12px_rgba(0,0,0,0.14)] relative border border-[#EBE5DA]">
                
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
                    <motion.img
                      key={activeExhibit.id}
                      src={activeExhibit.image}
                      alt={activeExhibit.title}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45 }}
                      className={`w-full h-full object-cover ${activeExhibit.grayscale ? 'grayscale contrast-125' : 'contrast-110'} hover:scale-105 transition-transform duration-700`}
                    />
                  </AnimatePresence>

                  <div className="absolute bottom-3 right-3 text-[9px] uppercase tracking-[0.22em] text-amber-300 bg-black/75 border border-amber-500/30 px-2.5 py-1 rounded-md backdrop-blur-xs font-mono">
                    {activeExhibit.id} &mdash; 03
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Exhibition Plaque Description */}
          <div className="mt-5 text-center space-y-1 relative z-10">
            <p className="font-serif italic text-base sm:text-lg text-[#1A1A1A]">
              &ldquo;{activeExhibit.title}&rdquo; &mdash; <span className="text-amber-800 font-medium">{activeExhibit.year}</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#867E74] font-mono">
              {activeExhibit.medium} &bull; <span className="text-amber-700 font-semibold">{activeExhibit.edition}</span>
            </p>
          </div>

          {/* Switcher Dock */}
          <div className="mt-6 flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-900/15 shadow-sm relative z-10">
            <span className="text-[9px] uppercase tracking-[0.2em] text-amber-800 font-mono font-semibold">
              Curations:
            </span>
            <div className="flex items-center gap-2.5">
              {curatedExhibits.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveExhibit(item)}
                  className={`relative w-11 h-13 rounded-lg overflow-hidden border transition-all duration-300 ${
                    activeExhibit.id === item.id
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
          </div>

        </motion.div>

      </div>
    </section>
  );
}