'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, Quote, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Lady Eleanor Vance',
    location: 'London, United Kingdom',
    type: 'Family Heritage Commission',
    rating: 5,
    date: 'August 2026',
    comment:
      'The charcoal depth captured our late grandfather’s gaze better than any photograph ever could. Inspecting the digital proof prior to archival framing gave our family complete peace of mind.',
    mediumUsed: 'Raw Charcoal & 8B Graphite',
    image: '/images/testimonial/c1.jpg',
  },
  {
    id: 2,
    name: 'Dr. Arthur Pendelton',
    location: 'Oxford, United Kingdom',
    type: 'Dual Pet Memorial Commission',
    rating: 5,
    date: 'July 2026',
    comment:
      'Commissioned a custom study of our two spaniels. The attention to fur texture, eye gleam, and paper highlights on 300 GSM French cotton was breathtaking. Handled with supreme care.',
    mediumUsed: 'Fine Vine Charcoal on Arches',
    image: '/images/testimonial/c2.jpg',
  },
  {
    id: 3,
    name: 'Marcus & Priya Thorne',
    location: 'Surrey, United Kingdom',
    type: 'Vibrant Colored Pencil Study',
    rating: 5,
    date: 'June 2026',
    comment:
      'We wanted our wedding portrait in full chromatic detail. The colored pencil blending on Fabriano paper looks incandescent under museum spotlights. Arrived wax-sealed with certificate.',
    mediumUsed: 'Prismacolor & Fabriano Paper',
    image: '/images/testimonial/c3.jpg',
  },
  {
    id: 4,
    name: 'Lord Henry Sterling',
    location: 'Edinburgh, United Kingdom',
    type: 'Equine & Equestrian Study',
    rating: 5,
    date: 'May 2026',
    comment:
      'The muscular definition and raw energy captured in graphite of our thoroughbred stallion is gallery-grade. The museum presentation matting is immaculate.',
    mediumUsed: 'Fine 8B Graphite on Cotton',
    image: '/images/testimonial/c4.jpg',
  },
  {
    id: 5,
    name: 'Sophia Montgomery',
    location: 'Bath, United Kingdom',
    type: 'Classical Heritage Portrait',
    rating: 5,
    date: 'April 2026',
    comment:
      'An absolute masterpiece. The delicate handling of light and shadow feels like holding a piece of Renaissance history right here in our drawing room.',
    mediumUsed: 'Willow Charcoal on Arches',
    image: '/images/testimonial/c5.jpg',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="relative py-24 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] border-t border-white/10 overflow-hidden">
      
      {/* Animated Breathing Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.14)_0%,transparent_70%)] blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.08)_0%,transparent_70%)] blur-[110px] sm:blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-[#e4c577] font-mono font-semibold shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#e4c577]" />
              <span>Collector Provenance</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FAF8F5] tracking-tight leading-[1.12] sm:leading-[1.08]" style={{ fontFamily: 'Georgia, serif' }}>
              Real People, <br className="hidden sm:inline" />
              <span className="italic font-light text-[#e4c577]">
                Real Reviews.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#A8A196] font-light max-w-lg leading-relaxed">
              Read uncensored feedback and view real client portraits from art collectors, portrait patrons, and pet owners worldwide.
            </p>
          </div>

          {/* Rating Pill Badge & Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-3 bg-[#171513] backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/10 shadow-sm">
              <div className="flex text-[#e4c577]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current drop-shadow-xs" />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-[#FAF8F5]">4.98 / 5.0</span>
              <span className="text-xs text-white/20">|</span>
              <span className="text-[11px] sm:text-xs font-mono text-[#A8A196] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                120+ Easels
              </span>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 rounded-full bg-[#171513] border border-white/10 text-[#A8A196] hover:text-[#FAF8F5] hover:border-[#e4c577] transition-all shadow-xs cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-3 rounded-full bg-[#171513] border border-white/10 text-[#A8A196] hover:text-[#FAF8F5] hover:border-[#e4c577] transition-all shadow-xs cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

       {/* Responsive Testimonial Display */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mobile view: Show only current active review */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviews[currentIndex].id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="rounded-[24px] bg-[#171513] border border-white/10 shadow-xl overflow-hidden flex flex-col justify-between group will-change-transform"
              >
                {/* Client / Artwork Photo on Top */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141210]">
                  <Image
                    src={reviews[currentIndex].image}
                    alt={reviews[currentIndex].name}
                    fill
                    sizes="100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 border border-[#e4c577]/40 text-[9px] uppercase tracking-widest text-[#FAF8F5] font-mono backdrop-blur-md z-10">
                    Verified Patron
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#e4c577]">
                      {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#e4c577]/10 border border-[#e4c577]/20 flex items-center justify-center text-[#e4c577]">
                      <Quote className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <p className="text-[#FAF8F5]/90 text-sm font-light leading-relaxed">
                    &ldquo;{reviews[currentIndex].comment}&rdquo;
                  </p>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <h4 className="font-serif text-sm text-[#FAF8F5] font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                        {reviews[currentIndex].name}
                      </h4>
                      <p className="text-[10px] text-[#A8A196] font-light">{reviews[currentIndex].location}</p>
                      
                      <div className="pt-1 flex items-center gap-1 text-[9px] uppercase tracking-wider font-mono text-[#e4c577] font-medium">
                        <ShieldCheck className="w-3 h-3 text-[#e4c577]" />
                        <span>{reviews[currentIndex].type}</span>
                      </div>
                    </div>

                    <div className="px-2.5 py-1.5 rounded-lg bg-[#0A0908] border border-white/10 text-right shrink-0">
                      <span className="text-[7px] uppercase tracking-widest text-[#e4c577] font-mono block font-semibold">Medium</span>
                      <span className="text-[9px] text-[#FAF8F5]/80 font-serif italic">{reviews[currentIndex].mediumUsed}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop/Tablet view: Show 3 cards side by side */}
          <div className="hidden md:contents">
            {[0, 1, 2].map((offset) => {
              const rev = reviews[(currentIndex + offset) % reviews.length];
              return (
                <div
                  key={rev.id}
                  className="rounded-[24px] bg-[#171513] border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_50px_-12px_rgba(228,197,119,0.25)] hover:border-[#e4c577]/50 transition-all duration-400 overflow-hidden flex flex-col justify-between group will-change-transform"
                >
                  {/* Client / Artwork Photo on Top */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141210]">
                    <Image
                      src={rev.image}
                      alt={rev.name}
                      fill
                      sizes="(max-width: 1200px) 33vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 border border-[#e4c577]/40 text-[9px] uppercase tracking-widest text-[#FAF8F5] font-mono backdrop-blur-md z-10">
                      Verified Patron
                    </div>
                  </div>

                  <div className="p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex text-[#e4c577]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#e4c577]/10 border border-[#e4c577]/20 flex items-center justify-center text-[#e4c577] group-hover:scale-110 transition-transform">
                          <Quote className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <p className="text-[#FAF8F5]/90 text-sm font-light leading-relaxed">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-serif text-base text-[#FAF8F5] font-medium group-hover:text-[#e4c577] transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                          {rev.name}
                        </h4>
                        <p className="text-[11px] text-[#A8A196] font-light">{rev.location}</p>
                        
                        <div className="pt-1 flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-mono text-[#e4c577] font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#e4c577]" />
                          <span>{rev.type}</span>
                        </div>
                      </div>

                      <div className="px-3 py-2 rounded-xl bg-[#0A0908] border border-white/10 text-right shrink-0">
                        <span className="text-[8px] uppercase tracking-widest text-[#e4c577] font-mono block font-semibold">Medium</span>
                        <span className="text-[10px] text-[#FAF8F5]/80 font-serif italic">{rev.mediumUsed}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
       </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-[#e4c577]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}