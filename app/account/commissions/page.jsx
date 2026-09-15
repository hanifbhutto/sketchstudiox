'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, ArrowRight, Clock, Truck } from 'lucide-react';
import Link from 'next/link';

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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1A1A1A]">Custom Portrait Commissions</h2>
          <p className="text-xs text-[#867E74] font-mono mt-0.5">Track your hand-drawn bespoke heirloom production phases</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#867E74]">
          <span className="px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD7]">Total Commissions: {commissions.length}</span>
        </div>
      </div>
      
      {loading ? (
        <p className="text-xs font-mono text-[#867E74] animate-pulse">Loading atelier commission records...</p>
      ) : commissions.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-[28px] border border-[#E5DFD7] space-y-4 shadow-xs">
          <Palette className="w-10 h-10 text-[#C29B38] mx-auto opacity-60" />
          <div className="space-y-1 max-w-sm mx-auto">
            <p className="font-serif text-lg text-[#1A1A1A]">No active commissions found.</p>
            <p className="text-xs text-[#867E74] font-light">Commission a bespoke portrait from your reference photo to begin your atelier tracking.</p>
          </div>
          <Link
            href="/custom-sketch"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors font-bold"
          >
            <span>Start New Commission</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {commissions.map((order) => {
            const firstItem = order.items?.[0] || {};
            
            // Clean Architecture Mappings
            const artTitle = firstItem.title || 'Bespoke Heirloom Portrait';
            const medium = firstItem.medium || 'Raw Willow Charcoal';
            const size = firstItem.dimensions || 'A3 Format';
            const frame = firstItem.frame || 'Archival Unframed Sheet';
            
            // Cloudinary Secure Permanent URL retrieval (Direct from OrderItem media relation)
            const imageUrl = firstItem.media?.secureUrl || firstItem.artwork?.media?.secureUrl || '';

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#E5DFD7] shadow-[0_10px_30px_-10px_rgba(212,163,72,0.1)] flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {imageUrl && (
                  <div className="w-20 h-24 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 hidden sm:block shadow-2xs">
                    <img src={imageUrl} alt="Reference" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-md bg-[#FAF8F3] border border-[#E5DFD7] text-[#C29B38] font-bold">
                      {order.orderNumber || `#${order.id.slice(0, 8)}`}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-md bg-[#D4A348]/10 text-[#8C6415] font-medium border border-[#D4A348]/30">
                      Custom Commission
                    </span>
                    <span className="text-xs text-[#867E74] font-mono">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#1A1A1A]">{artTitle}</h3>
                  <p className="text-xs text-[#867E74]">{medium} &bull; Size: {size} &bull; {frame}</p>

                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                      <span>Lifecycle State: {order.status}</span>
                    </span>

                    {/* Show Tracking Waybill if exists */}
                    {order.trackingNumber && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF8F3] border border-[#E5DFD7] text-xs font-mono text-[#C29B38]">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Waybill: <strong className="text-[#1A1A1A]">{order.trackingNumber}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-[#E5DFD7]">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase tracking-widest text-[#867E74] font-mono block">Commission Estimate</span>
                    <span className="font-serif text-xl text-[#1A1A1A]">${order.totalAmount.toFixed(2)}</span>
                  </div>

                  <Link
                    href={`/account/commissions/${order.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors font-bold cursor-pointer"
                  >
                    <span>Track Production</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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