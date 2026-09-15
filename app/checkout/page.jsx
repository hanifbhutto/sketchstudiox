'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
      // Save temporary details in localStorage before redirecting to PayPal
      localStorage.setItem('pending_shipping', JSON.stringify(formData));
      localStorage.setItem('pending_cart', JSON.stringify(cartItems));

      // Simulate official PayPal sandbox redirect flow returning a success token
      // In full production, this points to PayPal's API approval URL.
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
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E5DFD7]">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#867E74] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C29B38]" />
            <span>Return to Gallery</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>PayPal Secure Gateway Redirect</span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handlePayPalRedirect} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: FORM (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Identity */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD7] shadow-xs space-y-4">
              <h2 className="font-serif text-xl text-[#1A1A1A] border-b border-stone-100 pb-3">
                1. Collector Identity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                
                {/* First Name */}
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-semibold">First Name *</label>
                  <input
                    type="text"
                    placeholder="Eleanor"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border outline-none transition-colors ${
                      touched.firstName && !isFirstNameValid ? 'border-rose-400' : 'border-[#E5DFD7] focus:border-[#C29B38]'
                    }`}
                  />
                  {touched.firstName && !isFirstNameValid && (
                    <p className="text-[10px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Min 2 characters required.
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-semibold">Last Name *</label>
                  <input
                    type="text"
                    placeholder="Vance"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border outline-none transition-colors ${
                      touched.lastName && !isLastNameValid ? 'border-rose-400' : 'border-[#E5DFD7] focus:border-[#C29B38]'
                    }`}
                  />
                  {touched.lastName && !isLastNameValid && (
                    <p className="text-[10px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Min 2 characters required.
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#1A1A1A] block font-semibold">Transmission Email *</label>
                  <input
                    type="email"
                    placeholder="collector@domain.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border outline-none transition-colors ${
                      touched.email && !isEmailValid ? 'border-rose-400' : 'border-[#E5DFD7] focus:border-[#C29B38]'
                    }`}
                  />
                  {touched.email && !isEmailValid && (
                    <p className="text-[10px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Please enter a valid email address.
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#1A1A1A] block font-semibold">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+44 7911 123456"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD7] shadow-xs space-y-4">
              <h2 className="font-serif text-xl text-[#1A1A1A] flex items-center gap-2 border-b border-stone-100 pb-3">
                <Truck className="w-4 h-4 text-[#C29B38]" />
                <span>2. Insured Courier Dispatch Address</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                
                {/* Street Address */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#1A1A1A] block font-semibold">Street Address *</label>
                  <input
                    type="text"
                    placeholder="14 Kensington Gardens"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    onBlur={() => handleBlur('address')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border outline-none transition-colors ${
                      touched.address && !isAddressValid ? 'border-rose-400' : 'border-[#E5DFD7] focus:border-[#C29B38]'
                    }`}
                  />
                  {touched.address && !isAddressValid && (
                    <p className="text-[10px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Please provide a valid street address.
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-semibold">Town / City *</label>
                  <input
                    type="text"
                    placeholder="London"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    onBlur={() => handleBlur('city')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border outline-none transition-colors ${
                      touched.city && !isCityValid ? 'border-rose-400' : 'border-[#E5DFD7] focus:border-[#C29B38]'
                    }`}
                  />
                  {touched.city && !isCityValid && (
                    <p className="text-[10px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> City is required.
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-semibold">Postal Code *</label>
                  <input
                    type="text"
                    placeholder="W2 4BH"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    onBlur={() => handleBlur('postalCode')}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border outline-none transition-colors ${
                      touched.postalCode && !isPostalValid ? 'border-rose-400' : 'border-[#E5DFD7] focus:border-[#C29B38]'
                    }`}
                  />
                  {touched.postalCode && !isPostalValid && (
                    <p className="text-[10px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Valid postal code required.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Choice */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD7] shadow-xs space-y-4">
              <h2 className="font-serif text-xl text-[#1A1A1A] flex items-center gap-2 border-b border-stone-100 pb-3">
                <CreditCard className="w-4 h-4 text-[#C29B38]" />
                <span>3. Payment Gateway Choice</span>
              </h2>
              <div className="space-y-3 font-mono text-xs">
                <label className="p-4 rounded-2xl border border-[#C29B38] bg-[#FAF8F3] flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" defaultChecked className="accent-[#C29B38]" />
                    <span className="text-[#1A1A1A] font-bold">PayPal Secure Standard Checkout</span>
                  </div>
                  <CreditCard className="w-5 h-5 text-stone-600" />
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT: SUMMARY (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD7] shadow-xs space-y-5 sticky top-28">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-bold block border-b border-stone-100 pb-2">
                Order Ledger Manifest
              </span>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cartItems.length === 0 ? (
                  <p className="text-xs text-[#867E74] font-mono">No items in acquisition bag.</p>
                ) : (
                  cartItems.map((item, idx) => {
                    const art = item.artwork || {};
                    const imageUrl = art.media?.secureUrl || art.image || '';
                    const title = art.title || item.title || 'Master Original';
                    const price = art.price || item.price || 0;

                    return (
                      <div key={idx} className="flex gap-4 items-start pb-4 border-b border-stone-100">
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 relative flex items-center justify-center">
                          {imageUrl ? (
                            <img 
                              src={imageUrl} 
                              alt={title} 
                              className="w-full h-full object-cover" 
                            />
                          ) : null}
                        </div>

                        <div className="space-y-0.5 flex-1 text-xs font-mono">
                          <h4 className="font-serif text-sm text-[#1A1A1A] font-medium leading-snug">{title}</h4>
                          <p className="text-[11px] text-[#867E74]">{item.frame || 'Standard Presentation'}</p>
                          <div className="pt-1 font-bold text-[#1A1A1A]">${price.toFixed(2)} USD</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="space-y-2 pt-1 text-xs font-mono">
                <div className="flex justify-between text-[#867E74]">
                  <span>Subtotal</span>
                  <span className="text-[#1A1A1A] font-bold">${subtotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-[#867E74]">
                  <span>Global Freight</span>
                  <span className="text-emerald-700 font-bold uppercase">Complimentary</span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="font-serif text-base text-[#1A1A1A]">Total Payable</span>
                  <span className="font-serif text-2xl text-[#1A1A1A] font-bold">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {!isFormValid && (
                <p className="text-[10px] text-amber-700 font-mono text-center">
                  * Please complete all required billing fields correctly to unlock PayPal redirect.
                </p>
              )}

              <button
                type="submit"
                disabled={isProcessing || !isFormValid || cartItems.length === 0}
                className={`w-full py-4 rounded-2xl text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  !isFormValid || cartItems.length === 0
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-[#1A1A1A] text-white hover:bg-[#C29B38]'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Redirecting to PayPal...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
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