'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Eye, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PackageOpen
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  'All Artworks', 
  'Human Portraits', 
  'Pet & Animal Portraits', 
  'Couples & Family Studies', 
  'Bridal & Cultural Heritage', 
  'Classical Figures'
];

export default function ShopContent() {
  const { addToCart } = useCart();
  const scrollContainerRef = useRef(null);

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Artworks');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    totalCount: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Loading & Toast States for Quick Add
  const [addingId, setAddingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleScrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        category: selectedCategory,
        sort: sortBy,
        page: currentPage.toString(),
      });

      const res = await fetch(`/api/artworks?${params.toString()}`);
      const data = await res.json();

      if (data.artworks) {
        setArtworks(data.artworks);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error('Failed to load catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [selectedCategory, sortBy, currentPage]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleQuickAdd = async (artwork) => {
    setAddingId(artwork.id);

    await new Promise((resolve) => setTimeout(resolve, 400));

    const imageUrl = artwork.media?.secureUrl || artwork.image || '';

    addToCart({
      id: artwork.id,
      title: artwork.title,
      category: artwork.category,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      price: artwork.price,
      image: imageUrl,
      frame: 'Museum Hardwood (+Mat Board)',
    });

    setAddingId(null);
    setToastMessage(`"${artwork.title}" successfully added to acquisition bag.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Floating Success Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#171513] text-[#FAF8F5] px-6 py-4 rounded-2xl shadow-2xl border border-[#e4c577]/40 flex items-center gap-3 font-mono text-xs"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Glows */}
      <div className="absolute top-24 left-1/4 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[550px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.08)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-10 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 backdrop-blur-md text-[#e4c577] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
              <span>Permanent Studio Vault</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#FAF8F5] tracking-tight leading-[1.06]" style={{ fontFamily: 'Georgia, serif' }}>
              Gallery <br className="hidden sm:inline" />
              <span className="italic font-light text-[#e4c577]">
                Exhibition.
              </span>
            </h1>

            <p className="text-[#A8A196] font-light text-sm sm:text-base leading-relaxed">
              Explore authentic charcoal and graphite studies hand-drawn on archival cotton paper. Each original includes a certified wax-sealed provenance document.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#A8A196]">
            <span className="text-[#e4c577] font-semibold">{pagination.totalCount} Artworks Indexed</span>
            <span>&bull;</span>
            <span>Archival Cotton 300 GSM</span>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 max-w-full w-full lg:w-auto overflow-hidden">
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
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'text-[#0A0908] font-semibold'
                      : 'text-[#A8A196] hover:text-[#FAF8F5]'
                  }`}
                >
                  {selectedCategory === cat && (
                    <motion.div
                      layoutId="activeShopCategory"
                      className="absolute inset-0 bg-gradient-to-r from-[#e4c577] to-[#cfae59] rounded-full shadow-xs"
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

          <div className="flex items-center gap-2 bg-[#171513] px-4 py-2 rounded-full border border-white/10 shadow-2xs text-xs shrink-0 self-end lg:self-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#e4c577]" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-transparent text-[#FAF8F5] outline-none text-xs cursor-pointer font-mono uppercase tracking-wider"
            >
              <option value="featured" className="bg-[#171513]">Featured Curation</option>
              <option value="price-asc" className="bg-[#171513]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#171513]">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 text-xs font-mono text-[#A8A196]">
            <Loader2 className="w-8 h-8 animate-spin text-[#e4c577]" />
            <span>Curating exhibition works from vault...</span>
          </div>
        ) : artworks.length === 0 ? (
          <div className="py-24 text-center rounded-3xl bg-[#171513] border border-white/10 p-12 space-y-3">
            <PackageOpen className="w-10 h-10 mx-auto text-[#e4c577]/60 stroke-[1.5]" />
            <h3 className="font-serif text-xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>No Originals In This Category</h3>
            <p className="text-xs text-[#A8A196] max-w-sm mx-auto font-sans">
              No authenticated artworks currently match this filter criteria. Select another collection or commission a bespoke study.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {artworks.map((artwork) => {
              const isAvailable = artwork.status === 'Available' || artwork.status === 'Available Original';
              const isAdding = addingId === artwork.id;
              const imgSrc = artwork.media?.secureUrl || artwork.image || '';

              return (
                <div
                  key={artwork.id}
                  className="group flex flex-col justify-between will-change-transform"
                >
                  {/* Luxury Frame Card */}
                  <div className="relative aspect-[3/4] bg-[#171513] p-4 rounded-2xl border border-white/10 overflow-hidden shadow-[0_15px_35px_-5px_rgba(0,0,0,0.8)] sm:group-hover:-translate-y-1.5 sm:group-hover:shadow-[0_25px_50px_-12px_rgba(228,197,119,0.25)] sm:group-hover:border-[#e4c577]/60 transition-all duration-500">
                    
                    {/* Inner Viewport with Next.js Optimized Image */}
                    <div className="bg-[#141210] p-3 rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative w-full h-full border border-white/10 flex items-center justify-center overflow-hidden">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={artwork.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover rounded-lg transition-transform duration-700 ease-out sm:group-hover:scale-105 contrast-110"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-stone-400 gap-1.5 p-4 text-center">
                          <Sparkles className="w-5 h-5 text-[#e4c577]" />
                          <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400">No Image Recorded</span>
                        </div>
                      )}

                      {/* Serial Stamp */}
                      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-black/80 border border-[#e4c577]/40 backdrop-blur-md text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-md font-mono shadow-xs z-10">
                        {artwork.id.toUpperCase()}
                      </div>

                      {/* Availability Pill */}
                      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
                        <span className={`text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-mono font-medium backdrop-blur-md border ${
                          isAvailable
                            ? 'bg-emerald-500/90 text-white border-emerald-400/50 shadow-xs'
                            : 'bg-black/60 text-zinc-300 border-white/10'
                        }`}>
                          {artwork.status || 'Available'}
                        </span>
                      </div>

                      {/* Floating Action Dock */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 gap-2.5 backdrop-blur-none sm:backdrop-blur-[2px] z-20">
                        <Link
                          href={`/shop/${artwork.id}`}
                          className="flex-1 py-2.5 rounded-xl bg-white/95 text-[#0A0908] hover:bg-[#e4c577] hover:text-black transition-all text-[10px] uppercase tracking-widest font-mono font-semibold flex items-center justify-center gap-1.5 shadow-lg"
                          title="Inspect Artwork"
                        >
                          <Eye className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Inspect Detail</span>
                        </Link>

                        {isAvailable && (
                          <button
                            type="button"
                            disabled={isAdding}
                            onClick={() => handleQuickAdd(artwork)}
                            className="p-2.5 rounded-xl bg-[#0A0908] text-[#e4c577] hover:bg-[#e4c577] hover:text-[#0A0908] transition-all shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[40px]"
                            title="Add to Acquisition Bag"
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

        {/* Pagination Section */}
        {!loading && pagination.totalPages > 1 && (
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <span className="text-xs font-mono text-[#A8A196]">
              Showing Page <strong className="text-[#FAF8F5]">{pagination.page}</strong> of{' '}
              <strong className="text-[#FAF8F5]">{pagination.totalPages}</strong> ({pagination.totalCount} Total Originals)
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.hasPrevPage}
                className="px-4 py-2 rounded-xl bg-[#171513] border border-white/10 text-xs font-mono text-[#FAF8F5] hover:border-[#e4c577] transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] font-bold shadow-xs'
                        : 'bg-[#171513] border border-white/10 text-[#A8A196] hover:text-[#FAF8F5] hover:border-[#e4c577]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 rounded-xl bg-[#171513] border border-white/10 text-xs font-mono text-[#FAF8F5] hover:border-[#e4c577] transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Custom Commission Banner */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#171513] border border-[#e4c577]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(228,197,119,0.12)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-normal" style={{ fontFamily: 'Georgia, serif' }}>
              Seeking a bespoke family or couple portrait?
            </h3>
            <p className="text-xs text-[#A8A196] font-light max-w-lg">
              We translate personal photographs into one-of-a-kind hand-rendered charcoal drawings on 300 GSM French cotton paper.
            </p>
          </div>

          <Link
            href="/custom-sketch"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all shadow-md shrink-0 relative z-10 group"
          >
            <span>Commission Custom</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}