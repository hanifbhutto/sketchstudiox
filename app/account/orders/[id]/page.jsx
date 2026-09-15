'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, ShieldCheck, Truck, CheckCircle2, Building2, Clock, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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

  const getStatusMessage = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          title: 'Acquisition Registered & Pending Verification',
          description: 'Your payment settlement has been securely logged. Studio master artisans will initiate review shortly.',
          icon: Clock,
          color: 'text-amber-300 bg-amber-500/10 border-amber-400/30'
        };
      case 'phase 01: photo ingested':
      case 'processing':
        return {
          title: 'Phase 01: Reference Material Ingested',
          description: 'Master charcoal draftsmen are currently structuring tonal values and composition guidelines.',
          icon: Sparkles,
          color: 'text-[#e4c577] bg-[#e4c577]/10 border-[#e4c577]/30'
        };
      case 'packaging & provenance wax seal':
      case 'confirmed':
        return {
          title: 'Archival Packaging & Provenance Wax Seal',
          description: 'Your artwork has passed rigorous quality inspection and is sealed with our official museum-grade wax signature.',
          icon: ShieldCheck,
          color: 'text-blue-300 bg-blue-500/10 border-blue-400/30'
        };
      case 'shipped':
      case 'courier dispatched':
        return {
          title: 'Insured Global Transit Dispatched',
          description: 'Your masterpiece is securely traveling via insured curatorial freight. Tracking credentials have been transmitted.',
          icon: Truck,
          color: 'text-emerald-300 bg-emerald-500/10 border-emerald-400/30'
        };
      default:
        return {
          title: `Status: ${status || 'Pending Studio Action'}`,
          description: 'Your order is moving through our exclusive atelier production and verification phases.',
          icon: Package,
          color: 'text-[#A8A196] bg-white/5 border-white/10'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-36 pb-24 flex items-center justify-center bg-[#0A0908] text-[#FAF8F5]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#e4c577]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e4c577] animate-ping" />
          <span>Retrieving Provenance Record...</span>
        </div>
      </div>
    );
  }

  if (errorMessage || !order) {
    return (
      <div className="min-h-screen pt-36 pb-24 px-6 max-w-xl mx-auto text-center space-y-4 bg-[#0A0908] text-[#FAF8F5]">
        <h2 className="font-serif text-2xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Order Record Not Found</h2>
        <p className="text-xs font-mono text-rose-400">{errorMessage || 'The requested order does not exist in the ledger.'}</p>
        <Link 
          href="/account/orders" 
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-all font-semibold"
        >
          Return to Orders Ledger
        </Link>
      </div>
    );
  }

  const statusInfo = getStatusMessage(order.status);
  const StatusIcon = statusInfo.icon;

  return (
    <main className="min-h-screen pb-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Studio Ambient Glows */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link 
            href="/account/orders" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#A8A196] hover:text-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#e4c577]" />
            <span>Back to Orders Ledger</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/20 text-xs font-mono text-emerald-300 shadow-2xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{order.status || 'Pending'}</span>
          </div>
        </div>

        {/* STATUS BANNER & USER MESSAGE */}
        <div className={`p-6 sm:p-8 rounded-[32px] border flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xl ${statusInfo.color}`}>
          <div className="w-12 h-12 rounded-2xl bg-black/40 border border-current/20 flex items-center justify-center shrink-0 shadow-xs">
            <StatusIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold block opacity-80">
              Current Studio Lifecycle State
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              {statusInfo.title}
            </h2>
            <p className="text-xs font-mono font-light leading-relaxed opacity-90 max-w-2xl">
              {statusInfo.description}
            </p>
          </div>
        </div>

        {/* TRACKING WAYBILL HIGHLIGHT CARD (If present) */}
        {order.trackingNumber && (
          <div className="p-6 rounded-[24px] bg-[#171513] border border-white/10 text-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#e4c577]/20 border border-[#e4c577]/40 flex items-center justify-center shrink-0 text-[#e4c577]">
                <Truck className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#e4c577] font-bold block">
                  Insured Courier Waybill Registered
                </span>
                <span className="font-mono text-lg font-bold tracking-wider text-[#FAF8F5]">
                  {order.trackingNumber}
                </span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-[#A8A196] bg-black/50 px-4 py-2 rounded-xl border border-white/10">
              Use this reference on the courier transit portal.
            </div>
          </div>
        )}

        {/* Order Meta Header */}
        <div className="p-8 rounded-[32px] bg-[#171513] border border-white/10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#e4c577] block mb-1">
                Authenticated Ledger Entry
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
                Order {order.orderNumber || `#${order.id}`}
              </h1>
            </div>
            <div className="text-right font-mono text-xs text-[#A8A196]">
              <p>Acquisition Date:</p>
              <p className="text-[#FAF8F5] font-bold">
                {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="space-y-1.5 p-4 rounded-2xl bg-black/40 border border-white/10">
              <span className="text-[#e4c577] font-bold uppercase block">Dispatch Destination</span>
              <p className="text-[#FAF8F5] font-bold">{order.name}</p>
              <p className="text-[#A8A196]">{order.address}, {order.city}</p>
              <p className="text-[#A8A196]">{order.postalCode}, {order.country}</p>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-black/40 border border-white/10">
              <span className="text-[#e4c577] font-bold uppercase block">Transmission Contact</span>
              <p className="text-[#FAF8F5] font-bold">{order.email}</p>
              <p className="text-[#A8A196]">Corporate Entity: SKETCH X STUDIO LTD</p>
              <p className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit TLS Secured Settlement
              </p>
            </div>
          </div>
        </div>

        {/* Ordered Items Manifest */}
        <div className="p-8 rounded-[32px] bg-[#171513] border border-white/10 shadow-xl space-y-6">
          <h2 className="font-serif text-xl text-[#FAF8F5] border-b border-white/10 pb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Acquired Masterpieces Manifest
          </h2>

          <div className="space-y-4">
            {order.items?.map((item, idx) => {
              const art = item.artwork || {};
              const imageUrl = art.media?.secureUrl || art.image || '';
              const title = item.title || art.title || 'Master Original';

              return (
                <div key={idx} className="flex gap-4 items-center pb-4 border-b border-white/10 last:border-none">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-900 border border-white/10 shrink-0 relative flex items-center justify-center">
                    {imageUrl ? (
                      <Image 
                        src={imageUrl} 
                        alt={title} 
                        fill
                        sizes="100px"
                        className="object-cover contrast-110" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-stone-500 bg-stone-900 text-center px-1">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-1 font-mono text-xs">
                    <h4 className="font-serif text-sm text-[#FAF8F5] font-medium leading-snug" style={{ fontFamily: 'Georgia, serif' }}>{title}</h4>
                    <p className="text-[11px] text-[#A8A196]">{item.medium || art.medium} &bull; {item.dimensions || art.dimensions}</p>
                    <p className="text-[10px] text-stone-400">Mount & Framing: {item.frame}</p>
                  </div>

                  <div className="text-right font-mono text-sm font-bold text-[#e4c577]">
                    ${item.price.toFixed(2)} USD
                  </div>
                </div>
              );
            })}
          </div>

          {/* Settlement Summary */}
          <div className="pt-4 border-t border-white/10 flex justify-between items-baseline font-mono text-xs">
            <span className="text-[#A8A196] uppercase tracking-wider">Total Settlement Paid</span>
            <span className="font-serif text-2xl font-bold text-[#e4c577]" style={{ fontFamily: 'Georgia, serif' }}>${order.totalAmount.toFixed(2)} USD</span>
          </div>
        </div>

      </div>
    </main>
  );
}