'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2,
  Mail,
  Palette,
  Loader2
} from 'lucide-react';

const CRAFT_STANDARDS = [
  {
    title: '300 GSM French Cotton',
    subtitle: 'Arches & Fabriano Mill Papers',
    desc: 'Crafted on cylinder molds from 100% long cotton fibers. Acid-free and gelatin-sized to prevent yellowing or degradation across centuries.',
    metric: '100+ Yrs',
    metricLabel: 'Archival Lifespan'
  },
  {
    title: 'Pure Mineral & Carbon Pigments',
    subtitle: 'Vine, Willow Charcoal & 8B Graphite',
    desc: 'Burned in oxygen-depleted kilns to create velvety, lightfast blacks without artificial binding agents or petroleum chemical fillers.',
    metric: 'Grade 8B',
    metricLabel: 'Tonal Density'
  },
  {
    title: 'Vibrant Lightfast Chromatics',
    subtitle: 'Artist-Grade Colored Pencil',
    desc: 'Rich wax and oil-based core pigments that deliver intense saturation, lifelike skin undertones, and vivid pet coat reflections.',
    metric: '100% Lightfast',
    metricLabel: 'Chromatic Stability'
  },
  {
    title: 'Individually Registered',
    subtitle: 'Embossed Atelier Provenance',
    desc: 'Each master study and commissioned original is logged into our UK registry and dispatched with a physical wax-sealed certificate.',
    metric: 'Hand-Signed',
    metricLabel: 'Artist Verified'
  }
];

