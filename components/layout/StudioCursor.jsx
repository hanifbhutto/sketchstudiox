'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function StudioCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef(null);
  const nextPositionRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e) => {
      nextPositionRef.current = { x: e.clientX, y: e.clientY };
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        setPos(nextPositionRef.current);
        frameRef.current = null;
      });
    };

    const handleOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden lg:block">
      {/* Outer Halo */}
      <motion.div
        animate={{
          x: pos.x - (hovered ? 24 : 14),
          y: pos.y - (hovered ? 24 : 14),
          scale: hovered ? 1.4 : 1,
          borderColor: hovered ? '#C29B38' : '#736B63',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
        className="w-7 h-7 rounded-full border border-[#736B63]/40 absolute"
      />
      {/* Inner Graphite Dot */}
      <div
        style={{ transform: `translate3d(${pos.x - 2.5}px, ${pos.y - 2.5}px, 0)` }}
        className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full absolute"
      />
    </div>
  );
}