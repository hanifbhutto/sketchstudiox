'use client';

import { motion } from 'framer-motion';
import { UploadCloud, Pencil, CheckCircle2, PackageCheck, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    phase: 'Phase 01',
    title: 'Photo Ingestion & Composition',
    subtitle: 'Person or Pet &bull; High-res Capture',
    desc: 'Submit reference photos of people or cherished pets. Request custom compositions, merged photos, or background lighting refinements.',
    icon: UploadCloud,
  },
  {
    phase: 'Phase 02',
    title: 'Master Hand-Rendering',
    subtitle: '3 to 5 business days on easel',
    desc: 'Rendered stroke by stroke on 300 GSM French cotton sheets using 8B fine graphite, deep vine charcoal, or vibrant colored pencil.',
    icon: Pencil,
  },
  {
    phase: 'Phase 03',
    title: 'Digital Proof Transmitted',
    subtitle: '100% satisfaction guarantee',
    desc: 'Receive an ultra-high-resolution preview directly to your inbox. We refine nuances until the artwork exceeds your expectations.',
    icon: CheckCircle2,
  },
  {
    phase: 'Phase 04',
    title: 'Wax-Sealed & Dispatched',
    subtitle: 'Insured worldwide courier',
    desc: 'Treated with UV archival fixative, wax-sealed with an official Certificate of Authenticity, and dispatched via tracked express courier.',
    icon: PackageCheck,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-28 px-6 sm:px-10 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#F5F2EC] border-t border-amber-900/10 overflow-hidden">
      
      {/* Ambient Lighting Sprays */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[450px] bg-gradient-to-bl from-amber-400/10 via-rose-300/6 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-gradient-to-tr from-indigo-500/8 via-amber-300/6 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-amber-900 text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>The Commission Method</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-[1.08]">
            From photograph to <br />
            <span className="italic font-light bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#8C6415] bg-clip-text text-transparent">
              museum-grade original.
            </span>
          </h2>

          <p className="text-[#686057] font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Transparent four-phase atelier craftsmanship with digital proof inspection before museum packaging and tracked courier dispatch.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connector Line for Large Screens */}
          <div className="hidden lg:block absolute top-14 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400/35 to-transparent pointer-events-none z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative rounded-[28px] bg-gradient-to-br from-[#FFFFFF] via-[#FAF8F3] to-[#F8F5EE] border border-amber-900/15 p-7 sm:p-8 flex flex-col justify-between group shadow-[0_12px_35px_-10px_rgba(212,163,72,0.1)] hover:shadow-[0_22px_50px_-12px_rgba(212,163,72,0.22)] hover:border-amber-400/50 transition-all duration-400 z-10"
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/25 shadow-2xs">
                    {step.phase}
                  </span>

                  <div className="w-11 h-11 rounded-2xl bg-white border border-amber-900/15 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-amber-300 group-hover:border-[#1A1A1A] transition-all duration-300 shadow-2xs">
                    <Icon className="w-4 h-4 stroke-[1.8]" />
                  </div>
                </div>

                {/* Step Narrative */}
                <div className="space-y-2">
                  <h3 className="font-serif text-lg text-[#1A1A1A] font-normal group-hover:text-amber-900 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-[10px] uppercase tracking-wider text-amber-700 font-mono font-medium">
                    {step.subtitle}
                  </p>

                  <p className="text-xs text-[#686057] font-light leading-relaxed pt-2 border-t border-amber-900/10 mt-3">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Commission CTA Banner */}
        <div className="mt-16 text-center">
          <Link
            href="/custom-sketch"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)] group cursor-pointer"
          >
            <span>Commission Your Portrait Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}