export default function AboutContent() {
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [studioInfo, setStudioInfo] = useState({
    studioEmail: 'info@sketchstudiox.com',
    companyName: 'SKETCH X STUDIO LTD',
    companyNumber: '17429707',
    incorporationJurisdiction: 'England and Wales (UK)',
  });

  useEffect(() => {
    async function fetchStudioSettings() {
      try {
        setLoadingSettings(true);
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data && !data.error) {
          setStudioInfo({
            studioEmail: data.studioEmail || 'info@sketchstudiox.com',
            companyName: data.companyName || 'SKETCH X STUDIO LTD',
            companyNumber: data.companyNumber || '17429707',
            incorporationJurisdiction: data.incorporationJurisdiction || 'England and Wales (UK)',
          });
        }
      } catch (err) {
        console.error('Failed to load about page studio settings', err);
      } finally {
        setLoadingSettings(false);
      }
    }
    fetchStudioSettings();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Ambient Lighting Fields */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.08)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 backdrop-blur-md text-[#e4c577] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
            <span>The Atelier & Craft Philosophy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal text-[#FAF8F5] tracking-tight leading-[1.04]" style={{ fontFamily: 'Georgia, serif' }}>
            Defying the digital rush <br />
            <span className="italic font-light text-[#e4c577]">
              stroke by human stroke.
            </span>
          </h1>

          <p className="text-[#A8A196] font-light text-base sm:text-lg leading-relaxed pt-2">
            {studioInfo.companyName} was founded on a singular premise: algorithms and digital filters cannot replicate the subtle weight of human touch on heavy cotton paper. We treat every portrait—whether of a loved one or a faithful companion pet—as a permanent, sacred physical record.
          </p>
        </div>

        {/* Master Artisan Double Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative p-4 sm:p-5 rounded-[32px] bg-[#171513] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-900 border border-white/10 relative">
                <Image
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85"
                  alt="Artist workspace and raw drawing materials"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-[#FAF8F5] space-y-1 font-mono z-10">
                  <span className="text-[10px] uppercase tracking-widest text-[#e4c577]">Studio Sanctuary</span>
                  <p className="font-serif text-base text-white/90" style={{ fontFamily: 'Georgia, serif' }}>Where time slows down for graphite, charcoal & pure cotton.</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-4 sm:right-6 p-4 rounded-2xl bg-[#171513] text-[#FAF8F5] border border-[#e4c577]/30 shadow-xl flex items-center gap-3 font-mono">
              <div className="w-10 h-10 rounded-xl bg-[#e4c577]/20 text-[#e4c577] flex items-center justify-center font-bold">
                X
              </div>
              <div className="text-[11px] leading-snug">
                <span className="block text-white font-bold">100% Hand-Crafted</span>
                <span className="text-[#A8A196]">Zero AI &bull; Pure Human Passion</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#e4c577] font-mono font-semibold">
                Our Manifesto
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-normal leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                A portrait is an heir’s window into someone they cherish.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#A8A196] font-light leading-relaxed">
              Every portrait begins with silence and observation. Before applying the initial guidelines, the artist studies the subtle curvature of the subject’s gaze, the distribution of natural shadows, the gentle nuances of hair or animal fur, and the unique architecture of their smile.
            </p>

            <p className="text-sm sm:text-base text-[#A8A196] font-light leading-relaxed">
              We do not trace. We do not project digital slides onto paper. Whether executing an intimate monochrome pet study, a multi-figure family heirloom, or a chromatic colored pencil bridal portrait, we build tonal values stroke by stroke from transparent mid-tones to intense obsidian darks.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/10">
              <div>
                <span className="font-serif text-2xl text-[#FAF8F5] block" style={{ fontFamily: 'Georgia, serif' }}>20 to 50+</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8A196]">Hours Dedicated per Easel</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#FAF8F5] block" style={{ fontFamily: 'Georgia, serif' }}>1-to-10</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8A196]">Subjects on Single Canvas</span>
              </div>
            </div>
          </div>

        </div>

        {/* Archival Material Standards Grid */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#e4c577] font-mono font-semibold">
              The Materials
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FAF8F5] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Materials that outlast generations.
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A196] font-light">
              We exclusively commission substrates, charcoals, and pencils from European and British specialist houses that have preserved fine art tradition for centuries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRAFT_STANDARDS.map((std, i) => (
              <div
                key={i}
                className="p-7 rounded-[28px] bg-[#171513] border border-white/10 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.8)] flex flex-col justify-between space-y-6 group hover:border-[#e4c577]/50 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/50 border border-[#e4c577]/30 text-[#e4c577]">
                      Standard 0{i + 1}
                    </span>
                    <Award className="w-4 h-4 text-[#e4c577]" />
                  </div>
                  <h3 className="font-serif text-lg text-[#FAF8F5] font-normal pt-1" style={{ fontFamily: 'Georgia, serif' }}>{std.title}</h3>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-[#e4c577]">{std.subtitle}</p>
                  <p className="text-xs text-[#A8A196] font-light leading-relaxed">{std.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#A8A196]">{std.metricLabel}</span>
                  <span className="font-mono text-xs font-bold text-[#FAF8F5]">{std.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate of Authenticity Protocol & UK Incorporation */}
        {/* <div className="p-8 sm:p-14 rounded-[36px] bg-[#171513] border border-[#e4c577]/30 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden text-[#FAF8F5]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(228,197,119,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="lg:col-span-7 space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#e4c577] font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>UK Incorporated Studio Provenance</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-normal leading-tight text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
              Every acquisition is registered under Company No: {studioInfo.companyNumber}.
            </h3>

            <p className="text-xs sm:text-sm text-[#A8A196] font-light leading-relaxed">
              Upon final artwork inspection, your drawing is entered into the official studio archival ledger with its unique reference designation, date of execution, and substrate verification. An archival Certificate of Authenticity with our wax seal accompanies every dispatch worldwide.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#A8A196]">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tamper-Evident Wax Seal</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Lead Artist Recto & Verso Sign</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Insured Tracked Freight</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative z-10">
            <div className="p-6 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md max-w-xs w-full text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#e4c577] to-[#cfae59] text-[#0A0908] flex items-center justify-center mx-auto font-serif text-xl font-bold shadow-lg">
                X
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#e4c577] font-bold">{studioInfo.companyName}</p>
                <p className="font-mono text-[10px] text-[#A8A196] mt-0.5">{studioInfo.incorporationJurisdiction} &bull; Reg: {studioInfo.companyNumber}</p>
              </div>
              <p className="text-[10px] text-[#A8A196] font-light pt-1 border-t border-white/10">
                Official Provenance Document included with all commissions and gallery originals.
              </p>
            </div>
          </div>
        </div> */}

        {/* Action Commission CTA */}
        <div className="text-center space-y-6 pt-4 max-w-2xl mx-auto">
          <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
            Ready to commission your bespoke portrait?
          </h3>
          <p className="text-xs sm:text-sm text-[#A8A196] font-light">
            Whether for a family milestone, a cherished pet, or an original gallery study, our easel is ready.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/custom-sketch"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all duration-300 shadow-lg cursor-pointer"
            >
              <span>Begin Your Commission</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0A0908]" />
            </Link>

            <a
              href={`mailto:${studioInfo.studioEmail}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/15 bg-white/5 text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#e4c577] hover:bg-white/10 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#e4c577]" />
              <span>{studioInfo.studioEmail}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}