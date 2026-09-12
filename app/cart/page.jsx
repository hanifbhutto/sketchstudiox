'use client';

import Link from 'next/link';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft,
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* Studio Ambient Background */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(212,163,72,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Top Breadcrumb */}
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#867E74] hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#C29B38]" />
          <span>Continue Exploring Vault</span>
        </Link>

        {/* Section Header */}
        <div className="space-y-3 border-b border-[#E5DFD7] pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-900 text-[10px] uppercase tracking-[0.25em] font-mono font-semibold">
            <Sparkles className="w-3 h-3 text-[#C29B38]" />
            <span>Curated Acquisition Bag</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-normal tracking-tight">
              Selected Works & Commissions
            </h1>
            <span className="text-xs font-mono text-[#867E74]">
              {totalItems} {totalItems === 1 ? 'Piece' : 'Pieces'} Cataloged
            </span>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="py-20 text-center space-y-4 rounded-[32px] bg-white border border-[#E5DFD7] p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F3] border border-[#D4A348]/30 flex items-center justify-center mx-auto text-[#C29B38]">
              <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl text-[#1A1A1A]">Your acquisition bag is empty</h3>
            <p className="text-xs text-[#867E74] max-w-sm mx-auto font-light leading-relaxed">
              Explore certified originals from our permanent exhibition or upload a reference photograph to commission a bespoke sketch.
            </p>
            <div className="pt-2 flex items-center justify-center gap-4">
              <Link
                href="/shop"
                className="px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-mono hover:bg-[#C29B38] transition-colors"
              >
                Browse Gallery Vault
              </Link>
              <Link
                href="/custom-sketch"
                className="px-6 py-3 rounded-full border border-[#E5DFD7] text-[#1A1A1A] text-xs uppercase tracking-widest font-mono hover:border-[#1A1A1A] transition-colors"
              >
                Commission Portrait
              </Link>
            </div>
          </div>
        ) : (
          /* Full Bag Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.frame}`}
                  className="p-6 rounded-[28px] bg-white border border-[#E5DFD7] shadow-xs flex flex-col sm:flex-row gap-6 relative group"
                >
                  {/* Thumbnail Preview */}
                  <div className="w-24 sm:w-28 aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>

                  {/* Metadata & Controls */}
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest font-mono text-[#C29B38]">
                            {item.category || 'Fine Art Original'}
                          </span>
                          <h3 className="font-serif text-lg text-[#1A1A1A] font-normal">
                            {item.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.frame)}
                          className="p-2 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-[#867E74] space-y-0.5 pt-1">
                        <p><span className="text-[#1A1A1A] font-medium">Presentation:</span> {item.frame}</p>
                        {item.dimensions && <p><span className="text-[#1A1A1A] font-medium">Scale:</span> {item.dimensions}</p>}
                        {item.medium && <p><span className="text-[#1A1A1A] font-medium">Medium:</span> {item.medium}</p>}
                      </div>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-[#FAF8F3]">
                        <button
                          onClick={() => updateQuantity(item.id, item.frame, -1)}
                          className="px-3 py-1.5 hover:bg-stone-200 text-stone-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-medium text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.frame, 1)}
                          className="px-3 py-1.5 hover:bg-stone-200 text-stone-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-base font-bold text-[#1A1A1A]">
                          ${item.price * item.quantity} USD
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Right: Sticky Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="p-7 rounded-[28px] bg-white border border-[#E5DFD7] shadow-[0_20px_50px_-15px_rgba(212,163,72,0.12)] space-y-5">
                <h3 className="font-serif text-xl text-[#1A1A1A] border-b border-[#E5DFD7] pb-4">
                  Summary of Acquisition
                </h3>

                <div className="space-y-2.5 text-xs text-[#686057]">
                  <div className="flex justify-between">
                    <span>Subtotal Value</span>
                    <span className="font-mono text-[#1A1A1A] font-semibold">${subtotal} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insured Worldwide Transit</span>
                    <span className="font-mono text-emerald-700 font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wax-Sealed Provenance Seal</span>
                    <span className="font-mono text-emerald-700 font-medium">Included</span>
                  </div>

                  <div className="flex justify-between text-base font-serif text-[#1A1A1A] pt-4 border-t border-stone-100">
                    <span>Total Due</span>
                    <span className="font-mono font-bold">${subtotal} USD</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-2xl bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)] flex items-center justify-center gap-2"
                >
                  <span>Proceed to Final Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="space-y-2 pt-2 border-t border-stone-100 text-[11px] text-[#867E74]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Digital proof approval guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#8C6415] shrink-0" />
                    <span>Tracked courier in bespoke reinforced case</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}