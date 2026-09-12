'use client';

import { useState } from 'react';
import { 
  TableProperties, 
  Save, 
  RotateCcw, 
  Check, 
  Info, 
  ShieldCheck,
  Plus
} from 'lucide-react';

// Flyer ke exact rates default data ke tor par
const INITIAL_FLYER_RATES = {
  'A4 (8×12)': { 1: 200 },
  'A3 (12×16)': { 1: 250, 2: 400 },
  '16×20': { 1: 300, 2: 450, 3: 550 },
  '18×24': { 1: 350, 2: 500, 3: 650, 4: 750 },
  '20×30': { 1: 400, 2: 550, 3: 700, 4: 800, 5: 900 },
  '24×36': { 1: 450, 2: 650, 3: 750, 4: 850, 5: 950, 6: 1050 },
  '30×40': { 1: 550, 2: 750, 3: 900, 4: 1050, 5: 1150, 6: 1300, 7: 1450, 8: 1600, 9: 1750, 10: 1850 }
};

const SUBJECT_COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function AdminPricingPage() {
  const [rates, setRates] = useState(INITIAL_FLYER_RATES);
  const [isSaved, setIsSaved] = useState(false);
  const [colorSurcharge, setColorSurcharge] = useState(0); // Optional color markup if needed

  // Cell ki value update karne ka function
  const handlePriceChange = (size, subjectCount, value) => {
    setIsSaved(false);
    const numericVal = value === '' ? '' : Number(value);
    setRates(prev => ({
      ...prev,
      [size]: {
        ...prev[size],
        [subjectCount]: numericVal
      }
    }));
  };

  // Rates save karne ka handler (yahan aage chal kar database API call aayegi)
  const handleSaveRates = () => {
    // LocalStorage me save karein taake refresh par rates barqarar rahein
    localStorage.setItem('studio_rates_matrix', JSON.stringify(rates));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetToDefault = () => {
    if (confirm('Reset entire pricing matrix to standard official flyer schedule?')) {
      setRates(INITIAL_FLYER_RATES);
      localStorage.removeItem('studio_rates_matrix');
      setIsSaved(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5DFD7] pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-semibold flex items-center gap-1.5">
            <TableProperties className="w-3.5 h-3.5 text-[#C29B38]" />
            Official Rate Schedule
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">Rate Matrix Control</h1>
          <p className="text-xs text-[#867E74] font-light">
            Directly update commission pricing across all canvas dimensions and subject allocations (Person OR Pet).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetToDefault}
            className="px-4 py-2.5 rounded-full border border-[#E5DFD7] text-xs font-mono text-[#686057] hover:bg-stone-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Schedule</span>
          </button>

          <button
            onClick={handleSaveRates}
            className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#C29B38] text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-xs font-bold"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Schedule Saved</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Live Rates</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7] flex items-start gap-3 text-xs text-[#686057]">
        <Info className="w-4 h-4 text-[#C29B38] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-[#1A1A1A]">Operational Pricing Rule: </span>
          Har cell mein price ($ USD) likhi hui hai. Agar koi size kisi specific subject count ke liye supported nahi hai, toh wahan dash (-) rehta hai. Public order form automatically inhi rates ko calculate karega.
        </div>
      </div>

      {/* Editable Matrix Table */}
      <div className="rounded-2xl bg-white border border-[#E5DFD7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#E5DFD7] bg-[#FAF8F3] text-[10px] text-[#867E74] uppercase tracking-wider">
                <th className="p-4 text-left font-semibold sticky left-0 bg-[#FAF8F3] z-10 border-r border-[#E5DFD7]">
                  Canvas Size (Inches)
                </th>
                {SUBJECT_COLUMNS.map(count => (
                  <th key={count} className="p-3 font-semibold min-w-[75px]">
                    <span className="block text-[11px] text-[#1A1A1A]">{count}</span>
                    <span className="text-[9px] text-[#867E74]">{count === 1 ? 'Subject' : 'Subjects'}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {Object.keys(rates).map((size) => (
                <tr key={size} className="hover:bg-[#FAF8F3]/30 transition-colors">
                  
                  {/* Size Label */}
                  <td className="p-4 text-left font-bold text-[#1A1A1A] sticky left-0 bg-white border-r border-[#E5DFD7] whitespace-nowrap">
                    {size}
                  </td>

                  {/* Subject Cells */}
                  {SUBJECT_COLUMNS.map(count => {
                    const price = rates[size]?.[count];
                    const isAllowed = price !== undefined;

                    return (
                      <td key={count} className="p-2">
                        {isAllowed ? (
                          <div className="relative inline-flex items-center">
                            <span className="absolute left-2.5 text-[10px] text-stone-400">$</span>
                            <input
                              type="number"
                              value={price}
                              onChange={(e) => handlePriceChange(size, count, e.target.value)}
                              className="w-18 pl-5 pr-2 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#E5DFD7] text-xs font-mono font-semibold text-[#1A1A1A] text-center outline-none focus:border-[#C29B38] focus:bg-white transition-all"
                            />
                          </div>
                        ) : (
                          <span className="text-stone-300 font-serif text-sm">&mdash;</span>
                        )}
                      </td>
                    );
                  })}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statutory Footer */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#867E74] pt-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Sketch X Studio Ltd &bull; UK Company: 17429707</span>
        </span>
        <span>Currency: USD ($) &bull; Worldwide Delivery Protected</span>
      </div>

    </div>
  );
}