'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, ShoppingBag, Sparkles, Check, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CATEGORIES = ['All Works', 'Human Portraits', 'Pet & Animal Portraits', 'Couples & Family Studies', 'Bridal & Cultural Heritage', 'Classical Figures'];

export default function FeaturedExhibition() {
  const { addToCart } = useCart();
  const scrollContainerRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('All Works');
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedItem, setAddedItem] = useState(null);

  // Horizontal scroll function for category tabs
  const handleScrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Fetch live artworks from the database API
  useEffect(() => {
    async function fetchExhibitionWorks() {
      try {
        setLoading(true);
        const res = await fetch('/api/artworks');
        const data = await res.json();
        if (data.artworks) {
          setArtworks(data.artworks);
        }
      } catch (err) {
        console.error('Failed to load featured exhibition:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchExhibitionWorks();
  }, []);

  // Filter logic matching category tabs
  const filteredItems = activeCategory === 'All Works'
    ? artworks
    : artworks.filter((item) => item.category?.toLowerCase() === activeCategory.toLowerCase());

  const handleQuickAdd = (artwork) => {
    addToCart({
      id: artwork.id,
      title: artwork.title,
      category: artwork.category,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      price: Number(artwork.price) || 0,
      image: artwork.image,
      frame: 'Museum Hardwood (+Mat Board)',
    });

    setAddedItem(artwork.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <section className="relative py-28 px-6 sm:px-10 bg-gradient-to-b from-[#F5F2EC] via-[#FAF8F5] to-[#FFFFFF] border-t border-amber-900/10 overflow-hidden">
      
      {/* Background Soft Lighting Sprays */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-gradient-to-tr from-amber-400/10 via-rose-300/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/10 via-amber-300/5 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-3">
            {/* Colorful Atelier Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-amber-900 font-mono font-semibold">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Current Exhibition &bull; Live Vault</span>
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

          {/* Horizontal Scrollable Categories with Arrows */}
          <div className="flex items-center gap-2 max-w-full lg:max-w-xl">
            
            <button
              type="button"
              onClick={() => handleScrollTabs('left')}
              className="p-2 rounded-full bg-white border border-amber-900/15 text-[#867E74] hover:text-[#1A1A1A] hover:border-amber-500 hover:bg-[#FAF8F3] transition-all shadow-2xs shrink-0 cursor-pointer"
              title="Scroll left"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex items-center gap-1.5 overflow-x-auto scroll-smooth bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-amber-900/10 shadow-xs whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap ${
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

            <button
              type="button"
              onClick={() => handleScrollTabs('right')}
              className="p-2 rounded-full bg-white border border-amber-900/15 text-[#867E74] hover:text-[#1A1A1A] hover:border-amber-500 hover:bg-[#FAF8F3] transition-all shadow-2xs shrink-0 cursor-pointer"
              title="Scroll right"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* Loading / Exhibition Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#867E74]">
            <Loader2 className="w-7 h-7 animate-spin text-[#C29B38]" />
            <span>Retrieving live exhibition archive...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-white border border-amber-900/10 p-8 space-y-2">
            <h3 className="font-serif text-xl text-[#1A1A1A]">No Artworks Found</h3>
            <p className="text-xs text-[#867E74]">No authenticated originals currently match this category filter.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            <AnimatePresence>
              {filteredItems.slice(0, 4).map((artwork) => {
                const isAvailable = artwork.status === 'Available' || artwork.status === 'Available Original';

                return (
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
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Top Serial Stamp */}
                        <div className="absolute top-3 left-3 bg-black/75 border border-amber-500/30 backdrop-blur-md text-amber-200 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-md font-mono shadow-xs">
                          {artwork.id.toUpperCase()}
                        </div>

                        {/* Top Right Availability Pill */}
                        <div className="absolute top-3 right-3">
                          <span className={`text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-mono font-medium backdrop-blur-md border ${
                            isAvailable
                              ? 'bg-emerald-500/90 text-white border-emerald-400/50 shadow-xs'
                              : 'bg-black/60 text-zinc-300 border-white/10'
                          }`}>
                            {artwork.status}
                          </span>
                        </div>

                        {/* Interactive Floating Action Dock on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 gap-2.5 backdrop-blur-[2px]">
                          <Link
                            href={`/shop/${artwork.id}`}
                            className="flex-1 py-2.5 rounded-xl bg-white/95 text-[#1A1A1A] hover:bg-amber-400 hover:text-black transition-all text-[10px] uppercase tracking-widest font-mono font-semibold flex items-center justify-center gap-1.5 shadow-lg"
                            title="Inspect Artwork"
                          >
                            <Eye className="w-3.5 h-3.5 stroke-[2]" />
                            <span>Inspect</span>
                          </Link>

                          {isAvailable && (
                            <button
                              type="button"
                              onClick={() => handleQuickAdd(artwork)}
                              className="p-2.5 rounded-xl bg-zinc-950 text-amber-300 hover:bg-amber-500 hover:text-black transition-all shadow-lg cursor-pointer"
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
                          ${Number(artwork.price) || 0}
                        </span>
                      </div>

                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#867E74] font-mono truncate">
                        {artwork.medium}
                      </p>
                      
                      <div className="flex items-center justify-between text-[10px] text-[#938B82] pt-2 border-t border-amber-900/10 font-mono">
                        <span>{artwork.dimensions}</span>
                        <span className="italic font-serif text-amber-900/80">{artwork.year || '2026'}</span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

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