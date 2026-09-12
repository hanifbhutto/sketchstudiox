'use client';

import Link from 'next/link';
import { DollarSign, Clock, Package, Sparkles, ArrowUpRight } from 'lucide-react';

export default function AdminOverviewPage() {
  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="space-y-1 border-b border-[#E5DFD7] pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-semibold">
          Studio Ledger
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">Dashboard Overview</h1>
        <p className="text-xs text-[#867E74] font-light">
          Real-time snapshot of active easels, commissions pipeline, and substrate reserves.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-[#E5DFD7] shadow-2xs space-y-2">
          <div className="flex justify-between text-xs font-mono text-[#867E74]">
            <span>Gross Acquisitions</span>
            <DollarSign className="w-4 h-4 text-[#C29B38]" />
          </div>
          <span className="font-serif text-3xl text-[#1A1A1A] block">$4,280</span>
          <span className="text-[10px] font-mono text-emerald-700 block">+18% this month</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E5DFD7] shadow-2xs space-y-2">
          <div className="flex justify-between text-xs font-mono text-[#867E74]">
            <span>Active on Easel</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <span className="font-serif text-3xl text-[#1A1A1A] block">3 Pieces</span>
          <span className="text-[10px] font-mono text-amber-700 block">Hand-rendering phase</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E5DFD7] shadow-2xs space-y-2">
          <div className="flex justify-between text-xs font-mono text-[#867E74]">
            <span>Commissions Ingested</span>
            <Package className="w-4 h-4 text-[#C29B38]" />
          </div>
          <span className="font-serif text-3xl text-[#1A1A1A] block">12 Orders</span>
          <span className="text-[10px] font-mono text-[#867E74] block">A3 & 16×20 Popular</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E5DFD7] shadow-2xs space-y-2">
          <div className="flex justify-between text-xs font-mono text-[#867E74]">
            <span>Cotton Substrate Reserve</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-serif text-3xl text-[#1A1A1A] block">300 GSM</span>
          <span className="text-[10px] font-mono text-emerald-700 block">French Arches Ready</span>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/admin/orders" 
          className="p-7 rounded-2xl bg-white border border-[#E5DFD7] shadow-2xs hover:border-[#C29B38] transition-all group flex justify-between items-start"
        >
          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#1A1A1A] group-hover:text-[#C29B38] transition-colors">
              Manage Client Orders &rarr;
            </h3>
            <p className="text-xs text-[#867E74] font-light max-w-sm">
              Inspect uploaded client reference photos, update hand-drawing stages, and record courier tracking numbers.
            </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-[#C29B38]" />
        </Link>

        <Link 
          href="/admin/artworks" 
          className="p-7 rounded-2xl bg-white border border-[#E5DFD7] shadow-2xs hover:border-[#C29B38] transition-all group flex justify-between items-start"
        >
          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#1A1A1A] group-hover:text-[#C29B38] transition-colors">
              Master Originals Vault &rarr;
            </h3>
            <p className="text-xs text-[#867E74] font-light max-w-sm">
              Publish new graphite/charcoal master studies, update inventory, and mark pieces as Acquired or Reserved.
            </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-[#C29B38]" />
        </Link>
      </div>

    </div>
  );
}