'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  Clock, 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  Sparkles, 
  Eye, 
  Layers,
  ArrowRight
} from 'lucide-react';

const MOCK_COMMISSIONS = [
  {
    orderId: 'SSX-9821',
    title: 'Bespoke Family Heritage Study',
    date: 'September 2026',
    medium: 'Raw Willow Charcoal on 300 GSM Arches',
    dimensions: 'A3 (11.7 × 16.5 in)',
    currentStep: 2, // 1: Photo Ingest, 2: Hand-Rendering, 3: Digital Proof, 4: Dispatched
    status: 'In Production &bull; Hand-Drawing in Progress',
    previewThumb: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    steps: [
      { label: 'Reference Verified', detail: 'High-res reference approved by lead artist' },
      { label: 'Hand-Rendering', detail: 'Charcoal layering & tonal graduation underway' },
      { label: 'Digital Proofing', detail: 'High-res scan delivered for collector approval' },
      { label: 'Insured Transit', detail: 'Wax-sealed Certificate & courier dispatch' },
    ],
  },
];

const MOCK_ACQUISITIONS = [
  {
    id: 'SSX-01',
    title: 'The Silent Contemplation',
    year: '2026',
    medium: '8B Graphite & Blending Stumps',
    frame: 'Ebony Hardwood with French Mat Board',
    acquiredDate: 'August 14, 2026',
    thumb: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
    certificateId: 'CERT-SSX-01-2026',
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('commissions');

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* Studio Ambient Backdrops */}
      <div className="absolute top-20 left-1/4 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,163,72,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Patron Header & Atelier Credential */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-white border border-[#E5DFD7] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#0E0C0A] border border-[#D4A348]/40 flex items-center justify-center font-serif text-2xl text-[#D4A348] font-bold shadow-md">
              E
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl text-[#1A1A1A]">Eleanor Vance</span>
                <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#8C6415] font-semibold">
                  Patron Circle
                </span>
              </div>
              <p className="text-xs text-[#867E74] font-mono">eleanor.vance@london.co.uk &bull; Member since 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/custom-sketch"
              className="px-5 py-2.5 rounded-full bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-mono hover:bg-[#C29B38] transition-colors"
            >
              New Commission
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#E5DFD7] pb-4">
          <button
            onClick={() => setActiveTab('commissions')}
            className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === 'commissions'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#867E74] hover:text-[#1A1A1A]'
            }`}
          >
            Active Commissions (1)
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === 'vault'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#867E74] hover:text-[#1A1A1A]'
            }`}
          >
            Acquisition Archive (1)
          </button>
        </div>

        {/* Tab 1: Active Bespoke Commissions with Live Timeline Tracker */}
        {activeTab === 'commissions' && (
          <div className="space-y-6">
            {MOCK_COMMISSIONS.map((comm) => (
              <div
                key={comm.orderId}
                className="p-7 sm:p-9 rounded-[32px] bg-white border border-[#E5DFD7] shadow-xs space-y-8"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C29B38] font-semibold">
                        Order #{comm.orderId}
                      </span>
                      <span className="text-[10px] font-mono text-[#867E74]">&bull; {comm.date}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#1A1A1A]">{comm.title}</h3>
                  </div>

                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F3] border border-[#D4A348]/40 text-xs font-mono text-[#8C6415]">
                    <Clock className="w-3.5 h-3.5" />
                    <span dangerouslySetInnerHTML={{ __html: comm.status }} />
                  </span>
                </div>

                {/* Progress Stepper Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  {comm.steps.map((step, idx) => {
                    const stepNum = idx + 1;
                    const isPassed = stepNum <= comm.currentStep;
                    const isCurrent = stepNum === comm.currentStep;

                    return (
                      <div
                        key={step.label}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-[#FAF8F3] border-[#C29B38] ring-1 ring-[#C29B38]/30'
                            : isPassed
                            ? 'bg-stone-50/70 border-stone-200'
                            : 'bg-white border-dashed border-stone-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-mono uppercase font-bold ${
                            isCurrent ? 'text-[#8C6415]' : isPassed ? 'text-emerald-700' : 'text-stone-400'
                          }`}>
                            Phase 0{stepNum}
                          </span>
                          {isPassed && !isCurrent && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                          {isCurrent && (
                            <span className="w-2 h-2 rounded-full bg-[#C29B38] animate-ping" />
                          )}
                        </div>
                        <h4 className="font-mono text-xs font-semibold text-[#1A1A1A]">{step.label}</h4>
                        <p className="text-[11px] text-[#867E74] font-light mt-1 leading-snug">{step.detail}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Commission Summary & Reference Preview */}
                <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-16 rounded-xl overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                      <img src={comm.previewThumb} alt="Reference Preview" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[#1A1A1A] font-semibold">{comm.medium}</p>
                      <p className="text-[#867E74]">Format: {comm.dimensions}</p>
                      <p className="text-[11px] text-emerald-700">Proof window opening in ~48 business hours</p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E5DFD7] text-[#1A1A1A] hover:border-[#C29B38] transition-colors"
                  >
                    <span>Message Studio Lead</span>
                    <ExternalLink className="w-3 h-3 text-[#C29B38]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Acquired Gallery Originals & Provenance Certificates */}
        {activeTab === 'vault' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_ACQUISITIONS.map((acq) => (
              <div
                key={acq.id}
                className="p-6 rounded-[28px] bg-white border border-[#E5DFD7] shadow-xs flex gap-5 group"
              >
                <div className="w-24 sm:w-28 aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                  <img src={acq.thumb} alt={acq.title} className="w-full h-full object-cover grayscale contrast-125" />
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-mono text-[#C29B38]">
                      {acq.id} &bull; MASTER STUDY
                    </span>
                    <h3 className="font-serif text-lg text-[#1A1A1A] font-normal leading-snug">
                      {acq.title}
                    </h3>
                    <p className="text-xs text-[#867E74] font-light mt-1">{acq.medium}</p>
                    <p className="text-[11px] font-mono text-[#A8A196] mt-0.5">{acq.frame}</p>
                  </div>

                  {/* Certificate Document Action */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#867E74]">{acq.certificateId}</span>
                    <button
                      type="button"
                      onClick={() => alert(`Transmitting authenticated digital ledger for ${acq.certificateId}`)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#C29B38] hover:text-[#1A1A1A] transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Certificate PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}