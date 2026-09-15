'use client';

import { useState } from 'react';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PORTFOLIO_ITEMS = [
  {
    id: 'p1',
    title: 'The Silent Reverie',
    category: 'Human Portraits',
    medium: 'Raw Willow Charcoal & 8B Graphite',
    image: 'images/home-frames/fr-1.jpeg',
    dimensions: '16×20 in',
    rotation: 'lg:-rotate-2 lg:translate-y-4',
  },
  {
    id: 'p2',
    title: 'Loyal Companion Study',
    medium: 'Vine Charcoal on Arches 300 GSM',
    category: 'Pet Portraits',
    image: 'images/home-frames/fr-2.jpg',
    dimensions: '12×16 in',
    rotation: 'lg:rotate-1 lg:-translate-y-6',
  },
  {
    id: 'p3',
    title: 'Heritage Bridal Radiance',
    medium: 'Vibrant Colored Pencil & Prismacolor',
    category: 'Couples & Family',
    image: 'images/home-frames/fr-3.jpeg',
    dimensions: '20×30 in',
    rotation: 'lg:-rotate-1 lg:translate-y-8',
  },
  {
    id: 'p4',
    title: 'Ethereal Gaze Study',
    medium: 'Fine Graphite on Fabriano Paper',
    category: 'Human Portraits',
    image: 'images/home-frames/fr-4.jpeg',
    dimensions: 'A3 Format',
    rotation: 'lg:rotate-2 lg:-translate-y-2',
  },
  {
    id: 'p5',
    title: 'Majestic Canine Portrait',
    medium: 'Raw Charcoal & White Chalk Accent',
    category: 'Pet Portraits',
    image: 'images/home-frames/fr-5.jpeg',
    dimensions: '16×20 in',
    rotation: 'lg:-rotate-3 lg:translate-y-6',
  },
  {
    id: 'p6',
    title: 'Generational Bond',
    medium: 'Graphite & Charcoal Hybrid',
    category: 'Couples & Family',
    image: 'images/home-frames/fr-6.jpeg',
    dimensions: '24×36 in',
    rotation: 'lg:rotate-1 lg:-translate-y-4',
  },
];

const CATEGORIES = ['All', 'Human Portraits', 'Pet Portraits', 'Couples & Family'];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = activeTab === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeTab);

  const handleTabClick = (e, cat) => {
    e.preventDefault();
    setActiveTab(cat);
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] border-t border-[#e4c577]/20 overflow-hidden">
      
      {/* Tuscan Gold & Charcoal Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] sm:w-[700px] sm:h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(228,197,119,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[250px] sm:w-[500px] sm:h-[350px] bg-[radial-gradient(ellipse_at_bottom,rgba(228,197,119,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* Top Header & Short Description */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 text-[#e4c577] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
            <span>Atelier Gallery Wall</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
            Selected works from <br />
            <span className="italic font-light text-[#e4c577]">
              recent master commissions.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A196] font-light leading-relaxed">
            Explore our curated exhibition of hand-drawn human expressions, beloved companion pets, and multi-figure family heirlooms on archival cotton sheets.
          </p>

          {/* Category Filter Tabs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={(e) => handleTabClick(e, cat)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-mono font-medium transition-all cursor-pointer border ${
                  activeTab === cat
                    ? 'bg-[#e4c577] text-[#0A0908] border-[#e4c577] font-bold shadow-md'
                    : 'bg-white/[0.04] text-[#A8A196] border-white/10 hover:border-[#e4c577]/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scattered Organic Gallery Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 pt-2 sm:pt-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group flex flex-col space-y-3 sm:space-y-4 cursor-pointer transition-transform duration-500 hover:rotate-0 hover:translate-y-0 ${item.rotation || ''}`}
            >
              {/* DARK LUXURY FRAME WITH FULL FRAME object-cover */}
              <div className="relative p-4 sm:p-6 rounded-[24px] bg-[#171513] border border-[#e4c577]/30 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] group-hover:shadow-[0_25px_55px_-10px_rgba(228,197,119,0.25)] group-hover:border-[#e4c577]/60 transition-all duration-500">
                
                {/* Category Stamp inside Frame */}
                <div className="absolute top-7 left-7 sm:top-8 sm:left-8 z-20 px-2.5 py-1 rounded-md bg-black/80 border border-[#e4c577]/40 text-[9px] uppercase tracking-widest text-[#FAF8F5] font-mono backdrop-blur-md">
                  {item.category}
                </div>

                {/* Artwork Image Viewport with object-cover */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#141210] border border-white/10 shadow-inner flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out contrast-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 backdrop-blur-[2px]">
                    <span className="text-[#e4c577] text-xs font-mono tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-[#e4c577]" />
                      <span>Archival Specimen &bull; {item.dimensions}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean Minimalist Plaque Under Frame */}
              <div className="px-2 flex items-baseline justify-between">
                <div>
                  <h3 className="font-serif text-sm sm:text-base text-[#FAF8F5] group-hover:text-[#e4c577] transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#A8A196] font-light">{item.medium}</p>
                </div>
                <span className="font-mono text-xs text-[#e4c577] font-medium">{item.dimensions}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA (Shorter button on mobile) */}
        <div className="text-center pt-6 sm:pt-8">
          <Link
            href="/custom-sketch"
            className="inline-flex items-center gap-2.5 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all shadow-lg group"
          >
            <span>Commission Custom Portrait</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}