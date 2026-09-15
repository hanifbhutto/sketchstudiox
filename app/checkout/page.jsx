'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CreditCard, 
  ArrowLeft, 
  CheckCircle2, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal } = useCart();

  // Authentication & Access Guard
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const patronEmail = localStorage.getItem('patronEmail');

    if (!userId && !patronEmail) {
      router.replace('/login');
    }
  }, [router]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    paymentMethod: 'paypal'
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    address: false,
    city: false,
    postalCode: false,
  });

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Live Validation Checks
  const isFirstNameValid = formData.firstName.trim().length >= 2;
  const isLastNameValid = formData.lastName.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isAddressValid = formData.address.trim().length >= 5;
  const isCityValid = formData.city.trim().length >= 2;
  const isPostalValid = formData.postalCode.trim().length >= 3;

  const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid && isAddressValid && isCityValid && isPostalValid;

  const insuredShipping = 0; // Complimentary
  const orderTotal = subtotal + insuredShipping;

  // Handle Redirect to PayPal & Save Pending State
  const handlePayPalRedirect = (e) => {
    e.preventDefault();
    if (!isFormValid || cartItems.length === 0) return;

    setIsProcessing(true);
    setErrorMessage('');

    try {
      localStorage.setItem('pending_shipping', JSON.stringify(formData));
      localStorage.setItem('pending_cart', JSON.stringify(cartItems));

      setTimeout(() => {
        const mockPayPalToken = 'PAYPAL-TOKEN-' + Date.now();
        router.push(`/checkout/success?token=${mockPayPalToken}`);
      }, 1200);

    } catch (err) {
      console.error('PayPal redirect error:', err);
      setErrorMessage('Failed to initiate PayPal gateway. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Studio Ambient Glows */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#A8A196] hover:text-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#e4c577]" />
            <span>Return to Gallery</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-500/20 px-3.5 py-1.5 rounded-full border border-emerald-400/40">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>PayPal Secure Gateway Redirect</span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handlePayPalRedirect} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: FORM (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Identity */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#171513] border border-white/10 shadow-xl space-y-4">
              <h2 className="font-serif text-xl text-[#FAF8F5] border-b border-white/10 pb-3" style={{ fontFamily: 'Georgia, serif' }}>
                1. Collector Identity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                
                {/* First Name */}
                <div className="space-y-1.5">
                  <label className="text-[#FAF8F5] block font-semibold">First Name *</label>
                  <input
                    type="text"
                    placeholder="Eleanor"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/50 border outline-none transition-colors text-[#FAF8F5] placeholder:text-white/30 ${
                      touched.firstName && !isFirstNameValid ? 'border-rose-400' : 'border-white/10 focus:border-[#e4c577]'
                    }`}
                  />
                  {touched.firstName && !isFirstNameValid && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Min 2 characters required.
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <label className="text-[#FAF8F5] block font-semibold">Last Name *</label>
                  <input
                    type="text"
                    placeholder="Vance"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/50 border outline-none transition-colors text-[#FAF8F5] placeholder:text-white/30 ${
                      touched.lastName && !isLastNameValid ? 'border-rose-400' : 'border-white/10 focus:border-[#e4c577]'
                    }`}
                  />
                  {touched.lastName && !isLastNameValid && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Min 2 characters required.
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#FAF8F5] block font-semibold">Transmission Email *</label>
                  <input
                    type="email"
                    placeholder="collector@domain.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/50 border outline-none transition-colors text-[#FAF8F5] placeholder:text-white/30 ${
                      touched.email && !isEmailValid ? 'border-rose-400' : 'border-white/10 focus:border-[#e4c577]'
                    }`}
                  />
                  {touched.email && !isEmailValid && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Please enter a valid email address.
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#FAF8F5] block font-semibold">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+44 7911 123456"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5] placeholder:text-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#171513] border border-white/10 shadow-xl space-y-4">
              <h2 className="font-serif text-xl text-[#FAF8F5] flex items-center gap-2 border-b border-white/10 pb-3" style={{ fontFamily: 'Georgia, serif' }}>
                <Truck className="w-4 h-4 text-[#e4c577]" />
                <span>2. Insured Courier Dispatch Address</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                
                {/* Street Address */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#FAF8F5] block font-semibold">Street Address *</label>
                  <input
                    type="text"
                    placeholder="14 Kensington Gardens"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    onBlur={() => handleBlur('address')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/50 border outline-none transition-colors text-[#FAF8F5] placeholder:text-white/30 ${
                      touched.address && !isAddressValid ? 'border-rose-400' : 'border-white/10 focus:border-[#e4c577]'
                    }`}
                  />
                  {touched.address && !isAddressValid && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Please provide a valid street address.
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-[#FAF8F5] block font-semibold">Town / City *</label>
                  <input
                    type="text"
                    placeholder="London"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    onBlur={() => handleBlur('city')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/50 border outline-none transition-colors text-[#FAF8F5] placeholder:text-white/30 ${
                      touched.city && !isCityValid ? 'border-rose-400' : 'border-white/10 focus:border-[#e4c577]'
                    }`}
                  />
                  {touched.city && !isCityValid && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> City is required.
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="space-y-1.5">
                  <label className="text-[#FAF8F5] block font-semibold">Postal Code *</label>
                  <input
                    type="text"
                    placeholder="W2 4BH"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    onBlur={() => handleBlur('postalCode')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/50 border outline-none transition-colors text-[#FAF8F5] placeholder:text-white/30 ${
                      touched.postalCode && !isPostalValid ? 'border-rose-400' : 'border-white/10 focus:border-[#e4c577]'
                    }`}
                  />
                  {touched.postalCode && !isPostalValid && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Valid postal code required.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Choice */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#171513] border border-white/10 shadow-xl space-y-4">
              <h2 className="font-serif text-xl text-[#FAF8F5] flex items-center gap-2 border-b border-white/10 pb-3" style={{ fontFamily: 'Georgia, serif' }}>
                <CreditCard className="w-4 h-4 text-[#e4c577]" />
                <span>3. Payment Gateway Choice</span>
              </h2>
              <div className="space-y-3 font-mono text-xs">
                <label className="p-4 rounded-2xl border border-[#e4c577] bg-[#e4c577]/10 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" defaultChecked className="accent-[#e4c577]" />
                    <span className="text-[#FAF8F5] font-bold">PayPal Secure Standard Checkout</span>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#e4c577]" />
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT: SUMMARY (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#171513] border border-white/10 shadow-xl space-y-5 sticky top-28">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e4c577] font-bold block border-b border-white/10 pb-2">
                Order Ledger Manifest
              </span>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {cartItems.length === 0 ? (
                  <p className="text-xs text-[#A8A196] font-mono">No items in acquisition bag.</p>
                ) : (
                  cartItems.map((item, idx) => {
                    const art = item.artwork || {};
                    const imageUrl = art.media?.secureUrl || art.image || '';
                    const title = art.title || item.title || 'Master Original';
                    const price = art.price || item.price || 0;

                    return (
                      <div key={idx} className="flex gap-4 items-start pb-4 border-b border-white/10">
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-900 border border-white/10 shrink-0 relative flex items-center justify-center">
                          {imageUrl ? (
                            <Image 
                              src={imageUrl} 
                              alt={title} 
                              fill
                              sizes="100px"
                              className="object-cover contrast-110" 
                            />
                          ) : null}
                        </div>

                        <div className="space-y-0.5 flex-1 text-xs font-mono">
                          <h4 className="font-serif text-sm text-[#FAF8F5] font-medium leading-snug" style={{ fontFamily: 'Georgia, serif' }}>{title}</h4>
                          <p className="text-[11px] text-[#A8A196]">{item.frame || 'Standard Presentation'}</p>
                          <div className="pt-1 font-bold text-[#e4c577]">${price.toFixed(2)} USD</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="space-y-2 pt-1 text-xs font-mono">
                <div className="flex justify-between text-[#A8A196]">
                  <span>Subtotal</span>
                  <span className="text-[#FAF8F5] font-bold">${subtotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-[#A8A196]">
                  <span>Global Freight</span>
                  <span className="text-emerald-400 font-bold uppercase">Complimentary</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-serif text-base text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Total Payable</span>
                  <span className="font-serif text-2xl text-[#e4c577] font-bold" style={{ fontFamily: 'Georgia, serif' }}>${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {!isFormValid && (
                <p className="text-[10px] text-amber-300 font-mono text-center">
                  * Please complete all required billing fields correctly to unlock PayPal redirect.
                </p>
              )}

              <button
                type="submit"
                disabled={isProcessing || !isFormValid || cartItems.length === 0}
                className={`w-full py-4 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                  !isFormValid || cartItems.length === 0
                    ? 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10'
                    : 'bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] hover:brightness-110'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A0908]" />
                    <span>Redirecting to PayPal...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#0A0908]" />
                    <span>Proceed to PayPal &bull; ${orderTotal.toFixed(2)}</span>
                  </>
                )}
              </button>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
}