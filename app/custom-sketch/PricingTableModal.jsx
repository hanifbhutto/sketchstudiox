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
    <div className="mt-16 rounded-[32px] bg-white border border-[#E5DFD7] p-6 sm:p-10 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD7] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C29B38] font-semibold">
              Official Rate Schedule &bull; Live Database
            </span>
            <span className="text-[10px] font-mono text-[#867E74]">&bull; People or Pets</span>
          </div>
          <h3 className="font-serif text-2xl text-[#1A1A1A] mt-1">
            Standard Commission Matrix
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#867E74]">
          <Building2 className="w-3.5 h-3.5 text-[#C29B38]" />
          <span>SKETCH X STUDIO LTD (UK: 17429707)</span>
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#867E74]">
          <Loader2 className="w-6 h-6 animate-spin text-[#C29B38]" />
          <span>Loading live database tariff schedule...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#E5DFD7] bg-[#FAF8F3] text-[11px] text-[#1A1A1A]">
                <th className="p-3 text-left font-semibold sticky left-0 bg-[#FAF8F3]">Size (Inches)</th>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <th key={num} className="p-3 font-semibold whitespace-nowrap">
                    {num} {num === 1 ? 'Sub' : 'Subs'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {SIZE_ROWS.map((sizeKey) => {
                const rowData = rates[sizeKey] || {};

                return (
                  <tr key={sizeKey} className="hover:bg-[#FAF8F3]/60 transition-colors">
                    <td className="p-3 text-left font-semibold text-[#1A1A1A] whitespace-nowrap sticky left-0 bg-white">
                      {sizeKey}
                    </td>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((subjectCount) => {
                      const price = rowData[subjectCount];
                      const isSupported = price !== undefined && price !== null;

                      return (
                        <td key={subjectCount} className="p-3">
                          {isSupported ? (
                            <span className="font-bold text-[#1A1A1A]">${price}</span>
                          ) : (
                            <span className="text-stone-300">&mdash;</span>
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

      <div className="pt-4 border-t border-[#E5DFD7] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#867E74] font-light">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          100% Hand-drawn with raw charcoal & graphite on 300 GSM French cotton substrate.
        </span>
        <span className="font-mono text-[11px]">Free Worldwide Insured Delivery Included</span>
      </div>
    </div>
  );
}