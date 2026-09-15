'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, ShieldCheck, Truck, CheckCircle2, Building2, Clock, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailPage({ params }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();

        if (res.ok) {
          setOrder(data.order);
        } else {
          setErrorMessage(data.error || 'Failed to load order ledger.');
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
        setErrorMessage('Network connection error.');
      } finally {
        setLoading(false);
      }
    }

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  // Helper function to return custom tailored messages based on order status
  const getStatusMessage = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          title: 'Acquisition Registered & Pending Verification',
          description: 'Your payment settlement has been securely logged. Studio master artisans will initiate review shortly.',
          icon: Clock,
          color: 'text-amber-700 bg-amber-50 border-amber-200'
        };
      case 'phase 01: photo ingested':
      case 'processing':
        return {
          title: 'Phase 01: Reference Material Ingested',
          description: 'Master charcoal draftsmen are currently structuring tonal values and composition guidelines.',
          icon: Sparkles,
          color: 'text-[#C29B38] bg-[#FAF8F3] border-[#C29B38]/30'
        };
      case 'packaging & provenance wax seal':
      case 'confirmed':
        return {
          title: 'Archival Packaging & Provenance Wax Seal',
          description: 'Your artwork has passed rigorous quality inspection and is sealed with our official museum-grade wax signature.',
          icon: ShieldCheck,
          color: 'text-blue-700 bg-blue-50 border-blue-200'
        };
      case 'shipped':
      case 'courier dispatched':
        return {
          title: 'Insured Global Transit Dispatched',
          description: 'Your masterpiece is securely traveling via insured curatorial freight. Tracking credentials have been transmitted.',
          icon: Truck,
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
        };
      default:
        return {
          title: `Status: ${status || 'Pending Studio Action'}`,
          description: 'Your order is moving through our exclusive atelier production and verification phases.',
          icon: Package,
          color: 'text-stone-700 bg-stone-100 border-stone-200'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-36 pb-24 flex items-center justify-center bg-[#FAF8F5]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#8C6415]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C29B38] animate-ping" />
          <span>Retrieving Provenance Record...</span>
        </div>
      </div>
    );
  }

  if (errorMessage || !order) {
    return (
      <div className="min-h-screen pt-36 pb-24 px-6 max-w-xl mx-auto text-center space-y-4 bg-[#FAF8F5]">
        <h2 className="font-serif text-2xl text-[#1A1A1A]">Order Record Not Found</h2>
        <p className="text-xs font-mono text-rose-600">{errorMessage || 'The requested order does not exist in the ledger.'}</p>
        <Link 
          href="/account/orders" 
          className="inline-block px-6 py-3 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors"
        >
          Return to Orders Ledger
        </Link>
      </div>
    );
  }

  const statusInfo = getStatusMessage(order.status);
  const StatusIcon = statusInfo.icon;

  return (
    <main className="min-h-screen pb-24 px-6 sm:px-10 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E5DFD7]">
          <Link 
            href="/account/orders" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#867E74] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C29B38]" />
            <span>Back to Orders Ledger</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-xs font-mono text-emerald-800 shadow-2xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{order.status || 'Pending'}</span>
          </div>
        </div>

        {/* 🌟 PROMINENT STATUS BANNER & USER MESSAGE */}
        <div className={`p-6 sm:p-8 rounded-[32px] border flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xs ${statusInfo.color}`}>
          <div className="w-12 h-12 rounded-2xl bg-white/80 border border-current/20 flex items-center justify-center shrink-0 shadow-xs">
            <StatusIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold block opacity-80">
              Current Studio Lifecycle State
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              {statusInfo.title}
            </h2>
            <p className="text-xs font-mono font-light leading-relaxed opacity-90 max-w-2xl">
              {statusInfo.description}
            </p>
          </div>
        </div>

        {/* 🌟 TRACKING WAYBILL HIGHLIGHT CARD (If present) */}
        {order.trackingNumber && (
          <div className="p-6 rounded-[24px] bg-[#1A1A1A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C29B38]/20 border border-[#C29B38]/40 flex items-center justify-center shrink-0 text-[#C29B38]">
                <Truck className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C29B38] font-bold block">
                  Insured Courier Waybill Registered
                </span>
                <span className="font-mono text-lg font-bold tracking-wider text-[#FAF8F5]">
                  {order.trackingNumber}
                </span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-[#9E9486] bg-white/[0.06] px-4 py-2 rounded-xl border border-white/10">
              Use this reference on the courier transit portal.
            </div>
          </div>
        )}

        {/* Order Meta Header */}
        <div className="p-8 rounded-[32px] bg-white border border-[#E5DFD7] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-100 pb-5">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C29B38] block mb-1">
                Authenticated Ledger Entry
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A]">
                Order {order.orderNumber || `#${order.id}`}
              </h1>
            </div>
            <div className="text-right font-mono text-xs text-[#867E74]">
              <p>Acquisition Date:</p>
              <p className="text-[#1A1A1A] font-bold">
                {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7]">
              <span className="text-[#C29B38] font-bold uppercase block">Dispatch Destination</span>
              <p className="text-[#1A1A1A] font-bold">{order.name}</p>
              <p className="text-[#867E74]">{order.address}, {order.city}</p>
              <p className="text-[#867E74]">{order.postalCode}, {order.country}</p>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7]">
              <span className="text-[#C29B38] font-bold uppercase block">Transmission Contact</span>
              <p className="text-[#1A1A1A] font-bold">{order.email}</p>
              <p className="text-[#867E74]">Corporate Entity: SKETCH X STUDIO LTD</p>
              <p className="text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit TLS Secured Settlement
              </p>
            </div>
          </div>
        </div>

        {/* Ordered Items Manifest */}
        <div className="p-8 rounded-[32px] bg-white border border-[#E5DFD7] shadow-xs space-y-6">
          <h2 className="font-serif text-xl text-[#1A1A1A] border-b border-stone-100 pb-3">
            Acquired Masterpieces Manifest
          </h2>

          <div className="space-y-4">
            {order.items?.map((item, idx) => {
              const art = item.artwork || {};
              const imageUrl = art.media?.secureUrl || art.image || '';
              const title = item.title || art.title || 'Master Original';

              return (
                <div key={idx} className="flex gap-4 items-center pb-4 border-b border-stone-100 last:border-none">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 relative flex items-center justify-center">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 items-center justify-center text-[9px] font-mono text-stone-400 bg-stone-100 text-center px-1 ${imageUrl ? 'hidden' : 'flex'}`}>
                      No Image
                    </div>
                  </div>

                  <div className="flex-1 space-y-1 font-mono text-xs">
                    <h4 className="font-serif text-sm text-[#1A1A1A] font-medium leading-snug">{title}</h4>
                    <p className="text-[11px] text-[#867E74]">{item.medium || art.medium} &bull; {item.dimensions || art.dimensions}</p>
                    <p className="text-[10px] text-stone-500">Mount & Framing: {item.frame}</p>
                  </div>

                  <div className="text-right font-mono text-sm font-bold text-[#1A1A1A]">
                    ${item.price.toFixed(2)} USD
                  </div>
                </div>
              );
            })}
          </div>

          {/* Settlement Summary */}
          <div className="pt-4 border-t border-stone-200 flex justify-between items-baseline font-mono text-xs">
            <span className="text-[#867E74] uppercase tracking-wider">Total Settlement Paid</span>
            <span className="font-serif text-2xl font-bold text-[#1A1A1A]">${order.totalAmount.toFixed(2)} USD</span>
          </div>
        </div>

      </div>
    </main>
  );
}