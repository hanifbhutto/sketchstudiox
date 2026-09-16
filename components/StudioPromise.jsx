'use client';

import { Sparkles, CheckCircle2, CreditCard, Award, ShieldCheck, Star } from 'lucide-react';

const PROMISES = [
  {
    title: '100% Handmade - No AI',
    desc: 'Every portrait is hand-drawn stroke by stroke on archival cotton.',
    icon: CheckCircle2,
  },
  {
    title: 'Flexible Secure Payment',
    desc: 'Secure deposit options with full encrypted processing.',
    icon: CreditCard,
  },
  {
    title: 'Specialised Artists',
    desc: 'Master portraitists dedicated to human & pet expressions.',
    icon: Award,
  },
  {
    title: 'Money-Back Guarantee',
    desc: 'Commitment to excellence with strict quality assurance.',
    icon: ShieldCheck,
  },
  {
    title: '5.0 Star Collector Rating',
    desc: 'Endorsed by private art collectors and family patrons worldwide.',
    icon: Star,
  },
];

export default function StudioPromise() {
  return (
    <section className="relative py-24 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] border-t border-white/10 overflow-hidden">
      
      {/* Static Ambient Glow (No animation lag during scroll) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 backdrop-blur-md text-[#e4c577] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
            <span>Atelier Guarantee</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FAF8F5] tracking-tight leading-[1.12] sm:leading-[1.08]" style={{ fontFamily: 'Georgia, serif' }}>
            Our Promise to You
          </h2>

          <p className="text-[#A8A196] font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Since inception, we have hand-delivered hundreds of custom portraits — and we stand by every commitment below.
          </p>
        </div>

        {/* 5 Promises Grid (Instant Render without lag) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROMISES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-[24px] bg-[#171513] border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_50px_-12px_rgba(228,197,119,0.25)] hover:border-[#e4c577]/50 transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Icon Container with Soft Gold Ring */}
                <div className="w-14 h-14 rounded-2xl bg-[#0A0908] border border-[#e4c577]/30 flex items-center justify-center text-[#e4c577] mb-6 group-hover:bg-[#e4c577] group-hover:text-[#0A0908] group-hover:border-[#e4c577] transition-all duration-300 shadow-md">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg text-[#FAF8F5] font-normal mb-2 group-hover:text-[#e4c577] transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#A8A196] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}