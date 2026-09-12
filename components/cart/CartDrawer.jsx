'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[99998]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF8F5] border-l border-[#E5DFD7] shadow-2xl z-[99999] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E5DFD7] flex items-center justify-between bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#C29B38]" />
                <h3 className="font-serif text-lg text-[#1A1A1A] font-normal">
                  Acquisition Bag
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#FAF8F3] border border-[#D4A348]/30 text-[#8C6415]">
                  {totalItems}
                </span>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F3] border border-[#E5DFD7] flex items-center justify-center text-[#867E74]">
                    <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif text-lg text-[#1A1A1A]">Your bag is empty</h4>
                  <p className="text-xs text-[#867E74] max-w-xs font-light">
                    Explore our permanent exhibition archive or commission a bespoke personal sketch.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 text-xs uppercase tracking-widest font-mono text-[#C29B38] hover:text-[#1A1A1A] transition-colors"
                  >
                    Continue Browsing &rarr;
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.frame}`}
                    className="p-4 rounded-2xl bg-white border border-[#E5DFD7] shadow-2xs flex gap-4 relative group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale contrast-125"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm text-[#1A1A1A] font-normal leading-snug">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id, item.frame)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase font-mono text-[#867E74] mt-0.5">
                          {item.frame ? `Frame: ${item.frame}` : 'Unframed Sheet'}
                        </p>
                        {item.dimensions && (
                          <p className="text-[10px] font-mono text-[#A8A196]">
                            {item.dimensions}
                          </p>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.frame, -1)}
                            className="px-2 py-1 hover:bg-stone-100 text-stone-600 transition-colors"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="px-2 text-xs font-mono text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.frame, 1)}
                            className="px-2 py-1 hover:bg-stone-100 text-stone-600 transition-colors"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-bold text-[#1A1A1A]">
                          ${item.price * item.quantity} USD
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-[#E5DFD7] space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#867E74] font-light">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#1A1A1A] font-semibold">${subtotal} USD</span>
                  </div>
                  <div className="flex justify-between text-[#867E74] font-light">
                    <span>Insured Courier Transit</span>
                    <span className="font-mono text-emerald-700">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-base font-serif text-[#1A1A1A] pt-2 border-t border-stone-100">
                    <span>Total Acquisition</span>
                    <span className="font-mono font-bold">${subtotal} USD</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-4 rounded-2xl bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)] flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Final Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#867E74] font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Wax-Sealed Provenance Guarantee Included</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}