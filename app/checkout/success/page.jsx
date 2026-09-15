'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight, Loader2, ShieldCheck, Sparkles } from 'lucide-react';

// Inner component using useSearchParams
function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || searchParams.get('session_id');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    async function fetchOrderDetails() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (data && !data.error) {
          setOrder(data);
        }
      } catch (err) {
        console.error('Failed to fetch order details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
      
      {/* Studio Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full mx-auto relative z-10 text-center space-y-8">
        
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 text-[#e4c577] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold">
            <Sparkles className="w-3 h-3 text-[#e4c577]" />
            <span>Secure Acquisition Confirmed</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-normal" style={{ fontFamily: 'Georgia, serif' }}>
            Thank you for your patronage.
          </h1>

          <p className="text-xs sm:text-sm text-[#A8A196] font-light max-w-md mx-auto leading-relaxed">
            Your acquisition has been officially registered in our studio ledger. An archival Certificate of Authenticity will accompany your shipment.
          </p>
        </div>

        {loading ? (
          <div className="py-8 flex items-center justify-center gap-2 text-xs font-mono text-[#A8A196]">
            <Loader2 className="w-5 h-5 animate-spin text-[#e4c577]" />
            <span>Retrieving atelier order archive...</span>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-[28px] bg-[#171513] border border-white/10 text-left space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8A196]">Order Reference</span>
              <span className="font-mono text-xs font-bold text-[#FAF8F5]">
                {order?.orderNumber || orderId || 'SSX-ATELIER-889'}
              </span>
            </div>

            <div className="space-y-2 text-xs text-[#A8A196] font-light">
              <div className="flex justify-between">
                <span>Fulfillment Status:</span>
                <span className="font-mono font-medium text-emerald-400">Studio Preparation</span>
              </div>
              <div className="flex justify-between">
                <span>Courier Service:</span>
                <span className="font-mono font-medium text-[#FAF8F5]">Insured Worldwide Express</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all shadow-lg cursor-pointer"
          >
            <span>Return to Exhibition</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0A0908]" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/5 text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#e4c577] hover:bg-white/10 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#e4c577]" />
            <span>Client Concierge Desk</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

// Default export wrapped in Suspense to satisfy Next.js build requirements
export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-40 flex items-center justify-center gap-3 text-xs font-mono text-[#A8A196] bg-[#0A0908]">
        <Loader2 className="w-6 h-6 animate-spin text-[#e4c577]" />
        <span>Loading secure checkout confirmation...</span>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}