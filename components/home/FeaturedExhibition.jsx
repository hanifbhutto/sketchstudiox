'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, ShoppingBag, Sparkles, Check } from 'lucide-react';

const exhibitionItems = [
  {
    id: 'SSX-01',
    title: 'The Silent Contemplation',
    category: 'Portraits',
    medium: '8B Graphite & Blending Stumps',
    paper: '300 GSM Arches Cotton',
    price: 340,
    dimensions: '16 × 20 in',
    status: 'Available Original',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'SSX-02',
    title: 'Bonded in Charcoal',
    category: 'Couples',
    medium: 'Raw Willow Charcoal',
    paper: 'Fabriano Artistico Paper',
    price: 420,
    dimensions: '18 × 24 in',
    status: 'Commission Study',
    isAvailable: false,
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'SSX-03',
    title: 'Grit & Grace',
    category: 'Portraits',
    medium: 'Compressed Charcoal Powder',
    paper: 'Archival French Cotton',
    price: 290,
    dimensions: '12 × 16 in',
    status: 'Available Original',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'SSX-04',
    title: 'Generations Intertwined',
    category: 'Family',
    medium: 'Graphite Multi-Figure Study',
    paper: '300 GSM Heavyweight',
    price: 520,
    dimensions: '20 × 28 in',
    status: 'Private Exhibition',
    isAvailable: false,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
  },
];

const categories = ['All Works', 'Portraits', 'Couples', 'Family'];

export default function FeaturedExhibition() {
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [addedItem, setAddedItem] = useState(null);

  const filteredItems =
    activeCategory === 'All Works'
      ? exhibitionItems
      : exhibitionItems.filter((item) => item.category === activeCategory);

  const handleQuickAdd = (id) => {
    setAddedItem(id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <section className="relative py-28 px-6 sm:px-10 bg-gradient-to-b from-[#F5F2EC] via-[#FAF8F5] to-[#FFFFFF] border-t border-amber-900/10 overflow-hidden">
      
      {/* Background Soft Lighting Sprays */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-gradient-to-tr from-amber-400/10 via-rose-300/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/10 via-amber-300/5 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-3">
            {/* Colorful Atelier Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-amber-900 font-mono font-semibold">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Current Exhibition &bull; Volume I</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-[1.08]">
              Curated Originals <br className="hidden sm:inline" />
              <span className="italic font-light bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#8C6415] bg-clip-text text-transparent">
                & Atelier Studies.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#686057] font-light max-w-lg leading-relaxed">
              Each piece is individually documented, hand-signed, and accompanied by a wax-sealed certificate of authenticity.
            </p>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-amber-900/10 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-amber-950 font-semibold'
                    : 'text-[#867E74] hover:text-[#1A1A1A]'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeExhibitionTab"
                    className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-50/80 rounded-full border border-amber-300/60 shadow-2xs"
                    transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Art Exhibition Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          <AnimatePresence>
            {filteredItems.map((artwork) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className="group flex flex-col justify-between"
              >
                {/* Physical Mat Frame Card */}
                <div className="relative aspect-[3/4] bg-[#FAF8F3] p-4 rounded-2xl border border-amber-900/15 overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_45px_-12px_rgba(212,163,72,0.25)] group-hover:border-amber-400/50 transition-all duration-500">
                  
                  {/* Inner Artwork Viewport */}
                  <div className="relative w-full h-full overflow-hidden rounded-xl bg-stone-200 border border-stone-300/80">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Top Serial Stamp */}
                    <div className="absolute top-3 left-3 bg-black/75 border border-amber-500/30 backdrop-blur-md text-amber-200 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-md font-mono shadow-xs">
                      {artwork.id}
                    </div>

                    {/* Top Right Availability Pill */}
                    <div className="absolute top-3 right-3">
                      <span className={`text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-mono font-medium backdrop-blur-md border ${
                        artwork.isAvailable
                          ? 'bg-emerald-500/90 text-white border-emerald-400/50 shadow-xs'
                          : 'bg-black/60 text-zinc-300 border-white/10'
                      }`}>
                        {artwork.isAvailable ? 'Available' : 'Archived'}
                      </span>
                    </div>

                    {/* Interactive Floating Action Dock on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 gap-2.5 backdrop-blur-[2px]">
                      <Link
                        href={`/shop/${artwork.id.toLowerCase()}`}
                        className="flex-1 py-2.5 rounded-xl bg-white/95 text-[#1A1A1A] hover:bg-amber-400 hover:text-black transition-all text-[10px] uppercase tracking-widest font-mono font-semibold flex items-center justify-center gap-1.5 shadow-lg"
                        title="Inspect Artwork"
                      >
                        <Eye className="w-3.5 h-3.5 stroke-[2]" />
                        <span>Inspect</span>
                      </Link>

                      {artwork.isAvailable && (
                        <button
                          onClick={() => handleQuickAdd(artwork.id)}
                          className="p-2.5 rounded-xl bg-zinc-950 text-amber-300 hover:bg-amber-500 hover:text-black transition-all shadow-lg"
                          title="Acquire Artwork"
                        >
                          {addedItem === artwork.id ? (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Museum Label / Plaque Under Card */}
                <div className="pt-4 px-1 space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-base text-[#1A1A1A] group-hover:text-amber-800 transition-colors truncate">
                      {artwork.title}
                    </h3>
                    <span className="font-mono text-sm text-[#1A1A1A] font-bold shrink-0">
                      ${artwork.price}
                    </span>
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#867E74] font-mono">
                    {artwork.medium}
                  </p>
                  
                  <div className="flex items-center justify-between text-[10px] text-[#938B82] pt-2 border-t border-amber-900/10 font-mono">
                    <span>{artwork.dimensions}</span>
                    <span className="italic font-serif text-amber-900/80">{artwork.status}</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Exhibition Catalog CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-amber-900/20 bg-white/80 text-[#1A1A1A] text-[11px] uppercase tracking-[0.22em] font-medium hover:border-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-2xs group"
          >
            <span>View Full Studio Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}