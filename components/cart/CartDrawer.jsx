'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartDrawer() {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const router = useRouter();

  // Track which item is currently being deleted
  const [deletingId, setDeletingId] = useState(null);

  // Calculate subtotal safely checking item.artwork relationship
  const subtotal = Array.isArray(cartItems) 
    ? cartItems?.reduce((acc, item) => {
        const price = item.artwork?.price || item.price || 0;
        return acc + Number(price) * (item.quantity || 1);
      }, 0)
    : 0;

  const handleDeleteItem = async (itemId) => {
    setDeletingId(itemId);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      await removeFromCart(itemId);
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCheckout = () => {
    const userId = localStorage.getItem('userId');
    const patronEmail = localStorage.getItem('patronEmail');
    const activeCartId = localStorage.getItem('active_cart_id');

    setIsCartOpen(false);

    if (!userId && !patronEmail && !activeCartId) {
      router.push('/login');
    } else {
      router.push('/checkout');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#0A0908] text-[#FAF8F5] shadow-2xl border-l border-white/10 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#171513]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#e4c577]" />
                  <h2 className="font-serif text-xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Acquisition Bag</h2>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/50 border border-white/10 text-[#e4c577]">
                    {(cartItems || []).length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full text-[#A8A196] hover:text-[#FAF8F5] hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {cartItems?.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[#A8A196]">
                    <Sparkles className="w-10 h-10 text-[#e4c577]/50" />
                    <p className="font-serif text-lg text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Your bag is currently empty.</p>
                    <p className="text-xs">Explore the gallery archive to acquire an original masterpiece.</p>
                  </div>
                ) : (
                  cartItems?.map((item) => {
                    const art = item.artwork || {};
                    const isDeleting = deletingId === item.id;
                    
                    const imageUrl = 
                      art.media?.secureUrl || 
                      art.image || 
                      art.imageUrl || 
                      art.url || 
                      (typeof art.media === 'string' ? art.media : '') ||
                      item.image || 
                      '';

                    const title = art.title || item.title || 'Untitled Masterpiece';
                    const medium = art.medium || item.medium || 'Original Medium';
                    const dimensions = art.dimensions || item.dimensions || '';
                    const price = art.price ?? item.price ?? 0;

                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-[#171513] border border-white/10 flex gap-4 shadow-md relative group"
                      >
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-white/10 relative">
                          {imageUrl ? (
                            <Image src={imageUrl} alt={title} fill sizes="100px" className="object-cover contrast-125" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-stone-500">
                              No Img
                            </div>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase font-mono tracking-widest text-[#e4c577] block">
                              Gallery Original
                            </span>
                            <h4 className="font-serif text-sm text-[#FAF8F5] line-clamp-1" style={{ fontFamily: 'Georgia, serif' }}>{title}</h4>
                            <p className="text-[11px] text-[#A8A196] font-light">
                              {medium} {dimensions ? `• ${dimensions}` : ''}
                            </p>
                            {item.frame && (
                              <p className="text-[10px] font-mono text-[#e4c577]/80">{item.frame}</p>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-white/10">
                            <span className="font-serif text-sm text-[#e4c577] font-medium">
                              ${typeof price === 'number' ? price.toFixed(2) : Number(price || 0).toFixed(2)}
                            </span>
                            <button
                              type="button"
                              disabled={isDeleting}
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-[#A8A196] hover:text-rose-400 transition-colors p-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[28px] min-h-[28px]"
                              title="Remove item"
                            >
                              {isDeleting ? (
                                <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cartItems?.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#171513] space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-[#A8A196]">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#FAF8F5]">${subtotal.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-[#A8A196]">
                      <span>Insured Courier Shipping</span>
                      <span className="font-mono text-emerald-400">Complimentary</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-medium text-[#FAF8F5]">
                      <span>Total Acquisition Value</span>
                      <span className="font-serif text-lg text-[#e4c577]" style={{ fontFamily: 'Georgia, serif' }}>${subtotal.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4 text-[#0A0908]" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#A8A196]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Encrypted & Protected Gallery Transaction</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}