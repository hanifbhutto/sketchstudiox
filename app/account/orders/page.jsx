'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Package, ArrowRight, Truck } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedEmail = localStorage.getItem('patronEmail');
    const userId = localStorage.getItem('userId');
    if (!savedEmail && !userId) {
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      try {
        // Prioritize userId first, fallback to email if userId isn't present
  const queryParam = userId 
    ? `userId=${encodeURIComponent(userId)}` 
    : (savedEmail ? `email=${encodeURIComponent(savedEmail)}` : '');
        const res = await fetch(`/api/orders?${queryParam}&type=Gallery`);
        const data = await res.json();
        
        if (res.ok) {
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error('Failed to load gallery orders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-[#FAF8F5]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Gallery Orders Ledger</h2>
          <p className="text-xs text-[#A8A196] font-mono mt-0.5">Track your gallery acquisition records and courier dispatch</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#A8A196]">
          <span className="px-3 py-1.5 rounded-lg bg-[#171513] border border-white/10">Total Records: {orders.length}</span>
        </div>
      </div>
      
      {loading ? (
        <p className="text-xs font-mono text-[#A8A196] animate-pulse">Loading gallery acquisition records...</p>
      ) : orders.length === 0 ? (
        <div className="p-12 text-center bg-[#171513] rounded-[28px] border border-white/10 space-y-3 shadow-xl">
          <Package className="w-8 h-8 text-[#e4c577] mx-auto opacity-60" />
          <p className="font-serif text-lg text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>No gallery orders found.</p>
          <p className="text-xs text-[#A8A196] font-light">Explore the gallery archive and acquire an original masterpiece to track it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => {
            const firstItem = order.items?.[0] || {};
            const artTitle = firstItem.artwork?.title || 'Studio Original Acquisition';
            const medium = firstItem.artwork?.medium || 'Raw Willow Charcoal';
            const size = firstItem.artwork?.dimensions || 'Standard';

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-8 rounded-[28px] bg-[#171513] border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)] flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-md bg-black/50 border border-white/10 text-[#e4c577] font-bold">
                      {order.orderNumber || `#${order.id.slice(0, 8)}`}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-md bg-white/10 text-[#FAF8F5] font-medium border border-white/10">
                      {order.items?.length > 1 ? `${order.items.length} Items` : 'Gallery Original'}
                    </span>
                    <span className="text-xs text-[#A8A196] font-mono">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
                    {artTitle} {order.items?.length > 1 ? `and ${order.items.length - 1} more` : ''}
                  </h3>
                  <p className="text-xs text-[#A8A196]">{medium} &bull; Size: {size}</p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono font-medium text-[#FAF8F5]">{order.status}</span>
                    </div>

                    {/* Show Tracking Number if exists */}
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
                    <span className="text-[10px] uppercase tracking-widest text-[#A8A196] font-mono block">Acquisition Value</span>
                    <span className="font-serif text-xl text-[#e4c577]" style={{ fontFamily: 'Georgia, serif' }}>${order.totalAmount.toFixed(2)}</span>
                  </div>

                  <Link
                    href={`/account/orders/${order.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-all font-bold cursor-pointer shadow-md"
                  >
                    <span>Inspect Ledger</span>
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