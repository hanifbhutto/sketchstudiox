'use client';

import { motion } from 'framer-motion';

const TICKER_ITEMS = [
  'Digital Proof First',
  'Original Artwork',
  'Custom Portraits',
  'People & Pets',
  'Worldwide Shipping',
  '300 GSM French Cotton',
  'Museum Framing Available',
  'Certificate of Authenticity',
];

export default function MarqueeTicker() {
  return (
    <div className="relative w-full bg-[#12100E] border-y border-[#e4c577]/25 py-3.5 overflow-hidden select-none">
      
      {/* Subtle Gradient Overlays for smooth edge fading */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#0A0908] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0A0908] to-transparent z-10 pointer-events-none" />

      {/* Infinite Smooth Marquee Track */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 45, // Slowed down for a luxury, relaxed pacing
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-8 shrink-0"
        >
          {/* Render multiple sets to ensure seamless infinite looping */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FAF8F5]/90 font-medium">
                {item}
              </span>
              <span className="text-[#e4c577] text-xs">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}