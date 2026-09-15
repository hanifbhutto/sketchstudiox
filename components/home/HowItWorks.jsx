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
    <section className="relative py-24 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] border-t border-white/10 overflow-hidden">
      
      {/* Animated Breathing Ambient Glows */}
      <motion.div 
        animate={{ scale: [1, 1.06, 1], opacity: [0.1, 0.16, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-10 w-[300px] sm:w-[600px] h-[300px] sm:h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(228,197,119,0.14)_0%,transparent_70%)] blur-[100px] sm:blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-10 w-[250px] sm:w-[500px] h-[250px] sm:h-[400px] bg-[radial-gradient(ellipse_at_bottom,rgba(228,197,119,0.08)_0%,transparent_70%)] blur-[110px] sm:blur-[130px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 backdrop-blur-md text-[#e4c577] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
            <span>The Commission Method</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FAF8F5] tracking-tight leading-[1.12] sm:leading-[1.08]" style={{ fontFamily: 'Georgia, serif' }}>
            From photograph to <br />
            <span className="italic font-light text-[#e4c577]">
              museum-grade original.
            </span>
          </h2>

          <p className="text-[#A8A196] font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Transparent four-phase atelier craftsmanship with digital proof inspection before museum packaging and tracked courier dispatch.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connector Line for Large Screens */}
          <div className="hidden lg:block absolute top-14 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#e4c577]/40 to-transparent pointer-events-none z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative rounded-[24px] bg-[#171513] border border-white/10 p-7 sm:p-8 flex flex-col justify-between group shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_50px_-12px_rgba(228,197,119,0.25)] hover:border-[#e4c577]/50 transition-all duration-400 z-10"
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-[#e4c577]/10 text-[#e4c577] border border-[#e4c577]/25 shadow-2xs">
                    {step.phase}
                  </span>

                  <div className="w-11 h-11 rounded-2xl bg-[#0A0908] border border-white/10 flex items-center justify-center text-[#FAF8F5] group-hover:bg-[#e4c577] group-hover:text-[#0A0908] group-hover:border-[#e4c577] transition-all duration-300 shadow-2xs">
                    <Icon className="w-4 h-4 stroke-[1.8]" />
                  </div>
                </div>

                {/* Step Narrative */}
                <div className="space-y-2">
                  <h3 className="font-serif text-lg text-[#FAF8F5] font-normal group-hover:text-[#e4c577] transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                    {step.title}
                  </h3>

                  <p className="text-[10px] uppercase tracking-wider text-[#e4c577]/80 font-mono font-medium">
                    {step.subtitle}
                  </p>

                  <p className="text-xs text-[#A8A196] font-light leading-relaxed pt-2 border-t border-white/10 mt-3">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Commission CTA Banner (Short text & mobile compact) */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/custom-sketch"
            className="inline-flex items-center gap-2.5 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(228,197,119,0.35)] group cursor-pointer"
          >
            <span>Start Your Commission</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0A0908] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}