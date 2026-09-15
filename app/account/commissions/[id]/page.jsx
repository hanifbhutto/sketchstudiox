'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Package, 
  Palette,
  FileText,
  Truck
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const PRODUCTION_STEPS = [
  'Phase 01: Photo Ingested',
  'Phase 02: Hand-Rendering',
  'Phase 03: Digital Proof Transmitted',
  'Phase 04: Wax-Sealed & Dispatched'
];

export default function CommissionDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [commission, setCommission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommissionDetail() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();
        if (res.ok && data.order) {
          setCommission(data.order);
        }
      } catch (err) {
        console.error('Failed to load commission details:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchCommissionDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#0A0908] text-[#FAF8F5]">
        <p className="text-xs font-mono text-[#A8A196] animate-pulse">Accessing atelier master ledger...</p>
      </div>
    );
  }

  if (!commission) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-[#0A0908] text-[#FAF8F5]">
        <p className="font-serif text-xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Commission Record Not Found</p>
        <Link href="/account/commissions" className="text-xs font-mono text-[#e4c577] underline">
          &larr; Back to Commissions
        </Link>
      </div>
    );
  }

  const firstItem = commission.items?.[0] || {};
  
  const artTitle = firstItem.title || 'Bespoke Heirloom Portrait';
  const medium = firstItem.medium || 'Raw Willow Charcoal';
  const size = firstItem.dimensions || 'A3 Format';
  const frame = firstItem.frame || 'Archival Unframed Sheet';
  const notes = firstItem.description || 'Standard atelier lighting & facial balance';
  
  const imageUrl = firstItem.media?.secureUrl || firstItem.artwork?.media?.secureUrl || '';

  const getStepIndex = (status) => {
    if (!status) return 0;
    const lower = status.toLowerCase();
    if (lower.includes('phase 01') || lower.includes('ingested')) return 0;
    if (lower.includes('phase 02') || lower.includes('hand-rendering') || lower.includes('rendering')) return 1;
    if (lower.includes('phase 03') || lower.includes('digital proof') || lower.includes('transmitted')) return 2;
    if (lower.includes('phase 04') || lower.includes('wax-sealed') || lower.includes('dispatched')) return 3;
    return 0;
  };

  const currentStatus = commission.status || 'Phase 01: Photo Ingested';
  const currentStepIndex = getStepIndex(currentStatus);

  return (
    <div className="min-h-screen pb-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Studio Ambient Glows */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1">
            <Link 
              href="/account/commissions" 
              className="inline-flex items-center gap-2 text-xs font-mono text-[#A8A196] hover:text-[#FAF8F5] transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#e4c577]" />
              <span>Back to Commissions Ledger</span>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-3xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
                {commission.orderNumber || `#${commission.id.slice(0, 8)}`}
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#e4c577]/10 border border-[#e4c577]/30 text-[#e4c577] text-[10px] font-mono uppercase tracking-widest font-semibold">
                Custom Commission Tracker
              </span>
            </div>
          </div>

          <div className="text-right sm:block">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A8A196] block">Total Acquisition</span>
            <span className="font-serif text-2xl text-[#e4c577]" style={{ fontFamily: 'Georgia, serif' }}>${commission.totalAmount.toFixed(2)} USD</span>
          </div>
        </div>

        {/* Live Atelier Production Timeline */}
        <div className="rounded-[28px] bg-[#171513] p-6 sm:p-10 border border-white/10 shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-serif text-xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Live Production Lifecycle</h3>
              <p className="text-xs text-[#A8A196] font-mono mt-0.5">Master artisan hand-rendering progression</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-mono text-amber-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Current Phase: {currentStatus}</span>
            </span>
          </div>

          {/* Timeline Steps Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4">
            {PRODUCTION_STEPS.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div 
                  key={step} 
                  className={`p-4 rounded-2xl border transition-all relative ${
                    isCurrent 
                      ? 'bg-[#e4c577]/10 border-[#e4c577] ring-1 ring-[#e4c577]/40 shadow-xs text-[#FAF8F5]' 
                      : isCompleted 
                      ? 'bg-black/50 border-white/20 text-[#FAF8F5]' 
                      : 'bg-black/20 border-white/5 text-white/30 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isCompleted ? 'bg-[#e4c577] text-[#0A0908]' : 'bg-white/10 text-white/40'
                    }`}>
                      {idx + 1}
                    </span>
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">{step}</h4>
                  <p className="text-[10px] text-[#A8A196] font-light mt-1">
                    {idx === 0 && 'Photo ingested & verified'}
                    {idx === 1 && 'Hand-rendering progression'}
                    {idx === 2 && 'Digital proof transmitted'}
                    {idx === 3 && 'Wax-sealed & dispatched'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TRACKING WAYBILL CARD (If present) */}
        {commission.trackingNumber && (
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
                  {commission.trackingNumber}
                </span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-[#A8A196] bg-black/50 px-4 py-2 rounded-xl border border-white/10">
              Use this reference on the courier transit portal.
            </div>
          </div>
        )}

        {/* Artwork Specification & Cloudinary Reference Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reference Photo Card (Cloudinary Persistent Asset) */}
          <div className="lg:col-span-5 rounded-[28px] bg-[#171513] p-6 border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs font-bold text-[#FAF8F5] uppercase tracking-widest flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#e4c577]" /> Cloudinary Reference Vault
              </h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full font-mono font-medium border border-emerald-400/40">
                Secured
              </span>
            </div>

            {imageUrl ? (
              <div className="rounded-2xl overflow-hidden bg-stone-900 border border-white/10 aspect-square shadow-inner relative">
                <Image src={imageUrl} alt="Atelier Reference Photo" fill sizes="400px" className="object-cover contrast-110" />
              </div>
            ) : (
              <div className="p-8 text-center bg-black/40 rounded-2xl border border-white/10 text-xs text-[#A8A196]">
                No reference image attached to this commission.
              </div>
            )}
          </div>

          {/* Specifications & Delivery Address */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Specs Card */}
            <div className="rounded-[28px] bg-[#171513] p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#FAF8F5] uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#e4c577]" /> Commission Specifications
              </h3>

              <div className="space-y-3 text-xs text-[#A8A196] font-light divide-y divide-white/10">
                <div className="flex justify-between pt-2">
                  <span className="font-mono uppercase tracking-wider text-[#A8A196]">Artwork Title:</span>
                  <span className="font-serif font-normal text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>{artTitle}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-mono uppercase tracking-wider text-[#A8A196]">Artistic Medium:</span>
                  <span className="font-mono text-[#FAF8F5]">{medium}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-mono uppercase tracking-wider text-[#A8A196]">Canvas Dimensions:</span>
                  <span className="font-mono text-[#FAF8F5]">{size}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-mono uppercase tracking-wider text-[#A8A196]">Framing & Matting:</span>
                  <span className="font-mono text-[#FAF8F5]">{frame}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-mono uppercase tracking-wider text-[#A8A196]">Composition Directives:</span>
                  <span className="font-light text-[#FAF8F5] max-w-xs text-right italic">{notes}</span>
                </div>
              </div>
            </div>

            {/* Delivery Details Card */}
            <div className="rounded-[28px] bg-[#171513] p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#FAF8F5] uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e4c577]" /> Secure Delivery Destination
              </h3>

              <div className="space-y-2 text-xs text-[#A8A196] font-light bg-black/50 p-4 rounded-2xl border border-white/10">
                <p className="font-bold text-[#FAF8F5]">{commission.name || 'Valued Patron'}</p>
                <p>{commission.address}</p>
                <p>{commission.city}, {commission.postalCode}</p>
                <p className="font-mono text-[11px] text-[#A8A196] pt-1">{commission.country}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}