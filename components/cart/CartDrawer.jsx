'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const router = useRouter();

  // Calculate subtotal safely checking item.artwork relationship
  const subtotal = Array.isArray(cartItems) 
    ? cartItems?.reduce((acc, item) => {
        const price = item.artwork?.price || 0;
        return acc + price * (item.quantity || 1);
      }, 0)
    : 0;

  const handleCheckout = () => {
    const userId = localStorage.getItem('userId');
    const patronEmail = localStorage.getItem('patronEmail');
    const activeCartId = localStorage.getItem('active_cart_id');

    setIsCartOpen(false);

    // Agar user logged in nahi hai aur na hi active cart session hai, toh login page par bhejein
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
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl border-l border-[#E5DFD7] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E5DFD7] flex items-center justify-between bg-white">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#C29B38]" />
                  <h2 className="font-serif text-xl text-[#1A1A1A]">Acquisition Bag</h2>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FAF8F3] border border-[#E5DFD7] text-[#C29B38]">
  {(cartItems || []).length}
</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full text-[#867E74] hover:text-[#1A1A1A] hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems?.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[#867E74]">
                    <Sparkles className="w-10 h-10 text-[#C29B38]/50" />
                    <p className="font-serif text-lg text-[#1A1A1A]">Your bag is currently empty.</p>
                    <p className="text-xs">Explore the gallery archive to acquire an original masterpiece.</p>
                  </div>
                ) : (
                 cartItems?.map((item) => {
  const art = item.artwork || {};
  
  // Robust fallback to catch image from any possible property name
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
      className="p-4 rounded-2xl bg-white border border-[#E5DFD7] flex gap-4 shadow-2xs relative group"
    >
      <div className="w-20 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover contrast-125" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-stone-400">
            No Img
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <span className="text-[9px] uppercase font-mono tracking-widest text-[#C29B38] block">
            Gallery Original
          </span>
          <h4 className="font-serif text-sm text-[#1A1A1A] line-clamp-1">{title}</h4>
          <p className="text-[11px] text-[#867E74] font-light">
            {medium} {dimensions ? `• ${dimensions}` : ''}
          </p>
          {item.frame && (
            <p className="text-[10px] font-mono text-stone-500">{item.frame}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <span className="font-serif text-sm text-[#1A1A1A] font-medium">
            ${typeof price === 'number' ? price.toFixed(2) : Number(price || 0).toFixed(2)}
          </span>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="text-[#867E74] hover:text-rose-600 transition-colors p-1 cursor-pointer"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
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
                <div className="p-6 border-t border-[#E5DFD7] bg-white space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-[#867E74]">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#1A1A1A]">${subtotal.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-[#867E74]">
                      <span>Insured Courier Shipping</span>
                      <span className="font-mono text-emerald-700">Complimentary</span>
                    </div>
                    <div className="pt-2 border-t border-[#E5DFD7] flex justify-between text-sm font-medium text-[#1A1A1A]">
                      <span>Total Acquisition Value</span>
                      <span className="font-serif text-lg">${subtotal.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full py-4 rounded-2xl bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#867E74]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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