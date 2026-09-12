'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function AmbientGlow() {
  const [mounted, setMounted] = useState(false);

  const mouseX = useSpring(0, { stiffness: 120, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 25 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="fixed pointer-events-none z-0 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-indigo-200/20 via-zinc-200/15 to-transparent blur-[110px] hidden md:block"
    />
  );
}