'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TableProperties, 
  Save, 
  RotateCcw, 
  Check, 
  Info, 
  ShieldCheck, 
  Loader2, 
  RefreshCw,
  X,
  AlertCircle
} from 'lucide-react';

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Inlined Reset Modal State
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // 1. Fetch real-time rates from database
  const fetchRates = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/pricing');
      const data = await res.json();
      if (data.rates) {
        setRates(data.rates);
      }
    } catch (err) {
      console.error('Failed to load matrix rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // Update cell value dynamically (allows adding prices to previously blank cells)
  const handlePriceChange = (size, subjectCount, value) => {
    setIsSaved(false);
    const numericVal = value === '' ? '' : Number(value);
    setRates((prev) => ({
      ...prev,
      [size]: {
        ...(prev[size] || {}),
        [subjectCount]: numericVal,
      },
    }));
  };

  // Save changes to database
  const handleSaveRates = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rates }),
      });

      if (!res.ok) throw new Error('Database write error');

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3500);
    } catch {
      alert('Could not save pricing schedule to database.');
    } finally {
      setSaving(false);
    }
  };

  // Execute restore defaults inside modal
  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rates: INITIAL_FLYER_RATES }),
      });

      if (!res.ok) throw new Error();

      setRates(INITIAL_FLYER_RATES);
      setShowResetModal(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch {
      alert('Failed to reset schedule in database.');
      fetchRates();
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5DFD7] pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-semibold flex items-center gap-1.5">
            <TableProperties className="w-3.5 h-3.5 text-[#C29B38]" />
            Official Rate Schedule &bull; Live Database
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">Rate Matrix Control</h1>
          <p className="text-xs text-[#867E74] font-light">
            Directly update commission pricing across all canvas dimensions and subject allocations (Person or Pet).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchRates}
            disabled={loading}
            className="p-2.5 rounded-full border border-[#E5DFD7] text-[#686057] hover:bg-stone-100 transition-colors cursor-pointer disabled:opacity-50"
            title="Reload live database values"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#C29B38]' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            disabled={saving || isResetting}
            className="px-4 py-2.5 rounded-full border border-[#E5DFD7] text-xs font-mono text-[#686057] hover:bg-stone-100 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Schedule</span>
          </button>

          <button
            onClick={handleSaveRates}
            disabled={saving || isResetting}
            className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#C29B38] text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-xs font-bold disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Syncing Database...</span>
              </>
            ) : isSaved ? (
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
          Each active cell reflects the base acquisition price ($ USD). You can now enter prices into any previously blank cell to enable custom combinations. The public storefront intake form directly queries this table to generate live customer quotes.
        </div>
      </div>

      {/* Editable Matrix Table */}
      <div className="rounded-2xl bg-white border border-[#E5DFD7] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#867E74]">
            <Loader2 className="w-6 h-6 animate-spin text-[#C29B38]" />
            <span>Retrieving rate matrix from database...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-[#E5DFD7] bg-[#FAF8F3] text-[10px] text-[#867E74] uppercase tracking-wider">
                  <th className="p-4 text-left font-semibold sticky left-0 bg-[#FAF8F3] z-10 border-r border-[#E5DFD7]">
                    Canvas Size (Inches)
                  </th>
                  {SUBJECT_COLUMNS.map((count) => (
                    <th key={count} className="p-3 font-semibold min-w-[75px]">
                      <span className="block text-[11px] text-[#1A1A1A]">{count}</span>
                      <span className="text-[9px] text-[#867E74]">
                        {count === 1 ? 'Subject' : 'Subjects'}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {Object.keys(rates).map((size) => (
                  <tr key={size} className="hover:bg-[#FAF8F3]/30 transition-colors">

                    {/* Size Column */}
                    <td className="p-4 text-left font-bold text-[#1A1A1A] sticky left-0 bg-white border-r border-[#E5DFD7] whitespace-nowrap">
                      {size}
                    </td>

                    {/* Subject Cell Columns (All cells now have active inputs) */}
                    {SUBJECT_COLUMNS.map((count) => {
                      const price = rates[size]?.[count] !== undefined && rates[size]?.[count] !== null ? rates[size][count] : '';

                      return (
                        <td key={count} className="p-2">
                          <div className="relative inline-flex items-center">
                            <span className="absolute left-2.5 text-[10px] text-stone-400">$</span>
                            <input
                              type="number"
                              value={price}
                              placeholder="&mdash;"
                              onChange={(e) => handlePriceChange(size, count, e.target.value)}
                              className="w-18 pl-5 pr-2 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#E5DFD7] text-xs font-mono font-semibold text-[#1A1A1A] text-center outline-none focus:border-[#C29B38] focus:bg-white transition-all placeholder:text-stone-300"
                            />
                          </div>
                        </td>
                      );
                    })}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* INLINED CUSTOM RESET CONFIRMATION MODAL WITH BLUR OVERLAY */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={isResetting ? undefined : () => setShowResetModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-[#E5DFD7] p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)] z-10 select-none overflow-hidden"
            >
              {/* Gold Ambient Glow Background */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4A348]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Icon Button */}
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                disabled={isResetting}
                className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon & Heading */}
              <div className="flex flex-col items-center text-center space-y-3 pt-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#A37424] shadow-xs">
                  <RotateCcw className="w-6 h-6 stroke-[2]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C29B38] font-bold flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> Studio Tariff Ledger
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                    Reset Official Rate Schedule
                  </h3>
                </div>

                <p className="text-xs text-[#736B63] leading-relaxed font-sans max-w-xs">
                  Are you sure you want to restore the entire pricing matrix back to the official flyer schedule? This will overwrite all custom rates in the database.
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-7 pt-5 border-t border-[#E5DFD7] text-xs font-mono">
                <button
                  type="button"
                  disabled={isResetting}
                  onClick={() => setShowResetModal(false)}
                  className="w-full py-3 px-4 rounded-xl border border-[#E5DFD7] hover:bg-stone-100 text-[#1A1A1A] transition-colors cursor-pointer disabled:opacity-50 font-medium"
                >
                  Retain Current
                </button>

                <button
                  type="button"
                  disabled={isResetting}
                  onClick={handleConfirmReset}
                  className="w-full py-3 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#C29B38] text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isResetting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Restoring...</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Defaults</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}