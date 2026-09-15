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
        const queryParam = savedEmail ? `email=${encodeURIComponent(savedEmail)}` : `userId=${encodeURIComponent(userId)}`;
        // Fetching specifically Gallery orders
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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="font-serif text-2xl text-[#1A1A1A]">Gallery Orders Ledger</h2>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#867E74]">
          <span className="px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD7]">Total Records: {orders.length}</span>
        </div>
      </div>
      
      {loading ? (
        <p className="text-xs font-mono text-[#867E74] animate-pulse">Loading gallery acquisition records...</p>
      ) : orders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-[28px] border border-[#E5DFD7] space-y-3 shadow-xs">
          <Package className="w-8 h-8 text-[#C29B38] mx-auto opacity-60" />
          <p className="font-serif text-lg text-[#1A1A1A]">No gallery orders found.</p>
          <p className="text-xs text-[#867E74]">Explore the gallery archive and acquire an original masterpiece to track it here.</p>
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
                className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#E5DFD7] shadow-[0_10px_30px_-10px_rgba(212,163,72,0.1)] flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-md bg-[#FAF8F3] border border-[#E5DFD7] text-[#C29B38] font-bold">
                      {order.orderNumber || `#${order.id.slice(0, 8)}`}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium">
                      {order.items?.length > 1 ? `${order.items.length} Items` : 'Gallery Original'}
                    </span>
                    <span className="text-xs text-[#867E74] font-mono">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#1A1A1A]">
                    {artTitle} {order.items?.length > 1 ? `and ${order.items.length - 1} more` : ''}
                  </h3>
                  <p className="text-xs text-[#867E74]">{medium} &bull; Size: {size}</p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-mono font-medium text-[#1A1A1A]">{order.status}</span>
                    </div>

                    {/* Show Tracking Number if exists */}
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
                    <span className="text-[10px] uppercase tracking-widest text-[#867E74] font-mono block">Acquisition Value</span>
                    <span className="font-serif text-xl text-[#1A1A1A]">${order.totalAmount.toFixed(2)}</span>
                  </div>

                  <Link
                    href={`/account/orders/${order.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors font-bold cursor-pointer"
                  >
                    <span>Inspect Ledger</span>
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