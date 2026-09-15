'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Package, 
  Check, 
  ShoppingBag, 
  Eye,
  Home,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../../context/CartContext';

// Permanent Museum Display Frame Style
const DEFAULT_FRAME = {
  id: 'ebony',
  label: 'Ebony Hardwood & Museum Mat',
  frameClass: 'p-7 sm:p-9 bg-[#171513] border-[#2C2723] shadow-2xl ring-1 ring-white/10',
};

export default function ArtworkDetailPage() {
  const params = useParams();
  const artworkId = params?.id;
  const { addToCart } = useCart();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [viewMode, setViewMode] = useState('artwork'); // 'artwork' | 'room'
  const [added, setAdded] = useState(false);

  // Precision Loupe Zoom State
  const imageContainerRef = useRef(null);
  const [loupeActive, setLoupeActive] = useState(false);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0, relX: 0, relY: 0 });

  // Fetch artwork from Supabase API
  useEffect(() => {
    if (!artworkId) return;

    async function fetchArtworkDetails() {
      try {
        setLoading(true);
        const res = await fetch(`/api/artworks/${artworkId}`);
        if (!res.ok) throw new Error('Artwork not found');
        const data = await res.json();
        setArtwork(data);
      } catch (err) {
        setError('Could not locate this master original in the exhibition vault.');
      } finally {
        setLoading(false);
      }
    }

    fetchArtworkDetails();
  }, [artworkId]);

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setLoupeActive(true);
      setMouseCoord({
        x: e.clientX,
        y: e.clientY,
        relX: (x / rect.width) * 100,
        relY: (y / rect.height) * 100,
      });
    } else {
      setLoupeActive(false);
    }
  };

  const handleAddToCart = async () => {
    if (!artwork) return;

    try {
      // Get existing guest cartId or logged-in userId from localStorage
      const currentCartId = localStorage.getItem('active_cart_id');
      const userId = localStorage.getItem('userId'); // Sirf tab hoga jab user login ho

      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: currentCartId,
          userId: userId || null, // Guest ke liye null rahega
          artworkId: artwork.id,
          frame: DEFAULT_FRAME.label,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save the active cartId in localStorage for guest session tracking
        if (data.cartId) {
          localStorage.setItem('active_cart_id', data.cartId);
        }

        // Trigger context update / drawer open
        addToCart({
          id: artwork.id,
          title: artwork.title,
          category: artwork.category,
          medium: artwork.medium,
          dimensions: artwork.dimensions,
          price: artwork.price,
          image: artwork.image || artwork.media?.secureUrl,
          frame: DEFAULT_FRAME.label,
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 2200);
      } else {
        console.error('Failed to add to cart:', data.error);
      }
    } catch (err) {
      console.error('Network error while adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-24 flex flex-col items-center justify-center gap-4 bg-[#FAF8F5] text-xs font-mono text-[#867E74]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C29B38]" />
        <span>Accessing curator records from vault...</span>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="min-h-screen pt-40 pb-24 px-6 text-center bg-[#FAF8F5]">
        <div className="max-w-md mx-auto space-y-4 p-8 rounded-3xl bg-white border border-[#E5DFD7]">
          <AlertCircle className="w-10 h-10 mx-auto text-rose-500 stroke-[1.5]" />
          <h2 className="font-serif text-2xl text-[#1A1A1A]">Masterpiece Not Found</h2>
          <p className="text-xs text-[#867E74]">{error || 'The requested artwork identifier is invalid.'}</p>
          <Link 
            href="/shop"
            className="inline-block px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider"
          >
            Return to Exhibition Archive
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* Studio Ambient Glows */}
      <div className="absolute top-24 left-1/3 w-[800px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(212,163,72,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[600px] h-[500px] bg-gradient-to-bl from-indigo-500/5 via-amber-300/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Navigation & Mode Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#867E74] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C29B38]" />
            <span>Return to Exhibition Archive</span>
          </Link>

          {/* Viewport Mode Switcher */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/90 border border-[#E5DFD7] shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('artwork')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'artwork'
                  ? 'bg-[#1A1A1A] text-[#FAF8F5] shadow-xs'
                  : 'text-[#867E74] hover:text-[#1A1A1A]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Studio Inspection</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('room')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'room'
                  ? 'bg-[#1A1A1A] text-[#FAF8F5] shadow-xs'
                  : 'text-[#867E74] hover:text-[#1A1A1A]'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-[#C29B38]" />
              <span>View In Room</span>
            </button>
          </div>
        </div>

        {/* Main Artwork Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Stage with Permanent Museum Frame */}
          <div className="lg:col-span-7 space-y-5">
            
            <AnimatePresence mode="wait">
              {viewMode === 'artwork' ? (
                /* Inspection Viewport with Permanent Frame */
                <motion.div
                  key="inspection"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`relative rounded-[32px] overflow-hidden cursor-crosshair border ${DEFAULT_FRAME.frameClass}`}
                >
                  {/* Internal Museum Mat Board */}
                  <div className="relative overflow-hidden rounded-2xl bg-[#FAF8F3] p-6 sm:p-8 shadow-[inset_0_2px_14px_rgba(0,0,0,0.18)] border border-[#E8E2D7]">
                    <div 
                      ref={imageContainerRef}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setLoupeActive(false)}
                      className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-200 border border-stone-300 shadow-inner select-none flex items-center justify-center"
                    >
                      {artwork.media?.secureUrl || artwork.image ? (
                        <>
                          <img
                            src={artwork.media?.secureUrl || artwork.image}
                            alt={artwork.title}
                            className="w-full h-full object-cover contrast-125"
                          />

                          {/* Studio Authenticity Badge */}
                          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#FAF8F3]/95 backdrop-blur-md border border-[#C29B38]/40 text-[9px] uppercase tracking-[0.2em] font-mono text-[#736B63] shadow-xs flex items-center gap-1.5 pointer-events-none z-20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C29B38]" />
                            <span>{artwork.id.toUpperCase()} &bull; MASTER STUDY</span>
                          </div>

                          {/* Floating Micro-Loupe Glass Lens */}
                          {loupeActive && (
                            <div
                              style={{
                                left: `${mouseCoord.relX}%`,
                                top: `${mouseCoord.relY}%`,
                                backgroundImage: `url(${artwork.media?.secureUrl || artwork.image})`,
                                backgroundPosition: `${mouseCoord.relX}% ${mouseCoord.relY}%`,
                                backgroundSize: '320%',
                              }}
                              className="absolute pointer-events-none w-36 h-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#D4A348] shadow-[0_15px_35px_rgba(0,0,0,0.4)] backdrop-blur-xs z-30 hidden sm:block contrast-125"
                            />
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-stone-400 gap-2 p-6 text-center z-10">
                          <Sparkles className="w-8 h-8 text-amber-600/60" />
                          <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">No Image Recorded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Virtual Living Room Scale Simulator */
                <motion.div
                  key="room"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-[#E5DFD7] shadow-xl bg-cover bg-center flex items-center justify-center p-8"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85)' }}
                >
                  <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-[1px]" />

                  {/* Scaled Hanging Artwork Frame */}
                  <div className="relative z-10 w-44 sm:w-56 p-2 rounded-lg bg-[#1F1B18] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-[#3A322C]">
                    <div className="bg-[#FAF8F3] p-2.5 shadow-inner flex items-center justify-center aspect-[4/5] overflow-hidden bg-stone-200">
                      {artwork.media?.secureUrl || artwork.image ? (
                        <img src={artwork.media?.secureUrl || artwork.image} alt={artwork.title} className="w-full h-full object-cover contrast-125" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-stone-400 gap-1 text-center">
                          <Sparkles className="w-5 h-5 text-amber-600/60" />
                          <span className="text-[8px] font-mono tracking-widest uppercase text-stone-500">No Image</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="absolute bottom-4 right-4 z-10 text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                    Relative Scale: {artwork.dimensions}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Helper Instruction */}
            <p className="text-center text-[10px] uppercase tracking-[0.25em] text-[#938B82] font-mono">
              Hover cursor over artwork for 3x tactile graphite stroke magnification
            </p>
          </div>

          {/* Right Column: Provenance & Live Acquisition Flow */}
          <div className="lg:col-span-5 space-y-7">
            
            {/* Title & Metadata */}
            <div className="space-y-3 pb-6 border-b border-[#E5DFD7]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A348]/30 bg-[#D4A348]/10 text-[#8C6415] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold">
                <Sparkles className="w-3 h-3 text-[#C29B38]" />
                <span>Original Masterpiece &bull; {artwork.year || '2026'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-normal leading-tight">
                {artwork.title}
              </h1>

              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">
                  ${artwork.price} <span className="text-xs font-sans text-[#867E74]">USD</span>
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 border border-emerald-500/30">
                  {artwork.status}
                </span>
              </div>
            </div>

            {/* Curatorial Note */}
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase tracking-[0.22em] text-[#867E74] font-mono font-semibold">
                Curatorial Note
              </h3>
              <p className="text-[#686057] font-light text-sm leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Substrate Technical Specs */}
            <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E5DFD7] space-y-2.5 text-xs">
              <div className="flex justify-between text-[#686057] font-light">
                <span className="text-[#867E74] font-mono text-[10px] uppercase">Medium</span>
                <span className="font-medium text-[#1A1A1A]">{artwork.medium}</span>
              </div>
              <div className="flex justify-between text-[#686057] font-light">
                <span className="text-[#867E74] font-mono text-[10px] uppercase">Substrate</span>
                <span className="font-medium text-[#1A1A1A]">{artwork.substrate}</span>
              </div>
              <div className="flex justify-between text-[#686057] font-light">
                <span className="text-[#867E74] font-mono text-[10px] uppercase">Dimensions</span>
                <span className="font-medium text-[#1A1A1A] font-mono">{artwork.dimensions}</span>
              </div>
              <div className="flex justify-between text-[#686057] font-light">
                <span className="text-[#867E74] font-mono text-[10px] uppercase">Presentation</span>
                <span className="font-medium text-[#1A1A1A]">Ebony Hardwood Frame & Museum Mat</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={artwork.status !== 'Available' && artwork.status !== 'Available Original'}
                className="w-full py-4 rounded-2xl bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)] flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Acquisition Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#D4A348] group-hover:text-white transition-colors" />
                    <span>Acquire Original Artwork</span>
                  </>
                )}
              </button>

              <Link
                href="/custom-sketch"
                className="w-full py-3.5 rounded-2xl border border-[#1A1A1A]/20 bg-white/70 text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#1A1A1A] hover:bg-white transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                <span>Commission A Similar Portrait</span>
              </Link>
            </div>

            {/* Provenance & Shipping Guarantees */}
            <div className="pt-4 border-t border-[#E5DFD7] space-y-3 text-xs text-[#686057] font-light">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Wax-sealed Certificate of Authenticity signed by the artist</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#8C6415] shrink-0" />
                <span>Insured worldwide express courier transit</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#8C6415] shrink-0" />
                <span>Reinforced impact-resistant bespoke museum packaging</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}