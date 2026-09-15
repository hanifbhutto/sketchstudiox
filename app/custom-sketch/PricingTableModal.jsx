'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Building2, Loader2 } from 'lucide-react';

const SIZE_ROWS = [
  'A4 (8×12)',
  'A3 (12×16)',
  '16×20',
  '18×24',
  '20×30',
  '24×36',
  '30×40'
];

export default function PricingTableSection() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatrix() {
      try {
        const res = await fetch('/api/admin/pricing');
        const data = await res.json();
        if (data.rates) {
          setRates(data.rates);
        }
      } catch (err) {
        console.error('Failed to load live matrix table:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatrix();
  }, []);

  return (
    <div className="mt-16 rounded-[32px] bg-[#171513] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#e4c577] font-semibold">
              Official Rate Schedule &bull; Live Database
            </span>
            <span className="text-[10px] font-mono text-[#A8A196]">&bull; People or Pets</span>
          </div>
          <h3 className="font-serif text-2xl text-[#FAF8F5] mt-1" style={{ fontFamily: 'Georgia, serif' }}>
            Standard Commission Matrix
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#A8A196]">
          <Building2 className="w-3.5 h-3.5 text-[#e4c577]" />
          <span>SKETCH X STUDIO LTD (UK: 17429707)</span>
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#A8A196]">
          <Loader2 className="w-6 h-6 animate-spin text-[#e4c577]" />
          <span>Loading live database tariff schedule...</span>
        </div>
      ) : (
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-center text-xs font-mono border-collapse border border-white/10">
            <thead>
              <tr className="border-b border-white/10 bg-black/30 text-[11px] text-[#FAF8F5]">
                <th className="p-3 text-left font-semibold sticky left-0 bg-[#171513] z-10 border-r border-white/10 shadow-xl min-w-[160px]">Size (Inches)</th>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <th key={num} className="p-3 font-semibold whitespace-nowrap border-r border-white/10 last:border-r-0">
                    {num} {num === 1 ? 'Sub' : 'Subs'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {SIZE_ROWS.map((sizeKey) => {
                const rowData = rates[sizeKey] || {};

                return (
                  <tr key={sizeKey} className="hover:bg-white/[0.02] transition-colors text-[#A8A196]">
                    <td className="p-3 text-left font-semibold text-[#FAF8F5] whitespace-nowrap sticky left-0 bg-[#171513] z-10 border-r border-white/10 shadow-xl">
                      {sizeKey}
                    </td>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((subjectCount) => {
                      const price = rowData[subjectCount];
                      const isSupported = price !== undefined && price !== null;

                      return (
                        <td key={subjectCount} className="p-3 border-r border-white/5 last:border-r-0">
                          {isSupported ? (
                            <span className="font-bold text-[#e4c577]">${price}</span>
                          ) : (
                            <span className="text-white/10">&mdash;</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A196] font-light">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          100% Hand-drawn with raw charcoal & graphite on 300 GSM French cotton substrate.
        </span>
        <span className="font-mono text-[11px]">Free Worldwide Insured Delivery Included</span>
      </div>
    </div>
  );
}