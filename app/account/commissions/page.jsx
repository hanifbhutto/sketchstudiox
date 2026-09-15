'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Palette, ArrowRight, Clock, Truck } from 'lucide-react';

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedEmail = localStorage.getItem('patronEmail');
    const userId = localStorage.getItem('userId');
    if (!savedEmail && !userId) {
      setLoading(false);
      return;
    }

    async function fetchCommissions() {
      try {
        const queryParam = savedEmail ? `email=${encodeURIComponent(savedEmail)}` : `userId=${encodeURIComponent(userId)}`;
        const res = await fetch(`/api/orders?${queryParam}&type=Commission`);
        const data = await res.json();
        
        if (res.ok) {
          setCommissions(data.orders || []);
        }
      } catch (err) {
        console.error('Failed to load custom commissions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCommissions();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-[#FAF8F5]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Custom Portrait Commissions</h2>
          <p className="text-xs text-[#A8A196] font-mono mt-0.5">Track your hand-drawn bespoke heirloom production phases</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#A8A196]">
          <span className="px-3 py-1.5 rounded-lg bg-[#171513] border border-white/10">Total Commissions: {commissions.length}</span>
        </div>
      </div>
      
      {loading ? (
        <p className="text-xs font-mono text-[#A8A196] animate-pulse">Loading atelier commission records...</p>
      ) : commissions.length === 0 ? (
        <div className="p-12 text-center bg-[#171513] rounded-[28px] border border-white/10 space-y-4 shadow-xl">
          <Palette className="w-10 h-10 text-[#e4c577] mx-auto opacity-60" />
          <div className="space-y-1 max-w-sm mx-auto">
            <p className="font-serif text-lg text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>No active commissions found.</p>
            <p className="text-xs text-[#A8A196] font-light">Commission a bespoke portrait from your reference photo to begin your atelier tracking.</p>
          </div>
          <Link
            href="/custom-sketch"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-all font-bold shadow-md cursor-pointer"
          >
            <span>Start New Commission</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0A0908]" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {commissions.map((order) => {
            const firstItem = order.items?.[0] || {};
            
            const artTitle = firstItem.title || 'Bespoke Heirloom Portrait';
            const medium = firstItem.medium || 'Raw Willow Charcoal';
            const size = firstItem.dimensions || 'A3 Format';
            const frame = firstItem.frame || 'Archival Unframed Sheet';
            
            const imageUrl = firstItem.media?.secureUrl || firstItem.artwork?.media?.secureUrl || '';

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-8 rounded-[28px] bg-[#171513] border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)] flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {imageUrl && (
                  <div className="w-20 h-24 rounded-2xl overflow-hidden bg-stone-900 border border-white/10 shrink-0 hidden sm:block relative">
                    <Image src={imageUrl} alt="Reference" fill sizes="100px" className="object-cover contrast-110" />
                  </div>
                )}

                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-md bg-black/50 border border-white/10 text-[#e4c577] font-bold">
                      {order.orderNumber || `#${order.id.slice(0, 8)}`}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-md bg-[#e4c577]/10 text-[#e4c577] font-medium border border-[#e4c577]/30">
                      Custom Commission
                    </span>
                    <span className="text-xs text-[#A8A196] font-mono">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>{artTitle}</h3>
                  <p className="text-xs text-[#A8A196]">{medium} &bull; Size: {size} &bull; {frame}</p>

                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-mono text-amber-300 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>Lifecycle State: {order.status}</span>
                    </span>

                    {order.trackingNumber && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-[#e4c577]">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Waybill: <strong className="text-[#FAF8F5]">{order.trackingNumber}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-white/10">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase tracking-widest text-[#A8A196] font-mono block">Commission Estimate</span>
                    <span className="font-serif text-xl text-[#e4c577]" style={{ fontFamily: 'Georgia, serif' }}>${order.totalAmount.toFixed(2)}</span>
                  </div>

                  <Link
                    href={`/account/commissions/${order.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-all font-bold cursor-pointer shadow-md"
                  >
                    <span>Track Production</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0A0908]" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}