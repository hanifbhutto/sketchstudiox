import Link from 'next/link';
import { prisma } from '../../../../lib/prisma';
import { 
  ShoppingBag, 
  DollarSign, 
  Palette, 
  ArrowUpRight,
  TrendingUp,
  Inbox,
  Truck,
  Sparkles,
  PackageCheck
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardOverview() {
  // Parallel real-time queries for studio throughput metrics
  const [totalOrders, pendingOrders, shippedOrders, totalArtworks, recentOrders, revenueData] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: { contains: 'Phase 01' } } }),
    prisma.order.count({ where: { status: { contains: 'Dispatched' } } }),
    prisma.artwork.count(),
    prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            artwork: true,
            media: true,
          }
        }
      }
    }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { 
        status: { not: 'Cancelled' } 
      },
    }),
  ]);

  const totalRevenue = revenueData._sum.totalAmount || 0;
  const activePipelineCount = totalOrders - shippedOrders;

  const STATS = [
    {
      title: 'Gross Atelier Volume',
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtext: 'Active & settled acquisitions',
      icon: DollarSign,
      color: 'text-[#e4c577]',
      bg: 'bg-[#e4c577]/10 border-[#e4c577]/30',
    },
    {
      title: 'Total Acquisitions',
      value: totalOrders,
      subtext: `${pendingOrders} awaiting intake phase`,
      icon: ShoppingBag,
      color: 'text-[#FAF8F5]',
      bg: 'bg-white/10 border-white/15',
    },
    {
      title: 'Vault Original Masterpieces',
      value: totalArtworks,
      subtext: '1-of-1 gallery inventory',
      icon: Palette,
      color: 'text-[#e4c577]',
      bg: 'bg-[#e4c577]/10 border-[#e4c577]/30',
    },
    {
      title: 'Active Fulfillment Pipeline',
      value: activePipelineCount,
      subtext: `${shippedOrders} wax-sealed & dispatched`,
      icon: Truck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20 border-emerald-400/40',
    },
  ];

  return (
    <div className="space-y-8 text-[#FAF8F5]">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e4c577] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
            Atelier Management Console
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F5] mt-1" style={{ fontFamily: 'Georgia, serif' }}>
            Executive Overview
          </h1>
          <p className="text-xs text-[#A8A196] mt-1 font-light">
            Real-time pipeline telemetry monitoring custom portrait commissions and gallery vault acquisitions.
          </p>
        </div>

        {/* Quick Action Navigation */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="px-5 py-3 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-all font-bold shadow-md flex items-center gap-2 cursor-pointer"
          >
            <PackageCheck className="w-3.5 h-3.5 text-[#0A0908]" />
            <span>Manage Orders Ledger</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.title}
              className="p-6 rounded-[28px] bg-[#171513] border border-white/10 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-[#e4c577]/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8A196] font-semibold">
                  {stat.title}
                </span>
                <div className={`p-2.5 rounded-2xl border ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold font-mono tracking-tight text-[#FAF8F5]">
                  {stat.value}
                </h3>
                <p className="text-[11px] text-[#A8A196] font-light mt-1">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Studio Orders / Inquiries Section */}
      <div className="rounded-[32px] border border-white/10 bg-[#171513] shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Recent Studio Acquisitions</h2>
            <p className="text-xs text-[#A8A196] font-light mt-0.5">Latest patron commissions and gallery orders registered in database</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-mono font-bold text-[#e4c577] hover:text-[#FAF8F5] inline-flex items-center gap-1.5 transition-colors uppercase tracking-wider"
          >
            <span>View Full Ledger</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center text-[#A8A196] text-xs font-mono space-y-2">
            <Inbox className="w-8 h-8 mx-auto text-stone-500 stroke-[1.5]" />
            <p>No acquisitions recorded yet.</p>
            <p className="text-[11px] text-stone-500">Orders placed on the storefront will appear here instantly.</p>
          </div>
        ) : (
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-black/30 text-[#A8A196] uppercase tracking-wider text-[10px] border-b border-white/10">
                  <th className="py-4 px-6 font-semibold">Order Ref & Patron</th>
                  <th className="py-4 px-6 font-semibold">Acquisition Type</th>
                  <th className="py-4 px-6 font-semibold">Settlement Value</th>
                  <th className="py-4 px-6 font-semibold">Fulfillment Stage</th>
                  <th className="py-4 px-6 font-semibold">Date Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => {
                  const isCommission = order.items.some(i => !i.artworkId);
                  const firstItem = order.items[0] || {};
                  
                  return (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-[#e4c577] block">{order.orderNumber || `#${order.id.slice(0, 8)}`}</span>
                        <span className="font-serif text-sm text-[#FAF8F5] block" style={{ fontFamily: 'Georgia, serif' }}>{order.name}</span>
                        <span className="text-[10px] text-[#A8A196] block">{order.email}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] uppercase font-bold tracking-wider mb-1 ${
                          isCommission
                            ? 'bg-[#e4c577]/20 text-[#e4c577] border border-[#e4c577]/40'
                            : 'bg-white/10 text-[#FAF8F5] border border-white/10'
                        }`}>
                          {isCommission ? 'Custom Sketch' : 'Gallery Original'}
                        </span>
                        <span className="text-[#A8A196] block text-[11px]">
                          {isCommission ? (firstItem.medium || 'Willow Charcoal') : (firstItem.artwork?.title || 'Vault Piece')}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#e4c577]">
                        ${order.totalAmount.toFixed(2)} <span className="text-[10px] font-normal text-[#A8A196]">USD</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono border font-semibold ${
                          order.status === 'Cancelled'
                            ? 'bg-rose-500/20 border-rose-400/40 text-rose-300'
                            : order.status?.includes('Phase') || order.status?.includes('Ingested')
                            ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                            : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                        }`}>
                          {order.status}
                        </span>
                        {order.trackingNumber && (
                          <span className="text-[9px] text-emerald-400 block mt-1">
                            Waybill: {order.trackingNumber}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-[#A8A196] text-[11px]">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}