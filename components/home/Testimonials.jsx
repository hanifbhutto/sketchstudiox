'use client';

import { motion } from 'framer-motion';
import { Star, ShieldCheck, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

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
    artworkThumb:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    grayscale: true,
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
    artworkThumb:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80',
    grayscale: true,
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
    artworkThumb:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    grayscale: false,
  },
];

export default function Testimonials() {
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

          {/* Rating Pill Badge */}
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
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative p-7 sm:p-8 rounded-[28px] bg-gradient-to-br from-[#FFFFFF] via-[#FAF8F3] to-[#F8F5EE] border border-amber-900/15 shadow-[0_12px_35px_-10px_rgba(212,163,72,0.1)] hover:shadow-[0_22px_50px_-12px_rgba(212,163,72,0.22)] hover:border-amber-400/50 transition-all duration-400 flex flex-col justify-between group"
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

              {/* Profile & Artwork Thumbnail */}
              <div className="pt-6 mt-6 border-t border-amber-900/10 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
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

                {/* Thumbnail */}
                <div className="relative w-13 h-16 rounded-xl overflow-hidden bg-stone-200 border border-amber-900/20 shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={rev.artworkThumb}
                    alt={`Commission for ${rev.name}`}
                    className={`w-full h-full object-cover ${rev.grayscale ? 'grayscale contrast-125' : 'contrast-110'}`}
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}