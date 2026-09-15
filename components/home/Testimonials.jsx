'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <section className="relative py-28 px-6 sm:px-10 bg-gradient-to-b from-[#F5F2EC] via-[#FAF8F5] to-[#FFFFFF] border-t border-amber-900/10 overflow-hidden">
      
      {/* Background Studio Light Spill */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-gradient-to-tr from-amber-400/10 via-rose-300/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/10 via-amber-300/6 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-amber-900 font-mono font-semibold shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Collector Provenance</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-[1.08]">
              Cherished in private <br className="hidden sm:inline" />
              <span className="italic font-light bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#8C6415] bg-clip-text text-transparent">
                family collections.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#686057] font-light max-w-lg leading-relaxed">
              Read uncensored feedback from art collectors, portrait patrons, and pet owners worldwide.
            </p>
          </div>

          {/* Rating Pill Badge & Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center justify-center gap-3.5 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-amber-900/15 shadow-sm">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current drop-shadow-xs" />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-[#1A1A1A]">4.98 / 5.0</span>
              <span className="text-xs text-amber-900/20">|</span>
              <span className="text-xs font-mono text-[#867E74] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                120+ Easels Completed
              </span>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 rounded-full bg-white border border-amber-900/15 text-[#867E74] hover:text-[#1A1A1A] hover:border-amber-500 hover:bg-[#FAF8F3] transition-all shadow-xs cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-3 rounded-full bg-white border border-amber-900/15 text-[#867E74] hover:text-[#1A1A1A] hover:border-amber-500 hover:bg-[#FAF8F3] transition-all shadow-xs cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

       {/* Seamless Track Sliding Viewport */}
        <div className="relative overflow-hidden py-4">
          <motion.div
            animate={{ x: `-${currentIndex * (100 / 3)}%` }}
            transition={
              currentIndex === 0
                ? { duration: 0 } // Instant jump for seamless infinite loop without blink
                : { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
            }
            className="flex gap-6 w-[200%]"
          >
            {reviews.concat(reviews).map((rev, idx) => (
              <div
                key={`${rev.id}-${idx}`}
                className="w-[calc(16.666%-1.25rem)] shrink-0 p-7 sm:p-8 rounded-[28px] bg-gradient-to-br from-[#FFFFFF] via-[#FAF8F3] to-[#F8F5EE] border border-amber-900/15 shadow-[0_12px_35px_-10px_rgba(212,163,72,0.1)] hover:shadow-[0_22px_50px_-12px_rgba(212,163,72,0.22)] hover:border-amber-400/50 transition-all duration-400 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  
                  {/* Rating & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
                      <Quote className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-[#3F3A34] text-sm font-light leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Profile & Medium Details */}
                <div className="pt-6 mt-6 border-t border-amber-900/10 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-serif text-base text-[#1A1A1A] font-medium group-hover:text-amber-800 transition-colors">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-[#867E74] font-light">{rev.location}</p>
                    
                    {/* Verified Type Badge */}
                    <div className="pt-1 flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-mono text-amber-900 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{rev.type}</span>
                    </div>
                  </div>

                  {/* Medium Stamp Badge */}
                  <div className="px-3 py-2 rounded-xl bg-amber-500/5 border border-amber-500/20 text-right shrink-0">
                    <span className="text-[8px] uppercase tracking-widest text-amber-800 font-mono block font-semibold">Medium</span>
                    <span className="text-[10px] text-[#3F3A34] font-serif italic">{rev.mediumUsed}</span>
                  </div>
                </div>

              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-amber-600' : 'w-2 bg-amber-900/20 hover:bg-amber-900/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}