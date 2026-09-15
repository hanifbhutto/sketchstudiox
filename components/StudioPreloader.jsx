'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function StudioPreloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Speed optimized: 0.8 seconds luxury entrance timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-50 bg-[#0A0908] flex flex-col items-center justify-center px-4 overflow-hidden"
        >
          {/* Subtle Ambient Gold Glow behind title */}
          <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.15)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 text-center space-y-4"
          >
            {/* Atelier Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 backdrop-blur-md text-[10px] uppercase tracking-[0.3em] text-[#e4c577] font-mono font-semibold">
              <Sparkles className="w-3 h-3 text-[#e4c577]" />
              <span>Private Atelier Archive</span>
            </div>

            {/* Grand Mid-Page Studio Name */}
            <h1 
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#FAF8F5] tracking-tight leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              SKETCH X <span className="italic font-light text-[#e4c577]">STUDIO</span>
            </h1>

            {/* Loading Progress Micro Bar */}
            <div className="w-32 h-[2px] bg-white/10 mx-auto rounded-full overflow-hidden mt-6">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-[#e4c577] to-[#cfae59]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}