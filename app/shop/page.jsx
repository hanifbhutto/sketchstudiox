'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Eye, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowUpRight,
  Check
} from 'lucide-react';
import { useCart } from '../../context/CartContext'; // <-- Cart Context Hook

const CATALOG_ITEMS = [
  {
    id: 'ssx-01',
    title: 'The Silent Contemplation',
    category: 'Portraits',
    medium: '8B Graphite on Arches',
    price: 340,
    dimensions: '16 × 20 in',
    status: 'Available',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ssx-02',
    title: 'Bonded in Charcoal',
    category: 'Couples',
    medium: 'Raw Willow Charcoal',
    price: 420,
    dimensions: '18 × 24 in',
    status: 'Available',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ssx-03',
    title: 'Grit & Grace',
    category: 'Portraits',
    medium: 'Compressed Charcoal Powder',
    price: 290,
    dimensions: '12 × 16 in',
    status: 'Reserved',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ssx-04',
    title: 'Generations Intertwined',
    category: 'Figures',
    medium: 'Graphite Multi-Figure Study',
    price: 520,
    dimensions: '20 × 28 in',
    status: 'Available',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ssx-05',
    title: 'Shadowed Majesty',
    category: 'Wildlife',
    medium: 'Charcoal & White Pastel Highlight',
    price: 380,
    dimensions: '16 × 24 in',
    status: 'Available',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ssx-06',
    title: 'Nocturne Study No. 4',
    category: 'Figures',
    medium: 'Pure Vine Charcoal',
    price: 460,
    dimensions: '18 × 24 in',
    status: 'Available',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=900&q=80',
  },
];

const CATEGORIES = ['All Artworks', 'Portraits', 'Couples', 'Figures', 'Wildlife'];

