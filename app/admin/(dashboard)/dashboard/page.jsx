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
      color: 'text-[#C29B38]',
      bg: 'bg-[#C29B38]/10 border-[#C29B38]/25',
    },
    {
      title: 'Total Acquisitions',
      value: totalOrders,
      subtext: `${pendingOrders} awaiting intake phase`,
      icon: ShoppingBag,
      color: 'text-[#1A1A1A]',
      bg: 'bg-stone-200/50 border-stone-300/60',
    },
    {
      title: 'Vault Original Masterpieces',
      value: totalArtworks,
      subtext: '1-of-1 gallery inventory',
      icon: Palette,
      color: 'text-amber-800',
      bg: 'bg-amber-100/60 border-amber-300/40',
    },
    {
      title: 'Active Fulfillment Pipeline',
      value: activePipelineCount,
      subtext: `${shippedOrders} wax-sealed & dispatched`,
      icon: Truck,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5DFD7] pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
            Atelier Management Console
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] mt-1">
            Executive Overview
          </h1>
          <p className="text-xs text-[#867E74] mt-1 font-light">
            Real-time pipeline telemetry monitoring custom portrait commissions and gallery vault acquisitions.
          </p>
        </div>

        {/* Quick Action Navigation */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors font-bold shadow-xs flex items-center gap-2"
          >
            <PackageCheck className="w-3.5 h-3.5" />
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
              className="p-6 rounded-2xl bg-white border border-[#E5DFD7] shadow-xs relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#C29B38]/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#867E74] font-semibold">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl border ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold font-mono tracking-tight text-[#1A1A1A]">
                  {stat.value}
                </h3>
                <p className="text-[11px] text-[#867E74] font-light mt-1">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Studio Orders / Inquiries Section */}
      <div className="rounded-2xl border border-[#E5DFD7] bg-white shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#E5DFD7] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Recent Studio Acquisitions</h2>
            <p className="text-xs text-[#867E74] font-light mt-0.5">Latest patron commissions and gallery orders registered in database</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-mono font-bold text-[#C29B38] hover:text-[#1A1A1A] inline-flex items-center gap-1.5 transition-colors uppercase tracking-wider"
          >
            <span>View Full Ledger</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center text-[#867E74] text-xs font-mono space-y-2">
            <Inbox className="w-8 h-8 mx-auto text-stone-300 stroke-[1.5]" />
            <p>No acquisitions recorded yet.</p>
            <p className="text-[11px] text-stone-400">Orders placed on the storefront will appear here instantly.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-[#FAF8F3] text-[#867E74] uppercase tracking-wider text-[10px] border-b border-[#E5DFD7]">
                  <th className="py-3.5 px-6 font-semibold">Order Ref & Patron</th>
                  <th className="py-3.5 px-6 font-semibold">Acquisition Type</th>
                  <th className="py-3.5 px-6 font-semibold">Settlement Value</th>
                  <th className="py-3.5 px-6 font-semibold">Fulfillment Stage</th>
                  <th className="py-3.5 px-6 font-semibold">Date Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((order) => {
                  const isCommission = order.items.some(i => !i.artworkId);
                  const firstItem = order.items[0] || {};
                  
                  return (
                    <tr key={order.id} className="hover:bg-[#FAF8F3]/50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-[#C29B38] block">{order.orderNumber || `#${order.id.slice(0, 8)}`}</span>
                        <span className="font-serif text-sm text-[#1A1A1A] block">{order.name}</span>
                        <span className="text-[10px] text-[#867E74] block">{order.email}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider mb-1 ${
                          isCommission
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-800 text-white'
                        }`}>
                          {isCommission ? 'Custom Sketch' : 'Gallery Original'}
                        </span>
                        <span className="text-[#686057] block text-[11px]">
                          {isCommission ? (firstItem.medium || 'Willow Charcoal') : (firstItem.artwork?.title || 'Vault Piece')}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#1A1A1A]">
                        ${order.totalAmount.toFixed(2)} <span className="text-[10px] font-normal text-[#867E74]">USD</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono border font-semibold ${
                          order.status === 'Cancelled'
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : order.status?.includes('Phase') || order.status?.includes('Ingested')
                            ? 'bg-amber-50 border-amber-200 text-amber-800'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        }`}>
                          {order.status}
                        </span>
                        {order.trackingNumber && (
                          <span className="text-[9px] text-emerald-600 block mt-1">
                            Waybill: {order.trackingNumber}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-[#867E74] text-[11px]">
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