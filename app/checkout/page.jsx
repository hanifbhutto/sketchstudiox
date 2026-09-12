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
  Sparkles, 
  Building2,
  PackageCheck,
  AlertCircle
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(null);

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
    deliveryDirectives: '',
    paymentMethod: 'paypal' // 'paypal' | 'card'
  });

  // Load items from Cart / Commission Draft
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('ssx_cart_items') || '[]');
      if (storedCart.length > 0) {
        setCartItems(storedCart);
      } else {
        // Fallback default sample commission if cart opened directly
        setCartItems([
          {
            cartItemId: 'item-preview-01',
            type: 'Commission',
            id: 'SSX-CUSTOM',
            title: 'Bespoke Custom Portrait Study',
            medium: 'Raw Willow Charcoal & 8B Graphite',
            dimensions: '18 × 24 in',
            persons: 1,
            pets: 1,
            totalSubjects: 2,
            price: 500,
            frame: 'Ebony Hardwood Box Frame',
            frameExtra: 75,
            image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
            notes: 'Combine golden retriever beside subject. Retain paper white highlights.'
          }
        ]);
      }
    } catch (err) {
      console.error('Failed to load cart items', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const insuredShipping = 0; // Worldwide Complimentary Curatorial Freight
  const orderTotal = subtotal + insuredShipping;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProcessOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = `SSX-${Math.floor(1000 + Math.random() * 9000)}`;
      const firstItem = cartItems[0] || {};

      // Structure new order for Admin Orders Table Ingestion
      const newAdminOrder = {
        id: generatedOrderId,
        type: firstItem.type === 'Commission' ? 'Commission' : 'Original',
        customer: `${formData.firstName} ${formData.lastName}`.trim() || 'Valued Patron',
        email: formData.email,
        phone: formData.phone,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        itemTitle: firstItem.title || 'Studio Original Acquisition',
        size: firstItem.dimensions || '18 × 24 in',
        persons: firstItem.persons || 0,
        pets: firstItem.pets || 0,
        totalSubjects: firstItem.totalSubjects || 1,
        medium: firstItem.medium || 'Raw Willow Charcoal',
        price: orderTotal,
        framed: Boolean(firstItem.frame && firstItem.frame !== 'none'),
        status: firstItem.type === 'Commission' ? 'Phase 01: Photo Ingested' : 'Packaging & Provenance Wax Seal',
        photo: firstItem.image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        notes: firstItem.notes || formData.deliveryDirectives || 'Standard studio delivery directives.',
        tracking: ''
      };

      // Ingest order into live database / localStorage
      try {
        const currentOrders = JSON.parse(localStorage.getItem('ssx_all_orders') || '[]');
        localStorage.setItem('ssx_all_orders', JSON.stringify([newAdminOrder, ...currentOrders]));
        localStorage.removeItem('ssx_cart_items'); // clear cart
      } catch (err) {
        console.error('Storage ingestion failed', err);
      }

      setIsProcessing(false);
      setOrderCompleted({
        orderId: generatedOrderId,
        customer: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        total: orderTotal
      });
    }, 1800);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center bg-[#FAF8F5]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#8C6415]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C29B38] animate-ping" />
          <span>Securing Atelier Checkout...</span>
        </div>
      </div>
    );
  }

  // SUCCESS CONFIRMATION SCREEN
  if (orderCompleted) {
    return (
      <div className="min-h-screen pt-36 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
        <div className="max-w-xl w-full p-8 sm:p-12 rounded-[36px] bg-white border border-[#E5DFD7] shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-bold">
              Provenance Ledger Registered
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">
              Acquisition Confirmed
            </h1>
            <p className="text-xs text-[#686057] font-light max-w-md mx-auto leading-relaxed">
              Order Reference <strong className="font-mono text-[#1A1A1A]">{orderCompleted.orderId}</strong> has been logged. An official transmission was sent to <span className="font-mono text-[#1A1A1A]">{orderCompleted.email}</span>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7] text-left font-mono text-xs space-y-2">
            <div className="flex justify-between text-[#867E74]">
              <span>Settlement Total:</span>
              <span className="text-[#1A1A1A] font-bold">${orderCompleted.total} USD</span>
            </div>
            <div className="flex justify-between text-[#867E74]">
              <span>Corporate Entity:</span>
              <span className="text-[#1A1A1A]">SKETCH X STUDIO LTD</span>
            </div>
            <div className="flex justify-between text-[#867E74]">
              <span>Status:</span>
              <span className="text-emerald-700 font-bold">Phase 01 Registered</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/admin/orders"
              className="flex-1 py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors text-center font-bold"
            >
              Inspect In Admin Desk
            </Link>
            <Link
              href="/"
              className="flex-1 py-3.5 rounded-xl border border-[#E5DFD7] text-xs font-mono uppercase tracking-wider hover:bg-stone-50 transition-colors text-center"
            >
              Return to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* Ambient Lighting */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(212,163,72,0.08)_0%,transparent_70%)] pointer-events-none" />

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
            <span>256-Bit TLS Secured Settlement</span>
          </div>
        </div>

        {/* Two-Column Checkout Layout */}
        <form onSubmit={handleProcessOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: SHIPPING & BILLING DOSSIER (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Collector Contact Info */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD7] shadow-xs space-y-4">
              <h2 className="font-serif text-xl text-[#1A1A1A] flex items-center gap-2 border-b border-stone-100 pb-3">
                <span>1. Collector Identity</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-semibold">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-semibold">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vance"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#1A1A1A] block font-semibold">Transmission Email (For Digital Proofs) *</label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor.vance@example.co.uk"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#1A1A1A] block font-semibold">Courier Contact Number (SMS / WhatsApp Waybill)</label>
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

            {/* Courier Delivery Destination */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD7] shadow-xs space-y-4">
              <h2 className="font-serif text-xl text-[#1A1A1A] flex items-center gap-2 border-b border-stone-100 pb-3">
                <Truck className="w-4 h-4 text-[#C29B38]" />
                <span>2. Insured Courier Dispatch Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#1A1A1A] block font-semibold">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 14 Kensington Gardens Square"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-semibold">Town / City *</label>
                  <input
                    type="text"
                    required
                    placeholder="London"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-semibold">Postal / ZIP Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="W2 4BH"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#1A1A1A] block font-semibold">Destination Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  >
                    <option value="United Kingdom">United Kingdom (Domestic Tracked)</option>
                    <option value="United States">United States (DHL Express Insured)</option>
                    <option value="European Union">European Union (Air Express)</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Worldwide">Other International Destination</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD7] shadow-xs space-y-4">
              <h2 className="font-serif text-xl text-[#1A1A1A] flex items-center gap-2 border-b border-stone-100 pb-3">
                <CreditCard className="w-4 h-4 text-[#C29B38]" />
                <span>3. Payment Gateway Choice</span>
              </h2>

              <div className="space-y-3 font-mono text-xs">
                {/* PayPal Smart Button Option */}
                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.paymentMethod === 'paypal'
                    ? 'border-[#C29B38] bg-[#FAF8F3] ring-1 ring-[#C29B38]/30 shadow-xs'
                    : 'border-[#E5DFD7] bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={() => handleInputChange('paymentMethod', 'paypal')}
                      className="accent-[#C29B38] w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="text-[#1A1A1A] font-bold block">PayPal & Digital Wallets</span>
                      <span className="text-[10px] text-[#867E74]">PayPal Balance, Pay in 3, or Credit Card</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#003087] italic tracking-tight text-sm">PayPal</span>
                </label>

                {/* Direct Card Option */}
                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#C29B38] bg-[#FAF8F3] ring-1 ring-[#C29B38]/30 shadow-xs'
                    : 'border-[#E5DFD7] bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => handleInputChange('paymentMethod', 'card')}
                      className="accent-[#C29B38] w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="text-[#1A1A1A] font-bold block">Credit / Debit Card (Direct TLS)</span>
                      <span className="text-[10px] text-[#867E74]">Visa, Mastercard, American Express</span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-stone-600" />
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT: ACQUISITION SUMMARY (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD7] shadow-xs space-y-5 sticky top-28">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-bold block border-b border-stone-100 pb-2">
                Order Ledger Manifest
              </span>

              {/* Items List */}
              <div className="space-y-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-stone-100">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="space-y-0.5 flex-1 text-xs font-mono">
                      <span className="text-[9px] uppercase font-bold text-[#8C6415] bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#E5DFD7] inline-block mb-1">
                        {item.type === 'Commission' ? 'Custom Commission' : 'Master Original'}
                      </span>
                      <h4 className="font-serif text-sm text-[#1A1A1A] font-medium leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-[#867E74]">{item.dimensions} &bull; {item.medium}</p>
                      
                      {item.totalSubjects && (
                        <p className="text-[10px] text-[#C29B38] font-bold">
                          👤 {item.persons || 0} Person + 🐾 {item.pets || 0} Pet ({item.totalSubjects} Subjects)
                        </p>
                      )}

                      {item.frame && item.frame !== 'none' && (
                        <p className="text-[10px] text-stone-600 font-medium">
                          Mount: {item.frame} (+${item.frameExtra || 0})
                        </p>
                      )}

                      <div className="pt-1 font-bold text-[#1A1A1A]">
                        ${item.price} USD
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 pt-1 text-xs font-mono">
                <div className="flex justify-between text-[#867E74]">
                  <span>Artwork Settlement Subtotal</span>
                  <span className="text-[#1A1A1A] font-bold">${subtotal} USD</span>
                </div>
                <div className="flex justify-between text-[#867E74]">
                  <span>Insured Global Freight</span>
                  <span className="text-emerald-700 font-bold uppercase tracking-wider">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#867E74]">
                  <span>Certificate of Authenticity</span>
                  <span className="text-emerald-700 font-bold uppercase tracking-wider">Included</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="font-serif text-base text-[#1A1A1A]">Total Payable</span>
                  <div className="text-right">
                    <span className="font-serif text-3xl text-[#1A1A1A] font-bold block">
                      ${orderTotal}
                    </span>
                    <span className="text-[10px] text-[#867E74] block">Currency: USD ($)</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-[0.2em] font-bold hover:bg-[#C29B38] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    <span>Engaging Settlement...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Complete Acquisition &bull; ${orderTotal}</span>
                  </>
                )}
              </button>

              {/* Statutory Footnote */}
              <div className="pt-3 border-t border-stone-100 space-y-1.5 text-[10px] font-mono text-[#867E74]">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#C29B38]" />
                  <span>SKETCH X STUDIO LTD (UK Reg: 17429707)</span>
                </div>
                <p className="leading-relaxed text-stone-400">
                  Protected under UK consumer law. Digital proof approval required prior to irreversible packaging and dispatch.
                </p>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}