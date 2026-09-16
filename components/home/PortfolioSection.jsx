'use client';

import { useState, useRef } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const PORTFOLIO_ITEMS = [
  // 1. Dog Portraits (Priority First)
  {
    id: 'd1',
    title: 'English Springer Spaniel Study',
    category: 'Dog',
    medium: 'Fine Graphite on Cotton Sheet',
    image: '/images/custom-gallery/dog/english-springer-spaniel-drawing.jpeg',
    dimensions: '12×16 in',
  },
  {
    id: 'd2',
    title: 'Black Lab & Shepherd Mix',
    category: 'Dog',
    medium: 'Raw Charcoal & Graphite',
    image: '/images/custom-gallery/dog/black-lab-shepherd-mix-portrait.jpeg',
    dimensions: '16×20 in',
  },
  {
    id: 'd3',
    title: 'Australian Cattle Dog Study',
    category: 'Dog',
    medium: 'Detailed Pencil & Charcoal',
    image: '/images/custom-gallery/dog/australian-cattle-dog-painting.jpeg',
    dimensions: '16×20 in',
  },
  {
    id: 'd4',
    title: 'Brindle Cane Corso Mastiff',
    category: 'Dog',
    medium: 'Vine Charcoal on Arches 300 GSM',
    image: '/images/custom-gallery/dog/brindle-cane-corso-mastiff-sketch.jpeg',
    dimensions: '20×24 in',
  },
  {
    id: 'd5',
    title: 'Dachshund & Spaniel Puppies',
    category: 'Dog',
    medium: 'Fine Graphite on Fabriano Paper',
    image: '/images/custom-gallery/dog/dachshund-spaniel-puppies-drawing.jpeg',
    dimensions: '16×20 in',
  },
  {
    id: 'd6',
    title: 'German Shepherd Master Portrait',
    category: 'Dog',
    medium: 'Charcoal & White Chalk Accent',
    image: '/images/custom-gallery/dog/german-shepherd-oil-portrait.jpeg',
    dimensions: '20×30 in',
  },
  {
    id: 'd7',
    title: 'Siberian Husky Blue Eyes Study',
    category: 'Dog',
    medium: 'Fine Graphite & Pastel Pencil',
    image: '/images/custom-gallery/animals/siberian-husky-blue-eyes-drawing.jpeg',
    dimensions: '16×20 in',
  },

  // 2. Animal / Wildlife & Horse Portraits
  {
    id: 'a1',
    title: 'Texas Longhorn Cattle Study',
    category: 'Animal',
    medium: 'Fine Graphite & Charcoal',
    image: '/images/custom-gallery/animals/texas-longhorn-cattle-drawing.jpeg',
    dimensions: '20×30 in',
  },
  {
    id: 'a2',
    title: 'Chestnut Horse Portrait Study',
    category: 'Animal',
    medium: 'Oil & Fine Brushwork on Canvas',
    image: '/images/custom-gallery/animals/chestnut-horse-portrait-painting.jpeg',
    dimensions: '24×36 in',
  },
  {
    id: 'a3',
    title: 'Leopard Resting on Tree Branch',
    category: 'Animal',
    medium: 'Detailed Acrylic & Charcoal Painting',
    image: '/images/custom-gallery/animals/leopard-resting-tree-branch-painting.jpeg',
    dimensions: '20×30 in',
  },
  {
    id: 'a4',
    title: 'Bay Horse Head Study',
    category: 'Animal',
    medium: 'Fine Art Painting',
    image: '/images/custom-gallery/animals/bay-horse-head-study-painting.jpeg',
    dimensions: '18×24 in',
  },
  {
    id: 'a5',
    title: 'Cheetah Face Canvas Portrait',
    category: 'Animal',
    medium: 'Acrylic & Detailed Inkwork',
    image: '/images/custom-gallery/animals/cheetah-face-canvas-portrait.jpeg',
    dimensions: '16×20 in',
  },
  {
    id: 'a6',
    title: 'Bengal Tiger Master Painting',
    category: 'Animal',
    medium: 'Acrylic on Canvas',
    image: '/images/custom-gallery/animals/bengal-tiger-acrylic-painting.jpeg',
    dimensions: '24×36 in',
  },
  {
    id: 'a7',
    title: 'African Wild Painted Dog',
    category: 'Animal',
    medium: 'Detailed Colored Pencil Study',
    image: '/images/custom-gallery/animals/african-wild-painted-dog-portrait.jpeg',
    dimensions: '16×20 in',
  },

  // 3. Birds Portraits
  {
    id: 'b1',
    title: 'Hoopoe Bird on Branch Study',
    category: 'Birds',
    medium: 'Fine Graphite & Pencil on Cotton',
    image: '/images/custom-gallery/birds/hoopoe-bird-branch-drawing.jpeg',
    dimensions: '12×16 in',
  },
  {
    id: 'b2',
    title: 'Secretary Bird Pastel Portrait',
    category: 'Birds',
    medium: 'Fine Pastel & Colored Pencil',
    image: '/images/custom-gallery/birds/secretary-bird-pastel-portrait.jpeg',
    dimensions: '16×20 in',
  },

  // 4. Cat Portraits
  {
    id: 'cat1',
    title: 'Green-Eyed Tabby Study',
    category: 'Cat',
    medium: 'Fine Colored Pencil & Graphite',
    image: '/images/custom-gallery/cat/green-eyed-tabby-cat-portrait.jpeg',
    dimensions: '12×16 in',
  },

  // 5. Man Portraits
  {
    id: 'm1',
    title: 'Atmospheric Smoke Study',
    category: 'Man',
    medium: 'Fine Charcoal & Graphite on Paper',
    image: '/images/custom-gallery/man/man-smoking-cigarette-portrait.jpeg',
    dimensions: '16×20 in',
  },

  // 6. Woman Portraits
  {
    id: 'w1',
    title: 'Afra Saracoglu Portrait Study',
    category: 'Woman',
    medium: 'Fine Graphite & Charcoal on Cotton',
    image: '/images/custom-gallery/woman/afra-saracoglu.jpeg',
    dimensions: '16×20 in',
  },
  {
    id: 'w2',
    title: 'Smiling Radiance Study',
    category: 'Woman',
    medium: 'Vine Charcoal on Arches 300 GSM',
    image: '/images/custom-gallery/woman/girl-smiling-tshirt-sketch.jpeg',
    dimensions: '12×16 in',
  },
  {
    id: 'w3',
    title: 'Playful Gaze in Jacket',
    category: 'Woman',
    medium: 'Raw Willow Charcoal & Graphite',
    image: '/images/custom-gallery/woman/playful-girl-jacket-portrait.jpeg',
    dimensions: '16×20 in',
  },
  {
    id: 'w4',
    title: 'Ethereal High Bun Study',
    category: 'Woman',
    medium: 'Fine Graphite on Fabriano Paper',
    image: '/images/custom-gallery/woman/girl-high-bun-halter-top.jpeg',
    dimensions: 'A3 Format',
  },
  {
    id: 'w5',
    title: 'Nour Ghandour Contour Study',
    category: 'Woman',
    medium: 'Charcoal & White Chalk Accent',
    image: '/images/custom-gallery/woman/nour-ghandour.jpeg',
    dimensions: '20×30 in',
  },
  {
    id: 'w6',
    title: 'Cat-Eye Glamour Portrait',
    category: 'Woman',
    medium: 'Detailed Graphite Shading',
    image: '/images/custom-gallery/woman/cat-eye-glam-portrait.jpeg',
    dimensions: '16×20 in',
  },
  {
    id: 'w7',
    title: 'Braided Hair & Headscarf Study',
    category: 'Woman',
    medium: 'Vine Charcoal on Cotton Sheet',
    image: '/images/custom-gallery/woman/girl-headscarf-braided-hair.jpeg',
    dimensions: '18×24 in',
  },
  {
    id: 'w8',
    title: 'Daisy Blossom Elegance',
    category: 'Woman',
    medium: 'Graphite & Colored Pencil Hybrid',
    image: '/images/custom-gallery/woman/girl-daisy-flower-portrait.jpeg',
    dimensions: '16×20 in',
  },

  // 7. Couple Portraits
  {
    id: 'c1',
    title: 'Titanic Cinematic Romance Study',
    category: 'Couple',
    medium: 'Fine Graphite & Charcoal on Arches Paper',
    image: '/images/custom-gallery/couple/titanic-jack-and-rose-sketch.jpeg',
    dimensions: '20×30 in',
  },
];

