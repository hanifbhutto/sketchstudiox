import Link from 'next/link';
import { prisma } from '../../../../lib/prisma';
import { 
  ShoppingBag, 
  DollarSign, 
  Palette, 
  ArrowUpRight,
  TrendingUp,
  Inbox
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardOverview() {
  // Parallel real-time queries
  const [totalOrders, pendingOrders, totalArtworks, recentOrders, revenueData] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'PENDING_PAYMENT' } }),
    prisma.artwork.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.aggregate({
      _sum: { price: true },
      where: { status: { in: ['PAID', 'IN_PROGRESS', 'COMPLETED'] } },
    }),
  ]);

  const totalRevenue = revenueData._sum.price || 0;

  const STATS = [
    {
      title: 'Gross Commission Volume',
      value: `$${totalRevenue.toLocaleString()}`,
      subtext: 'Paid & in-production pipeline',
      icon: DollarSign,
      color: 'text-[#8A6A24]',
      bg: 'bg-[#D4A348]/10 border-[#D4A348]/25',
    },
    {
      title: 'Total Commissions',
      value: totalOrders,
      subtext: `${pendingOrders} pending confirmation`,
      icon: ShoppingBag,
      color: 'text-stone-700',
      bg: 'bg-stone-200/50 border-stone-300/60',
    },
    {
      title: 'Catalog Artworks',
      value: totalArtworks,
      subtext: 'Originals & limited editions',
      icon: Palette,
      color: 'text-amber-800',
      bg: 'bg-amber-100/60 border-amber-300/40',
    },
    {
      title: 'Active Pipeline',
      value: totalOrders - pendingOrders,
      subtext: 'In production / shipped',
      icon: TrendingUp,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Info */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A37424] font-semibold">
          Studio Ledger
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1C18] mt-1">
          Executive Atelier Overview
        </h1>
        <p className="text-xs sm:text-sm text-[#736B63] mt-1 font-sans">
          Real-time metrics on commission throughput, treasury turnover, and active artwork vault.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.title}
              className="p-5 rounded-2xl bg-white border border-[#E5DFD7] shadow-xs relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#D4A348]/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A8075] font-medium">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl border ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold font-mono tracking-tight text-[#1F1C18]">
                  {stat.value}
                </h3>
                <p className="text-[11px] text-[#736B63] mt-1">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="rounded-2xl border border-[#E5DFD7] bg-white shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#E5DFD7] flex items-center justify-between">
          <div>
            <h2 className="text-base font-serif font-bold text-[#1F1C18]">Recent Studio Inquiries</h2>
            <p className="text-xs text-[#736B63] mt-0.5">Live commission requests arriving directly from patrons</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-mono font-medium text-[#A37424] hover:text-[#8A6A24] inline-flex items-center gap-1 transition-colors"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center text-[#8A8075] text-xs font-mono space-y-2">
            <Inbox className="w-8 h-8 mx-auto text-[#C5BCB2] stroke-[1.5]" />
            <p>No commission inquiries received yet.</p>
            <p className="text-[11px] text-[#A69D92]">Test an order through the storefront checkout form.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#736B63] uppercase font-mono tracking-wider text-[10px] border-b border-[#E5DFD7]">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">Patron</th>
                  <th className="py-3.5 px-6 font-semibold">Medium & Dimensions</th>
                  <th className="py-3.5 px-6 font-semibold">Amount</th>
                  <th className="py-3.5 px-6 font-semibold">Status</th>
                  <th className="py-3.5 px-6 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE3]">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-[#1F1C18]">{order.customerName || order.name}</div>
                      <div className="text-[#8A8075] font-mono text-[11px]">{order.customerEmail || order.email}</div>
                    </td>
                    <td className="py-4 px-6 text-[#403B35]">
                      <div>{order.subjectType || order.tier || 'Custom Portrait'}</div>
                      <div className="text-[#8A8075] font-mono text-[11px]">{order.size} • {order.medium}</div>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-[#1F1C18]">
                      ${order.price}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${
                        order.status === 'PAID'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : order.status === 'COMPLETED'
                          ? 'bg-blue-50 border-blue-200 text-blue-800'
                          : order.status === 'IN_PROGRESS'
                          ? 'bg-amber-50 border-amber-200 text-amber-900'
                          : 'bg-stone-100 border-stone-300 text-stone-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[#8A8075] font-mono text-[11px]">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}