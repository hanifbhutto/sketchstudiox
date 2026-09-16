'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  
  // Loading & Toast States for Quick Add
  const [addingId, setAddingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  const handleQuickAdd = async (artwork) => {
    setAddingId(artwork.id);
    
    await new Promise((resolve) => setTimeout(resolve, 400));

    addToCart({
      id: artwork.id,
      title: artwork.title,
      category: artwork.category,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      price: Number(artwork.price) || 0,
      image: artwork.media?.secureUrl || artwork.image,
      frame: 'Museum Hardwood (+Mat Board)',
    });

    setAddingId(null);
    setToastMessage(`"${artwork.title}" successfully added to acquisition bag.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section className="relative py-24 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] border-t border-white/10 overflow-hidden">
      
      {/* Static Ambient Glows (No initial scale animation) */}
      <div className="absolute top-1/3 left-10 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.14)_0%,transparent_70%)] blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.08)_0%,transparent_70%)] blur-[110px] sm:blur-[130px] pointer-events-none" />

      {/* Floating Success Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 bg-[#171513] text-[#FAF8F5] px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl shadow-2xl border border-[#e4c577]/40 flex items-center gap-3 font-mono text-xs"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col items-start justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            {/* Atelier Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-[#e4c577] font-mono font-semibold">
              <Sparkles className="w-3 h-3 text-[#e4c577]" />
              <span>Current Exhibition &bull; Live Vault</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FAF8F5] tracking-tight leading-[1.12] sm:leading-[1.08]" style={{ fontFamily: 'Georgia, serif' }}>
              Curated Originals <br className="hidden sm:inline" />
              <span className="italic font-light text-[#e4c577]">
                & Atelier Studies.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#A8A196] font-light leading-relaxed">
              Each piece is individually documented, hand-signed, and accompanied by a wax-sealed certificate of authenticity.
            </p>
          </div>

          {/* Horizontal Scrollable Categories with Arrows */}
          <div className="flex items-center gap-2 w-full pt-2">
            <button
              type="button"
              onClick={() => handleScrollTabs('left')}
              className="p-2 rounded-full bg-[#171513] border border-white/10 text-[#A8A196] hover:text-[#FAF8F5] hover:border-[#e4c577] transition-all shadow-2xs shrink-0 cursor-pointer"
              title="Scroll left"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex items-center gap-1.5 overflow-x-auto scroll-smooth bg-[#171513]/90 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xs whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'text-[#0A0908] font-semibold'
                      : 'text-[#A8A196] hover:text-[#FAF8F5]'
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeExhibitionTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#e4c577] to-[#cfae59] rounded-full shadow-2xs"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleScrollTabs('right')}
              className="p-2 rounded-full bg-[#171513] border border-white/10 text-[#A8A196] hover:text-[#FAF8F5] hover:border-[#e4c577] transition-all shadow-2xs shrink-0 cursor-pointer"
              title="Scroll right"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading / Exhibition Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#A8A196]">
            <Loader2 className="w-7 h-7 animate-spin text-[#e4c577]" />
            <span>Retrieving live exhibition archive...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#171513] border border-white/10 p-8 space-y-2">
            <h3 className="font-serif text-xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>No Artworks Found</h3>
            <p className="text-xs text-[#A8A196]">No authenticated originals currently match this category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredItems.slice(0, 4).map((artwork) => {
              const isAvailable = artwork.status === 'Available' || artwork.status === 'Available Original';
              const isAdding = addingId === artwork.id;
              const imgSrc = artwork.media?.secureUrl || artwork.image;

              return (
                <div
                  key={artwork.id}
                  className="group flex flex-col justify-between"
                >
                  {/* Dark Luxury Frame Card */}
                  <div className="relative aspect-[3/4] bg-[#171513] p-4 rounded-2xl border border-white/10 overflow-hidden shadow-[0_15px_35px_-5px_rgba(0,0,0,0.8)] sm:group-hover:-translate-y-1.5 sm:group-hover:shadow-[0_25px_50px_-12px_rgba(228,197,119,0.25)] sm:group-hover:border-[#e4c577]/60 transition-all duration-300">
                    
                    {/* Inner Viewport with Next.js Optimized Image */}
                    <div className="bg-[#141210] p-3 rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative w-full h-full border border-white/10 flex items-center justify-center overflow-hidden">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={artwork.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover rounded-lg transition-transform duration-500 ease-out sm:group-hover:scale-105 contrast-110"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-stone-400 gap-1.5 p-4 text-center">
                          <Sparkles className="w-5 h-5 text-[#e4c577]" />
                          <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400">No Image Recorded</span>
                        </div>
                      )}

                      {/* Top Serial Stamp */}
                      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-black/80 border border-[#e4c577]/40 backdrop-blur-md text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-md font-mono shadow-xs z-10">
                        {artwork.id.toUpperCase()}
                      </div>

                      {/* Top Right Availability Pill */}
                      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
                        <span className={`text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-mono font-medium backdrop-blur-md border ${
                          isAvailable
                            ? 'bg-emerald-500/90 text-white border-emerald-400/50 shadow-xs'
                            : 'bg-black/60 text-zinc-300 border-white/10'
                        }`}>
                          {artwork.status}
                        </span>
                      </div>

                      {/* Interactive Floating Action Dock */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center p-4 gap-2.5 backdrop-blur-none sm:backdrop-blur-[2px] z-20">
                        <Link
                          href={`/shop/${artwork.id}`}
                          className="flex-1 py-2.5 rounded-xl bg-white/95 text-[#0A0908] hover:bg-[#e4c577] hover:text-black transition-all text-[10px] uppercase tracking-widest font-mono font-semibold flex items-center justify-center gap-1.5 shadow-lg"
                          title="Inspect Artwork"
                        >
                          <Eye className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Inspect</span>
                        </Link>

                        {isAvailable && (
                          <button
                            type="button"
                            disabled={isAdding}
                            onClick={() => handleQuickAdd(artwork)}
                            className="p-2.5 rounded-xl bg-[#0A0908] text-[#e4c577] hover:bg-[#e4c577] hover:text-[#0A0908] transition-all shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[40px]"
                            title="Acquire Artwork"
                          >
                            {isAdding ? (
                              <Loader2 className="w-4 h-4 animate-spin text-[#e4c577]" />
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
                      <h3 className="font-serif text-base text-[#FAF8F5] group-hover:text-[#e4c577] transition-colors truncate" style={{ fontFamily: 'Georgia, serif' }}>
                        {artwork.title}
                      </h3>
                      <span className="font-mono text-sm text-[#e4c577] font-bold shrink-0">
                        ${Number(artwork.price) || 0}
                      </span>
                    </div>

                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#A8A196] font-mono truncate">
                      {artwork.medium}
                    </p>
                    
                    <div className="flex items-center justify-between text-[10px] text-[#867E74] pt-2 border-t border-white/10 font-mono">
                      <span>{artwork.dimensions}</span>
                      <span className="italic font-serif text-[#e4c577]/80">{artwork.year || '2026'}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Exhibition Catalog CTA */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 sm:py-3.5 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs sm:text-[11px] uppercase tracking-[0.2em] font-semibold hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(228,197,119,0.35)] group"
          >
            <span>View Full Studio Catalog</span>
            <ArrowRight className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#0A0908] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}