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
    rotation: 'lg:-rotate-2 lg:translate-y-4', // Organic tilt & offset
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
    <section className="relative py-20 px-6 sm:px-10 bg-[#0A0908] text-[#FAF8F5] border-t border-[#D4A348]/20 overflow-hidden">
      
      {/* Tuscan Gold & Charcoal Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(212,163,72,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_bottom,rgba(194,155,56,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Top Header & Short Description */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4A348]/30 bg-[#D4A348]/10 text-[#D4A348] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A348]" />
            <span>Atelier Gallery Wall</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#FAF8F5]">
            Selected works from <br />
            <span className="italic font-light bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#8C6415] bg-clip-text text-transparent">
              recent master commissions.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A196] font-light leading-relaxed">
            Explore our curated exhibition of hand-drawn human expressions, beloved companion pets, and multi-figure family heirlooms on archival cotton sheets.
          </p>

          {/* Category Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={(e) => handleTabClick(e, cat)}
                className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono font-medium transition-all cursor-pointer border ${
                  activeTab === cat
                    ? 'bg-[#D4A348] text-[#0A0908] border-[#D4A348] font-bold shadow-md'
                    : 'bg-white/[0.04] text-[#A8A196] border-white/10 hover:border-[#D4A348]/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scattered Organic Gallery Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pt-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group flex flex-col space-y-4 cursor-pointer transition-transform duration-500 hover:rotate-0 hover:translate-y-0 ${item.rotation || ''}`}
            >
              {/* WHITE MUSEUM FRAME WITH MATTE BOARD & ORGANIC TILT */}
              <div className="relative p-5 sm:p-6 rounded-[24px] bg-[#FAF8F3] border border-[#EBE5DA] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] group-hover:shadow-[0_30px_65px_-10px_rgba(212,163,72,0.3)] group-hover:border-[#D4A348]/60 transition-all duration-500">
                
                {/* Category Stamp inside Mat Board */}
                <div className="absolute top-8 left-8 z-20 px-2.5 py-1 rounded-md bg-black/80 border border-amber-500/40 text-[9px] uppercase tracking-widest text-[#FAF8F5] font-mono backdrop-blur-md">
                  {item.category}
                </div>

                {/* Artwork Image Viewport */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-200 border border-stone-300 shadow-inner flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 backdrop-blur-[2px]">
                    <span className="text-amber-300 text-xs font-mono tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Archival Specimen &bull; {item.dimensions}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean Minimalist Plaque Under Frame */}
              <div className="px-2 flex items-baseline justify-between">
                <div>
                  <h3 className="font-serif text-base text-[#FAF8F5] group-hover:text-[#D4A348] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#A8A196] font-light">{item.medium}</p>
                </div>
                <span className="font-mono text-xs text-[#D4A348] font-medium">{item.dimensions}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-12">
          <Link
            href="/custom-sketch"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4A348] to-[#C29B38] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all shadow-lg group"
          >
            <span>Commission Your Portrait Like These</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}