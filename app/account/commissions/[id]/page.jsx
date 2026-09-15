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
  FileText
} from 'lucide-react';
import Link from 'next/link';

const PRODUCTION_STEPS = [
  'Photo Ingested',
  'Draft in Progress',
  'Wax Seal & Quality Check',
  'Shipped'
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
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF8F5]">
        <p className="text-xs font-mono text-[#867E74] animate-pulse">Accessing atelier master ledger...</p>
      </div>
    );
  }

  if (!commission) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-[#FAF8F5]">
        <p className="font-serif text-xl text-[#1A1A1A]">Commission Record Not Found</p>
        <Link href="/account/commissions" className="text-xs font-mono text-[#C29B38] underline">
          &larr; Back to Commissions
        </Link>
      </div>
    );
  }

  const firstItem = commission.items?.[0] || {};
  
  // Clean Architecture Mappings (Directly from OrderItem & its Media relation)
  const artTitle = firstItem.title || 'Bespoke Heirloom Portrait';
  const medium = firstItem.medium || 'Raw Willow Charcoal';
  const size = firstItem.dimensions || 'A3 Format';
  const frame = firstItem.frame || 'Archival Unframed Sheet';
  const notes = firstItem.description || 'Standard atelier lighting & facial balance';
  
  // Cloudinary Secure Permanent URL retrieval (Direct from OrderItem media relation)
  const imageUrl = firstItem.media?.secureUrl || firstItem.artwork?.media?.secureUrl || '';

  // Determine active step index
  const currentStatus = commission.status || 'Photo Ingested';
  const currentStepIndex = PRODUCTION_STEPS.indexOf(currentStatus) !== -1 
    ? PRODUCTION_STEPS.indexOf(currentStatus) 
    : 0;

  return (
    <div className="min-h-screen pb-24 px-6 sm:px-10 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
          <div className="space-y-1">
            <Link 
              href="/account/commissions" 
              className="inline-flex items-center gap-2 text-xs font-mono text-[#867E74] hover:text-[#1A1A1A] transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Commissions Ledger</span>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-3xl text-[#1A1A1A]">
                {commission.orderNumber || `#${commission.id.slice(0, 8)}`}
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#D4A348]/10 border border-[#D4A348]/30 text-[#8C6415] text-[10px] font-mono uppercase tracking-widest font-semibold">
                Custom Commission Tracker
              </span>
            </div>
          </div>

          <div className="text-right sm:block">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#867E74] block">Total Acquisition</span>
            <span className="font-serif text-2xl text-[#1A1A1A]">${commission.totalAmount.toFixed(2)} USD</span>
          </div>
        </div>

        {/* Live Atelier Production Timeline */}
        <div className="rounded-[28px] bg-white p-6 sm:p-10 border border-[#E5DFD7] shadow-[0_12px_35px_-10px_rgba(212,163,72,0.08)] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl text-[#1A1A1A]">Live Production Lifecycle</h3>
              <p className="text-xs text-[#867E74] font-mono mt-0.5">Master artisan hand-rendering progression</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
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
                      ? 'bg-[#FAF8F3] border-[#C29B38] ring-1 ring-[#C29B38]/30 shadow-xs' 
                      : isCompleted 
                      ? 'bg-white border-[#1A1A1A]/30 text-[#1A1A1A]' 
                      : 'bg-stone-50 border-stone-200 text-stone-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isCompleted ? 'bg-[#1A1A1A] text-white' : 'bg-stone-200 text-stone-500'
                    }`}>
                      {idx + 1}
                    </span>
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{step}</h4>
                  <p className="text-[10px] text-[#867E74] font-light mt-1">
                    {idx === 0 && 'Reference ingested & verified'}
                    {idx === 1 && 'Charcoal & graphite rendering'}
                    {idx === 2 && 'Sealed, matted & inspected'}
                    {idx === 3 && 'Dispatched via secure courier'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Artwork Specification & Cloudinary Reference Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reference Photo Card (Cloudinary Persistent Asset) */}
          <div className="lg:col-span-5 rounded-[28px] bg-white p-6 border border-[#E5DFD7] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#C29B38]" /> Cloudinary Reference Vault
              </h3>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-mono font-medium border border-emerald-200">
                Secured
              </span>
            </div>

            {imageUrl ? (
              <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 aspect-square shadow-inner">
                <img src={imageUrl} alt="Atelier Reference Photo" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="p-8 text-center bg-[#FAF8F3] rounded-2xl border border-[#E5DFD7] text-xs text-[#867E74]">
                No reference image attached to this commission.
              </div>
            )}
          </div>

          {/* Specifications & Delivery Address */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Specs Card */}
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-xs space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C29B38]" /> Commission Specifications
              </h3>

              <div className="space-y-3 text-xs text-[#686057] font-light divide-y divide-[#E5DFD7]">
                <div className="flex justify-between pt-2">
                  <span className="font-mono uppercase tracking-wider text-[#867E74]">Artwork Title:</span>
                  <span className="font-serif font-normal text-[#1A1A1A]">{artTitle}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-mono uppercase tracking-wider text-[#867E74]">Artistic Medium:</span>
                  <span className="font-mono text-[#1A1A1A]">{medium}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-mono uppercase tracking-wider text-[#867E74]">Canvas Dimensions:</span>
                  <span className="font-mono text-[#1A1A1A]">{size}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-mono uppercase tracking-wider text-[#867E74]">Framing & Matting:</span>
                  <span className="font-mono text-[#1A1A1A]">{frame}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-mono uppercase tracking-wider text-[#867E74]">Composition Directives:</span>
                  <span className="font-light text-[#1A1A1A] max-w-xs text-right italic">{notes}</span>
                </div>
              </div>
            </div>

            {/* Delivery Details Card */}
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-xs space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C29B38]" /> Secure Delivery Destination
              </h3>

              <div className="space-y-2 text-xs text-[#686057] font-light bg-[#FAF8F3] p-4 rounded-2xl border border-[#E5DFD7]">
                <p className="font-bold text-[#1A1A1A]">{commission.name || 'Valued Patron'}</p>
                <p>{commission.address}</p>
                <p>{commission.city}, {commission.postalCode}</p>
                <p className="font-mono text-[11px] text-[#867E74] pt-1">{commission.country}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}