export default function ShopPage() {
  const { addToCart } = useCart(); // <-- Hook call
  const [selectedCategory, setSelectedCategory] = useState('All Artworks');
  const [sortBy, setSortBy] = useState('featured');
  const [addedItem, setAddedItem] = useState(null);

  // Filter logic
  let filtered = selectedCategory === 'All Artworks'
    ? CATALOG_ITEMS
    : CATALOG_ITEMS.filter((item) => item.category === selectedCategory);

  // Sorting logic
  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  // Real Cart Add Action
  const handleQuickAdd = (artwork) => {
    addToCart({
      id: artwork.id,
      title: artwork.title,
      category: artwork.category,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      price: artwork.price,
      image: artwork.image,
      frame: 'Museum Hardwood (+Mat Board)',
    });

    setAddedItem(artwork.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* Fine Cotton Grain Background */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-multiply pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#C29B38 0.75px, transparent 0.75px), radial-gradient(#1A1A1A 0.5px, #FAF8F5 0.5px)`,
          backgroundSize: '24px 24px, 12px 12px',
          backgroundPosition: '0 0, 6px 6px'
        }}
      />

      {/* Ambient Lighting Sprays */}
      <div className="absolute top-24 left-1/4 w-[600px] h-[450px] bg-gradient-to-tr from-[#D4A348]/15 via-rose-300/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[550px] h-[500px] bg-gradient-to-bl from-stone-900/10 via-[#D4A348]/12 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Editorial Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5DFD7] pb-10 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4A348]/40 bg-[#D4A348]/10 backdrop-blur-md text-[#8C6415] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
              <span>Permanent Studio Vault</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#1A1A1A] tracking-tight leading-[1.06]">
              Gallery <br className="hidden sm:inline" />
              <span className="italic font-light bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#8C6415] bg-clip-text text-transparent">
                Exhibition.
              </span>
            </h1>

            <p className="text-[#686057] font-light text-sm sm:text-base max-w-lg leading-relaxed">
              Explore authentic charcoal and graphite studies hand-drawn on archival cotton paper. Each original includes a certified wax-sealed provenance document.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#867E74]">
            <span className="text-[#8C6415] font-semibold">{filtered.length} Artworks Indexed</span>
            <span>&bull;</span>
            <span>Archival Cotton 300 GSM</span>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-[#E5DFD7] shadow-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'text-amber-950 font-semibold'
                    : 'text-[#867E74] hover:text-[#1A1A1A]'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeShopCategory"
                    className="absolute inset-0 bg-[#FAF8F3] rounded-full border border-[#D4A348]/40 shadow-2xs"
                    transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E5DFD7] shadow-2xs text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C29B38]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[#1A1A1A] outline-none text-xs cursor-pointer font-mono uppercase tracking-wider"
            >
              <option value="featured">Featured Curation</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Artwork Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((artwork) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className="rounded-[30px] bg-white border border-[#E5DFD7] p-5 flex flex-col justify-between group shadow-[0_12px_35px_-10px_rgba(212,163,72,0.08)] hover:shadow-[0_22px_50px_-12px_rgba(212,163,72,0.2)] hover:border-[#D4A348]/50 transition-all duration-400"
              >
                {/* Visual Viewport */}
                <div>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 border border-stone-300/80 mb-5">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Serial Tag */}
                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-black/75 border border-[#D4A348]/40 backdrop-blur-md text-[9px] uppercase tracking-widest text-[#FAF8F5] font-mono shadow-xs">
                      {artwork.id.toUpperCase()}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className={`text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-mono font-medium backdrop-blur-md border ${
                        artwork.status === 'Available'
                          ? 'bg-emerald-500/90 text-white border-emerald-400/50 shadow-xs'
                          : 'bg-black/60 text-zinc-300 border-white/10'
                      }`}>
                        {artwork.status}
                      </span>
                    </div>

                    {/* Quick Hover Controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 gap-3 backdrop-blur-[2px]">
                      <Link
                        href={`/shop/${artwork.id}`}
                        className="flex-1 py-2.5 rounded-xl bg-white/95 text-[#1A1A1A] hover:bg-[#C29B38] hover:text-white transition-all text-[10px] uppercase tracking-widest font-mono font-semibold flex items-center justify-center gap-1.5 shadow-lg"
                        title="Inspect Detail"
                      >
                        <Eye className="w-3.5 h-3.5 stroke-[2]" />
                        <span>Inspect Detail</span>
                      </Link>

                      {artwork.status === 'Available' && (
                        <button
                          onClick={() => handleQuickAdd(artwork)}
                          className="p-2.5 rounded-xl bg-[#1A1A1A] text-[#D4A348] hover:bg-[#C29B38] hover:text-white transition-all shadow-lg cursor-pointer"
                          title="Add to Acquisition Bag"
                        >
                          {addedItem === artwork.id ? (
                            <Check className="w-4 h-4 stroke-[2.5] text-emerald-400" />
                          ) : (
                            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Artwork Meta */}
                  <div className="space-y-1.5 px-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#8C6415] transition-colors">
                        {artwork.title}
                      </h3>
                      <span className="font-mono text-base font-bold text-[#1A1A1A]">
                        ${artwork.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#686057] font-light">{artwork.medium}</p>
                  </div>
                </div>

                {/* Bottom Spec Footer */}
                <div className="pt-4 mt-5 border-t border-[#E5DFD7] flex items-center justify-between text-[11px] text-[#867E74] font-mono">
                  <span>{artwork.dimensions}</span>
                  <span>Original &bull; {artwork.year}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Order Callout Banner */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#0E0C0A] border border-[#D4A348]/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(212,163,72,0.15)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-normal">
              Seeking a bespoke family or couple portrait?
            </h3>
            <p className="text-xs text-[#A8A196] font-light max-w-lg">
              We translate personal photographs into one-of-a-kind hand-rendered charcoal drawings on 300 GSM French cotton paper.
            </p>
          </div>

          <Link
            href="/custom-sketch"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-[#D4A348] to-[#C29B38] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all shadow-md shrink-0 relative z-10 group"
          >
            <span>Commission Custom</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}