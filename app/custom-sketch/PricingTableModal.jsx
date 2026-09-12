'use client';

import { Check, ShieldCheck, Building2 } from 'lucide-react';

const SIZES_DATA = [
  { size: 'A4 (8×12")', p: [200, '-', '-', '-', '-', '-', '-', '-', '-', '-'] },
  { size: 'A3 (12×16")', p: [250, 400, '-', '-', '-', '-', '-', '-', '-', '-'] },
  { size: '16×20"', p: [300, 450, 550, '-', '-', '-', '-', '-', '-', '-'] },
  { size: '18×24"', p: [350, 500, 650, 750, '-', '-', '-', '-', '-', '-'] },
  { size: '20×30"', p: [400, 550, 700, 800, 900, '-', '-', '-', '-', '-'] },
  { size: '24×36"', p: [450, 650, 750, 850, 950, 1050, '-', '-', '-', '-'] },
  { size: '30×40"', p: [550, 750, 900, 1050, 1150, 1300, 1450, 1600, 1750, 1850] },
];

export default function PricingTableSection() {
  return (
    <div className="mt-16 rounded-[32px] bg-white border border-[#E5DFD7] p-6 sm:p-10 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD7] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C29B38] font-semibold">
              Official Rate Schedule
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

      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-[#E5DFD7] bg-[#FAF8F3] text-[11px] text-[#1A1A1A]">
              <th className="p-3 text-left font-semibold">Size (Inches)</th>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <th key={num} className="p-3 font-semibold whitespace-nowrap">
                  {num} {num === 1 ? 'Sub' : 'Subs'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {SIZES_DATA.map((row) => (
              <tr key={row.size} className="hover:bg-[#FAF8F3]/60 transition-colors">
                <td className="p-3 text-left font-semibold text-[#1A1A1A] whitespace-nowrap">
                  {row.size}
                </td>
                {row.p.map((val, idx) => (
                  <td key={idx} className="p-3">
                    {val !== '-' ? (
                      <span className="font-bold text-[#1A1A1A]">${val}</span>
                    ) : (
                      <span className="text-stone-300">&mdash;</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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