const CATEGORIES = ['All', 'Dog', 'Animal', 'Birds', 'Cat', 'Man', 'Woman', 'Couple'];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('All');
  const categoriesScrollRef = useRef(null);
  const galleryScrollRef = useRef(null);

  const filteredItems = activeTab === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category.toLowerCase() === activeTab.toLowerCase());

  const handleTabClick = (e, cat) => {
    e.preventDefault();
    setActiveTab(cat);
  };

  const scrollCategories = (direction) => {
    if (categoriesScrollRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      categoriesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollSlider = (direction) => {
    if (galleryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      galleryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] border-t border-[#e4c577]/20 overflow-hidden">
      
      {/* Tuscan Gold & Charcoal Static Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] sm:w-[700px] sm:h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(228,197,119,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[250px] sm:w-[500px] sm:h-[350px] bg-[radial-gradient(ellipse_at_bottom,rgba(228,197,119,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        
        {/* Top Header & Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 text-[#e4c577] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
              <span>Explore Gallery</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
              Explore Custom Portraits <span className="italic font-light text-[#e4c577]">Gallery</span>
            </h2>
          </div>

          {/* Category Filter Container with Left/Right Scroll Arrows */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              className="p-2 rounded-full bg-[#171513] border border-white/10 text-[#A8A196] hover:text-white hover:border-[#e4c577] transition-all cursor-pointer shrink-0"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div 
              ref={categoriesScrollRef}
              className="flex items-center gap-2 bg-[#171513] p-1.5 rounded-full border border-white/10 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-full"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={(e) => handleTabClick(e, cat)}
                  className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.18em] font-mono font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === cat
                      ? 'bg-[#e4c577] text-[#0A0908] shadow-md'
                      : 'text-[#A8A196] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollCategories('right')}
              className="p-2 rounded-full bg-[#171513] border border-white/10 text-[#A8A196] hover:text-white hover:border-[#e4c577] transition-all cursor-pointer shrink-0"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Gallery Row with Navigation Controls */}
        <div className="relative">
          <div 
            ref={galleryScrollRef}
            className="flex items-stretch gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative min-w-[280px] sm:min-w-[320px] lg:min-w-[360px] aspect-[4/5] rounded-[24px] bg-[#171513] border border-[#e4c577]/30 overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_55px_-10px_rgba(228,197,119,0.25)] hover:border-[#e4c577]/60 transition-all duration-300 cursor-pointer flex flex-col justify-end p-6"
              >
                {/* Artwork Image Background with Next.js Optimized Image */}
                <div className="absolute inset-0 bg-[#141210]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 280px, 360px"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out contrast-110 opacity-90 group-hover:opacity-100"
                  />
                  {/* Dark Gradient Overlay for text readability at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-black/40 to-transparent z-10" />
                </div>

                {/* Top Category Badge */}
                <div className="absolute top-5 left-5 z-20 px-3 py-1 rounded-md bg-black/80 border border-[#e4c577]/40 text-[9px] uppercase tracking-widest text-[#FAF8F5] font-mono backdrop-blur-md">
                  {item.category} Portraits
                </div>

                {/* Bottom Label & Info */}
                <div className="relative z-20 space-y-1">
                  <h3 className="font-serif text-lg text-[#FAF8F5] group-hover:text-[#e4c577] transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#A8A196] font-light">{item.medium}</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#e4c577]">
                    <span>{item.dimensions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Row Quick Scroll Buttons */}
          <div className="hidden sm:flex items-center justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => scrollSlider('left')}
              className="p-3 rounded-full bg-[#171513] border border-white/10 text-[#A8A196] hover:text-white hover:border-[#e4c577] transition-all cursor-pointer shadow-md"
              aria-label="Scroll gallery left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollSlider('right')}
              className="p-3 rounded-full bg-[#171513] border border-white/10 text-[#A8A196] hover:text-white hover:border-[#e4c577] transition-all cursor-pointer shadow-md"
              aria-label="Scroll gallery right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-6">
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